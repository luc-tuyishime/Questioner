import db from '../config/database';

import { validateQuestion } from '../helpers/validation';

import dateTime from 'date-time';


/* FETCH ALL MEETUP */
exports.fetchAll = (req, res) => {
    db.query('SELECT * FROM meetup', (err, result) => {
        if (err) {
            throw err;
        }
        res.status(200).json({
            status: 200,
            data: result.rows
        });
    });
};


/* FETCH A SINGLE MEETUP */
exports.fetchSingle = (req, res) => {
    const meetupId = parseInt(req.params.meetupId, 10);
    db.query('SELECT * FROM meetup WHERE id_meetup = $1', [meetupId], (err, result) => {
        if (err) {
            console.log(err);
        }
        if (result.rows.length === 0) {
            return res.status(404).json({
                status: 404,
                error: `Sorry the meetup with the id ${meetupId} is not found`
            });
        }else{
          return res.status(200).json({
              status: 200,
              data: result.rows
          });
        }
    });
};


/* CREATE A MEETUP */
exports.create = (req, res) => {

    const meetupCreate = {
        createdOn: dateTime(),
        location: req.body.location,
        topic: req.body.topic,
        happeningOn: req.body.happeningOn,
        tags: req.body.tags
    };
    db.query("INSERT INTO meetup (createdon, location, topic, happeningon, tags) VALUES ($1,$2,$3,$4,$5) returning *", [
        meetupCreate.createdOn, meetupCreate.location, meetupCreate.topic, meetupCreate.happeningOn, meetupCreate.tags
    ], (err, result) => {
        if (err) {
            return res.status(500).json(err);
        }
        return res.status(200).json({
            status: 200,
            data: result.rows
        });
    });
};



/* GET UPCOMING MEETUP */
exports.Upcoming = (req, res) => {
    const currentTime = dateTime();
    db.query('SELECT * FROM meetup WHERE happeningon > $1', [currentTime], (err, result) => {
        if (err) {
            throw err;
        }
        res.status(200).json({
            status: 200,
            data: result.rows
        });
    });
};

/* CREATE MEETUP RSVP */
exports.createRsvp = (req, res) => {
    const {
        response
    } = req.body;
    const meetupId = parseInt(req.params.meetupId, 10);

    db.query('SELECT * FROM meetup WHERE id_meetup = $1', [meetupId], (err, result) => {
        if (err) {
            console.log(err);
        } else if (result.rows.length === 0) {
            return res.status(404).json({
                status: 404,
                error: `Sorry the meetup with the id ${meetupId} is not found`
            });
        } else {

            db.query('INSERT INTO rsvp (response, id_user, id_meetup) VALUES ($1,$2,$3) RETURNING *',
                [response, 1, meetupId], (err, results) => {
                    if (err) {
                        return res.status(400).json({
                            status: 400,
                            error: err.details[0].message
                        });
                    }

                    res.status(201).json({
                        status: 201,
                        data: results.rows
                    });
                });
        }
    });
};


/* UPDATE A MEETUP */
exports.update = (req, res) => {
    const meetupId = parseInt(req.params.id, 10);

    const {
        location,
        topic,
        happeningOn,
        tags
    } = req.body;

    db.query(
        'UPDATE meetup SET location = $1, topic = $2, happeningon = $3, tags= $4 WHERE id_meetup = $5 returning *',
        [location, topic, happeningOn, tags, meetupId],
        (err, result) => {
            if (result.rows.length === 0) {
                return res.status(404).json({
                    status: 404,
                    error: `Sorry the meetup with the id ${meetupId} is not found`
                });
            }
            return res.status(200).json({
                status: 200,
                data: result.rows
            });
        }
    );
};


/* DELETE A MEETUP */
exports.delete = (req, res) => {
   const meetupId = parseInt(req.params.id, 10);
      db.query('DELETE FROM meetup WHERE id_meetup = $1 returning *', [meetupId], (err, result) => {
        if (result.rows.length === 0) {
            return res.status(404).json({
                status: 404,
                error: 'meetup not found'
            });
        }
          return res.status(200).json({
            status: 200,
            data: `User deleted with ID: ${meetupId}`
          });
      });
  };


/* POST A question */
exports.createQuestion = (req, res) => {
  const { title, body } = req.body;
  const meetupId = parseInt(req.params.id, 10);

  const { error } = validateQuestion(req.body);
  if (error) {
    return res.status(400).send({
      status: 400,
      error: error.details[0].message
    });
  }

  db.query('SELECT * FROM meetup WHERE id_meetup = $1', [meetupId], (err, result) => {
    if (err) {
      throw err;
    } else if (result.rows.length === 0) {
      return res.status(404).json({
        status: 404,
        error: `Sorry the meetup with the id ${meetupId} is not found`
      });
    } else {
      db.query('INSERT INTO question (id_user, id_meetup, title, body) VALUES ($1,$2,$3,$4) RETURNING *',
        [req.id_user, 1, title, body], (err, results) => {
          if (error) {
            console.log(error);
            return res.status(400).json({
              status: 400,
              error: error.details[0].message
            });
          }

          res.status(201).json({
            status: 201,
            data: results.rows
          });
        });
    }
  });
}
