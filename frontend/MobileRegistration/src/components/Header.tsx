import React from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';

const Header: React.FC = () => (
  <View style={styles.header}>
    <Image source={require('../../assets/logo.png')} style={styles.logo} />
    <Text style={styles.title}>Log in</Text>
  </View>
);

const styles = StyleSheet.create({
  header: {
    alignItems: 'center',
    marginBottom: 40,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#4F8EF7',
    marginTop: 10,
  },
  logo: {
    width: 50,
    height: 50,
  },
});

export default Header;
