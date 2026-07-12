"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateEnvironmentalGoalDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_environmental_goal_dto_1 = require("./create-environmental-goal.dto");
class UpdateEnvironmentalGoalDto extends (0, mapped_types_1.PartialType)(create_environmental_goal_dto_1.CreateEnvironmentalGoalDto) {
}
exports.UpdateEnvironmentalGoalDto = UpdateEnvironmentalGoalDto;
//# sourceMappingURL=update-environmental-goal.dto.js.map