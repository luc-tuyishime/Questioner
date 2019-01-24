import db from '../config/database';
import jwt from 'jsonwebtoken';
import {
    validateUser
} from '../helpers/validation';


exports.create = (req, res) => {

    const {
        error
    } = validateUser(req.body);
    if (error) {
        return res.status(400).send({
            status: 400,
            error: error.details[0].message
        });
    }

    const newUser = {
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        isAdmin: true,
        othername: req.body.othername
    };
    db.query("INSERT INTO users (username,email,password,firstname,lastname,isadmin,othername) VALUES ($1,$2,$3,$4,$5,$6,$7) returning *", [
        newUser.username, newUser.email, newUser.password, newUser.firstname, newUser.lastname, newUser.isAdmin, newUser.othername
    ], (err, result) => {
        if (err) {
            console.log(err);
        }
        return res.status(200).json({
            status: 200,
            data: result
        });
    });
}

exports.login = (req, res) => {
    const loginUser = {
        id: 1,
        username: 'jeanluca',
        email: 'luc@gmail.com'
    }

    jwt.sign({
        loginUser
    }, 'secretkey', (err, token) => {
        res.json({
            token
        })
    });
}


exports.fetchAll = (req, res) => {
    db.query('SELECT * FROM users ORDER BY user_id DESC', (err, result) => {
        if (err) {
            return res.status(500).json(err);
        }
        return res.status(200).json({
            status: 200,
            data: result.rows
        });
    });
};


exports.fetch = (req, res) => {
    const userId = parseInt(req.params.id, 10);

    if (!userId) {
        return res.status(404).send({
            status: 404,
            error: `The user with the id ${userId} was not found`
        });
    }

    db.query("SELECT * FROM users WHERE user_id = $1", [userId], (err, result) => {
        if (err) {
            return res.status(500).json(err);
        }
        return res.status(200).json({
            status: 200,
            data: result.rows
        });
    });
};

exports.update = (req, res) => {
    const userId = parseInt(req.params.id, 10);

    const updateUser = {
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        othername: req.body.othername,
        username: req.body.username,
        email: req.body.email,
        password: req.body.password
    };

    console.log(updateUser);

    db.query(
        'UPDATE users SET firstname = $1, lastname = $2, othername = $3, username = $4, email = $5, password = $6 WHERE user_id = $7 returning *',
        [updateUser.firstname, updateUser.lastname, updateUser.othername, updateUser.username, updateUser.email, updateUser.password, userId],
        (err, result) => {
            if (err) {
                throw err;
            }
            res.status(200).json({
                status: 200,
                data: result.rows
            })
        }
    );
}

exports.delete = (req, res) => {
    const userToDelete = parseInt(req.params.id, 10);

    db.query('DELETE FROM users WHERE user_id = $1', [userToDelete], (err, results) => {
        if (err) {
            throw err;
        }

        res.status(200).json({
            status: 200,
            data: `The user with the  id: ${userToDelete} has been deleted`
        });
    });
}
