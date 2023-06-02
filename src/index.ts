import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import sequelize from './server/db/database.js';
import { getQuestions, getAnswers, addQuestion, addAnswer, markQuestionHelpful, reportQuestion, markAnswerHelpful, reportAnswer} from './server/db/dbRoutes.js';

const dbPort = process.env.PORT || '';
const app: Application = express();

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({extended: true}));

//test database connection
// sequelize.authenticate()

// Routes
app.get('/qa/questions/:product_id', (req, res) => {
  const productID = Number.parseInt(req.params.product_id);
  getQuestions(productID)
    .then((data) => res.send(data));
});

app.get('/qa/questions/:question_id/answers', (req, res) => {
  const questionID = Number.parseInt(req.params.question_id);
  getAnswers(questionID)
    .then((data) => res.send(data));
});

app.post('/qa/questions', (req, res) => {
  const product_id = Number.parseInt(req.body.product_id);
  const body = req.body.body;
  const name = req.body.name;
  const email = req.body.email;
  addQuestion(product_id, body, name, email)
  res.send('question added!');
});

app.post('/qa/questions/:question_id/answers', (req, res) => {
  const question_id = Number.parseInt(req.params.question_id);
  const body = req.body.body;
  const name = req.body.name;
  const email = req.body.email;
  const photos = req.body.photos;
  addAnswer(question_id, body, name, email, photos)
  res.send('answer added!');
});

app.put('/qa/questions/:question_id/helpful', (req, res) => {
  const question_id = Number(req.params.question_id);

  markQuestionHelpful(question_id)
  res.send('marked question helpful');
})

app.put('/qa/questions/:question_id/report', (req, res) => {
  const question_id = Number(req.params.question_id);

  reportQuestion(question_id)
  res.send('reported question');
})

app.put('/qa/answers/:answer_id/helpful', (req, res) => {
  const answer_id = Number(req.params.answer_id);

  markAnswerHelpful(answer_id)
  res.send('marked answer helpful');
})

app.put('/qa/answers/:answer_id/report', (req, res) => {
  const answer_id = Number(req.params.answer_id);

  reportAnswer(answer_id)
  res.send('reported answer');
})

app.get('/loaderio-42d15cdd571f3831b2860afb60a6ab1e', (req, res) => res.send('loaderio-42d15cdd571f3831b2860afb60a6ab1e'))

try {
  app.listen(dbPort, () => {console.log('Server listening on port', dbPort)})
} catch (error) {
  console.log('Error ocurred')
}

export default app;