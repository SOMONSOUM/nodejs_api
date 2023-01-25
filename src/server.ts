import express from 'express';
import { config } from 'dotenv';
import cors from 'cors';
import * as bodyParser from 'body-parser';
import router from './routers/router';
config();

const app = express();
const PORT = process.env.PORT || 3000;

// midlewares setup
app.use(bodyParser.json());
app.use(cors({ origin: '*' }));

// routes setup
app.use('/api/v1', router);

app.get('/', (req, res) => {
  res.send(`<h1 style='text-align: center; color:blue;'> Welcome to API!</h1>`);
});

app
  .listen(PORT, () =>
    console.log(`🚀Server started on http://localhost:${PORT}`)
  )
  .on('error', (err: any) => console.log(err));
