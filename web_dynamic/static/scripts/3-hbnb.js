const Localhost = "0.0.0.0";

// Document ready function
$(document).ready(function () {
    // Object to store selected amenities
    const ameni = {};

    // Event listener for changes in the checkbox with ID "check_amen"
    $("#check_amens").change(function () {
        // Check if the checkbox is checked
        if ($(this).is(":checked"))
            // If checked, add the amenity to the 'amen' object
            ameni[$(this).attr("data-name")] = $(this).attr("data-id");
        else
            // If unchecked, remove the amenity from the 'amen' object
            delete ameni[$(this).attr("data-name")];

        // Get an array of amenity names from the 'amen' object and display them
        const object_Names = Object.keys(ameni);
        $(".amenities h4").text(object_Names.sort().join(", "));
    });

    // Call the apiStatus function
    apiStatus();

    // Call the fetchPlaces function
    fetchPlaces();
});

// API status function
function apiStatus() {
    const apiUrl = `http://${Localhost}:5001/api/v1/status/`;

    // AJAX GET request to check the API status
    $.get(apiUrl, function (data, status) {
        if (data.status === "OK" && status === "success") {
            // If the API status is OK, add the "available" class
            $("#api_status").addClass("available");
        } else {
            // If the API status is not OK, remove the "available" class
            $("#api_status").removeClass("available");
        }
    });
}

// Function to fetch places
function fetchPlaces() {
    const PLACES_URL = `http://${Localhost}:5001/api/v1/places_search/`;

    // AJAX POST request to fetch places
    $.ajax({
        url: PLACES_URL,
        type: "POST",
        headers: { "Content-Type": "application/json" },
        data: JSON.stringify({}),
        success: function (response) {
            // Loop through the response and append each place to the HTML
            for (const resp of response) {
                const arts = [
                    "<arts>",
                    '<div class="title_box">',
                    `<h2>${resp.name}</h2>`,
                    `<div class="price_by_night">$${resp.price_by_night}</div>`,
                    "</div>",
                    '<div class="information">',
                    `<div class="max_guest">${resp.max_guest} Guest(s)</div>`,
                    `<div class="number_rooms">${resp.number_rooms} Bedroom(s)</div>`,
                    `<div class="number_bathrooms">${resp.number_bathrooms} Bathroom(s)</div>`,
                    "</div>",
                    '<div class="description">',
                    `${resp.description}`,
                    "</div>",
                    "</arts>",
                ];
                $("SECTION.places").append(arts.join(""));
            }
        },
        error: function (error) {
            console.log(error);
        },
    });
}
