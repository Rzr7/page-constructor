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
}
