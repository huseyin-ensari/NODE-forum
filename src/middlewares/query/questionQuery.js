const asyncErrorHandler = require('express-async-handler');
const queryHelpers = require('./queryHelpers');

const questionQuery = function (model, options) {
  return asyncErrorHandler(async function (req, res, next) {
    // inital query
    let query = model.find();

    // search
    query = queryHelpers.searchQuery('title', query, req);

    // population
    if (options && options.population) {
      query = queryHelpers.populateQuery(query, options.population);
    }

    // sort
    query = queryHelpers.questionSortQuery(query, req);

    // pagination

    const total = await model.countDocuments();
    const paginationResult = await queryHelpers.paginationQuery(
      total,
      query,
      req
    );

    query = paginationResult.query;
    const pagination = paginationResult.pagination;

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

module.exports = questionQuery;
