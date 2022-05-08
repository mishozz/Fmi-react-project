import { Button, TextField } from '@material-ui/core';
import * as yup from 'yup';
import { useFormik } from 'formik';

const validationSchema = yup.object({
    title: yup
        .string()
        .required('Title is required'),
    description: yup
        .string()
        .required('Description is required'),
    availableCopies: yup
        .number()
        .required('Copies are required'),
    imageSource: yup
        .string()
        .required('Image is required'),
    genre: yup
        .string()
        .required('Genre is required'),
  });

const BookForm = ({submitForm, formSubmitText, book, genres}) => {
    const genreNames = genres.map(genre => genre.name);

    const formik = useFormik({
        initialValues: {
          title: book.title,
          description: book.description,
          availableCopies: book.availableCopies,
          imageSource: book.imageSource,
          genre: book.genre
        },
        validationSchema: validationSchema,
        onSubmit: async (values) => {
            if(!genreNames.includes(values.genre)) {
                alert("This genre does not exist")
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
                <TextField onChange={formik.handleChange} name="title" defaultValue={formik.values.title} label="Title" color="secondary" focused />
                <TextField onChange={formik.handleChange} name="description" defaultValue={formik.values.description} label="Description" color="secondary" focused />
                <TextField onChange={formik.handleChange} name="availableCopies" defaultValue={formik.values.availableCopies} label="Available copies" color="secondary" focused />
                <TextField onChange={formik.handleChange} name="imageSource" defaultValue={formik.values.imageSource} label="Image url" color="secondary" focused />
                <TextField onChange={formik.handleChange} name="genre" defaultValue={formik.values.genre} label="Genre" color="secondary" focused />
                <Button type='submit' color='primary' variant="contained"  fullWidth>{formSubmitText}</Button>
            </form>
        </>
    )
}

export default BookForm;
