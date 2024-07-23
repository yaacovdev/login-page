import React, {useState} from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import AuthRepository from '../repositories/AuthRepository'; // Ensure this path is correct
import {useNavigation, NavigationProp} from '@react-navigation/native';

interface LoginButtonProps {
  disabled: boolean;
  email: string;
  password: string;
  label: string;
}

const LoginButton: React.FC<LoginButtonProps> = ({
  disabled,
  email,
  password,
  label,
}) => {
  const [error, setError] = useState<string | null>(null);
  const navigation = useNavigation<NavigationProp<any>>();

  const handleSubmit = () => {
    const authRepository = new AuthRepository();
    if (label === 'Log in') {
      authRepository.login(email, password).then(res => {
        if (res !== true) {
          setError(`Login failed \n${res}`);
        } else {
          navigation.navigate('Home');
        }
      });
    } else {
      authRepository.register(email, password).then(res => {
        if (res !== true) {
          setError(`Registration failed \n${res}`);
        } else {
          // Handle successful registration, e.g., navigate to another screen
        }
      });
    }
  };

  return (
    <View style={styles.container}>
      {error && <Text style={styles.errorText}>{error}</Text>}
      <TouchableOpacity
        style={[styles.button, disabled && styles.disabledButton]}
        onPress={handleSubmit}
        disabled={disabled}>
        <Text style={styles.buttonText}>{label}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginBottom: 10,
  },
  errorText: {
    color: 'red',
    marginBottom: 10,
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#3498db',
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  disabledButton: {
    backgroundColor: '#95a5a6',
  },
});

export default LoginButton;
