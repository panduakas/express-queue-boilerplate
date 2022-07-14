module.exports = {
  httpStatus: {
    ok: 200,
    created: 201,
    accepted: 202,
    badRequest: 400,
    notFound: 404,
    unauthorized: 401,
    forbidden: 403,
    expectationFail: 417,
    preconditionFail: 412,
    tooManyRequests: 429,
    internalServerError: 500,
  },
  nonHttpStatusCode: {
    pendingTransaction: 901,

  },
};
