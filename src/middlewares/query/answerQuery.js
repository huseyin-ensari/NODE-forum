const asyncErrorHandler = require('express-async-handler');
const queryHelpers = require('./queryHelpers');

const answerQuery = function (model, options) {
  return asyncErrorHandler(async function (req, res, next) {
    const { id } = req.params;

    const arrayName = 'answers';
    const total = (await model.findById(id))['answerCount'];

    const paginationResult = await queryHelpers.paginationQuery(
      total,
      undefined,
      req
    );

    const startIndex = paginationResult.startIndex;
    const limit = paginationResult.limit;

    let queryObject = {};

    queryObject[arrayName] = { $slice: [startIndex, limit] };

    let query = await model.find({ _id: id }, queryObject);

    query = queryHelpers.populateQuery(query, options.population);

    const queryResults = await query;

    res.queryResults = {
      success: true,
      count: queryResults.length,
      pagination: paginationResult.pagination,
      data: queryResults,
    };

    next();
  });
};

module.exports = answerQuery;
