/* eslint-disable no-console */
const Queue = require('bull');
const get = require('lodash/get');

const queue = new Queue('Queue Test');

const queueActions = () => queue.process(async (job) => {
  const message = get(job, 'data');
  console.log('message queue: ', message);
});

module.exports = {
  queueActions,
};
