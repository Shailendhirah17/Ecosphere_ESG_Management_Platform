"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CarbonTransactionsModule = void 0;
const common_1 = require("@nestjs/common");
const carbon_transactions_service_1 = require("./carbon-transactions.service");
const carbon_transactions_controller_1 = require("./carbon-transactions.controller");
let CarbonTransactionsModule = class CarbonTransactionsModule {
};
exports.CarbonTransactionsModule = CarbonTransactionsModule;
exports.CarbonTransactionsModule = CarbonTransactionsModule = __decorate([
    (0, common_1.Module)({
        controllers: [carbon_transactions_controller_1.CarbonTransactionsController],
        providers: [carbon_transactions_service_1.CarbonTransactionsService],
    })
], CarbonTransactionsModule);
//# sourceMappingURL=carbon-transactions.module.js.map