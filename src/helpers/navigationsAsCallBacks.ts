import { useVerificationNavigation } from "@/hooks/useTypedNavigation";

/**Go back to Contact info */
export const navigateBackToContactInfo = (count = 1) => {
  switch(count){
    case 1 :
  return useVerificationNavigation().pop(1);
    case 2:
      return useVerificationNavigation().pop(2);
  }
};
