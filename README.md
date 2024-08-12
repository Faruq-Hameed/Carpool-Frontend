
# CarpoolApp

## Project Overview

CarpoolApp is a mobile application designed to make carpooling more accessible and convenient. Users can sign up, log in, and verify their accounts to start carpooling with others in their community. The app aims to provide a seamless experience for users to find or offer carpool rides, reducing travel costs and environmental impact.

### Key Features

- **User Authentication:** Users can sign up, log in, and verify their accounts using OTP (One-Time Password) verification.
- **Ride Matching:** Users can find or offer carpool rides based on their location and preferences.
- **Account Recovery:** Users can recover their accounts if they forget their login details.

## Current Progress

### Frontend Development

We are developing the frontend using **React Native** with the following screens:

1. **SplashScreen:** Initial loading screen that appears when the app starts.
2. **WelcomeScreen:** A welcoming interface where users can either sign up or log in.
3. **SignUpScreen:** Allows new users to sign up by providing necessary details.
4. **LoginScreen:** Existing users can log in using their phone number.
5. **VerifyAccountScreen:** Users can verify their account using the OTP sent to their phone.
6. **RecoverAccountScreen:** Helps users recover their account by verifying their identity with an OTP.
7. **ResetAccountScreen:** Allows users to reset their account if necessary.

### Navigation

The app uses **React Navigation** for managing transitions between different screens. The current navigation stack is as follows:

- **SplashScreen** (initial route, no header)
- **WelcomeScreen** (no header)
- **SignUpScreen** (no header)
- **LoginScreen** (no header)
- **VerifyAccountScreen** (no header)
- **ResetAccountScreen** (no header)
- **RecoverAccountScreen** (no header)

### Package Details

Below are the key dependencies used in the project:

- **@react-navigation/native**: For handling navigation within the app.
- **@react-navigation/stack**: For stack-based navigation.
- **axios**: For making HTTP requests, such as to the backend for user authentication.
- **expo**: The framework for building the app.
- **react**: The core library for building user interfaces.
- **react-native**: The framework for building mobile applications.
- **react-native-safe-area-context**: For handling safe area views on different devices.
- **react-native-screens**: For optimizing navigation performance by using native screen components.

### Development Commands

To get started with the project, you can use the following commands:

- `npm start`: Starts the development server.
- `npm run android`: Runs the app on an Android emulator or connected device.
- `npm run ios`: Runs the app on an iOS emulator or connected device.
- `npm run web`: Runs the app in a web browser.

## Next Steps

- Implement additional screens like `ProfileScreen`, `RideDetailsScreen`, and `RideBookingScreen`.
- Integrate backend APIs for user authentication, ride matching, and notifications.
- Enhance the UI/UX based on user feedback.
