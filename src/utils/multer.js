import multer from "multer"

//! multer con memoryStorate, manipula desde la Ram, es mas rapido pero con menos capacidad
const storage = multer.memoryStorage();

export const uploader = multer({storage})