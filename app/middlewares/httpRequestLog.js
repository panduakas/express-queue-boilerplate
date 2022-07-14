const clone = require('clone');
const cuid = require('cuid');

const requestLog = async (req, res, next) => {
  const {
    method,
    query,
    params,
    body,
    ip,
    headers,
  } = req;

  const data = {
    query,
    params,
    body,
    headers,
    ip,
  };

  process.requestId = cuid();
  if (Object.entries(query).length === 0 && query.constructor === Object) delete data.query;
  if (Object.entries(params).length === 0 && params.constructor === Object) delete data.params;

  res.method = method;
  next();
};

module.exports = {
  requestLog,
};
