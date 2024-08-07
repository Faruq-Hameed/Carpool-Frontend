// import React, {useState} from "react";
// import{View, Text, TextInput, StyleSheet, Button, Alert} from 'react-native'


// const LoginScreen = ({navigate}) =>{

//     return (
//       <View style={styles.container}>
//         <View>
//           <Text>Login</Text>
//           <Text>Don't have an account? <Text>Register</Text></Text>
//         </View>
//         <View>
//             <View>
//                 <Text>Email</Text>
//                 <View>
//                     <TextInput
//                     placeholder="+234"
//                     editable={false}
//                     />
//                     <TextInput placeholder="08100004921" 
//                     keyboardType="phone-pad"
//                     value="email@example.com"
//                     />
//                 </View>
//             </View>
//             <View style={styles.button}>
//             <Button  title="Login" onPress={console.log('login')}/> 
//             </View>
//         </View>
//       </View>
//     );
// }

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         justifyContent: "center",
//         alignItems: "center",
//         padding: 20,
//         backgroundColor: "#fff",
//       },
//       inputContainer: {
//         // flexDirection: "column",
//         height: 70,
//         width: "100%",
//       },
//       input: {
//         width: "100%",
//         padding: 10,
//         marginBottom: 10,
//         borderWidth: 1,
//         borderColor: "#ced4da",
//         borderRadius: 5,
//       },
//       button: {
//         width: "100%",
//         backgroundColor: "#4CAF50",
//         borderRadius: 8,
//         padding: 10,
//       },
// });

// export default LoginScreen;


import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';

const LoginScreen = ({ navigation }) => {
  const [phoneNumber, setPhoneNumber] = useState('');

  const handleLogin = () => {
    // Navigate to Verify Account screen
    navigation.navigate('VerifyAccount');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <Text style={styles.subtitle}>
        Don't have an account?{" "}
        <Text onPress={() => navigation.navigate("SignUp")} style={styles.link}>
          Register
        </Text>
      </Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.numberCode}
          placeholder="+234"
          keyboardType="phone-pad"
        />
        <TextInput
          style={styles.input}
          placeholder="Phone Number"
          keyboardType="phone-pad"
          value={phoneNumber}
          onChangeText={setPhoneNumber}
        />
      </View>
      <View style={styles.button}>
        <Button title="Sign up" onPress={handleLogin} color="#fff" />
      </View>
    </View>
  );
};

// Styles for the sign-up screen
const styles = StyleSheet.create({
  container: {
    flex: 1,
    //   justifyContent: 'center',
    // alignItems: "center",
    padding: 20,
    paddingVertical: 100,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
    borderStyle: "solid",
  },
  link: {
    color: "#4CAF50",
    marginBottom: 20,
  },
  inputContainer: {
    flexDirection: "row",
      height: 50,
    width: "100%",
    borderWidth: 1,
    borderColor: "#ced4da",
    borderRadius: 5,
    marginBottom: 40,
    marginTop: 50,
  },
  numberCode: {
    padding: 10,
  },
  input: {
    marginBottom: 10,
    borderLeftWidth: 1,
    height: "100%",
    borderLeftColor: "#ced4da",
    paddingLeft: 10,
  },
  button: {
    width: "100%",
    backgroundColor: "#4CAF50",
    borderRadius: 8,
    padding: 10,
  },
});
export default LoginScreen;
