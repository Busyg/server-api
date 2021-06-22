var express = require('express');
var app = express();
var database = require('../config/db');
var authValidation = require('../validations/auth');

app.post('/auth', (req, res) => {

    // Расшифровываем данные для входа
    let requestBody = getCredentials(req);

    // Валидируем
    const { error } = authValidation(requestBody)
    //Если данные некорректны - возвращаем ошибку
    if(error) {
        res.json({
            id: "",
            message: error.details[0].message,
        })
    } else {
        //Ищем в БД пару логин/пароль
        let sql = `SELECT id, admin_flag FROM users WHERE login = '${requestBody.login}' AND password = '${requestBody.password}'`;
        database.query(sql, (err, result) => {
            //Если запрос упал - отправляем в ответ ошибку
            if(err) {
                res.status(400).send(err);
                return;
            }
            //Если нашли запись - отправляем результат, иначе отправляем сообщение о неверных данных
            if(result.length) {
                res.json(result[0]);
            } else {
                res.json({
                    id: "",
                    message : "Неверное имя пользователя или пароль."
                });
            }
        });
    }
});


// Получаем данные для входа
function getCredentials(req) {

    // Берем данные из заголовка
    let auth = req.header('auth');

    // Переводим данные в массив
    let authData = auth.split(" ");

    // Конвертируем в utf-8
    let token = Buffer.from(`${authData[1]}`, 'base64').toString('utf8');

    // Конвертируем токен в массив
    let credentials = token.split(":");

    // Возвращаем полученные данные
    return {
        login: credentials[0],
        password: credentials[1],
    }

}

module.exports = app;