const express = require("express");
const bodyParser = require("body-parser");
const router = express.Router();
const Mugger = require("./mugger");

// создаем парсер для данных application/x-www-form-urlencoded
const urlencodedParser = bodyParser.urlencoded({extended: false});

router.get("/muggers", (req, res) => {
    Mugger.find({})
        .then(mugger => {
        // res.send(mugger);
        res.sendFile(__dirname + '/index.html');
    });
});

router.get("/muggers/:id", (req, res)=>{
    Mugger.find({_id: req.params.id})
        .then(mugger => {
        res.send({'found': mugger});
    });
});

router.post("/muggers", urlencodedParser, (req, res)=>{
    Mugger.create({
        name: req.body.userName,
        password: req.body.userPass
    })
        .then(mugger => {
        // res.send(`entry created ${mugger.id}`);
        res.send( `Отправлено: ${req.body.userName}, ${req.body.userPass}}`);
    });
});

router.put("/muggers/:id", (req, res)=>{
    Mugger.findByIdAndUpdate({_id: req.params.id}, req.body)
        .then(() => {
        Mugger.findOne({_id: req.params.id})
            .then(mugger => {
            res.send(mugger);
            });
    });
});

router.delete("/muggers/:id", (req, res)=>{
    Mugger.deleteOne({_id: req.params.id})
        .then(mugger => {
        res.send(mugger);
    });
});

module.exports = router;