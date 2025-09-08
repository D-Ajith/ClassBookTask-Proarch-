"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const adminController_1 = require("../controllers/adminController");
const auth_1 = require("../middleware/auth");
const router = express_1.default.Router();
router.get('/audit-logs', auth_1.authenticateToken, auth_1.requireAdmin, adminController_1.getAuditLogs);
router.get('/bookings', auth_1.authenticateToken, auth_1.requireAdmin, adminController_1.getAllBookings);
exports.default = router;
