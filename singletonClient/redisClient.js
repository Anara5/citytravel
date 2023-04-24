const redis = require('ioredis');
const { REDIS_URL, REDIS_PORT } = require('../config/config');

let redisClient = null;

function getRedisClient() {
    if (!redisClient) {
        redisClient = redis.createClient({
            host: REDIS_URL,
            port: REDIS_PORT,
        });
        redisClient.on('error', (error) => {
            console.error('Redis error:', error);
        });
    }
    return redisClient;
}

module.exports = { getRedisClient };