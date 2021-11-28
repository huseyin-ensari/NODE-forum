const getAll = (req, res, next) => {
  res.json({ success: true, message: 'All question' });
};

module.exports = {
  getAll,
};
