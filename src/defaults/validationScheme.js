export const loginSchema = Yup.object().shape({
  email: Yup.string()
    .matches(
      /^[A-Za-z0-9]+@[A-Za-z]+\.[A-Za-z]{2,}$/,
      "Please enter a valid email"
    )
    .max(50, "Email must be at most 50 characters")
    .required("Email is required"),
  password: Yup.string()
    .matches(
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{5,50}$/,
      "Please enter a valid password"
    )
    .max(50, "Password must be at most 50 characters")
    .required("Password is required"),
});

export const registrationSchema = Yup.object().shape({
  name: Yup.string()
    .matches(/^[A-Za-z ]*$/, "Please enter a valid name")
    .required("Name is required"),
  email: Yup.string()
    .matches(
      /^[A-Za-z0-9]+@[A-Za-z]+\.[A-Za-z]{2,}$/,
      "Please enter a valid email"
    )
    .max(50, "Email must be at most 50 characters")
    .required("Email is required"),
  password: Yup.string()
    .matches(
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{5,50}$/,
      "Please enter a valid password"
    )
    .max(50, "Password must be at most 50 characters")
    .required("Password is required"),
  passwordConfirm: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .required("Password confirmation is required"),
});