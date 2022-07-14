const rateLimit = require('express-rate-limit');
const get = require('lodash/get');
const nth = require('lodash/nth');
const values = require('lodash/values');
const moment = require('moment');
const { ErrorTooManyRequests } = require('../helpers/errors');
const {
  redisGet,
  ttl,
  redisSet,
  redisSetex,
} = require('../libs');

const limit = rateLimit({
  max: 10000000, // max requests
  windowMs: 60 * 60 * 1000, // 1 Hour of 'ban' / lockout
  message: 'Too many requests', // message to send
});

// eslint-disable-next-line consistent-return
const limitEndpoint = () => async (req, res, next) => {
  try {
    const totalLimit = Number(process.env.LIMITENDPOINT);
    const getValueParams = nth(values(get(req, 'params')));

    if (!getValueParams) return next();

    const getKey = await redisGet({ key: getValueParams });
    const getCounter = get(getKey, 'counter');
    const getBanStatus = get(getKey, 'banStatus');
    const getTimestamp = get(getKey, 'timestamp');

    const counter = Number(getCounter) + 1 || 2;

    const data = {
      counter,
      banStatus: counter > (totalLimit - 1),
      timestamp: null,
    };

    res.set('X-RateLimit-Limit', totalLimit);
    res.set('X-RateLimit-Remaining', (totalLimit + 1) - counter);
    if (getBanStatus === true) {
      if (!getTimestamp) {
        const timestamp = new Date(moment().add(1, 'hours').utcOffset('+07:00').format()).getTime().toString();
        data.timestamp = timestamp;
        res.set('X-RateLimit-Reset', timestamp);
        redisSetex({
          key: getValueParams,
          data,
          ttl: ttl.ONE_HOUR,
        });
      } else {
        res.set('X-RateLimit-Remaining', (totalLimit + 2) - counter);
        res.set('X-RateLimit-Reset', getTimestamp);
      }
      throw new ErrorTooManyRequests();
    }

    redisSet({
      key: getValueParams,
      data,
    });

    next();
  } catch (error) {
    res.status(get(error, 'status')).json({
      status: get(error, 'status'),
      success: false,
      message: get(error, 'message'),
      data: null,
    });
  }
};

module.exports = {
  limit,
  limitEndpoint,
};
