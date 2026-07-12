"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EnvironmentalGoalsController = void 0;
const common_1 = require("@nestjs/common");
const environmental_goals_service_1 = require("./environmental-goals.service");
const create_environmental_goal_dto_1 = require("./dto/create-environmental-goal.dto");
const update_environmental_goal_dto_1 = require("./dto/update-environmental-goal.dto");
let EnvironmentalGoalsController = class EnvironmentalGoalsController {
    environmentalGoalsService;
    constructor(environmentalGoalsService) {
        this.environmentalGoalsService = environmentalGoalsService;
    }
    create(createEnvironmentalGoalDto) {
        return this.environmentalGoalsService.create(createEnvironmentalGoalDto);
    }
    findAll() {
        return this.environmentalGoalsService.findAll();
    }
    findOne(id) {
        return this.environmentalGoalsService.findOne(id);
    }
    update(id, updateEnvironmentalGoalDto) {
        return this.environmentalGoalsService.update(id, updateEnvironmentalGoalDto);
    }
    remove(id) {
        return this.environmentalGoalsService.remove(id);
    }
};
exports.EnvironmentalGoalsController = EnvironmentalGoalsController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_environmental_goal_dto_1.CreateEnvironmentalGoalDto]),
    __metadata("design:returntype", void 0)
], EnvironmentalGoalsController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], EnvironmentalGoalsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], EnvironmentalGoalsController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_environmental_goal_dto_1.UpdateEnvironmentalGoalDto]),
    __metadata("design:returntype", void 0)
], EnvironmentalGoalsController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], EnvironmentalGoalsController.prototype, "remove", null);
exports.EnvironmentalGoalsController = EnvironmentalGoalsController = __decorate([
    (0, common_1.Controller)('environmental-goals'),
    __metadata("design:paramtypes", [environmental_goals_service_1.EnvironmentalGoalsService])
], EnvironmentalGoalsController);
//# sourceMappingURL=environmental-goals.controller.js.map