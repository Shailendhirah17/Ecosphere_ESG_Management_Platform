"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateEmployeeParticipationDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_employee_participation_dto_1 = require("./create-employee-participation.dto");
class UpdateEmployeeParticipationDto extends (0, mapped_types_1.PartialType)(create_employee_participation_dto_1.CreateEmployeeParticipationDto) {
}
exports.UpdateEmployeeParticipationDto = UpdateEmployeeParticipationDto;
//# sourceMappingURL=update-employee-participation.dto.js.map