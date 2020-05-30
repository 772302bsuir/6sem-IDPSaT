const task1_3 = (Log) => {
    Log.find(
        {
            session_start: 1590867235469,
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

module.exports = task1_3;