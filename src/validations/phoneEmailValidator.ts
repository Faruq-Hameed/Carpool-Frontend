/**validates email and phone inputs. */
export const isValidInput = (
  type: "email" | "phone",
  value: string
): string | null => {
  switch (type) {
    case "email":
      return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
        ? null
        : "Please provide valid email";
    case "phone":
      return /^\d{11}$/.test(value)
        ? null
        : "Please provide valid phone number";
    default:
      return "Unknown input type";
  }
};
