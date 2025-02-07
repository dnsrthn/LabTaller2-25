import { Router } from "express";
import { saveAppointment, updateAppointment, readAppointments } from "./appointment.controller.js";
import { createAppointmentValidator, updateAppointmentValidator, readAppointmentsValidator } from "../middlewares/appointment-validators.js";

const router = Router();

router.post("/createAppointment", createAppointmentValidator, saveAppointment);
router.get("/appointments/:uid", readAppointmentsValidator, readAppointments);
router.patch("/updateAppointment/:appointmentId", updateAppointmentValidator, updateAppointment);

export default router;