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
exports.ChallengeParticipationsController = void 0;
const common_1 = require("@nestjs/common");
const challenge_participations_service_1 = require("./challenge-participations.service");
const create_challenge_participation_dto_1 = require("./dto/create-challenge-participation.dto");
const update_challenge_participation_dto_1 = require("./dto/update-challenge-participation.dto");
let ChallengeParticipationsController = class ChallengeParticipationsController {
    challengeParticipationsService;
    constructor(challengeParticipationsService) {
        this.challengeParticipationsService = challengeParticipationsService;
    }
    create(createChallengeParticipationDto) {
        return this.challengeParticipationsService.create(createChallengeParticipationDto);
    }
    findAll() {
        return this.challengeParticipationsService.findAll();
    }
    findOne(id) {
        return this.challengeParticipationsService.findOne(+id);
    }
    update(id, updateChallengeParticipationDto) {
        return this.challengeParticipationsService.update(+id, updateChallengeParticipationDto);
    }
    remove(id) {
        return this.challengeParticipationsService.remove(+id);
    }
};
exports.ChallengeParticipationsController = ChallengeParticipationsController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_challenge_participation_dto_1.CreateChallengeParticipationDto]),
    __metadata("design:returntype", void 0)
], ChallengeParticipationsController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], ChallengeParticipationsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ChallengeParticipationsController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_challenge_participation_dto_1.UpdateChallengeParticipationDto]),
    __metadata("design:returntype", void 0)
], ChallengeParticipationsController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ChallengeParticipationsController.prototype, "remove", null);
exports.ChallengeParticipationsController = ChallengeParticipationsController = __decorate([
    (0, common_1.Controller)('challenge-participations'),
    __metadata("design:paramtypes", [challenge_participations_service_1.ChallengeParticipationsService])
], ChallengeParticipationsController);
//# sourceMappingURL=challenge-participations.controller.js.map