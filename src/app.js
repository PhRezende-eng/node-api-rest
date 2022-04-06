const express = require('express');
const app = express();

app.listen(3000, () => console.log('Server is running in PORT 3000 🚀'));

app.get('/', (req, res) => res.json({ name: 'Paulo henrique' }));

app.get('/api', (req, res) => res.send('API online'));

