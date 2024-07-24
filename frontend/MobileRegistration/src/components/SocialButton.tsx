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
import {useAuth0} from 'react-native-auth0';

interface SocialButtonProps {
  label: string;
  imagePath: any;
}

const SocialButton: React.FC<SocialButtonProps> = ({label, imagePath}) => {
  const [authUrl, setAuthUrl] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const {authorize} = useAuth0();

  const handleLogin = async () => {
    const authRepository = new AuthRepository();
    const deviceId = await DeviceInfo.getUniqueId();
    const deviceName = await DeviceInfo.getDeviceName();
    if (label === 'Google') {
      try {
        await authorize();
      } catch (e) {
        console.log(e);
      }
    } else if (label === 'Facebook') {
      setAuthUrl(authRepository.AUTH_API_URL + '/login/facebook');
      setModalVisible(true);
    }
  };

  return (
    <View style={styles.container}>
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
  container: {
    width: '48%',
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#3949AB',
    paddingVertical: 8,
    borderRadius: 25,
    width: '100%',
  },
  buttonClicked: {
    backgroundColor: '#3949AB',
  },
  icon: {
    width: 20,
    height: 20,
    marginRight: 10,
  },
  label: {
    color: '#3949AB',
    fontWeight: 'medium',
    fontSize: 14,
  },
  closeButton: {
    margin: 10,
    padding: 10,
    backgroundColor: 'red',
    color: 'white',
    textAlign: 'center',
    borderRadius: 25,
  },
});

export default SocialButton;
