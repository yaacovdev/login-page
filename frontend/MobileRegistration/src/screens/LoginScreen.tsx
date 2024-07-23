import React, {useState} from 'react';
import {View, Text, TextInput, TouchableOpacity, Alert} from 'react-native';
import tailwind from 'tailwind-rn';

import {NavigationProp, RouteProp} from '@react-navigation/native';

// ...

type LoginScreenProps = {
  navigation: NavigationProp<any>;
  route: RouteProp<any, any>;
};

const LoginScreen: React.FC<LoginScreenProps> = ({navigation, route}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isEmailValid, setIsEmailValid] = useState(false);

  const isRegisterPage = route.name === 'Register';

  const handleEmailChange = (text: string) => {
    setEmail(text);
    setIsEmailValid(validateEmail(text));
  };

  const validateEmail = (newEmail: string) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(newEmail);
  };

  const handleLoginRegister = () => {
    if (isEmailValid && password) {
      Alert.alert(isRegisterPage ? 'Register' : 'Log in', 'Success');
    } else {
      Alert.alert('Error', 'Please enter valid email and password');
    }
  };

  return (
    <View style={tailwind('p-9 flex justify-center bg-white')}>
      <Text style={tailwind('font-semibold text-center text-xl')}>
        {isRegisterPage ? 'Register' : 'Log in'}
      </Text>

      <View style={tailwind('mt-12')}>
        <TextInput
          placeholder="Email"
          style={tailwind('border p-2 rounded mb-4')}
          value={email}
          onChangeText={handleEmailChange}
          keyboardType="email-address"
          autoCapitalize="none"
        />
        <TextInput
          placeholder="Password"
          style={tailwind('border p-2 rounded mb-4')}
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />

        <TouchableOpacity
          onPress={() =>
            Alert.alert('Forgot Password', 'Redirect to forgot password screen')
          }
          style={tailwind('items-center justify-end text-sm mb-4')}>
          <Text>Forgot password?</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={handleLoginRegister}
          style={tailwind(
            `bg-blue-600 p-4 rounded ${!isEmailValid ? 'bg-opacity-50' : ''}`,
          )}
          disabled={!isEmailValid}>
          <Text style={tailwind('text-white text-center')}>
            {isRegisterPage ? 'Register' : 'Log in'}
          </Text>
        </TouchableOpacity>
      </View>

      <View style={tailwind('flex flex-row justify-center mt-4')}>
        <TouchableOpacity
          onPress={() =>
            Alert.alert('Google Login', 'Redirect to Google login')
          }
          style={tailwind('mr-2')}>
          <Text style={tailwind('text-center')}>Google</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() =>
            Alert.alert('Facebook Login', 'Redirect to Facebook login')
          }
          style={tailwind('ml-2')}>
          <Text style={tailwind('text-center')}>Facebook</Text>
        </TouchableOpacity>
      </View>

      {!isRegisterPage && (
        <View style={tailwind('mt-4 text-center')}>
          <Text style={tailwind('text-gray-500 text-center text-sm')}>
            Have no account yet?{' '}
          </Text>
          <TouchableOpacity
            onPress={() => navigation.navigate('Register')}
            style={tailwind('mt-2')}>
            <Text style={tailwind('text-blue-600 text-center')}>Register</Text>
          </TouchableOpacity>
        </View>
      )}

      {isRegisterPage && (
        <View style={tailwind('mt-4 text-center')}>
          <Text style={tailwind('text-gray-500 text-center text-sm')}>
            Already have an account?{' '}
          </Text>
          <TouchableOpacity
            onPress={() => navigation.navigate('Login')}
            style={tailwind('mt-2')}>
            <Text style={tailwind('text-blue-600 text-center')}>Login</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

export default LoginScreen;

// import React from 'react';
// import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
// import Header from '../components/Header';
// import CustomTextInput from '../components/CustomTextInput';
// import CustomButton from '../components/CustomButton';

// const LoginScreen: React.FC = () => {
//   return (
//     <View style={styles.container}>
//       <Header />
//       <View style={styles.inputContainer}>
//         <CustomTextInput placeholder="Email" icon="mail" />
//         <CustomTextInput placeholder="Password" icon="lock" secureTextEntry />
//         <TouchableOpacity>
//           <Text style={styles.forgotPassword}>Forgot password?</Text>
//         </TouchableOpacity>
//       </View>
//       <CustomButton text="Log in" />
//       <Text style={styles.orText}>Or</Text>
//       <View style={styles.socialButtonsContainer}>
//         <CustomButton
//           text="Google"
//           icon="logo-google"
//           buttonStyle={styles.googleButton}
//         />
//         <CustomButton
//           text="Facebook"
//           icon="logo-facebook"
//           buttonStyle={styles.facebookButton}
//         />
//       </View>
//       <View style={styles.registerContainer}>
//         <Text>Have no account yet?</Text>
//         <TouchableOpacity>
//           <Text style={styles.registerText}>Register</Text>
//         </TouchableOpacity>
//       </View>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//     paddingHorizontal: 20,
//   },
//   inputContainer: {
//     width: '100%',
//     marginBottom: 20,
//   },
//   forgotPassword: {
//     color: '#4F8EF7',
//     textAlign: 'right',
//   },
//   orText: {
//     marginVertical: 10,
//     color: '#aaa',
//   },
//   socialButtonsContainer: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     width: '100%',
//   },
//   googleButton: {
//     backgroundColor: '#db4437',
//     flex: 1,
//     marginRight: 5,
//   },
//   facebookButton: {
//     backgroundColor: '#3b5998',
//     flex: 1,
//     marginLeft: 5,
//   },
//   registerContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginTop: 20,
//   },
//   registerText: {
//     color: '#4F8EF7',
//     marginLeft: 5,
//   },
// });

// export default LoginScreen;
