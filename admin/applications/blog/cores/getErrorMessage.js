module.exports = function getErrorMessage(error) {
  let err = JSON.parse(error.response).errors.map((err) => err.message).join(', ');
  if(!err) {
    err = 'There is an error occured!';
  }
  return err;
};
