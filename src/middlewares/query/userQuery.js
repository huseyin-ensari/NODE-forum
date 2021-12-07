const asyncErrorHandler = require('express-async-handler');
const queryHelpers = require('./queryHelpers');

const userQuery = function (model, options) {
  return asyncErrorHandler(async function (req, res, next) {
    let query = model.find();

    // search
    query = queryHelpers.searchQuery('name', query, req);

    // pagination

    const paginationResult = await queryHelpers.paginationQuery(
      model,
      query,
      req
    );
    query = paginationResult.query;
    pagination = paginationResult.pagination;

    const queryResults = await query;

    res.queryResults = {
      success: true,
      count: queryResults.length,
      pagination,
      data: queryResults,
    };

    next();
  });
};

module.exports = userQuery;
