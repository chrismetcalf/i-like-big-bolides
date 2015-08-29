$(function() {
  var options = {
    center: new google.maps.LatLng(33.9340384,67.7034312),
    zoom: 2,
    mapTypeId: google.maps.MapTypeId.TERRAIN
  }
  var map = new google.maps.Map($("#map")[0], options);

  $.ajax({
    url: "https://communities.socrata.com/resource/27eq-bd6d.json",
    type: "GET",
    data: {
      "$where": "calculated_total_impact_energy_kt > 15.0",
      "$$app_token": "CGxaHQoQlgQSev4zyUh5aR5J3"
    }
  }).done(function(bolides) {
    $.each(bolides, function(idx, bolide) {
      var marker = new google.maps.Marker({
        position: new google.maps.LatLng(
                      bolide.geolocation.coordinates[1],
                      bolide.geolocation.coordinates[0]
                  ),
        map: map,
        title: bolide.date_time_peak_brightness_ut
      });

      $("#results").append("<li>" + bolide.date_time_peak_brightness_ut + ": " + bolide.calculated_total_impact_energy_kt + " kilotons</li>");
    });
  });
});

