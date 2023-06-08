import express from 'express';
import router from './src/routes/routes.js';
import mongoose from 'mongoose';

const app = express();

app.use(express.json());
app.use('/', router);

mongoose
  .connect(
    'mongodb+srv://amit_singh:kya_hal_hai_tere@cluster0.jpqo2bq.mongodb.net/HAYAT_NEW_DB',
    {
      useNewUrlParser: true,
    }
  )
  .then(() => {
    console.log(`mongoDB Connected`);
  })
  .catch((err) => {
    console.log(err);
  });

app.listen(3000, () => {
  console.log('Server listening on port 3000');
});
