'use strict';

const mongoose = require('mongoose');
const redis = require('redis');

const redisUrl = 'redis://127.0.0.1:6379';
const client = redis.createClient(redisUrl);
const exec = mongoose.Query.prototype.exec;

mongoose.Query.prototype.cache = function (options = {}) {
  this.useCache = true;
  this.hashKey = JSON.stringify(options.key || '');
  return this;
}

mongoose.Query.prototype.exec = function () {
  if (!this.useCache) {
    return exec.apply(this, arguments);
  }

  const key = JSON.stringify(Object.create({}, thi.getQuery(), {
    collection: this.mongooseCollection.name,
  }));

  let cacheValue = await client.hget(this.hashKey, key);
  
  if (cacheValue) {
    cacheValue = JSON.parse(cacheValue);
    return Array.isArray(cacheValue)
      ? cacheValue.map(doc => this.model(doc))
      : this.model(cacheValue);
  }

  const result = await exec.apply(this, arguments);

  client.hset(this.hashKey, key, JSON.stringify(result), 'EX', 10);

  return result;
};

module.exports = {
  clearHash(hashKey) {
    client.del(JSON.stringify(hashKey));
  }
};