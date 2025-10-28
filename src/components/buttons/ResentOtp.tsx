import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, ActivityIndicator } from "react-native";

//ON RESENT OTP IS NOT FUNCTIONAL AT ALL YET
type Props = {
  email?: string;
  phoneNumber?: string;
  purpose: string;
  passcode?: string;
  onResend: (params: {
    email?: string;
    phoneNumber?: string;
    purpose: string;
    passcode?: string
  }) => void;
  isResending: boolean;
};

const ResendOtp: React.FC<Props> = ({
  email,
  phoneNumber,
  passcode,
  purpose,
  onResend,
  isResending,
}) => {
  const [timer, setTimer] = useState(30);

  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [timer]);

  const handleResend = () => {
    onResend({ email, phoneNumber, purpose, passcode });
    setTimer(30); // reset timer after resend
  };

  return (
    <View style={{ marginTop: 16 }}>
      {timer > 0 ? (
        <Text style={{ textAlign: "center" }}>
          Resend OTP in {timer} seconds
        </Text>
      ) : (
        <TouchableOpacity onPress={handleResend} disabled={isResending}>
          <Text style={{ textAlign: "center", color: "blue" }}>
            {isResending ? <ActivityIndicator size="small" /> : "Resend OTP"}
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default ResendOtp;
