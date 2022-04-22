import Joi from "joi"; 

export const validationSchema = Joi.object({
        initialDeposit: Joi.number().positive(),
        ratePercentage: Joi.number().precision(2).required().positive(),
        monthlyDeposit:Joi.number()
})
