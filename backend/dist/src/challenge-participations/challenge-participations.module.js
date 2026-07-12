"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChallengeParticipationsModule = void 0;
const common_1 = require("@nestjs/common");
const challenge_participations_service_1 = require("./challenge-participations.service");
const challenge_participations_controller_1 = require("./challenge-participations.controller");
let ChallengeParticipationsModule = class ChallengeParticipationsModule {
};
exports.ChallengeParticipationsModule = ChallengeParticipationsModule;
exports.ChallengeParticipationsModule = ChallengeParticipationsModule = __decorate([
    (0, common_1.Module)({
        controllers: [challenge_participations_controller_1.ChallengeParticipationsController],
        providers: [challenge_participations_service_1.ChallengeParticipationsService],
    })
], ChallengeParticipationsModule);
//# sourceMappingURL=challenge-participations.module.js.map