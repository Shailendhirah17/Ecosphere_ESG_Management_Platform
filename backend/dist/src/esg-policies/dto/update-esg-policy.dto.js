"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateEsgPolicyDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_esg_policy_dto_1 = require("./create-esg-policy.dto");
class UpdateEsgPolicyDto extends (0, mapped_types_1.PartialType)(create_esg_policy_dto_1.CreateEsgPolicyDto) {
}
exports.UpdateEsgPolicyDto = UpdateEsgPolicyDto;
//# sourceMappingURL=update-esg-policy.dto.js.map