
class Logger {
    constructor(env) {
        this.env = env;
        this.prod = this.env === 'production';
        console.debug(`environment=[${this.env}] - is production = `, this.prod);
    }
    trace = (...args) => {
        false && !this.prod && console.debug(...args);
    };
    debug = (...args) => {
        !this.prod && console.debug(...args);
    };
    log = (...args) => {
        !this.prod && console.debug(...args);
    };
    info = (...args) => {
        !this.prod && console.info(...args);
    };
    warn = (...args) => {
        !this.prod && console.warn(...args);
        this.prod && console.debug(...args);
    };
    error = (...args) => {
        console.error(...args);
    };
}

const logger = new Logger(process.env.NODE_ENV);
export default logger;
