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
  passcode: Yup.string()
    .required("Passcode is required")
    .length(6, "Your passcode must be 6 digits long"),
});

export const SignUpSchema = Yup.object().shape({
  firstName: Yup.string().required("Firstname is required"),
  lastName: Yup.string().required("Surname is required"),
  email: Yup.string().email().required("Email is required"),
  passcode: Yup.string()
    .required("Passcode is required")
    .length(6, "Your passcode must be 6 digits long"),
});

export const PersonalInfoConfirmationSchema = Yup.object().shape({
  firstName: Yup.string().required("Firstname is required"),
  lastName: Yup.string().required("Surname is required"),
  email: Yup.string().email().required("Email is required"),
  phoneNumber: Yup.string()
    .required("Phone number is required")
    .test("phoneNumber", "Enter a valid phone number", (value) => {
      if (!value) return false;
      const phoneRegex = /^[0-9]{10,15}$/; // can be adjusted based on country/format
      return phoneRegex.test(value);
    }),
});

export const ResetPasscodeSchema = Yup.object().shape({
  phoneNumber: Yup.string().when("$useEmailInstead", (useEmailInstead, schema) =>
    !useEmailInstead
      ? schema.required("Phone number is required")
      : schema.notRequired()
  ),
  email: Yup.string().when("$useEmailInstead", (useEmailInstead, schema) =>
    useEmailInstead
      ? schema.email("Invalid email").required("Email is required")
      : schema.notRequired()
  ),
});

