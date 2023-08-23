import * as Yup from 'yup';

export const validationSchema = Yup.object().shape({
  email: Yup.string().email('please enter valid email').required('required'),
  password: Yup.string().required('required'),
});
