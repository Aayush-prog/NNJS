const express = require("express");
const auth = require("../../middleware/auth");
const createEyeHospital = require("./controllers/createEyeHospital");
const getEyeHospitals = require("./controllers/getEyeHospitals");
const getEyeHospitalById = require("./controllers/getEyeHospitalById");
const delEyeHospital = require("./controllers/delEyeHospital");
const editEyeHospital = require("./controllers/editEyeHospital");
const upload = require("../../middleware/upload");
const eyeHospitalRouter = express.Router();
eyeHospitalRouter.get("/", getEyeHospitals);
eyeHospitalRouter.get("/:eyeHospitalId", getEyeHospitalById);
eyeHospitalRouter.use(auth);
eyeHospitalRouter.post("/create", upload, createEyeHospital);
eyeHospitalRouter.delete("/del/:eyeHospitalId", delEyeHospital);
eyeHospitalRouter.patch("/edit/:eyeHospitalId", upload, editEyeHospital);
module.exports = eyeHospitalRouter;
