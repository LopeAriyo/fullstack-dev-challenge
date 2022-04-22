import { FormikProps, useFormik } from 'formik'
import { FormValues } from '../types/formValue';
import { validationSchema } from './validationSchema';

export function useForm() {
const formik:FormikProps<FormValues>  = useFormik<FormValues>({ 
    initialValues: {
        initialDeposit: 0,
        monthlyDeposit: 0,
        ratePercentage: 0.00,
    },
    onSubmit: async (values) => {
        //http request is handled by onChange so no need to use this, however it is required in formik so return nothing
        return
    },
    validationSchema,
})
return formik
}