import OpenAI from 'openai';
import dotenv from 'dotenv';

export const SYSTEM_PROMPT = 'The following is a conversation with a social media manager. The user below will enter in the entire post history of an individual. Do not include hashtags. Keep the character count under 300. Do not add whitespace. Generate the next post.';

dotenv.config();

const { 
  OPENAI_BASEURL,
  OPENAI_MODEL 
} = process.env;


const client = new OpenAI({
  baseURL: OPENAI_BASEURL,
  apiKey: 'sk-1234',
});



export const generateChat = async (contentPosts: string) => {

  const chat = await client.chat.completions.create({
    model: OPENAI_MODEL as string,
    messages: [
      {
        role: 'system',
        content: SYSTEM_PROMPT
      },
      {
        role: 'user',
        content: 'Given the following posts: ' + contentPosts + '. Generate the next post.'
      }
    ],
  });

  return chat;

}