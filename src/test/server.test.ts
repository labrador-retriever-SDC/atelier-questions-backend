import request from 'supertest';
import app from '../index';

describe('Should test qa/questions path', () => {
  it('should return a status code of 200 with get question request', async () => {
    const response = await request(app).get('/qa/questions/1/');
    expect(response.statusCode).toBe(200);
  });

  it('should return at least one question on get question', async () => {
    const response = await request(app).get('/qa/questions/1/');
    const resultArr = JSON.parse(response.text).results;
    expect(resultArr.length).toBeGreaterThanOrEqual(1);
  });
});

describe('Should test route qa/question/:question_id/answers path', () => {
  it('hould have a status code of 200 with a get answers request', async () => {
    const response = await request(app).get('/qa/questions/1/answers/');
    expect(response.statusCode).toBe(200);
  });
});

describe('Should add a question', () => {
  it('should have a status code of 200', async () => {
    const response = await request(app)
      .post('/qa/questions')
      .set('Content-Type', 'application/json')
      .send('{ "product_id": 1, "question_body": "Adding a test question", "asker_name": "testUser", "asker_email": "test@test.com" }');
    expect(response.statusCode).toBe(200);
  });
});

describe('Should add an answer', () => {
  it('should have a status code of 200', async () => {
    const response = await request(app)
      .post('/qa/questions/1/answers')
      .set('Content-Type', 'application/json')
      .send('{ "question_id": 1, "answer_body": "test body", "answerer_name": "test name", "answerer_email": "test@test.com", "photoArr": ["https://images.unsplash.com/photo-1530519729491-aea5b51d1ee1?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1651&q=80"] }');
    expect(response.statusCode).toBe(200);
  });
});

describe('Should test mark question helpful', () => {
  it('should have a status code of 200 after marked helpful', async () => {
    const response = await request(app).put('/qa/questions/645638/helpful');
    expect(response.statusCode).toBe(200);
  });
});

describe('Should test mark answer helpful', () => {
  it('should have a status code of 200 after marked helpful', async () => {
    const response = await request(app).put('/qa/answers/5991354/helpful');
    expect(response.statusCode).toBe(200);
  });
});

describe('Should test mark question reported', () => {
  it('should have a status code of 200 after reported', async () => {
    const response = await request(app).put('/qa/questions/645638/report');
    expect(response.statusCode).toBe(200);
  });
});

describe('Should test mark answer reported', () => {
  it('should have a status code of 200 after reported', async () => {
    const response = await request(app).put('/qa/answers/5991354/report');
    expect(response.statusCode).toBe(200);
  });
});
