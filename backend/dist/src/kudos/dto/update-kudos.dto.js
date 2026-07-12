"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateKudosDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_kudos_dto_1 = require("./create-kudos.dto");
class UpdateKudosDto extends (0, mapped_types_1.PartialType)(create_kudos_dto_1.CreateKudosDto) {
}
exports.UpdateKudosDto = UpdateKudosDto;
//# sourceMappingURL=update-kudos.dto.js.map