$(document).ready(function() {
  $('#form').submit(function(e) {
    e.preventDefault();

    var data = {
      lat: $('#lat').val(),
      lng: $('#lng').val(),
      radius: $('#radius').val()
    };

    $.ajax({
      method: 'POST',
      url: '/filter_locations',
      data: data,
      success: function(res) {
        console.log(res);
        $('#result').append(res)
      }
    });

  });
});
