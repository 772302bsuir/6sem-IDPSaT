const task2_1 = (Log) => {
    Log.find({}, { url: 1, session_start: 1, session_end: 1, _id: 0 }, (err, res) => {
        if (err) {
            console.log(err);
        } else {
            let obj = {};
            res.forEach((log) => {
                if (obj[log.url]) {
                    obj[log.url] += (+new Date(log.session_end) - +new Date(log.session_start)) / 1000;
                } else {
                    obj[log.url] = (+new Date(log.session_end) - +new Date(log.session_start)) / 1000;
                }
            });
            for (let key in obj) {
                obj[key] = obj[key] + " in seconds";
            }
            console.log(obj);
        }
    }).sort({
        url: 1,
    });
};

module.exports = task2_1;