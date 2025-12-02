import React, { useState } from "react";
import { TouchableOpacity, View } from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { format } from "date-fns";

import ErrorTexts from "../texts/ErrorTexts";
import FormInput from "./formInput";

interface Props {
  label?: string;
  value: string;
  error?: string;
  touched?: boolean;
  setFieldValue: (field: string, value: any) => void;
}

const DOBDatePicker: React.FC<Props> = ({
  label = "Date of Birth",
  value,
  error,
  touched,
  setFieldValue,
}) => {
  const [open, setOpen] = useState(false);

  const handleConfirm = (date: Date) => {
    const formatted = format(date, "yyyy-MM-dd");
    setFieldValue("dob", formatted); // ← updates Formik
    setOpen(false);
  };

  return (
    <View>
      <TouchableOpacity onPress={() => setOpen(true)}>
        <FormInput
          label={label}
          value={value}
          editable={false}
          pointerEvents="none"
          onChangeText={()=>{}}
        />
      </TouchableOpacity>

      {touched && error && (
        <ErrorTexts message={error} />
      )}

      <DateTimePickerModal
        isVisible={open}
        mode="date"
        maximumDate={new Date()} // prevent future DOB
        onConfirm={handleConfirm}
        onCancel={() => setOpen(false)}
      />
    </View>
  );
};

export default DOBDatePicker;
