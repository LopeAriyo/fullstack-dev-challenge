export const formControls = [
    { 
        name: "initialDeposit" ,
        label: "Initial Deposit(£)",
        helperText: "Enter the amount for your first deposit" ,
        step:100},
    { 
        name: "monthlyDeposit" ,
        label: "Monthly Deposit(£)" ,
        helperText: "Enter the amount you would like to save monthly" ,
        step: 100}, 
    {
        name:"ratePercentage" ,
        label: "Interest Rate (%)",
        helperText:"Enter the rate of your savings", 
        step: 0.25 
    }
] 