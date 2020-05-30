const task1_4 = (Log) => {
    Log.find(
        {
            IP: `122.168.1.1`,
        },
        { url: 1, _id: 0 },
        (err, res) => {
            if (err) {
                console.log(err);
            } else {
                console.log(res);
            }
        }
    ).sort({
        url: 1,
    });
};

module.exports = task1_4;
