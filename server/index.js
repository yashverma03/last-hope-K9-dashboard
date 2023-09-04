import jsonServer from 'json-server';
import dotenv from 'dotenv';

dotenv.config();

const server = jsonServer.create();

server.use(jsonServer.defaults());

const router = jsonServer.router('db.json');
server.use(router);

const port = 4000;

server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
