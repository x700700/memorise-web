const trainingMultiply = {
    "id": "__T001",
    "name": "לוח הכפל",
    "created": "2019-12-01T18:40:48.560Z",
    "modified": "2019-12-01T19:47:35.859Z",
    "popularity": 5,
    "difficulty": 3,
    "sampleExercise": {
        "q": "6 X 7",
        "a": "42",
    },
    "info": {
        "archived": false,
        "lastTrainedAt": null
    },
    "exercises": {},
};

let i, j, c = 0;
for (i = 3; i < 9; i++) {
    for (j = 3; j < 9; j++) {
        trainingMultiply.exercises[c++] = {
            id: `${i}X${j}`,
            q: `${i} X ${j}`,
            a: `${i * j}`,
        };
    }
}
/*
foo.exercises[c++] = {
    "id": "off-exc-000",
    "q": "Highly very long sentence to break the 1st line",
    "a": "משפט ארוך שישבור את השורה",
};
 */

export default { "__T001": trainingMultiply };
