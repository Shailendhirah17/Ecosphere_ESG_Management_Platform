const { Setting } = require('../models');
const { successResponse, errorResponse } = require('../utils/responseUtils');

class SettingsController {
  // Phase 2: Get settings
  async getSettings(req, res) {
    try {
      const settings = await Setting.findAll();
      const settingsObject = {};
      settings.forEach(s => {
        settingsObject[s.key] = s.value;
      });
      return successResponse(res, 200, 'Settings fetched successfully', settingsObject);
    } catch (error) {
      console.error(error);
      return errorResponse(res, 500, error.message);
    }
  }

  // Phase 2: Update settings (ESG weights and toggles)
  async updateSettings(req, res) {
    try {
      const {
        env_weight = 40,
        social_weight = 30,
        gov_weight = 30,
        auto_emission_calc = true,
        evidence_requirement = true,
        badge_auto_award = true,
        notification_enabled = true
      } = req.body;

      // Validate weights sum to 100
      const totalWeight = parseInt(env_weight) + parseInt(social_weight) + parseInt(gov_weight);
      if (totalWeight !== 100) {
        return errorResponse(res, 400, `ESG weights must sum to 100. Current total: ${totalWeight}`);
      }

      const updates = [
        { key: 'env_weight', value: env_weight.toString() },
        { key: 'social_weight', value: social_weight.toString() },
        { key: 'gov_weight', value: gov_weight.toString() },
        { key: 'auto_emission_calc', value: auto_emission_calc.toString() },
        { key: 'evidence_requirement', value: evidence_requirement.toString() },
        { key: 'badge_auto_award', value: badge_auto_award.toString() },
        { key: 'notification_enabled', value: notification_enabled.toString() }
      ];

      for (const update of updates) {
        await Setting.findOrCreate({
          where: { key: update.key },
          defaults: { value: update.value }
        }).then(([setting]) => setting.update({ value: update.value }));
      }

      return successResponse(res, 200, 'Settings updated successfully', { env_weight, social_weight, gov_weight, auto_emission_calc, evidence_requirement, badge_auto_award, notification_enabled });
    } catch (error) {
      console.error(error);
      return errorResponse(res, 500, error.message);
    }
  }

  // Get specific setting
  async getSetting(req, res) {
    try {
      const { key } = req.params;
      const setting = await Setting.findOne({ where: { key } });
      if (!setting) {
        return errorResponse(res, 404, `Setting ${key} not found`);
      }
      return successResponse(res, 200, 'Setting fetched successfully', { key: setting.key, value: setting.value });
    } catch (error) {
      console.error(error);
      return errorResponse(res, 500, error.message);
    }
  }
}

module.exports = new SettingsController();
