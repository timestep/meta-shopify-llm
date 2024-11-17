import { shopifyPullProducts } from "./shopify";



const main = async () => {

  const pullProducts = await shopifyPullProducts()

  console.log(pullProducts);

  // const contentPosts = await pullFacebookPosts()
  // const chat = await generateChat(contentPosts)

  // console.log(chat.choices[0].message.content);

}

export { main };