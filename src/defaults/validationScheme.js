import * as Yup from "yup";

export const loginSchema = (intl) => {
  return Yup.object().shape({
    email: Yup.string()
      .matches(
        /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/i,
        intl.formatMessage({ id: "emailValidation" })
      )
      .max(50, intl.formatMessage({ id: "emailMaxCharacters" }))
      .required(intl.formatMessage({ id: "emailRequired" })),
    password: Yup.string()
      .matches(
        /^(?=.*[A-Z])(?=.*\d).{6,16}$/,
        intl.formatMessage({ id: "passwordValidation" })
      )
      .max(16, intl.formatMessage({ id: "passwordMaxCharacters" }))
      .required(intl.formatMessage({ id: "passwordRequired" })),
  });
};

export const registrationSchema = (intl) => {
  return Yup.object().shape({
    firstName: Yup.string()
      .matches(/^.{2,20}$/, intl.formatMessage({ id: "firstNameValidation" }))
      .required(intl.formatMessage({ id: "firstNameRequired" }))
      .max(20, intl.formatMessage({ id: "firstNameMaxCharacters" })),
    email: Yup.string()
      .matches(
        /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/i,
        intl.formatMessage({ id: "emailValidation" })
      )
      .max(50, intl.formatMessage({ id: "emailMaxCharacters" }))
      .required(intl.formatMessage({ id: "emailRequired" })),
    password: Yup.string()
      .matches(
        /^(?=.*[A-Z])(?=.*\d).{6,16}$/,
        intl.formatMessage({ id: "passwordRequirements" })
      )
      .max(16, intl.formatMessage({ id: "passwordMaxCharacters" }))
      .required(intl.formatMessage({ id: "passwordRequired" })),
    passwordConfirm: Yup.string()
      .oneOf(
        [Yup.ref("password"), null],
        intl.formatMessage({ id: "passwordMatch" })
      )
      .required(intl.formatMessage({ id: "passwordConfirmRequired" })),
  });
};

export const passwordSchema = (intl) => {
Yup.object().shape({
  password: Yup.string()
    .matches(
      /^(?=.*[A-Z])(?=.*\d).{6,16}$/,
      intl.formatMessage({ id: "passwordRequirements" })
    )
    .max(16, "Password must be at most 16 characters")
    .required("Password is required"),
  passwordConfirm: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .required("Password confirmation is required"),
})
};

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
