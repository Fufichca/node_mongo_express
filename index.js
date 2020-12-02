const express = require('express'); //Сервер
const mongoose = require('mongoose'); //База данных
const bodyParser = require('body-parser'); //Позволяет парсить тело нашего запроса

const PORT = process.env.PORT || 3000; //Если есть системная переменная PORT будем брать с нее, если нет то 3000
const app = express(); // Запускаем сервер

app.use(bodyParser.json());
app.use('/api', require('./api'));

//Сначала запускает БД, а потом сервер, что бы БД уже при запуске сервере была доступна
async function start() {
    try {
        await mongoose.connect('mongodb://127.0.0.1:27017/MongoTest', {
            useNewUrlParser: true,
            useFindAndModify: false,
            useUnifiedTopology: true,
            user : 'muggers',
            pass: 'pa$$word',
        })
        app.listen(PORT, () => {
            console.log('Server has been start');
        })
    }catch (e){
        console.log(e);
    }
}

start();
