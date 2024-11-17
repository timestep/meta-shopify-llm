import dotenv from 'dotenv';
dotenv.config();

const { 
  SHOPIFY_ACCESS_TOKEN, 
  SHOPIFY_URL
} = process.env;

const shopUrl = SHOPIFY_URL;
const accessToken = SHOPIFY_ACCESS_TOKEN;
const apiUrl = `https://${shopUrl}/api/2021-07/products.json`;

if (!accessToken) {
  throw new Error('Missing required environment variable: SHOPIFY_ACCESS_TOKEN');
}

export const shopifyPullProducts = async () => {
  try {
    const response = await fetch(apiUrl, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'X-Shopify-Access-Token': accessToken,
      },
    });
    
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const contentType = response.headers.get('content-type');
    if (!contentType || !contentType.includes('application/json')) {
      throw new Error('Received non-JSON response');
    }

    const products = await response.json();
    return products;
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error;
  }
};