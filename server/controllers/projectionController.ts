import express from "express";
import { calculateProjection } from "../models/projectionModel";
import  { validationSchema }  from "../helpers/validationSchema";

export const createProjection = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    const { initialDeposit, ratePercentage, monthlyDeposit } = req.body
    
    const {error} = validationSchema.validate(req.body)

    if (error){
        res.status(406).send({error: error.details[0].message})
        return next(error);
    }

    const projection = calculateProjection({initialDeposit, monthlyDeposit, ratePercentage})

    res.status(200).send(projection)
};

