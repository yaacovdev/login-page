import React, {useState} from 'react';
import {
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Modal,
  View,
} from 'react-native';
import AuthRepository from '../repositories/AuthRepository'; // Adjust the path as needed
import {WebView} from 'react-native-webview';
import DeviceInfo from 'react-native-device-info';

interface SocialButtonProps {
  label: string;
  imagePath: any;
}

const SocialButton: React.FC<SocialButtonProps> = ({label, imagePath}) => {
  const [authUrl, setAuthUrl] = useState('');
  const [modalVisible, setModalVisible] = useState(false);

  const handleLogin = async () => {
    const authRepository = new AuthRepository();
    const deviceId = await DeviceInfo.getUniqueId();
    const deviceName = await DeviceInfo.getDeviceName();
    if (label === 'Google') {
      setAuthUrl(
        authRepository.AUTH_API_URL +
          `/login/google?device_id=${deviceId}&device_name=${deviceName}`,
      );
      setModalVisible(true);
    } else if (label === 'Facebook') {
      setAuthUrl(authRepository.AUTH_API_URL + '/login/facebook');
      setModalVisible(true);
    }
  };

  return (
    <View>
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Image source={imagePath} style={styles.icon} />
        <Text style={styles.label}>{label}</Text>
      </TouchableOpacity>
      <Modal
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
        animationType="slide">
        <WebView
          source={{uri: authUrl}}
          onNavigationStateChange={event => {
            if (event.url.includes('/oauth2callback')) {
              setModalVisible(false);
            }
          }}
          onError={event => {
            console.error('WebView error: ', event.nativeEvent);
          }}
        />
        <Text onPress={() => setModalVisible(false)} style={styles.closeButton}>
          Close
        </Text>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#1e90ff',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 25,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
    marginVertical: 5,
  },
  icon: {
    width: 20,
    height: 20,
    marginRight: 10,
  },
  label: {
    color: '#1e90ff',
    fontWeight: 'bold',
    fontSize: 14,
  },
  closeButton: {
    margin: 10,
    padding: 10,
    backgroundColor: 'red',
    color: 'white',
    textAlign: 'center',
  },
});

export default SocialButton;
