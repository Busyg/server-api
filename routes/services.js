var express = require('express');
var app = express();
var database = require('../config/db');
var moment = require('moment');
//Select всех записей из таблицы
app.get('/services', (req, res) => {
    let sql = 'SELECT * FROM services'

    database.query(sql, (err, result) => {
        if(err) {
            res.status(400).json({
                message: err,
            });
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
app.post('/services', (req, res) => {
    let sql = `INSERT INTO services (name) VALUES (
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
app.post('/services/:id', (req, res) => {
    let sql = `UPDATE services SET ${req.body.field} = '${req.body.value}' WHERE id = ${req.params.id}`;
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
app.delete('/services/:id', (req, res) => {
    let sql = `DELETE FROM services WHERE id IN(${req.params.id})`;
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