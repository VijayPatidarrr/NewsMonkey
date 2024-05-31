import axios from 'axios';

export const handler = async (event) => {
  const { country = 'in', category = 'general', pageSize = 5 } = event.queryStringParameters;
  const apiKey = process.env.NEWS_API_KEY;

  const url = `https://newsapi.org/v2/top-headlines?country=${country}&category=${category}&apiKey=${apiKey}&pageSize=${pageSize}`;

  try {
    const response = await axios.get(url);
    return {
      statusCode: 200,
      body: JSON.stringify(response.data),
    };
  } catch (error) {
    console.error(error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed to fetch news' }),
    };
  }
};
