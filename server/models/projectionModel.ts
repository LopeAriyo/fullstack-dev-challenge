interface RequestBody {
    initialDeposit:number;
    monthlyDeposit:number; 
    ratePercentage:number;
}

export const calculateProjection = ({initialDeposit, monthlyDeposit, ratePercentage}:RequestBody) => {

    const projection = []

    const rateDecimal = ratePercentage/100;
    const time = 50
  
    for (let year = 0; year <= time; year++){
  
      const compoundInterest = Math.pow(1+ rateDecimal, year * 12)
      const balance = (monthlyDeposit * compoundInterest - monthlyDeposit)/rateDecimal + initialDeposit*compoundInterest
  
      projection.push({"year": year, "balance": parseFloat(balance.toFixed(2))})
    }

    return projection
}