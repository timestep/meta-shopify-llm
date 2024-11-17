import dotenv from 'dotenv';
dotenv.config();

const { 
  FACEBOOK_USER_ACCESS_TOKEN, 
  // FACEBOOK_APP_ID,
  FACEBOOK_PAGE_ID, 
  FACEBOOK_USER_ID,
} = process.env;
const FACEBOOK_URL = `https://graph.facebook.com/${FACEBOOK_USER_ID}/accounts?access_token=${FACEBOOK_USER_ACCESS_TOKEN}`

export const pullFacebookPosts = async () => {

  const response = await fetch(FACEBOOK_URL)
  const {data} = await response.json()

  const pageAccessToken = data.find((page: any) => page.id === FACEBOOK_PAGE_ID).access_token

  const pageFeed = await fetch(`https://graph.facebook.com/v21.0/${FACEBOOK_PAGE_ID}/feed?access_token=${pageAccessToken}`);

  const feed = await pageFeed.json()
  const contentPosts = feed.data.map((post: any) => post.message).join(',')

  return contentPosts
}