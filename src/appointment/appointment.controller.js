import Pet from "../pet/pet.model.js";
import Appointment from "../appointment/appointment.model.js";
import { parse } from "date-fns";

export const saveAppointment = async (req, res) => {
  try {
    const data = req.body;

    const isoDate = new Date(data.date);

    if (isNaN(isoDate.getTime())) {
      return res.status(400).json({
        success: false,
        msg: "Fecha inválida",
      });
    }

    const pet = await Pet.findOne({ _id: data.pet });
    if (!pet) {
      return res.status(404).json({ 
        success: false, 
        msg: "No se encontró la mascota" 
      });
    }

    const existAppointment = await Appointment.findOne({
      pet: data.pet,
      user: data.user,
      date: {
        $gte: new Date(isoDate).setHours(0, 0, 0, 0),
        $lt: new Date(isoDate).setHours(23, 59, 59, 999),
      },
    });

    if (existAppointment) {
      return res.status(400).json({
        success: false,
        msg: "El usuario y la mascota ya tienen una cita para este día",
      });
    }

    const appointment = new Appointment({ ...data, date: isoDate });
    await appointment.save();

    return res.status(200).json({
      success: true,
      msg: `Cita creada exitosamente en fecha ${data.date}`,
    });
    
  } catch (error) {
    console.error(error);
    return res.status(500).json({ 
      success: false, 
      msg: "Error al crear la cita", 
      error 
    }); 
  }
};

export const readAppointments = async (req, res) =>{
  try{
    const {uid} = req.params;
    const query = { user: uid };
    const [total, appointments] = await Promise.all([
      Appointment.countDocuments(query),
      Appointment.find(query)
 
  ])
  return res.status(200).json({
    success: true,
    total,
    appointments
})
  }catch(err){
    return res.status(500).json({
      success: false,
      message: "Error al listar las citas del usuario",
      error: err.messagge
    })
  }
}

export const updateAppointment = async (req, res) => {
  try {
    const { appointmentId } = req.params;
    const updateData = req.body;

    const updatedAppointment = await Appointment.findByIdAndUpdate(
      appointmentId,
      updateData,
      { new: true, runValidators: true }
    );

    if (!updatedAppointment) {
      return res.status(404).json({
        success: false,
        message: "Cita no encontrada"
      });
    }

    return res.status(200).json({
      success: true,
      message: "La cita se ha actiualizadp",
      appointment: updatedAppointment
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "La cita ha tenido un error al actualizars",
      error: err.message
    });
  }
};