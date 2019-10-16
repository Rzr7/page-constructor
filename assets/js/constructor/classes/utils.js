import Swal from 'sweetalert2';

export default class Utils {
  static post(url) {
    let result = false;
    $.ajax({
      async: false,
      url: url,
      type: 'POST',
      success: function(data) {
        result = data;
      },
      error: function(e) {
        console.dir(e);
      },
    });
    return result;
  }

  static get(url) {
    let result = false;
    $.ajax({
      async: false,
      url: url,
      type: 'GET',
      success: function(data) {
        result = data;
      },
      error: function(e) {
        console.dir(e);
      },
    });
    return result;
  }

  static showError(err) {
    Swal.fire({
      title: err.name + '!',
      text: err.message,
      type: 'error',
      confirmButtonText: 'Ok',
    });
  }

  static showAlert(title, message, type) {
    Swal.fire({
      title: title,
      text: message,
      type: type,
      confirmButtonText: 'Ok',
    });
  }
}
