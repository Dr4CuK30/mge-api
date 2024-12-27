export default () => ({
  redis: {
    port: +process.env.REDIS_PORT,
    host: process.env.REDIS_HOST,
    url: process.env.REDIS_URL,
  },
});
