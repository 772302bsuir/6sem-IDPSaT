const task2_4 = (Log) => {
    Log.find({}, (err, res) => {
        if (err) {
            console.log(err);
        } else {
            let obj = {};
            res.forEach((log) => {
                if (!obj[log.IP]) {
                    obj[log.IP] = {
                        count: 1,
                        duration: (+new Date(log.session_end) - +new Date(log.session_start)) / 1000,
                        resources: [log.url],
                    };
                } else {
                    obj[log.IP].duration += (+new Date(log.session_end) - +new Date(log.session_start)) / 1000;
                    obj[log.IP].resources.push(log.url);
                    obj[log.IP].count++;
                }
            });
            let array = [];
            for (let log in obj) {
                obj[log].duration += " in seconds";
                array.push(obj[log]);
            }
            const sorted_data = array.sort((a, b) => {
                return b.count - a.count;
            });
            console.log(sorted_data);
        }
    });
};

module.exports = task2_4;