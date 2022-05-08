import { Button, TextField } from '@material-ui/core';
import * as yup from 'yup';
import { useFormik } from 'formik';

const validationSchema = yup.object({
    name: yup
        .string()
        .required('Name is required'),
  });

const GenreForm = ({genres, submitForm, formSubmitText}) => {
    const genreNames = genres.map(genre => genre.name);

    const formik = useFormik({
        initialValues: {    
            name: "Name Example"
        },
        validationSchema: validationSchema,
        onSubmit: async (values) => {
            if(genreNames.includes(values.name)) {
                alert("This genre already exists")
                return;
            }
            submitForm(values);
          },
      });

    const handleSubmit = async (e) => {
        e.preventDefault();
        formik.handleSubmit();
    }

    return (
        <>
        <style type="text/css">
        {`
            .input-container {
                display: flex;
                flex-direction: column;
                margin: 0.5rem;
            }

            .MuiFormControl-root {
                margin: 0.5rem;
            }
        `}
        </style>       
            <form 
                onSubmit={handleSubmit}
                className="input-container"
                >
                <TextField onChange={formik.handleChange} name="name" defaultValue={formik.values.name} label="Name" color="secondary" focused />
                <Button type='submit' color='primary' variant="contained"  fullWidth>{formSubmitText}</Button>
            </form>
        </>
    )
}

export default GenreForm
