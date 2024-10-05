const dbconnection = require('../db/dbconfig'); // Ensure dbconnection is using mysql2/promise

// Get all questions
async function getAllQuestions(req, res) {
    try {
const [results] = await dbconnection.query('SELECT u.photo, u.firstname, u.lastname, q.title FROM questions q, users u where q.userid=u.userid'); // Use await and destructure the result
        res.json(results); // Send the result as a JSON response
    } catch (err) {
        res.status(500).json({ error: err.message }); // Handle errors properly
    }
}

// Get question details
async function getQuestionDetail(req, res) {
    const questionid = req.params.questionid;
    try {
        const [results] = await dbconnection.query('SELECT * FROM questions WHERE questionid = ?', [questionid]); // Await the query
        res.json(results); // Send the result as a JSON response
    } catch (err) {
        res.status(500).json({ error: err.message }); // Handle errors properly
    }
}

module.exports = { getAllQuestions, getQuestionDetail };
