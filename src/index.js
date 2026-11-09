const express = require('express');
const app = express();
app.get('/', (req, res) => res.json({ status: 'ok', service: 'sit-cama' }));
app.listen(3000, () => console.log('Escuchando en 3000));
