import app from './app';

import connectToDataBase from './database/connection/connection';

const port = 3000;

app.listen(port, async () => {
    await connectToDataBase();
    console.log('Server is running in PORT 3000 🚀')
});


