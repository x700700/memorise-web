const foo = {
    "id": "5de409300b5b97447c4c2e53",
    "name": "לוח הכפל",
    "created": "2019-12-01T18:40:48.560Z",
    "modified": "2019-12-01T19:47:35.859Z",
    "popularity": 4,
    "difficulty": 2,
    "exercisesCount": 2,
    "info": {
        "userId": "5dde4b0436512dac5175f664",
        "archived": false,
        "lastTrainedAt": null
    },
    "exercises": {},
};

let i, j, c = 0;
for (i = 3; i < 9; i++) {
    for (j = 3; j < 9; j++) {
        foo.exercises[c++] = {
            id: i * j,
            q: `${i} X ${j}`,
            a: `${i * j}`,
        };
    }
}

export default foo;
