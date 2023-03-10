import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import router from './Routes/router.js';
import * as dotenv from 'dotenv';
dotenv.config();
const app = express();
const port = process.env.PORT || 8000;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/', router);
app.get('/', (req, res) => {
  res.json({ message: 'Hola Mundo' })
})
app.use((req, res) => res.status(404).json({ message: "Pagina no encontrada" }));

app.listen(port, () => {
  console.log(`Server Up running in http://localhost:${port}`);
});