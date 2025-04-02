import coreJoi from 'joi';
import joiDate from '@joi/date'
const Joi = coreJoi.extend(joiDate) as typeof coreJoi;

export function validateEvent(event: any) {
    const schema = Joi.object({
        HOUSENAME: Joi.string()
                      .pattern(/[A-Za-z]/)
                      .max(1)
                      .required(),
        EVENTNAME: Joi.string()
                      .pattern(/[A-Za-z0-9]/)
                      .max(20)
                      .required(),
        DATE: Joi.date().format('YYYY-MM-DD')
                 .max('now'),
        FAMILY: Joi.string()
                   .pattern(/[A-Za-z']/)
                   .max(30)
                   .required()
    });

    return schema.validate(event, { abortEarly: false });
}
