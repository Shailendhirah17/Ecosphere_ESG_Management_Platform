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
exports.EmployeeParticipationsController = void 0;
const common_1 = require("@nestjs/common");
const employee_participations_service_1 = require("./employee-participations.service");
const create_employee_participation_dto_1 = require("./dto/create-employee-participation.dto");
const update_employee_participation_dto_1 = require("./dto/update-employee-participation.dto");
let EmployeeParticipationsController = class EmployeeParticipationsController {
    employeeParticipationsService;
    constructor(employeeParticipationsService) {
        this.employeeParticipationsService = employeeParticipationsService;
    }
    create(createEmployeeParticipationDto) {
        return this.employeeParticipationsService.create(createEmployeeParticipationDto);
    }
    findAll() {
        return this.employeeParticipationsService.findAll();
    }
    findOne(id) {
        return this.employeeParticipationsService.findOne(+id);
    }
    update(id, updateEmployeeParticipationDto) {
        return this.employeeParticipationsService.update(+id, updateEmployeeParticipationDto);
    }
    remove(id) {
        return this.employeeParticipationsService.remove(+id);
    }
};
exports.EmployeeParticipationsController = EmployeeParticipationsController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_employee_participation_dto_1.CreateEmployeeParticipationDto]),
    __metadata("design:returntype", void 0)
], EmployeeParticipationsController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], EmployeeParticipationsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], EmployeeParticipationsController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_employee_participation_dto_1.UpdateEmployeeParticipationDto]),
    __metadata("design:returntype", void 0)
], EmployeeParticipationsController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], EmployeeParticipationsController.prototype, "remove", null);
exports.EmployeeParticipationsController = EmployeeParticipationsController = __decorate([
    (0, common_1.Controller)('employee-participations'),
    __metadata("design:paramtypes", [employee_participations_service_1.EmployeeParticipationsService])
], EmployeeParticipationsController);
//# sourceMappingURL=employee-participations.controller.js.map