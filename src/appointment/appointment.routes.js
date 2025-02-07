import { Router } from "express";
import {saveAppointment, updatedAppointments, readAppointments} from "./appointment.controller.js";
import { createAppointmentValidator, updatedAppointmentsValidator, readAppointmentsValidator} from "../middlewares/appointment-validators.js";
 
const router = Router();
 
router.post("/createAppointment", createAppointmentValidator, saveAppointment);
router.get("/:uid", readAppointments);
router.patch("/updateAppointments/:uid", updatedAppointmentsValidator, updatedAppointments)
export default router;
 