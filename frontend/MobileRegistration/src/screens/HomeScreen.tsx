import React, {useEffect, useState} from 'react';
import {View, Text, Button, StyleSheet, Alert} from 'react-native';
import AuthRepository from '../repositories/AuthRepository';
import OpenIARepository from '../repositories/OpenIARepository';

const useRandomText = () => {
  const [randomText, setRandomText] = useState('');

  useEffect(() => {
    if (!randomText) {
      const openIARepository = new OpenIARepository();
      openIARepository.fetchRandomText().then(text => {
        setRandomText(text);
      });
    }
  }, [randomText]);

  return randomText;
};

const HomeScreen = () => {
  const randomText = useRandomText();

  const handleLogout = async () => {
    const authRepository = new AuthRepository();
    await authRepository.logout();
    Alert.alert('Logged out', 'You have been logged out successfully', [
      {text: 'OK', onPress: () => console.log('OK Pressed')},
    ]);
  };

  return (
    <View style={styles.container}>
      <View style={styles.logoutButtonContainer}>
        <Button title="Logout" onPress={handleLogout} color="#1E90FF" />
      </View>
      <View style={styles.contentContainer}>
        <Text style={styles.title}>
          {randomText !== ''
            ? 'We generated for you a random text'
            : 'We are generating a random text for you'}
        </Text>
        <Text style={styles.randomText}>{randomText}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    backgroundColor: '#F5F5F5',
  },
  logoutButtonContainer: {
    position: 'absolute',
    top: 40,
    right: 20,
  },
  contentContainer: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 16,
    width: '100%',
    maxWidth: 600,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: {width: 0, height: 2},
    shadowRadius: 8,
    elevation: 5,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#333',
  },
  randomText: {
    fontSize: 18,
    color: '#666',
  },
});

export default HomeScreen;
