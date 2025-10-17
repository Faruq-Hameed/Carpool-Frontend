import { ResetPasscodeContextType, ResetPasscodeContext } from "@/contexts/ResetPasscodeContext";
import { useContext } from "react";

export const useResetPasscode = (): ResetPasscodeContextType => {
  const context = useContext(ResetPasscodeContext);
  if (!context) {
    throw new Error("useResetPasscode must be used within a ResetPasscodeProvider");
  }
  return context;
};