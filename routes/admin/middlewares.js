const { validationResult } = require('express-validator');      // to handle validation results

module.exports = {
    handleErrors(templateFunc, dataCb) {
        return async (req, res, next) => {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                // console.log(errors);
                let data = {};
                if (dataCb) {
                    data = await dataCb(req);
                }
                return res.send(templateFunc({ errors, ...data }));
            }
            next();
        };
    },

    requireAuth(req, res, next) {
        if (!req.session.userId) {
            return res.redirect(`/signin`);
        }
        next();
    }
}