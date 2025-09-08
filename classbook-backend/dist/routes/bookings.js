"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const bookingController_1 = require("../controllers/bookingController");
const auth_1 = require("../middleware/auth");
const validation_1 = require("../middleware/validation");
const validation_2 = require("../middleware/validation");
const router = express_1.default.Router();
router.post('/', auth_1.authenticateToken, (0, validation_1.validateRequest)(validation_2.bookSessionSchema), bookingController_1.bookSession);
router.delete('/:bookingId', auth_1.authenticateToken, bookingController_1.cancelBooking);
router.get('/my-bookings', auth_1.authenticateToken, bookingController_1.getUserBookings);
exports.default = router;
