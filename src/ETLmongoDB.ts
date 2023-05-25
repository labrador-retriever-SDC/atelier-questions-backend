// Used mongoimport

// import csv from 'csv-parser';
// import fs from 'fs';
// import path from "path";
// import mongoose from 'mongoose';

// mongoose.connect('mongodb://127.0.0.1:27017/question')

// const schema = new mongoose.Schema({
//   id: Number,
//   product_id: Number,
//   body: String,
//   date_written: Number,
//   asker_name: String,
//   asker_email: String,
//   reported: Number,
//   helpful: Number
// });

// const Question = mongoose.model('Question', schema);

// const results : object[] = [];

// fs.createReadStream(path.join(__dirname, './SDC_questions.csv'))
//   .pipe(csv({
//     mapValues: ({ header, value }) => {
//       switch (header) {
//         case 'id':
//         case 'product_id':
//         case 'date_written':
//         case 'reported':
//         case 'helpful':
//           return Number(value);
//         default:
//           return value
//       }
//     }
//   }))
//   .on('data', (data) => {
//     results.push(data);
//   })
//   .on('end', () => {
//     console.log(results);
//   })

// const parseCSV = async (pathName: string) => new Promise((callback, reject) => {
//   const results : object[] = [];

//   fs.createReadStream(path.join(__dirname, pathName))
//   .pipe(csv({
//     mapValues: ({ header, value }) => {
//       switch (header) {
//         case 'id':
//         case 'product_id':
//         case 'date_written':
//         case 'reported':
//         case 'helpful':
//           return Number(value);
//         default:
//           return value
//       }
//     }
//   }))
//   .on('data', (data) => {
//       results.push(data);
//   })
//   .on('end', () => {
//     callback(results);
//   })
//   .on('error', (error) => {
//     reject(error);
//   })
// })

// export default parseCSV;

