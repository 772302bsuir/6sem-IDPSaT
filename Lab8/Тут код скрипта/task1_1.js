const task1_1 = (Log) => {
    Log.find({}, { url: 1, _id: 0 }, (err, res) => {
        if (err) {
            console.log(err);
        } else {
            console.log(res);
        }
    }).sort({ url: 1 });
};

module.exports = task1_1;