"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authController_1 = require("../controllers/authController");
const validation_1 = require("../middleware/validation");
const validation_2 = require("../middleware/validation");
const router = express_1.default.Router();
router.post('/register', (0, validation_1.validateRequest)(validation_2.registerSchema), authController_1.register);
router.post('/login', (0, validation_1.validateRequest)(validation_2.loginSchema), authController_1.login);
router.post('/refresh-token', authController_1.refreshToken);
exports.default = router;
