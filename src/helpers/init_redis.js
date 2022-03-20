import { createClient } from 'redis';
import dotenv from 'dotenv';

dotenv.config()

const REDIS_CLOUD_URL = process.env.REDIS_CLOUD_URL ;
console.log(REDIS_CLOUD_URL)

let client = createClient({
  url: REDIS_CLOUD_URL
});


(async () => {

  await client.connect()

  client.on('connect', () => console.log('Client connected to redis...'));
  
  client.on('ready', () => console.log('Client connected to redis and ready to use...'));
  
  client.on('error', (err) => console.log(err.message));
  
  client.on('end', () => console.log('Client disconnected from redis'));
  
  process.on('SIGINT', () => client.quit());
  
  await client.set('key', 'value');
  const value = await client.get('key');
  console.log(value);
})()

export default client;