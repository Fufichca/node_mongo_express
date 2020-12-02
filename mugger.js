const mongoose = require("mongoose"); //Прослойка между БД и сервером
const Schema = mongoose.Schema;

const MuggerSchema = new Schema({
    name: String,
    password: Number
});

const Mugger = mongoose.model("mugger", MuggerSchema);

module.exports = Mugger;