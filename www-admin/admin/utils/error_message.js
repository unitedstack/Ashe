function getErrorMessage(error) {
  var response = JSON.parse(error.responseText);
  var errorMessage = '';
  if (error) {
    if (response) {
      if (response.error) {
        errorMessage = response.error;
      } else if (response.message) {
        errorMessage = response.message;
      } else if(response.errors) {
        errorMessage = response.errors[0].message;
      } else {
        let reg = new RegExp('"message":"(.*)","');
        let message = reg.exec(error.response);
        if (message && message[1]) {
          errorMessage = message[1];
        } else {
          errorMessage = 'There is an error occured!';
        }
      }
      return errorMessage;
    }
  }
  return null;
}

module.exports = getErrorMessage;
