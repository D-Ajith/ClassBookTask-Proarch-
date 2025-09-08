"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const classController_1 = require("../controllers/classController");
const auth_1 = require("../middleware/auth");
const validation_1 = require("../middleware/validation");
const validation_2 = require("../middleware/validation");
const router = express_1.default.Router();
router.post('/', auth_1.authenticateToken, auth_1.requireAdmin, (0, validation_1.validateRequest)(validation_2.createClassSchema), classController_1.createClass);
router.get('/', auth_1.authenticateToken, classController_1.getClasses);
exports.default = router;
