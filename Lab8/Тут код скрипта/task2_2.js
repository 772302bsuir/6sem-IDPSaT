
const task2_2 = (Log) => {
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
    );
};

module.exports = task2_2;