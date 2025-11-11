import React, { useRef, useState, useEffect } from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import Spacer from '../others/Spacer';

interface Props {
  value: string;
  onChange: (value: string) => void;
  length?: number;
}

/**
 * OtpBoxInput
 *
 * A controlled React Native functional component that renders a row of single-character TextInput boxes
 * for entering an OTP / PIN code. The component displays `length` input boxes (default 4) and manages
 * focus, navigation, and value aggregation while delegating the final concatenated value to the caller
 * via the `onChange` callback.
 *
 * Behavior and features:
 * - Renders `length` TextInput fields, each constrained to a single character (maxLength=1).
 * - Uses a ref array to programmatically focus inputs for auto-advance and backspace handling.
 * - Auto-focuses the first input when the external `value` becomes empty.
 * - When a character is typed into an input, it:
 *   - Ignores multi-character entries (safeguards against paste or unexpected input).
 *   - Updates the corresponding digit and calls `onChange` with the newly concatenated value (trimmed to `length`).
 *   - Automatically focuses the next input if the current one is filled and not the last.
 * - Backspace behavior:
 *   - If Backspace is pressed on an empty input and it's not the first index, focus moves to the previous input.
 * - Tracks which input is currently focused to allow visual styling (e.g., `styles.inputFocused`).
 * - Uses numeric keyboardType ("number-pad") and shows a placeholder ("-") when a digit is absent.
 *
 * Notes:
 * - The component is controlled: the displayed digits are derived from the `value` prop.
 * - `value` is split into individual characters and truncated to `length`.
 * - The component does not validate characters beyond enforcing single-character inputs and using a numeric keyboard;
 *   callers should validate content (e.g., digits-only) before submitting.
 *
 * @param props - Component props
 * @param props.value - Current aggregated string value for the OTP inputs. Each character maps to one box.
 * @param props.onChange - Callback invoked with the updated aggregated value whenever any box changes.
 * @param props.length - Optional number of OTP boxes to display (default: 4).
 *
 * @returns A JSX element containing the OTP input boxes and a spacer.
 *
 * @example
 * // Controlled usage
 * const [code, setCode] = useState('');
 * <OtpBoxInput value={code} onChange={setCode} length={6} />;
 */
const OtpBoxInput: React.FC<Props> = ({ value, onChange, length = 4 }) => {
  const inputs = useRef<Array<TextInput | null>>([]);
  const [focusedIndex, setFocusedIndex] = useState<number | null>(null);
  const digits = value.split('').slice(0, length);

  useEffect(() => {
    if (value.length === 0) {
      inputs.current[0]?.focus();
    }
  }, [value]);

  const handleChange = (text: string, index: number) => {
    if (text.length > 1) return;

    const newDigits = [...digits];
    newDigits[index] = text;
    const newValue = newDigits.join('');
    onChange(newValue);

    if (text && index < length - 1) {
      inputs.current[index + 1]?.focus();
    }
  };

  const handleKeyPress = (
    e: { nativeEvent: { key: string } },
    index: number
  ) => {
    if (e.nativeEvent.key === 'Backspace' && !digits[index] && index > 0) {
      inputs.current[index - 1]?.focus();
    }
  };

  return (
    <>
    <View style={styles.container}>
      {Array.from({ length }).map((_, index) => (
        <TextInput
          key={index}
          ref={(ref) => { inputs.current[index] = ref; }}
          value={digits[index] || ''}
          onChangeText={(text) => handleChange(text, index)}
          onKeyPress={(e) => handleKeyPress(e, index)}
          onFocus={() => setFocusedIndex(index)}
          onBlur={() => setFocusedIndex(null)}
          keyboardType="number-pad"
          maxLength={1}
          style={[
            styles.input,
            focusedIndex === index && styles.inputFocused
          ]}
          placeholder="-"
          placeholderTextColor="#aaa"
        />
      ))}
    </View>
    <Spacer />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    // justifyContent: 'space-evenly',
    // width: '70%',
    alignSelf: 'center',
    columnGap: 15,
  },
  input: {
    width: 50,
    height: 50,
    borderWidth: 1,
    borderColor: "#404040",
    borderRadius: 10,
    textAlign: 'center',
    // justifyContent: 'center',
    // alignItems: 'center',
    // textAlign: 'center',
    fontSize: 24,
    color: '#000'
  },
  inputFocused: {
    borderColor: '#126415',
    borderWidth: 2,

  }
});

export default OtpBoxInput;