import express from "express";
import {createProjection} from '../controllers/projectionController'

export const projectionRouter = express.Router(); 

projectionRouter.post("/", createProjection);