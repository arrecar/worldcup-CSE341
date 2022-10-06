const validator = require('../helpers/validate');

const saveGroup = (req, res, next) => {
    const validationRule = {
        name: 'required|string',
        team1: 'required|string',
        team2: 'required|string',
        team3: 'required|string',
        team4: 'required|string'
    };
    validator(req.body, validationRule, {}, (err, status) => {
        if (!status) {
            res.status(401).send({
                success: false,
                message: 'Input does not meet the criteria',
                data: err
            });
        } else {
            next();
        }
    });
};

module.exports = {
    saveGroup
};