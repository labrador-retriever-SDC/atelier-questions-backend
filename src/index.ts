import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import sequelize from './server/db/database.js';
import getPhotos from './server/db/dbRoutes.js';

const dbPort = process.env.PORT || '';
const app: Application = express();

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({extended: true}));

//test database connection
sequelize.authenticate()
// Routes
app.get('/qa/answers/:answer_id/photos', (req, res) => {
  const answerId = Number.parseInt(req.params.answer_id);

  getPhotos(answerId)
    .then((data) => res.send(data));
});



// app.get('/', async(req: Request, res: Response): Promise<Response> => res.status(200).send({ message: 'SDC Project'}));


try {
  app.listen(dbPort, () => {console.log('Server listening on port', dbPort)})
} catch (error) {
  console.log('Error ocurred')
}