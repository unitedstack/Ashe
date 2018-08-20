const RSVP = require('rsvp');
const getErrorMessage = require('admin/utils/error_message');
const tip = require('admin/components/tip/index');

RSVP.on('error', function(err) {
  if (err && err.stack) {
    console.assert(false, err.stack);
  } else {
    tip({
      content: getErrorMessage(err),
      autoHide: true,
      close: true
    });
  }
});
