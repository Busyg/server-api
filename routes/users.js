var express = require('express');
var app = express();
var database = require('../config/db');
var moment = require('moment');
//Select записи в таблице
app.get('/users', (req, res) => {
    let sql = 'SELECT * FROM users'

    database.query(sql, (err, result) => {
        if(err) {
            res.status(400).send(err);
            return;
        }

        if(result.length){
            res.json(result);
        } else {
            res.json({});
        }
    });
});
//Добавление записи в таблицу
app.post('/users', (req, res) => {
    let sql = `INSERT INTO users (name) VALUES (
        ''
    )`;

    database.query(sql, (err, result) => {
        if(err) {
            res.status(400).json({
                message: err,
            });
            return;
        }

        res.status(200).json({
            status: 200,
            success: true,
        });
    });
});
//Обновление записи в таблице
app.post('/users/:id', (req, res) => {
    let sql = `UPDATE users SET ${req.body.field} = '${req.body.value}' WHERE id = ${req.params.id}`;
    database.query(sql, (err, result) => {
        if(err) {
            res.status(400).json({
                message: err,
            });
            return;
        }

        res.status(200).json({
            status: 200,
            success: true,
        });
    });
});
//Удаление записи в таблице
app.delete('/users/:id', (req, res) => {
    let sql = `DELETE FROM users WHERE id IN(${req.params.id})`;
    database.query(sql, (err, result) => {
        if(err) {
            res.status(400).json({
                status: 400,
                success: false,
            });
            return;
        }

        res.status(200).json({
            status: 200,
            success: true,
        });
    });
});

module.exports = app;