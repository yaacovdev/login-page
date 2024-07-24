import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Alert,
  StyleSheet,
  Image,
} from 'react-native';
import tailwind from 'tailwind-rn';

import {NavigationProp, RouteProp} from '@react-navigation/native';
import CustomTextInput from '../components/CustomTextInput';
import LoginButton from '../components/LoginButton';
import SocialButton from '../components/SocialButton';

const googleImage = require('../../assets/Google.png');
const facebookImage = require('../../assets/Facebook.png');
const logo = require('../../assets/logo.png');
type LoginScreenProps = {
  navigation: NavigationProp<any>;
  route: RouteProp<any, any>;
};

const LoginScreen: React.FC<LoginScreenProps> = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isEmailValid, setIsEmailValid] = useState(false);

  const [isRegisterPage, setIsRegisterPage] = useState(false);

  const handleEmailChange = (text: string) => {
    setEmail(text);
    setIsEmailValid(validateEmail(text));
  };

  const validateEmail = (newEmail: string) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(newEmail);
  };

  const handlePageChange = () => {
    setIsRegisterPage(!isRegisterPage);
  };

  return (
    <View style={tailwind('p-9 flex justify-center bg-white w-full h-full')}>
      <View style={tailwind('flex-row justify-center')}>
        <Image source={logo} style={tailwind('')} />
      </View>
      <Text style={tailwind('font-semibold text-center text-xl mt-10')}>
        {isRegisterPage ? 'Register' : 'Log in'}
      </Text>

      <View style={tailwind('mt-12 w-full')}>
        <CustomTextInput
          placeholder="Email"
          icon="mail"
          value={email}
          onChange={handleEmailChange}
        />
        <CustomTextInput
          placeholder="Password"
          icon="lock"
          secureTextEntry
          value={password}
          onChange={e => setPassword(e)}
        />
        <TouchableOpacity
          onPress={() =>
            Alert.alert('Forgot Password', 'Redirect to forgot password screen')
          }
          style={tailwind('flex-row justify-end mb-4')}>
          <Text style={(tailwind('text-sm'), {color: '#3949AB'})}>
            Forgot password?
          </Text>
        </TouchableOpacity>

        <LoginButton
          label={isRegisterPage ? 'Register' : 'Log in'}
          disabled={!isEmailValid}
          email={email}
          password={password}
        />
      </View>
      <View
        style={tailwind(`flex flex-row items-center justify-center ml-8 mr-8`)}>
        <View style={tailwind('flex-1 h-px bg-gray-400 mr-2')} />
        <Text style={tailwind('text-gray-500 text-center text-lg')}>Or</Text>
        <View style={tailwind('flex-1 h-px bg-gray-400 ml-2')} />
      </View>

      <View style={tailwind('flex flex-row  justify-between mt-2')}>
        <SocialButton label={'Google'} imagePath={googleImage} />

        <SocialButton label={'Facebook'} imagePath={facebookImage} />
      </View>
      <View style={tailwind('mt-4 text-center')}>
        <Text style={tailwind('text-gray-500 text-center text-sm mb-3')}>
          {!isRegisterPage
            ? 'Have no account yet?'
            : 'Already have an account?'}
        </Text>
        <TouchableOpacity
          onPress={() => handlePageChange()}
          style={(tailwind('mt-4'), styles.button)}>
          <Text style={tailwind('text-blue-600 text-center')}>
            {isRegisterPage ? 'Log in' : 'Register'}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  button: {
    paddingVertical: 8,
    paddingHorizontal: 25,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    borderColor: '#3949AB',
    borderWidth: 1,
  },
  buttonText: {
    color: '#3949AB',
    fontSize: 16,
  },
  disabledButton: {
    backgroundColor: '#3949AB',
  },
});

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
