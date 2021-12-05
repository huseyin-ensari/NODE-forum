const searchQuery = (searchKey, query, req) => {
  if (req.query.search) {
    const searchObject = {};

    const regex = new RegExp(req.query.search, 'i');
    searchObject[searchKey] = regex;

    return (query = query.where(searchObject));
  }
  return query;
};

const populateQuery = (query, population) => {
  return query.populate(population);
};

const questionSortQuery = (query, req) => {
  const sortKey = req.query.sortBy;

  if (sortKey === 'most-answered') {
    return query.sort('-answerCount');
  }
  if (sortKey === 'most-liked') {
    return query.sort('-likeCount');
  }
  return query.sort('-createdAt');
};

const paginationQuery = async (model, query, req) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 5;
  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;
  const total = await model.countDocuments();

  const pagination = {};

  if (startIndex > 0) {
    pagination.previous = {
      page: page - 1,
      limit,
    };
  }

  if (endIndex < total) {
    pagination.next = {
      page: page + 1,
      limit,
    };
  }

  return {
    query: query.skip(startIndex).limit(limit),
    pagination,
  };
};

module.exports = {
  searchQuery,
  populateQuery,
  questionSortQuery,
  paginationQuery,
};