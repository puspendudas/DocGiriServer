import { randomBytes } from 'crypto';

class ApiKeyGenerator {
  static generateApiKey(length: number = 32): string {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    let apiKey = '';

    // Generate secure random bytes
    const randomBytesArray = randomBytes(length);

    // Use the random bytes to generate the API key
    for (let i = 0; i < length; i++) {
      const randomIndex = randomBytesArray[i] % charactersLength;
      apiKey += characters.charAt(randomIndex);
    }

    return apiKey;
  }
}

export default ApiKeyGenerator
