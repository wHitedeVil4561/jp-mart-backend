import joi from 'joi';

export const createAdminSchema = joi.object({
    name:joi.string().required().trim(),
    email:joi.string().required().email(),
    country_code:joi.string().default('+91').trim(),
    phone:joi.number().max(9999999999).required(),
    password:joi.string().required().trim()
}).meta({ className: 'Admin' });

