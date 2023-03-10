import express from "express";
import { getTemplate, sendEmail } from "../email/email.config.js";
const router = express.Router();


router.post('/sendemail/:email/:subject/', async (req, res) => {
    const { email, subject } = req.params;
    const { array } = req.body;
    await sendEmail(email, subject, getTemplate(array));
    res.json({ message: "Te hemos enviados un email.", message2: 'Te estara llegando un email con la cotizacion en el transcurso del dia' });
})




export default router;