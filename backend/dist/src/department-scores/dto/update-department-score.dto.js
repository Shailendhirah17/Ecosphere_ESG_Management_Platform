"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateDepartmentScoreDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_department_score_dto_1 = require("./create-department-score.dto");
class UpdateDepartmentScoreDto extends (0, mapped_types_1.PartialType)(create_department_score_dto_1.CreateDepartmentScoreDto) {
}
exports.UpdateDepartmentScoreDto = UpdateDepartmentScoreDto;
//# sourceMappingURL=update-department-score.dto.js.map