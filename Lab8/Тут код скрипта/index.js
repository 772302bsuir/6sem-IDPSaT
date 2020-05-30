const mongoose = require("mongoose");

const task1_1 = require("./task1_1");

const task1_2 = require("./task1_2");

const task1_3 = require("./task1_3");

const task1_4 = require("./task1_4");

const task2_1 = require("./task2_1");

const task2_2 = require("./task2_2");

const task2_3 = require("./task2_3");

const task2_4 = require("./task2_4");

(async function main() {
    await mongoose.connect("mongodb+srv://maks:maks@cluster0-sifnb.mongodb.net/laba8", {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
    const Schema = mongoose.Schema;

    const LogSchema = new Schema({
        url: String,
        IP: String,
        session_start: { type: Date, default: Date.now },
        session_end: { type: Date },
    });
    const Log = mongoose.model("logs", LogSchema);
    switch (process.argv[2]) {
        case "1": {
            task1_1(Log);
            break;
        }
        case "2": {
            task1_2(Log);
            break;
        }
        case "3": {
            task1_3(Log);
            break;
        }
        case "4": {
            task1_4(Log);
            break;
        }
        case "5": {
            task2_1(Log);
            break;
        }
        case "6": {
            task2_2(Log);
            break;
        }
        case "7": {
            task2_3(Log);
            break;
        }
        case "8": {
            task2_4(Log);
            break;
        }
        default: {
            console.log("Такого запроса нет");
            break;
        }
    }
    return;
})();
