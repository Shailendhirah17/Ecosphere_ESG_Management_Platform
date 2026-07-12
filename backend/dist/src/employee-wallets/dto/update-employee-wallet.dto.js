"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateEmployeeWalletDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_employee_wallet_dto_1 = require("./create-employee-wallet.dto");
class UpdateEmployeeWalletDto extends (0, mapped_types_1.PartialType)(create_employee_wallet_dto_1.CreateEmployeeWalletDto) {
}
exports.UpdateEmployeeWalletDto = UpdateEmployeeWalletDto;
//# sourceMappingURL=update-employee-wallet.dto.js.map