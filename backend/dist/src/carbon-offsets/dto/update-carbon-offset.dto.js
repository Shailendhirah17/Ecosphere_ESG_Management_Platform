"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateCarbonOffsetDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_carbon_offset_dto_1 = require("./create-carbon-offset.dto");
class UpdateCarbonOffsetDto extends (0, mapped_types_1.PartialType)(create_carbon_offset_dto_1.CreateCarbonOffsetDto) {
}
exports.UpdateCarbonOffsetDto = UpdateCarbonOffsetDto;
//# sourceMappingURL=update-carbon-offset.dto.js.map