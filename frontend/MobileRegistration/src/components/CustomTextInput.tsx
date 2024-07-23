import React, {useState} from 'react';
import {
  View,
  TextInput,
  Image,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

interface CustomTextInputProps {
  placeholder: string;
  icon: keyof typeof icons;
  secureTextEntry?: boolean;
  value?: string;
  onChange?: (text: string) => void;
}

const icons = {
  mail: require('../../assets/mail.png'), // Ensure you have these icons in your project
  eye: require('../../assets/eye.png'),
  eyeOff: require('../../assets/eye-off.png'),
  lock: require('../../assets/lock.png'),
};

const CustomTextInput: React.FC<CustomTextInputProps> = ({
  placeholder,
  icon,
  secureTextEntry = false,
  value,
  onChange,
}) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(!secureTextEntry);

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  return (
    <View style={styles.container}>
      <Image source={icons[icon]} style={styles.icon} />
      <TextInput
        placeholder={placeholder}
        secureTextEntry={secureTextEntry && !isPasswordVisible}
        value={value}
        onChangeText={onChange}
        style={styles.input}
      />
      {secureTextEntry && (
        <TouchableOpacity onPress={togglePasswordVisibility}>
          <Image
            source={isPasswordVisible ? icons.eye : icons.eyeOff}
            style={styles.icon}
          />
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  icon: {
    width: 20,
    height: 20,
    marginRight: 10,
  },
  input: {
    flex: 1,
    paddingVertical: 10,
  },
});

export default CustomTextInput;

// import React, {useState} from 'react';
// import {View, TextInput, TextInputProps, Image, StyleSheet} from 'react-native';

// interface CustomTextInputProps extends TextInputProps {
//   placeholder: string;
//   icon: keyof typeof icons; // Use keyof to enforce icon keys
//   secureTextEntry?: boolean;
// }

// const icons = {
//   mail: require('../../assets/mail.png'),
//   eye: require('../../assets/eye.png'),
//   eyeOff: require('../../assets/eye-off.png'),
//   lock: require('../../assets/lock.png'),
// };

// const CustomTextInput: React.FC<CustomTextInputProps> = ({
//   placeholder,
//   icon,
//   secureTextEntry = false,
//   ...rest
// }) => {
//   const [isPasswordVisible, _] = useState(!secureTextEntry);

//   return (
//     <View style={styles.inputContainer}>
//       <Image source={icons[icon]} style={styles.icon} />
//       <TextInput
//         placeholder={placeholder}
//         secureTextEntry={secureTextEntry && !isPasswordVisible}
//         style={styles.textInput}
//         {...rest}
//       />
//       {secureTextEntry && (
//         <Image
//           source={icons[isPasswordVisible ? 'eye' : 'eyeOff']}
//           style={styles.eyeIcon}
//         />
//       )}
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   inputContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     borderWidth: 1,
//     borderColor: '#ccc',
//     borderRadius: 8,
//     paddingHorizontal: 10,
//     marginBottom: 15,
//   },
//   icon: {
//     width: 20,
//     height: 20,
//     marginRight: 10,
//   },
//   textInput: {
//     flex: 1,
//     paddingVertical: 10,
//     paddingHorizontal: 5,
//   },
//   eyeIcon: {
//     marginLeft: 10,
//   },
// });

// export default CustomTextInput;
