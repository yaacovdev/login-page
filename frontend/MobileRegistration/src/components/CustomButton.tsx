import React from 'react';
import {TouchableOpacity, Text, StyleSheet, ViewStyle} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

interface CustomButtonProps {
  text: string;
  icon?: string;
  buttonStyle?: ViewStyle;
}

const CustomButton: React.FC<CustomButtonProps> = ({
  text,
  icon,
  buttonStyle,
}) => (
  <TouchableOpacity style={[styles.button, buttonStyle]}>
    {icon && (
      <Icon name={icon} size={20} color="#fff" style={styles.buttonIcon} />
    )}
    <Text style={styles.buttonText}>{text}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#4F8EF7',
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 10,
  },
  buttonIcon: {
    marginRight: 10,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default CustomButton;
