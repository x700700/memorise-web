
export default {
    urls: {
        api: 'http://dev.memorise.com:4044/api',
    },
    env: {
        timeout: 3, // sec
    },
    pageName: {
        login: 'login',
        trainings: 'trainings',
        edit: 'edit',
        practice: 'practice',
        exam: 'exam',
    },
    inputProps: {
        email: {},
        password: {},
        training: {
            maxLength: 25,
        },
        exercise: {
            maxLength: 25,
        },
    },
    play: {
        minCards: 2,
        defaultCardsNum: 20,
    },
    localStorage: {
        gameId: 'memoBool.practice',
        examId: 'memoBool.exam',
    },
    temp: {
        bearer: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVkZGU0YjA0MzY1MTJkYWM1MTc1ZjY2NCIsIm5hbWUiOiJCb29saSIsImlhdCI6MTU3NTk5NDg4MywiZXhwIjoxNTc2MDgxMjgzfQ.hO1m951NKDNJjrcjy_lKIQRMUHGcgQuvUTcdEtN0j6c',
    },
};
