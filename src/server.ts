import express from 'express';
import * as dotenv from 'dotenv';
import homeRouter from './routes/home.route';
import storyRouter from './routes/story.route';
import { dbCreateConnection } from './database/db.connection';
import swaggerUi from 'swagger-ui-express';

dotenv.config();
const app = express();
const bodyParser = require('body-parser');
const PORT = process.env.SERVER_PORT || 4000;
const swaggerDocument = require('../swagger.json');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/', homeRouter);
app.use('/stories/', storyRouter);

app.use('/api-docs', swaggerUi.serve);
app.get('/api-docs', swaggerUi.setup(swaggerDocument));
app.listen(PORT, () => console.log(`Starting server at👉 http://localhost:${PORT}`));

//db connection
(async () => {
    await dbCreateConnection();
})();

export default app;
