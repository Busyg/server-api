const mysql = require('mysql');
//Создаем подключение к БД
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'vtk',
});

module.exports = connection;