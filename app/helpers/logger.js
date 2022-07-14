const cuid = require('cuid');
const fastStringify = require('fast-safe-stringify');
const JSONparse = require('fast-json-parse');
// const { requestLog } = require('../request/requestLog');

const handleLoggerparams = ({
  data, message, method, mep, toService, statusCode, requestId,
}) => ({
  // service,
  data: JSONparse(fastStringify(data)) || 'no data',
  requestId,
  message: message || 'no message',
  method: method || 'no method',
  mep, // message exchange pattern
  toService: toService || 'svc-be-topup', // edit ini
  statusCode: statusCode || 'no statusCode',
  label: 'merchant-deposit', // edit ini
  fromService: 'svc-be-topup', // edit ini
});

const logInfo = (params) => {
  const data = handleLoggerparams(params);
  if (!process.requestId) process.requestId = data.requestId || cuid();
  data.requestId = process.requestId;
  // const url = process.env.LOGGER_SERVICE_URI;
  // const method = 'POST';
  // requestLog({
  //   url: `${url}/v1/info`,
  //   method,
  //   body: data,
  // }).catch(() => ({})); // fire and forget
};

const logError = (params) => {
  const data = handleLoggerparams(params);
  if (!process.requestId) process.requestId = cuid();
  data.requestId = process.requestId;
  // const url = process.env.LOGGER_SERVICE_URI;
  // const method = 'POST';
  // requestLog({
  //   url: `${url}/v1/error`,
  //   method,
  //   body: data,
  // }).catch(() => ({})); // fire and forget
};

module.exports = {
  logInfo,
  logError,
};
