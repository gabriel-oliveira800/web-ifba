import express, { json, urlencoded } from 'express';
import morgan from 'morgan';

import { router } from './routes.mjs';

const app = express();

app.use(json());
app.use(morgan('tiny'));
app.use(urlencoded({ extended: true }));
app.use(express.static('./public'));

app.use(router);

app.listen(3000, () => console.log('Server running'));