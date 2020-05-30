const task2_3 = (Log) => {
    Log.aggregate(
        [
            {
                $group: {
                    _id: "$url",
                    count: { $sum: 1 },
                },
            },
        ],
        (err, res) => {
            if (err) {
                console.log(err);
            } else {
                console.log(res);
            }
        }
    ).sort({
        count: -1,
    });
};

module.exports = task2_3;