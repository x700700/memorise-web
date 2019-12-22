
export default {
    urls: {
        api: process.env.NODE_ENV === 'production' ? 'https://memobool-api.herokuapp.com/api' : 'http://dev.memorise.com:4044/api',
    },
    env: {
        timeout: 3, // sec
    },
    ui: {
        headerHeight: 53,
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
        tokenId: 'memoBool.token',
        gameId: 'memoBool.practice',
        examId: 'memoBool.exam',
        friendId: 'memoBool.friend',
    },
    temp: {
        bearer: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVkZGU0YjA0MzY1MTJkYWM1MTc1ZjY2NCIsIm5hbWUiOiJCb29saSIsImlhdCI6MTU3NTk5NDg4MywiZXhwIjoxNTc2MDgxMjgzfQ.hO1m951NKDNJjrcjy_lKIQRMUHGcgQuvUTcdEtN0j6c',
    },
};
