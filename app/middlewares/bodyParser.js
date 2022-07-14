const getBodyRaw = (req, res, next) => {
  let data = '';
  req.on('data', (chunk) => { data += chunk; });
  req.on('end', () => {
    if (typeof data === 'string') req.body = { data };
    next();
  });
};

module.exports = {
  getBodyRaw,
};
