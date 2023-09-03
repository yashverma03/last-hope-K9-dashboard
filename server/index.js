import express from 'express';
import cors from 'cors';

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const port = 4000;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
