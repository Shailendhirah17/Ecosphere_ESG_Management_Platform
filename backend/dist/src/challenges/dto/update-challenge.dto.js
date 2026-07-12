"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateChallengeDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_challenge_dto_1 = require("./create-challenge.dto");
class UpdateChallengeDto extends (0, mapped_types_1.PartialType)(create_challenge_dto_1.CreateChallengeDto) {
}
exports.UpdateChallengeDto = UpdateChallengeDto;
//# sourceMappingURL=update-challenge.dto.js.map