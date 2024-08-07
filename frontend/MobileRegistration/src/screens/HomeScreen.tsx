import React, {useEffect, useState} from 'react';
import {View, Text, Button, StyleSheet, Alert, TouchableOpacity} from 'react-native';
import {NavigationProp, CommonActions} from '@react-navigation/native';
import AuthRepository from '../repositories/AuthRepository';
import OpenIARepository from '../repositories/OpenIARepository';

const useRandomText = () => {
  const [randomText, setRandomText] = useState('');

  useEffect(() => {
    const fetchText = async () => {
      const openIARepository = new OpenIARepository();
      const text = await openIARepository.fetchRandomText();
      setRandomText(text);
    };

    if (!randomText) {
      fetchText();
    }
  }, [randomText]);

  return randomText;
};

type HomeScreenProps = {
  navigation: NavigationProp<any>;
};

const HomeScreen: React.FC<HomeScreenProps> = ({navigation}) => {
  const randomText = useRandomText();

  const handleLogout = async () => {
    const authRepository = new AuthRepository();
    try {
      await authRepository.logout();
      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{name: 'Login'}],
        }),
      );
      // navigation.navigate('Home', {screen: 'Login'});
    } catch (error: any) {
      Alert.alert('Error', error.message || 'An error occurred');
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.logoutButton}  onPress={handleLogout}>
        <Text style={styles.buttonText}>Logout</Text>
      </TouchableOpacity>
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
  logoutButton: {
    position: 'absolute',
    top: 40,
    right: 20,
    backgroundColor: '#3949AB',
    paddingHorizontal: 16,
    paddingVertical: 8,
    alignItems: 'center',
    borderRadius: 25,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
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
