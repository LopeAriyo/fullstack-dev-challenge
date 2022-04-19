import express from "express";

const app = express();

app.use(express.json());



app.post("/api/savings", (req, res) => {
  const { initialDeposit, ratePercentage, monthlyDeposit } = req.body

  if (!ratePercentage || ratePercentage === 0){
    res.status(400).send({errors: ["Rate percentage required"]})
    return
  }

  const rateDecimal = ratePercentage/100;
  const time = 50 *12;

  let compoundInterest = Math.pow(1+ rateDecimal, time)

  const savings = (monthlyDeposit * compoundInterest - monthlyDeposit)/rateDecimal + initialDeposit*compoundInterest;

  res.send(savings.toFixed(2))
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
  console.log(`Find the server at: http://localhost:${app.get("port")}/`); // eslint-disable-line no-console
});

