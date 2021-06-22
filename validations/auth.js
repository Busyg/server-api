const Joi = require('joi');
//Проверяем, что на вход пришли логин и пароль в виде строк
module.exports = function (requestBody) {
    const schema = Joi.object({
        login: Joi.string().required(),
        password: Joi.string().required(),
    });

    return schema.validate(requestBody, {
        abortEarly: false,
    })
}