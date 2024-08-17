import joi from'joi'
import { generalFields } from '../../Middleware/validation.js'


export const registerSchema={
    body: joi.object({
        userName:joi.string().min(3).max(40).required().messages({
            'string.empty':'username is required',
            'string.min':'username must be at least 3 letters',
            'srting.max':'username must not be mor than 40 letters'
        }),
        email:generalFields.email,
        password:generalFields.password,
        cpassword:joi.valid(joi.ref('password')).required().messages({
            'any.only':'confairm password must be same as password'
        }),
    })
}
export const loginSchema={
    body: joi.object({
       
        email:generalFields.email,
        password:generalFields.password,
       
    })
}