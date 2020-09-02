import express from 'express'
import fs from 'fs';
import { appRouter } from './routes/routes'

const PORT = process.env.PORT || 3500
const app = express();
app.use(express.json());
appRouter(app, fs);

app.listen(PORT, () => console.log(`Listening at http://localhost:${PORT}`));
