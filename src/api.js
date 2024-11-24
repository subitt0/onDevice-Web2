import axios from 'axios';

const fetchChatGPTResponse = async (message) => {
  try {
    const response = await axios.post(
      'https://api.openai.com/v1/chat/completions',
      {
        model: 'gpt-3.5-turbo', // 원하는 모델
        messages: [{ role: 'user', content: message }],
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${process.env.REACT_APP_OPENAI_API_KEY}`,
        },
      }
    );
    return response.data.choices[0].message.content;
  } catch (error) {
    console.error('Error fetching ChatGPT response:', error);
    return '죄송합니다, 요청을 처리할 수 없습니다.';
  }
};

export default fetchChatGPTResponse;
