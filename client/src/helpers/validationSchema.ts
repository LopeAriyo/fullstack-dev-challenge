import * as yup from 'yup';

export const validationSchema = yup.object().shape({
    initialDeposit: yup.number().typeError("Please enter a valid number").positive("Initial deposit must be greater than zero").required("An initial deposit is required"),
    monthlyDeposit: yup.number().typeError("Please enter a valid number").positive("Monthly deposit must be greater than zero").required("A monthly deposit is required"),
    ratePercentage: yup.number().typeError("Please enter a valid percentage").positive("Rate must be greater than zero").required("A rate is required")
  })