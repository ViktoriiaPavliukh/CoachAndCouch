import * as Yup from "yup";
export const loginSchema = Yup.object().shape({
  email: Yup.string()
    .matches(
      /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/i,
      "Please enter a valid email"
    )
    .max(50, "Email must be at most 50 characters")
    .required("Email is required"),
  password: Yup.string()
    .matches(/^(?=.*[A-Z])(?=.*\d).{6,20}$/, "Please enter a valid password")
    .max(20, "Password must be at most 20 characters")
    .required("Password is required"),
});

export const registrationSchema = Yup.object().shape({
  firstName: Yup.string()
    .matches(/^.{2,20}$/, "Please enter a valid name")
    .required("Name is required")
    .max(20, "name must be at most 20 characters"),
  email: Yup.string()
    .matches(
      /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/i,
      "Please enter a valid email"
    )
    .max(50, "Email must be at most 50 characters")
    .required("Email is required"),
  password: Yup.string()
    .matches(/^(?=.*[A-Z])(?=.*\d).{6,20}$/, "Please enter a valid password")
    .max(20, "Password must be at most 20 characters")
    .required("Password is required"),
  passwordConfirm: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .required("Password confirmation is required"),
});

export const passwordSchema = Yup.object().shape({
  password: Yup.string()
    .matches(/^(?=.*[A-Z])(?=.*\d).{6,20}$/, "Please enter a valid password")
    .max(20, "Password must be at most 20 characters")
    .required("Password is required"),
  passwordConfirm: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .required("Password confirmation is required"),
});

export const teacherFormSchema = Yup.object({
  price: Yup.number().integer().min(0).required("Price is required"),
  description: Yup.string().required("Description is required"),
  spokenLanguages: Yup.array().min(1, "Select at least one spoken language"),
  teachingLanguages: Yup.array().min(
    1,
    "Select at least one teaching language"
  ),
  specializations: Yup.array().required("Specialization is required"),
  image: Yup.mixed().required("Select image for your advert"),
  updateUser: Yup.object().required("All fields is required"),
});

export const userValidationSchema = Yup.object().shape({
  firstName: Yup.string().required("First name is required"),
  lastName: Yup.string().required("Last name is required"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  birthday: Yup.string().required("Birthday is required").nullable(),
  aboutMe: Yup.string().required("Description is required"),
  photoPath: Yup.mixed(),
  // country: Yup.string().required("Country is required"),
});
