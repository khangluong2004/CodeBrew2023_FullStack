const Log4js = require('log4js');


Log4js.configure({
    appenders: {
        info: {type: 'file', filename: './logs/info.log'},
        error: {type: 'file', filename: './logs/error.log'},
        console: {type: 'console'}
    },
    categories: {
        error: {appenders: ["error", "console"], level: "error"},
        info: {appenders: ["console", "info"], level: "info"},
        default: {appenders: ["console", "info"], level: "trace"}
    }
});

const error = (mess) => {
    Log4js.getLogger("error").error(mess);
}

const info = (mess) => {
    Log4js.getLogger("info").info(mess);
}

module.exports = {
    error,
    info
}