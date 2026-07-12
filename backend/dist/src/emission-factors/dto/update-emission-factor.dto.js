"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateEmissionFactorDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_emission_factor_dto_1 = require("./create-emission-factor.dto");
class UpdateEmissionFactorDto extends (0, mapped_types_1.PartialType)(create_emission_factor_dto_1.CreateEmissionFactorDto) {
}
exports.UpdateEmissionFactorDto = UpdateEmissionFactorDto;
//# sourceMappingURL=update-emission-factor.dto.js.map