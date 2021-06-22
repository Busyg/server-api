var express = require('express');
var app = express();
var database = require('../config/db');
var moment = require('moment');
//Select всех записей из таблицы
app.get('/clients', (req, res) => {
    let sql = 'SELECT * FROM clients'
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
//Добавление новой записи в таблицу
app.post('/clients', (req, res) => {
    let sql = `INSERT INTO clients (phone_num) VALUES (
        '${req.body.phone_num}'
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
app.post('/clients/:id', (req, res) => {
    //Форматируем дату рождения для записи в БД
    if(req.body.field == 'birthdate') {
        req.body.value = moment(req.body.value).format('YYYY-MM-DD');
    }

    let sql = `UPDATE clients SET ${req.body.field} = '${req.body.value}' WHERE id = ${req.params.id}`;
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

//Удаление записи из таблицы
app.delete('/clients/:id', (req, res) => {
    let sql = `DELETE FROM clients WHERE id IN(${req.params.id})`;
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