import express from "express";
import bodyParser from 'body-parser';
import cors from "cors";
import Joi from "joi"; 

const app = express();
app.use(bodyParser.json());

app.use(express.json());

app.use(cors());

app.get("/", (req, res) => res.json({message: "Investments Saving Calculator API"}));

app.post("/api/savings", (req, res) => {
  const { initialDeposit, ratePercentage, monthlyDeposit } = req.body
  const schema = Joi.object({
    initialDeposit: Joi.number().positive(),
    ratePercentage: Joi.number().precision(2).required().positive(),
    monthlyDeposit:Joi.number()
  })

  const validation =  schema.validate(req.body)

  if (validation.error){
    res.status(400).send({error: validation.error.details[0].message})
    return
  }

  const projection = []

  const rateDecimal = ratePercentage/100;
  const time = 50

  for (let year = 0; year <= time; year++){

    const compoundInterest = Math.pow(1+ rateDecimal, year * 12)
    const balance = (monthlyDeposit * compoundInterest - monthlyDeposit)/rateDecimal + initialDeposit*compoundInterest

    projection.push({"year": year, "balance": parseFloat(balance.toFixed(2))})
  }

  res.send(projection)
});

app.all("/*", (req, res, next) => {
  res.status(404).send({ httpError: "Route Not Found" });
});

// Express only serves static assets in production
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

app.set("port", process.env.PORT || 3001);

app.listen(app.get("port"), () => {
  console.log(`Server listening at: http://localhost:${app.get("port")}/`); // eslint-disable-line no-console
});

module.exports = app; 