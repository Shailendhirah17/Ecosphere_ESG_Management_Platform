"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateCsrActivityDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_csr_activity_dto_1 = require("./create-csr-activity.dto");
class UpdateCsrActivityDto extends (0, mapped_types_1.PartialType)(create_csr_activity_dto_1.CreateCsrActivityDto) {
}
exports.UpdateCsrActivityDto = UpdateCsrActivityDto;
//# sourceMappingURL=update-csr-activity.dto.js.map