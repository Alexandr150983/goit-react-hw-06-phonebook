import { Form as FormikForm, Label, Button } from './ContactForm.styled';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { addContact } from 'redux/contactsSlice';
import { object, string } from 'yup';

const schema = object({
  name: string().min(3, 'must be at least 3 characters long').required(),
  number: string()
    .matches(
      /^(?:\+38)?(?:\d{10}|\d{3}[-\s]\d{3}[-\s]\d{4}|\(\d{3}\)[-.\s]\d{3}[-.\s]\d{4})$/,
      'Invalid phone number format. Use Ukrainian format, e.g., +380501234567'
    )
    .required('Phone number is required'),
});

const initialValues = {
  name: '',
  number: '',
};

export function ContactForm() {
  const dispatch = useDispatch();
  const contacts = useSelector(state => state.contacts.contacts);

  const handleSubmit = (values, { resetForm }) => {
    const isDuplicate = contacts.some(
      contact =>
        contact.name === values.name || contact.number === values.number
    );

    if (isDuplicate) {
      alert('Цей контакт вже існує.');
    } else {
      dispatch(addContact(values));
      resetForm();
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={schema}
      onSubmit={handleSubmit}
    >
      <FormikForm as={Form}>
        <Label>
          Name
          <Field type="text" name="name" />
          <ErrorMessage name="name" />
        </Label>
        <br />
        <Label>
          Number
          <Field type="tel" name="number" />
          <ErrorMessage name="number" />
        </Label>
        <br />
        <Button type="submit">Add contact</Button>
      </FormikForm>
    </Formik>
  );
}
