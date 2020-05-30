const task1_2 = (Log) => {
    Log.find(
        {
            url: "https://vk.com/",
        },
        { IP: 1, _id: 0 },
        (err, res) => {
            if (err) {
                console.log(err);
            } else {
                console.log(res);
            }
        }
    ).sort({
        IP: 1,
    });
};

module.exports = task1_2;