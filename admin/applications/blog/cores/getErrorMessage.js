module.exports = function getErrorMessage(error) {
  return JSON.parse(error.response).errors.map((err) => err.message).join(', ');
};
