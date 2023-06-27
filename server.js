const { Pool } = require("pg");

const pool = new Pool({
  host: "localhost",
  port: 5432,
  database: "assignment10",
  user: "abedorana",
  password: "",
});

//get 
const getStudents = (request, response) => {
    pool.query("SELECT * FROM students ORDER BY id ASC", (error, results) => {
      if (error) {
        throw error;
      }
      response.status(200).json(results.rows);
    })
};

//post 
const createStudent = (request, response) => {
    const { name, college_id, major_id, class_id } = request.body
  
    pool.query('INSERT INTO students (name, college_id, major_id, class_id) VALUES ($1, $2, $3, $4) RETURNING *', 
    [name, college_id, major_id, class_id], (error, results) => {
      if (error) {
        throw error;
      }
      response.status(201).send(`Student added with ID: ${results.rows[0].id} Name: ${results.rows[0].name}
      College: ${results.rows[0].college_id} Major: ${results.rows[0].major_id} Class: ${results.rows[0].class_id}`);
    })
};

//export our functions to index.js
module.exports = {
    getStudents,
    createStudent
};