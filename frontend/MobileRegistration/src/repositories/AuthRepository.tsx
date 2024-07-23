import axios from 'axios';
import * as Keychain from 'react-native-keychain';
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
          await Keychain.setGenericPassword('email', response.data.token);
          console.log('Login successful');
          const credentials = await Keychain.getGenericPassword();
          console.log('Token:', credentials);
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
          await Keychain.setGenericPassword(email, response.data.token);
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

  async logout(): Promise<void> {
    try {
      await Keychain.resetGenericPassword();
      await this.axiosInstance.get('/logout');
      console.log('Logging out');
    } catch (error) {
      console.error('Error occurred during logout:', error);
    }
  }
}

export default AuthRepository;
