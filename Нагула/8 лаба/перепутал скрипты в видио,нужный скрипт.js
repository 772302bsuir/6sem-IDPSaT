O_CONNECTION = "localhost:27017/lab8";
COL_NAME = "logs";
II_URL = 'https://metanit.com/sql/';
III_FROM = 1583171762;
III_TO = 1583240043;
IV_IP = "192.168.0.1";
VII_FROM = 1583121601;
VII_TO = 1583294401;

function show(query) {
    cursor = query;
    if (Array.isArray(cursor)) {
        printjson(cursor);
    } else {
        while (cursor.hasNext()) {
            printjson(cursor.next());
        }
    }
}

db = connect(O_CONNECTION);

print("1) Выдать упорядоченный список URL ресурсов.");
show(db[COL_NAME].distinct("url"));

print("2) Выдать упорядоченный список IP-адресов пользователей, посетивших ресурс с заданным URL (" + II_URL + ").");
show(db.distinct("ip", {"url": II_URL}));

print("3) Выдать упорядоченный список URL ресурсов, посещенных в заданный временной период (" + new Date(III_FROM * 1000) + " - " + new Date(III_TO * 1000) + ").");
show(db[COL_NAME].distinct("url", {"timeStamp": {"$gte": III_FROM, "$lte": III_TO}}));

print("4) Выдать упорядоченный список URL ресурсов, посещенных пользовате-лем с заданным IP-адресом (" + IV_IP + ").");
show(db[COL_NAME].distinct("url", {"ip": IV_IP}));

print("5) Выдать список URL ресурсов с указанием суммарной длительности посещения каждого ресурса, упорядоченный по убыванию.");
db[COL_NAME].mapReduce(
    function () {
        emit(this.url, this.timeSpent);
    },
    function (key, values) {
        return Array.sum(values)
    },
    {
        query: {},
        out: "tempV"
    }
);
show(db.tempV.find().sort({"value": -1}));

print("6) Выдать список URL ресурсов с указанием суммарного количества посещений каждого ресурса, упорядоченный по убыванию.");
db[COL_NAME].mapReduce(
    function () {
        emit(this.url, 1);
    },
    function (key, values) {
        return Array.sum(values);
    },
    {
        query: {},
        out: "tempVI"
    }
);
show(db.tempVI.find().sort({"value": -1}));

print("7) Выдать список URL ресурсов с указанием количества посещений каждого ресурса в день за заданный период, упорядоченный URL ресурса и убыванию количества посещений.")
db[COL_NAME].mapReduce(
    function () {
        emit(this.url, 0);
        emit(this.url, 1);
    },
    function (key, values) {
        return Array.sum(values) / (1583294401 - 1583121601) * 86400;
    },
    {
        query: {"timeStamp": {"$gte": VII_FROM, "$lte": VII_TO}},
        out: "tempVII"
    }
);
show(db.tempVII.find().sort({"pos": -1, "ip": 1}));

print("8) Выдать список IP-адресов c указанием суммарного количества и суммар-ной длительности посещений ресурсов, упорядоченный по адресу, убы-ванию количества и убыванию длительности.");
db[COL_NAME].mapReduce(
    function () {
        emit(this.ip, {connections: 1, timeSpent: this.timeSpent});
    },
    function (key, values) {
        connections_val = 0;
        time_val = 0;
        for (i = 0; i < values.length; i++) {
            connections_val += values[i].connections;
            time_val += values[i].timeSpent;
        }
        return {connections: connections_val, time: time_val};
    },
    {
        query: {},
        out: "tempVIII"
    }
);
show(db.tempVIII.find().sort({"value.connections": -1, "value.timeSpent": -1, "_id": 1}));
