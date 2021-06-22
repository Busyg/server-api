var express = require('express');
var app = express();
var fileUpload = require('express-fileupload');
var database = require('../config/db');
var moment = require('moment');
//Select всех записей из таблицы
app.get('/orders', (req, res) => {
    let sql = 'SELECT t1.*, t2.name AS created_by_name, t2.surname AS created_by_surname FROM orders t1 LEFT JOIN users t2 on t1.created_by = t2.id;'

    database.query(sql, (err, result) => {
        if (err) {
            res.status(400).json({
                message: err,
            });
            return;
        }

        if (result.length) {
            res.json(result);
        } else {
            res.json({});
        }
    });
});
//Создание новой записи в таблице
app.post('/orders', (req, res) => {
    let sql = `INSERT INTO orders (${req.body.fieldNames}) VALUES (${req.body.fieldValues})`;
    database.query(sql, (err, result) => {
        if (err) {
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
app.post('/orders/:id', (req, res) => {
    let sql = `UPDATE orders SET ${req.body.field} = '${req.body.value}' WHERE id = ${req.params.id}`;
    console.log(sql)
    database.query(sql, (err, result) => {
        if (err) {
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
app.delete('/orders/:id', (req, res) => {
    let sql = `DELETE FROM orders WHERE id IN(${req.params.id})`;
    database.query(sql, (err, result) => {
        if (err) {
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
//Загрузка файла на сервер
app.use(fileUpload());
app.post('/upload/orders', (req, res) => {
    //Если файл не был отправлен из клиента, то возвращаем ошибку
    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).send('Файл не был загружен.');
    }
    let agreementFile = req.files.ageementFile; //Файл
    let uploadPath = './documents/orders/Заказ №' + req.body.name + '-' + agreementFile.name; //Путь, по которому будет сохранен файл
    let responseData = { id: req.body.name, path: uploadPath } //Возвращаем путь к файлу
    //Сохраняем файл на сервере
    agreementFile.mv(uploadPath, function (err) {
        if (err)
            return res.status(500).send(err);

        res.send(responseData);
    });
});
//Отправка файла в клиент
app.get('/download', function (req, res) {
    const file = './' + req.query.path; //Путь к файлу
    res.download(file);
});

module.exports = app;