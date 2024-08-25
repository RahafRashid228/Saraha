import joi from 'joi';


export const sendMessageSchema={
    body:joi.object({
        message: joi.string().min(3).max(100).required(),
        receiverId:joi.string().length(24)
       }),
       params:joi.object({
        receiverId:joi.string().length(24)
       })
}