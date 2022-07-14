const handler = require('./handler');
const requestLog = require('./httpRequestLog');
const limit = require('./limit');
const bodyParser = require('./bodyParser');

module.exports = {
  ...handler,
  ...requestLog,
  ...limit,
  ...bodyParser,
};
