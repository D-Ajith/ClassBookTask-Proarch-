"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const sessionController_1 = require("../controllers/sessionController");
const auth_1 = require("../middleware/auth");
const validation_1 = require("../middleware/validation");
const validation_2 = require("../middleware/validation");
const router = express_1.default.Router();
router.post('/', auth_1.authenticateToken, auth_1.requireAdmin, (0, validation_1.validateRequest)(validation_2.createSessionSchema), sessionController_1.createSession);
router.get('/', auth_1.authenticateToken, sessionController_1.getSessions);
exports.default = router;
