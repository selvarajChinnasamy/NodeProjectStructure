

const validateAuth = function (req, res, next) {
    return next();
}
const middlewares = {
    enableCors(req, res, next) {
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
        next();
    },
    setDefaultHeaders(req, res, next) {
        res.setHeader('Content-Type', 'application/json');
        next();
    },
    authenticate(req, res, next) {
        return validateAuth(req, res, next);
    },
    errorHandler(err, req, res, next) {
        const errorMessage = { success: false };
        global.logger.error(err);
        errorMessage.error = err;
        if (err) {
            res.status(err.status || 500).json(errorMessage);
        }
        return next();
    },
}

module.exports = middlewares;