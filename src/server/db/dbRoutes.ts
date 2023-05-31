import { QueryTypes } from "sequelize";
import sequelize from "./database.js";

// export const getQuestions = async (product_id : number) => sequelize.query(
//   `SELECT questions.questions.*, json_build_object('id', questions.answers.id, 'body', questions.answers.body, 'date', questions.answers.date, 'answer_name', questions.answers.answerer_name, 'helpfulness', questions.answers.helpfulness, 'reported', questions.answers.reported, 'photos', questions.photos.url) as answers FROM questions.questions
//     FULL OUTER JOIN questions.answers ON questions.questions.question_id = questions.answers.question_id
//     FULL OUTER JOIN questions.photos ON questions.photos.answer_id = questions.answers.id
//     WHERE questions.questions.product_id = ${product_id}
//     `,
//   {type: QueryTypes.SELECT})
//   .then((questions) => {
//     console.log(questions);
//     const result = {} as any;
//     result.product_id = product_id;
//     const mainObj = {} as any;
//     questions.forEach((question : any) => {
//       if (mainObj[question.question_id] !== undefined) {
//         if (mainObj[question.question_id].answers[question.answers.id] !== undefined) {
//           const url = question.answers.photos;
//           mainObj[question.question_id].answers[question.answers.id].photos.push(url);
//         } else {
//           mainObj[question.question_id].answers[question.answers.id] = question.answers;
//           mainObj[question.question_id].answers[question.answers.id].date = new Date(JSON.parse(question.answers.date)).toString();

//           let photos = [] as any;
//           if (question.answers.photos) {
//             photos.push(question.answers.photos);
//             mainObj[question.question_id].answers[question.answers.id].photos = photos;
//           } else {
//             mainObj[question.question_id].answers[question.answers.id].photos = [];
//           }
//         }
//       } else {
//         const questionObj = {} as any;
//         questionObj.question_id = question.question_id;
//         questionObj.question_body = question.question_body;
//         questionObj.question_date = new Date(JSON.parse(question.question_date)).toString();
//         questionObj.asker_name = question.asker_name;
//         questionObj.question_helpfulness = question.question_helpfulness;
//         questionObj.reported = question.reported;
//         questionObj.answers = {};
//         questionObj.answers[question.answers.id] = question.answers;
//         questionObj.answers[question.answers.id].date = new Date(JSON.parse(question.answers.date)).toString();

//         let photos = [] as any;
//         if (question.answers.photos) {
//           photos.push(question.answers.photos);
//           questionObj.answers[question.answers.id].photos = photos;
//         } else {
//           questionObj.answers[question.answers.id].photos = [];
//         }
//         mainObj[question.question_id] = questionObj;
//       }
//     });
//     const results = Object.values(mainObj);
//     result.results = results;
//     return result;
//   })
//   .catch((err) => console.log(err));

export const getQuestions = async (product_id : number) => sequelize.query(
  `SELECT * FROM questions.questions
    FULL OUTER JOIN questions.answers ON questions.questions.question_id = questions.answers.question_id
    FULL OUTER JOIN questions.photos ON questions.photos.answer_id = questions.answers.id
    WHERE questions.questions.product_id = ${product_id} and questions.questions.reported = 0
    `,
  {type: QueryTypes.SELECT})
  .then((questions) => {
    console.log(questions);
    const result = {} as any;
    result.product_id = product_id;
    const mainObj = {} as any;
    questions.forEach((question : any) => {
      if (mainObj[question.question_id] !== undefined) {
        if (mainObj[question.question_id].answers[question.id] !== undefined) {
          const url = question.url;
          mainObj[question.question_id].answers[question.id].photos.push(url);
        } else {
          mainObj[question.question_id].answers[question.id] = {};
          mainObj[question.question_id].answers[question.id].id = question.id;
          mainObj[question.question_id].answers[question.id].body = question.body;
          mainObj[question.question_id].answers[question.id].date = new Date(JSON.parse(question.date)).toString();
          mainObj[question.question_id].answers[question.id].answerer_name = question.answerer_name;
          mainObj[question.question_id].answers[question.id].helpfulness = question.helpfulness;
          mainObj[question.question_id].answers[question.id].photos = [];

          let photos = [] as any;
          if (question.url) {
            photos.push(question.url);
            mainObj.answers[question.id].photos = photos;
          }
        }
      } else {
        const questionObj = {} as any;
        questionObj.question_id = question.question_id;
        questionObj.question_body = question.question_body;
        questionObj.question_date = new Date(JSON.parse(question.question_date)).toString();
        questionObj.asker_name = question.asker_name;
        questionObj.question_helpfulness = question.question_helpfulness;
        questionObj.reported = false;
        questionObj.answers = {};
        questionObj.answers[question.id] = {};
        questionObj.answers[question.id].id = question.id;
        questionObj.answers[question.id].body = question.body;
        questionObj.answers[question.id].date = new Date(JSON.parse(question.date)).toString();
        questionObj.answers[question.id].answerer_name = question.answerer_name;
        questionObj.answers[question.id].helpfulness = question.helpfulness;
        questionObj.answers[question.id].photos = [];

        let photos = [] as any;
        if (question.url) {
          photos.push(question.url);
          questionObj.answers[question.id].photos = photos;
        }
        mainObj[question.question_id] = questionObj;
      }
    });
    const results = Object.values(mainObj);
    result.results = results;
    return result;
  })
  .catch((err) => console.log(err));

export const getAnswers = async (question_id : number) => sequelize.query(
`SELECT * FROM questions.answers
  FULL OUTER JOIN questions.photos ON questions.photos.answer_id = questions.answers.id
  WHERE question_id = ${question_id}`,
  {type: QueryTypes.SELECT})
  .then((answers) => {
    console.log(answers)
    const result = {} as any;
    answers.forEach((answer : any) => {
      if (result[answer.id] !== undefined) {
        result[answer.id].photos.push(answer.url);
      } else {
        let answerContainer = {} as any;
        answerContainer.answer_id = answer.id;
        answerContainer.body = answer.body;
        answerContainer.date = new Date(JSON.parse(answer.date)).toString();
        answerContainer.answerer_name = answer.answerer_name;
        answerContainer.helpfulness = answer.helpfulness;
        answerContainer.photos = [];

        let photos = [] as any;
        if (answer.url) {
          photos.push(answer.url);
          answerContainer.photos = photos;
        }
        result[answer.id] = answerContainer;
      }
    })
    return result;
  })
  .catch((err) => console.log(err));

export const addQuestion = async (product_id : number, body: any, name: any, email: any) => {
  const question_date = new Date();
  const numberDate = question_date.valueOf()
  const reported = 0;
  const question_helpfulness = 0

  return sequelize.query(
    `INSERT INTO questions.questions (question_id, product_id, question_body, question_date, asker_name, asker_email, reported, question_helpfulness)
    VALUES ((SELECT MAX(question_id)+1 FROM questions.questions), ${product_id}, '${body}', ${numberDate}, '${name}', '${email}', '${reported}', '${question_helpfulness}');`)
    .then(() => console.log('Question added!'))
    .catch((err) => {
      console.log('Error adding question ', err);
    })
}

export const addAnswer = async (question_id : number, body: any, name: any, email: any, photos: any) => {
  const answer_date = new Date();
  const numberDate = answer_date.valueOf()
  const reported = 0;
  const helpfulness = 0

  return sequelize.query(
    `INSERT INTO questions.answers (id, question_id, body, date, answerer_name, answerer_email, reported, helpfulness)
    VALUES ((SELECT MAX(id)+1 FROM questions.answers), ${question_id}, '${body}', ${numberDate}, '${name}', '${email}', '${reported}', '${helpfulness}');`)
    .then(() => sequelize.query(`SELECT MAX(id) FROM questions.answers`))
    .then((answerID: any) => {
      const answer_id = Number(answerID[0][0].max)
      if (photos) {
        photos.forEach((photo: any) => {
          sequelize.query(`INSERT INTO questions.photos (photo_id, answer_id, url)
           VALUES ((SELECT MAX(photo_id)+1 FROM questions.photos), ${answer_id}, '${photo}')`)
        })
      }
    })
    .then(() => console.log('Answer added!'))
    .catch((err) => {
      console.log('Error adding answer ', err);
    })
}

export const markQuestionHelpful = (question_id: number) => {
  sequelize.query(`UPDATE questions.questions SET question_helpfulness = question_helpfulness+1 WHERE question_id = ${question_id}`)
  .then(() => console.log('Question helpfulness updated!'))
  .catch((err) => console.log('Error updating question helpfulness', err))
}

export const reportQuestion = (question_id: number) => {
  sequelize.query(`UPDATE questions.questions SET reported = reported+1 WHERE question_id = ${question_id}`)
  .then(() => console.log('Reported question!'))
  .catch((err) => console.log('Error updating question helpfulness', err))
}

export const markAnswerHelpful = (answer_id: number) => {
  sequelize.query(`UPDATE questions.answers SET helpfulness = helpfulness+1 WHERE id = ${answer_id}`)
  .then(() => console.log('Answer helpfulness updated!'))
  .catch((err) => console.log('Error updating question helpfulness', err))
}

export const reportAnswer = (answer_id: number) => {
  sequelize.query(`UPDATE questions.answers SET reported = reported+1 WHERE id = ${answer_id}`)
  .then(() => console.log('Reported answer!'))
  .catch((err) => console.log('Error updating question helpfulness', err))
}