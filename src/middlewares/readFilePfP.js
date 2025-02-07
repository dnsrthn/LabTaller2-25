
export const readFilePfP = async (req, res, next) => {
    try {
      if (req.file) {
        const validMimeTypes = ["image/jpeg", "image/png", "image/jpg"];
        if (!validMimeTypes.includes(req.file.mimetype)) {
          return res.status(400).json({
            success: false,
            message: "El archivo debe ser una imagen valida (JPEG, PNG, JPG)",
          });
        }
      }
      next();
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "Error al validar la foto de perfil",
        error: error.message,
      });
    }
  };