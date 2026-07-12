const { Challenge, ChallengeParticipation, Employee, Category } = require('../models');

class GamificationService {
  // Create challenge
  async createChallenge(data) {
    try {
      const challenge = await Challenge.create({
        title: data.title,
        category_id: data.category_id,
        description: data.description,
        xp: data.xp || 50,
        difficulty: data.difficulty || 'Medium',
        evidence_required: data.evidence_required || false,
        deadline: data.deadline,
        status: 'Active'
      });

      return challenge;
    } catch (error) {
      throw new Error(`Failed to create challenge: ${error.message}`);
    }
  }

  // Get all challenges
  async getAllChallenges(filters = {}) {
    try {
      const where = {};
      if (filters.status) where.status = filters.status;
      if (filters.difficulty) where.difficulty = filters.difficulty;
      if (filters.category_id) where.category_id = filters.category_id;

      const challenges = await Challenge.findAll({
        where,
        include: [
          { model: Category, as: 'category' },
          { model: ChallengeParticipation, as: 'participations' }
        ],
        order: [['createdAt', 'DESC']]
      });

      return challenges;
    } catch (error) {
      throw new Error(`Failed to fetch challenges: ${error.message}`);
    }
  }

  // Get challenge by ID
  async getChallengeById(id) {
    try {
      const challenge = await Challenge.findByPk(id, {
        include: [
          { model: Category, as: 'category' },
          { model: ChallengeParticipation, as: 'participations',
            include: [{ model: Employee, as: 'employee', attributes: ['id', 'name', 'email'] }]
          }
        ]
      });

      if (!challenge) {
        throw new Error('Challenge not found');
      }

      return challenge;
    } catch (error) {
      throw new Error(`Failed to fetch challenge: ${error.message}`);
    }
  }

  // Employee joins challenge
  async joinChallenge(employeeId, challengeId) {
    try {
      const challenge = await Challenge.findByPk(challengeId);
      if (!challenge) {
        throw new Error('Challenge not found');
      }

      const employee = await Employee.findByPk(employeeId);
      if (!employee) {
        throw new Error('Employee not found');
      }

      // Check if already joined
      const existingParticipation = await ChallengeParticipation.findOne({
        where: { challenge_id: challengeId, employee_id: employeeId }
      });

      if (existingParticipation) {
        throw new Error('Employee already joined this challenge');
      }

      const participation = await ChallengeParticipation.create({
        challenge_id: challengeId,
        employee_id: employeeId,
        progress: 0,
        approval_status: 'In Progress'
      });

      return participation;
    } catch (error) {
      throw new Error(`Failed to join challenge: ${error.message}`);
    }
  }

  // Submit challenge proof
  async submitChallengeProof(participationId, proofUrl) {
    try {
      const participation = await ChallengeParticipation.findByPk(participationId);
      if (!participation) {
        throw new Error('Participation not found');
      }

      participation.proof_url = proofUrl;
      participation.approval_status = 'Under Review';
      await participation.save();

      return participation;
    } catch (error) {
      throw new Error(`Failed to submit challenge proof: ${error.message}`);
    }
  }

  // Approve challenge completion
  async approveChallengeCompletion(participationId) {
    try {
      const participation = await ChallengeParticipation.findByPk(participationId);
      if (!participation) {
        throw new Error('Participation not found');
      }

      const challenge = await Challenge.findByPk(participation.challenge_id);
      const xpAwarded = challenge.xp || 50;

      participation.approval_status = 'Completed';
      participation.xp_awarded = xpAwarded;
      await participation.save();

      // Award XP to employee
      const employee = await Employee.findByPk(participation.employee_id);
      employee.xp_balance = (employee.xp_balance || 0) + xpAwarded;
      await employee.save();

      return participation;
    } catch (error) {
      throw new Error(`Failed to approve challenge: ${error.message}`);
    }
  }

  // Reject challenge completion
  async rejectChallengeCompletion(participationId, reason) {
    try {
      const participation = await ChallengeParticipation.findByPk(participationId);
      if (!participation) {
        throw new Error('Participation not found');
      }

      participation.approval_status = 'In Progress';
      participation.rejection_reason = reason;
      await participation.save();

      return participation;
    } catch (error) {
      throw new Error(`Failed to reject challenge: ${error.message}`);
    }
  }

  // Get employee challenges
  async getEmployeeChallenges(employeeId) {
    try {
      const participations = await ChallengeParticipation.findAll({
        where: { employee_id: employeeId },
        include: [
          { model: Challenge, as: 'challenge',
            include: [{ model: Category, as: 'category' }]
          }
        ],
        order: [['createdAt', 'DESC']]
      });

      return participations;
    } catch (error) {
      throw new Error(`Failed to fetch employee challenges: ${error.message}`);
    }
  }

  // Get active challenges for employee
  async getActiveChallengesForEmployee(employeeId) {
    try {
      // Get challenges employee hasn't joined yet
      const allChallenges = await Challenge.findAll({
        where: { status: 'Active' }
      });

      const joinedChallenges = await ChallengeParticipation.findAll({
        where: { employee_id: employeeId },
        attributes: ['challenge_id']
      });

      const joinedIds = joinedChallenges.map(c => c.challenge_id);
      const availableChallenges = allChallenges.filter(c => !joinedIds.includes(c.id));

      return availableChallenges;
    } catch (error) {
      throw new Error(`Failed to fetch active challenges: ${error.message}`);
    }
  }

  // Get challenge leaderboard
  async getChallengeLeaderboard(challengeId) {
    try {
      const participations = await ChallengeParticipation.findAll({
        where: { 
          challenge_id: challengeId,
          approval_status: 'Completed'
        },
        include: [
          { model: Employee, as: 'employee', attributes: ['id', 'name', 'email'] }
        ],
        order: [['xp_awarded', 'DESC']],
        limit: 10
      });

      return participations;
    } catch (error) {
      throw new Error(`Failed to fetch challenge leaderboard: ${error.message}`);
    }
  }

  // Get gamification statistics
  async getGamificationStats(employeeId) {
    try {
      const employee = await Employee.findByPk(employeeId);
      if (!employee) {
        throw new Error('Employee not found');
      }

      const challengeParticipations = await ChallengeParticipation.findAll({
        where: { employee_id: employeeId }
      });

      const completedChallenges = challengeParticipations.filter(c => c.approval_status === 'Completed').length;
      const totalXPEarned = challengeParticipations.reduce((sum, c) => sum + (c.xp_awarded || 0), 0);

      return {
        employeeId,
        xpBalance: employee.xp_balance,
        pointsBalance: employee.points_balance,
        totalChallengeParticipations: challengeParticipations.length,
        completedChallenges,
        totalXPEarned
      };
    } catch (error) {
      throw new Error(`Failed to get gamification stats: ${error.message}`);
    }
  }
}

module.exports = new GamificationService();
