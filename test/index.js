/* global */
const supertest = require('supertest');
const { assert } = require('chai');
const cuid = require('cuid');
const app = require('../app/server');
const { sequelize } = require('../app/db/models/Mysql');

const server = supertest(app);
const CREATED_BY = 'Unit_test1';
const timestamp = new Date().getTime().toString().padEnd(16, '0'); // timestamp 16 digit


// const wrap = fn => () => fn().catch(error => assert.ifError(error));

const dataTest = {
  requestId: cuid(),
  createdBy: CREATED_BY,
  timestamp,
};
process.requestId = dataTest.requestId;

require('./ping.test')(server, assert, dataTest, sequelize);
