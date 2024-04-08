$(function () {
    // Object to store selected amenities
    const ameni = {};

    // Event listener for changes in the checkbox with ID "check_amens"
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
});
