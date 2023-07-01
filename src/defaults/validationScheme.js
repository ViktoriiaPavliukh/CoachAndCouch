import * as Yup from 'yup';

export const loginSchema = Yup.object().shape({
  email: Yup.string().email('please enter valid email').required('required'),
  password: Yup.string().required('required'),
});

export const registrationSchema = Yup.object({
  name: Yup.string()
    .matches(/^[A-Za-z ]*$/, 'Please enter valid name')
    .min(2, 'At least 2 characters')
    .required('Name is required'),
  email: Yup.string('Enter your e-mail')
    .email('Enter a valid email')
    .required('Email is required'),
  password: Yup.string('Enter your password')
    .min(8, 'Password should be of minimum 8 characters length')
    .required('Password is required'),
  passwordConfirm: Yup.string().oneOf(
    [Yup.ref('password'), null],
    'Passwords must match'
  ),
});
