import express from 'express';
import router from './router/router'
import cors from 'cors';
const port = process.env.PORT || 5000;
const app = express();

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
