const express = require('express');
const app = express();
app.get('/', (req, res) => res.json({ name: 'Paulo henrique' }));
app.listen(3000, () => console.log('Server is running in PORT 3000 🚀'));