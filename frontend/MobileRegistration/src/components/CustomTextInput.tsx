import React, {useState} from 'react';
import {View, TextInput, TextInputProps, Image, StyleSheet} from 'react-native';

interface CustomTextInputProps extends TextInputProps {
  placeholder: string;
  icon: keyof typeof icons; // Use keyof to enforce icon keys
  secureTextEntry?: boolean;
}

const icons = {
  mail: require('../../assets/mail.png'),
  eye: require('../../assets/eye.png'),
  eyeOff: require('../../assets/eye-off.png'),
  lock: require('../../assets/lock.png'),
};

const CustomTextInput: React.FC<CustomTextInputProps> = ({
  placeholder,
  icon,
  secureTextEntry = false,
  ...rest
}) => {
  const [isPasswordVisible, _] = useState(!secureTextEntry);

  return (
    <View style={styles.inputContainer}>
      <Image source={icons[icon]} style={styles.icon} />
      <TextInput
        placeholder={placeholder}
        secureTextEntry={secureTextEntry && !isPasswordVisible}
        style={styles.textInput}
        {...rest}
      />
      {secureTextEntry && (
        <Image
          source={icons[isPasswordVisible ? 'eye' : 'eyeOff']}
          style={styles.eyeIcon}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 15,
  },
  icon: {
    width: 20,
    height: 20,
    marginRight: 10,
  },
  textInput: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 5,
  },
  eyeIcon: {
    marginLeft: 10,
  },
});

export default CustomTextInput;
