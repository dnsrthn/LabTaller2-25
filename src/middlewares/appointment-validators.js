import { validarCampos } from "./validate-fields.js";
import { handleErrors } from "./handle-errors.js";
import { check } from 'express'
import { body, param, validationResult } from 'express-validator';


export const createAppointmentValidator = [
    body("date").notEmpty().withMessage("La fecha es requerida"),
    body("pet").notEmpty().withMessage("La mascota es requerida"),
    body("pet").isMongoId().withMessage("No es un ID válido de MongoDB"),
    validarCampos,
    handleErrors
];



export const readAppointmentsValidator = [
    check('appointmentId').isUUID() .withMessage('No es un formato de ID valido'),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
];

export const updateAppointmentValidator = [
    param('appointmentId').isMongoId().withMessage('No es un ID válido de MongoDB'),
    body('date').optional().notEmpty().withMessage('La fecha no puede estar vacía'),
    body('pet').optional().notEmpty().withMessage('La mascota no puede estar vacía'),
    body('pet').optional().isMongoId().withMessage('No es un ID válido de MongoDB'),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
];