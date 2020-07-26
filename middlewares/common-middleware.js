

const validateAuth = function (req, res, next) {
    if (req.type == 'OPTIONS') {
        return next();
    }
    const token = req.headers['authorization'];
    if (token) {
        const usertoken = token.split(' ');
        const decoded = global.jwt.verify(usertoken[1], 'hitit');
        req.body['user'] = decoded;
    }
    return next();
}
const middlewares = {
    enableCors(req, res, next) {
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Headers', 'Origin, Authorization, X-Requested-With, Content-Type, Accept');
        res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
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
        const errorMessage = { success: false, message: err.sqlMessage ? err.sqlMessage : 'Unknown Error' };
        global.logger.error(err);
        if (err) {
            res.status(err.status || 500).json(errorMessage);
        }
        return next();
    },
}

module.exports = middlewares;