import axios from 'axios';

class OpenIARepository {
  async fetchRandomText() {
    try {
      const response = await axios.get('http://10.0.2.2:3001/random-text');
      return response.data.response.message.content;
    } catch (error) {
      console.error('Error fetching random text:', error);
    }
  }
}

export default OpenIARepository;
