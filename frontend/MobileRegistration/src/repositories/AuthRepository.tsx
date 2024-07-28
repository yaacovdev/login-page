import axios from 'axios';
import Keychain from 'react-native-keychain';
class AuthRepository {
  public AUTH_API_URL = process.env.AUTH_API_URL || 'http://10.0.2.2:5000/auth';
  private axiosInstance = axios.create({
    baseURL: this.AUTH_API_URL,
  });

  async login(email: string, password: string): Promise<any> {
    try {
      const response = await this.axiosInstance.post('/login', {
        email,
        password,
      });

      if (response.status === 200) {
        if (response.data.token) {
          await Keychain.setGenericPassword('email', response.data.token, {
            accessible: Keychain.ACCESSIBLE.WHEN_UNLOCKED_THIS_DEVICE_ONLY,
            service: 'authToken',
          });
        }
        return true;
      } else if (response.status === 209) {
        return response.data.message;
      } else {
        return response.data;
      }
    } catch (error) {
      console.error('Error occurred during login:', error);
      return false;
    }
  }

  async register(email: string, password: string): Promise<any> {
    try {
      const response = await this.axiosInstance.post('/register', {
        email,
        password,
      });

      if (response.status === 201) {
        if (response.data.token) {
          await Keychain.setGenericPassword(email, response.data.token, {
            accessible: Keychain.ACCESSIBLE.WHEN_UNLOCKED_THIS_DEVICE_ONLY,
            service: 'authToken',
          });
        }
        return true;
      } else if (response.status === 209) {
        return response.data.message;
      } else {
        return response.data;
      }
    } catch (error) {
      console.error('Error occurred during registration:', error);
      return false;
    }
  }

  async handleGoogleLogin(userInfo: any): Promise<void> {
    try {
      const response = await this.axiosInstance.post('/login/google', {
        email: userInfo.user.email,
        name: userInfo.user.name,
        sub: userInfo.user.sub,
      });

      if (response.status === 200) {
        if (response.data.token) {
          await Keychain.setGenericPassword(
            userInfo.user.email,
            response.data.token,
            {
              accessible: Keychain.ACCESSIBLE.WHEN_UNLOCKED_THIS_DEVICE_ONLY,
              service: 'authToken',
            },
          );
        }
      }
    } catch (error) {
      console.error('Error occurred during Google login:', error);
    }
  }

  async logout(): Promise<void> {
    try {
      await Keychain.resetGenericPassword({service: 'authToken'});
      await this.axiosInstance.get('/logout');
    } catch (error) {
      console.error('Error occurred during logout:', error);
    }
  }
}

export default AuthRepository;
