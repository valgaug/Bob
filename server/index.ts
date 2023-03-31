import express, { Application } from 'express';
import cors from 'cors';
import router from './router';
import sequelize from './models/index';

const PORT = 4000;

const app: Application = express();

app.use(cors({ origin: 'http://localhost:3000' }));
app.use(express.json());
app.use(router);

(async () => {
  try {
    sequelize
      .sync()
      .then(() => {
        console.log('connected to the db');
      })
      .catch((err) => {
        console.log('Err', err);
      });
    app
      .listen(PORT, () => {
        console.log(`🚀 Server is listening on port ${PORT}!`);
      })
      .on('error', (err: Error): void => {
        console.log(`😞 Sorry, something went wrong! ${err as Error}`);
      });
  } catch (err) {
    console.error('Unable to connect to the database:', err as Error);
  }
})();
