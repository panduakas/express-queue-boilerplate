const Queue = require('bull');
const { wrap } = require('../../helpers');

const queue = new Queue('Queue Test');

const queueApi = async () => {
  const result = ['Hello', 'World'];
  await queue.add(result);
  return result;
};


module.exports = (router) => {
  router.get('/', wrap(queueApi));
};
