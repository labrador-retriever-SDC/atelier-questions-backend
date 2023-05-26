import { Sequelize, QueryTypes } from "sequelize";
import sequelize from "./database.js";
import products from "../models/products.js"
import questions from "../models/questions.js"
import answers from "../models/answers.js"
import photos from "../models/photos.js"

const getPhotos = async (answer_id : number) => sequelize.query(`SELECT * FROM questions.photos WHERE answer_id = ${answer_id}`,
 {type: QueryTypes.SELECT})
 .then((response) => {
  console.log(response)
  return response;
  })
  .catch((err) => console.log(err));

export default getPhotos;