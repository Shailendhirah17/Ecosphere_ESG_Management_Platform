"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateCarbonTransactionDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_carbon_transaction_dto_1 = require("./create-carbon-transaction.dto");
class UpdateCarbonTransactionDto extends (0, mapped_types_1.PartialType)(create_carbon_transaction_dto_1.CreateCarbonTransactionDto) {
}
exports.UpdateCarbonTransactionDto = UpdateCarbonTransactionDto;
//# sourceMappingURL=update-carbon-transaction.dto.js.map