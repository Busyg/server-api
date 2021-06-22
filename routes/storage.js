var express = require('express');
var app = express();
var database = require('../config/db');
var moment = require('moment');
//Select всех записей в таблице
app.get('/storage', (req, res) => {
    let sql = 'SELECT * FROM storage'

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
app.post('/storage', (req, res) => {
    let sql = `INSERT INTO storage (name) VALUES (
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
app.post('/storage/:id', (req, res) => {
    let sql = `UPDATE storage SET ${req.body.field} = '${req.body.value}' WHERE id = ${req.params.id}`;
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
app.delete('/storage/:id', (req, res) => {
    let sql = `DELETE FROM storage WHERE id IN(${req.params.id})`;
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