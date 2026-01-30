const API_URL = 'http://localhost:5000/api/ai';

export const voiceChat = async (message, conversationHistory = []) => {
  try {
    const response = await fetch(`${API_URL}/voice-chat`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        message,
        conversationHistory
      })
    });

    if (!response.ok) {
      throw new Error('Failed to communicate with JARVIS');
    }

    return await response.json();
  } catch (error) {
    console.error('Voice chat error:', error);
    throw error;
  }
};

export const detectIntent = async (message) => {
  try {
    const response = await fetch(`${API_URL}/detect-intent`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ message })
    });

    return await response.json();
  } catch (error) {
    console.error('Intent detection error:', error);
    throw error;
  }
};