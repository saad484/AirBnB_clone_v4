const $ = window.$;
let amenities = [];

$(document).ready(function () {
    $('.amenity_checkbox').click(function () {
      let amenity_id = $(this).data('id');
      if (amenities.includes(amenity_id)) {
        let index = amenities.indexOf(amenity_id);
        if (index !== -1) {
          amenities.splice(index, 1);
        }
      } else {
        amenities.push(amenity_id);
      }
    });
  let request = $.get("/api/v1/status");
  request.done(function (data) {
    console.log(data['status'])
    if (data['status'] === 'OK') {
      $('#api_status').addClass('available');
    } else {
      console.log('removing class');
      $('#api_status').removeClass('available');
    }
  });
  request.fail(function (YHS, textStatus, errorThrown) {
    console.log(YHS, textStatus, errorThrown);
    $('#api_status').removeClass('available');
  });
});
