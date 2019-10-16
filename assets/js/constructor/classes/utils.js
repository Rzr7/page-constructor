import Swal from 'sweetalert2';

export default class Utils {
  /**
   * Make POST request.
   * @param {String} url - Request URL
   * @return {jQuery} Response
   */
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

  /**
   * Make GET request.
   * @param {String} url - Request URL
   * @return {jQuery} Response
   */
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

  /**
   * Show SWAL error window.
   * @param {Error} err - Error object
   */
  static showError(err) {
    Swal.fire({
      title: err.name + '!',
      text: err.message,
      type: 'error',
      confirmButtonText: 'Ok',
    });
  }

  /**
   * Show SWAL any window.
   * @param {String} title - Window title
   * @param {String} message - Window message
   * @param {String} type - swal type
   */
  static showAlert(title, message, type) {
    Swal.fire({
      title: title,
      text: message,
      type: type,
      confirmButtonText: 'Ok',
    });
  }
}
