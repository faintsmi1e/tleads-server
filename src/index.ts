import express from 'express';
import router from './router/router'
import cors from 'cors';
import dotenv from 'dotenv'
import {LocalStorage} from 'node-localstorage' 
dotenv.config()
const port = process.env.PORT || 5000;
const app = express();
const localStorage = new LocalStorage('./scratch'); 

app.use(cors());
app.use(express.json());
app.use('/api', router);

async function startApp() {
  try {
    app.listen(port, () => {
      console.log(`server started at http://localhost:${port}`);
    });
  } catch (e) {
    console.log(e);
  }
}

startApp();
