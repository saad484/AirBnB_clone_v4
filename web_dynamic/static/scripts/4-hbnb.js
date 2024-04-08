const $ = window.$;
let amenities = [];

$(document).ready(function () {
  // when document is ready run this code
  $('.amenity_checkbox').click(function () {
    let amenityID = $(this).data('id');
    if (amenities.includes(amenityID)) {
      let index = amenities.indexOf(amenityID);
      if (index !== -1) {
        amenities.splice(index, 1);
      }
    } else {
      amenities.push(amenityID);
    }
    console.log(amenities);
  });
  let request = $.get('http://0.0.0.0:5001/api/v1/status');
  request.done(function (data, status) {
    console.log(data['status']);
    if (data['status'] === 'OK') {
      $('#api_status').addClass('available');
    } else {
      $('#api_status').removeClass('available');
    }
  });
  request.fail(function (jqXHR, textStatus, errorThrown) {
    console.log(jqXHR, textStatus, errorThrown);
    $('#api_status').removeClass('available');
  });
  updatePlaces();
  $('button').click(updatePlaces);
});

// functions for fetching api data and formatting html
function updatePlaces() {
  let jsonData = '{}'
  if (amenities.length !== 0) {
    
    jsonData = {
      'amenities': amenities,
      'states': '[]',
      'cities': '[]'
    };
    jsonData = JSON.stringify(jsonData);
    console.log('parsed data: ' + jsonData);
  }
  $('.places').empty();
  $.ajax({
    url: 'http://0.0.0.0:5001/api/v1/places_search',
    type: 'POST',
    contentType: 'application/json; charset=utf-8',
    dataType: 'json',
    data: jsonData,
    success: getPlaces
  });
}

function getPlaces(data) {
    for (let place of data) {
      let name = place['name'];
      let priceByNight = place['price_by_night'];
      let maxGuest = place['max_guest'];
      let numberRooms = place['number_rooms'];
      let numberBRooms = place['number_bathrooms'];
      let description = place['description'];

      let block = `
<article>
<div class="title">
<h2>${name}</h2>

      <div class="price_by_night">

    ${priceByNight}

    </div>
</div>
<div class="information">
  <div class="max_guest">
    <i class="fa fa-users fa-3x" aria-hidden="true"></i>

      <br />

    ${maxGuest} Guests
    
    </div>
<div class="number_rooms">
<i class="fa fa-bed fa-3x" aria-hidden="true"></i>

      <br />

    ${numberRooms} Bedrooms
    </div>
<div class="number_bathrooms">
<i class="fa fa-bath fa-3x" aria-hidden="true"></i>

      <br />

    ${numberBRooms} Bathroom

       </div>

    </div>

    </div>
   <div class="description">

    ${description}

    </div>
</article>
`;

      $('section.places').append(block);
    }
  }
