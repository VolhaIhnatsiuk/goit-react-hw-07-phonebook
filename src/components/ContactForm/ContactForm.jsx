import { Formik, Form, Field, ErrorMessage } from 'formik';
import { nanoid } from 'nanoid';
import { useDispatch, useSelector } from 'react-redux';
import { addContact } from 'redux/operations';
import { selectContacts } from 'redux/selectors';
import Notiflix from 'notiflix';
import * as Yup from 'yup';
import css from './ContactForm.module.css';

const initialValues = { name: '', number: '' };
const schema = Yup.object().shape({
  name: Yup.string()
    .min(2, 'Must be at least 2 characters long')
    .max(70, 'Must be no more than 70 characters long'),
  number: Yup.number(),
});

export const ContactForm = () => {
  const dispatch = useDispatch();
  const contacts = useSelector(selectContacts);

  const handleSubmit = (values, { resetForm }) => {
    const isInContacts = contacts.find(
      ({ name }) => name.toLowerCase() === values.name.toLowerCase()
    );
    if (isInContacts) {
      Notiflix.Notify.failure(`${values.name} is already in contacts!`, {
        position: 'left-top',
        distance: '10px',
      });
      return;
    }
    dispatch(
      addContact({
        createdAt: new Date(),
        name: values.name,
        phone: values.number,
        id: nanoid(),
      })
    );
    resetForm();
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={schema}
      onSubmit={handleSubmit}
    >
      <Form className={css.form} autoComplete="off">
        <label className={css.formLabel} htmlFor="name">
          Name
          <Field className={css.formInput} type="text" name="name" required />
          <span className={css.error}>
            <ErrorMessage name="name" />
          </span>
        </label>
        <label className={css.formLabel} htmlFor="number">
          Number
          <Field
            className={css.formInput}
            type="tel"
            name="number"
            placeholder="+48"
            required
          />
          <span className={css.error}>
            <ErrorMessage name="number" />
          </span>
        </label>
        <button className={css.formBtn} type="submit">
          Add contact
        </button>
      </Form>
    </Formik>
  );
};