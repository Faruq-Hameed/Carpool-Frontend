import * as Yup from "yup";

export const LoginSchema = Yup.object().shape({
  phoneNumberOrEmail: Yup.string()
    .required("Phone number or email is required")
    .test("phone-or-email", "Enter a valid phone number or email", (value) => {
      if (!value) return false;

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      const phoneRegex = /^[0-9]{10,15}$/; // can be adjusted based on country/format

      return emailRegex.test(value) || phoneRegex.test(value);
    }),
  passCode: Yup.string()
    .required("Passcode is required")
    .length(6, "Must be at least 6 characters"),
});

export const SignUpSchema = Yup.object().shape({
  surname: Yup.string().required("Surname is required"),
  firstname: Yup.string().required("Firstname is required"),
  email: Yup.string().email().required("Email is required"),
  passCode: Yup.string()
    .required("Passcode is required")
    .length(6, "Must be at least 6 characters"),
});
