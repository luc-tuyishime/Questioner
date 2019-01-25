import db from '../config/database';

exports.postComment = (req, res) => {
  const questionId = parseInt(req.params.id, 10);
  db.query('SELECT * FROM question WHERE id_question = $1', [questionId], (err, result) => {
    if (err) {
      console.log(err);
    }
    if (result.rows.length === 0) {
      return res.status(404).json({
        status: 404,
        error: `question not found`
      });
    } else {
            db.query('INSERT INTO comments (id_user, id_question, body) VALUES ($1,$2,$3) RETURNING *',
                [req.body.user, questionId, req.body.comment], (error, results) => {
                    if (error) {
                        return res.status(400).json({
                            status: 400,
                            error: `error occurred can not commnent`
                        });
                    }
                    return res.status(200).json({
                        status: 200,
                        data: results.rows
                    });
                });
          }
  });
}


exports.getComment = (req, res) => {
  const questionId = parseInt(req.params.id, 10);
  db.query('SELECT * FROM comments WHERE id_question = $1', [questionId], (err, results) => {
    if (err) {
      console.log(err);
    }
    if (results.rows.length === 0) {
      return res.status(404).json({
        status: 404,
        error: 'Actually no comment to that question'
      });
    }
    return res.status(200).json({
      status: 200,
      data: results.rows
    });
  });
};
