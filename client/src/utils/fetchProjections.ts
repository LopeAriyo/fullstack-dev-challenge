import { FormikProps } from 'formik';
import { FormValues } from '../types/formValue';

export async function fetchProjections(form: FormikProps<FormValues>) {

  return fetch("http://localhost:3001/api/projection", 
        {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(form.values),
        } ).then(async (res) => {
        
            if (!res.ok){
                const error = new Error()
                error.message = "Invalid form values"
                return error;
            }

            return res.json()
        
    }).catch ((error => console.log(error)))

}
