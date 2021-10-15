import { Router } from 'express';
import { __dirname, join } from './service.mjs';

const router = Router();

router.get('/', (_, res) => {
    const index = join(__dirname, '/exercicio_06/public/index.html');
    return res.status(200).sendFile(index);
});

router.get('/contato', (_, res) => {
    const index = join(__dirname, '/exercicio_06/public/contato/index.html');
    return res.status(200).sendFile(index);
});

router.get('/error', (_, res) => {
    const index = join(__dirname, '/exercicio_06/public/error/index.html');
    return res.status(404).sendFile(index);
});

export { router };