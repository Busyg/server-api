var express = require('express');
var app = express();
var cors = require('cors');
var database = require('./config/db');
var port = process.env.PORT || 3005;

//Создаем подключение к БД
database.connect((err) => {
    if (err) throw err;
})

//Добавляем поддержку кросс-доменных запросов
app.use(cors());

//Добавляем поддержку парсинга json
app.use(express.json());

//Добавляем возможность получать данные из клиентского приложения
app.use(express.urlencoded({
    extended: true
}));

//Добавляем таблицы
app.use('/', [
    require('./routes/auth'),
    require('./routes/users'),
    require('./routes/orders'),
    require('./routes/clients'),
    require('./routes/services'),
    require('./routes/storage'),
]);


//Слушаем порт
app.listen(port, () => {
    console.log(`Listening at http://localhost:${port}`);
});