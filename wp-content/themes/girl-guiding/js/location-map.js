function initialize() {
    var map = new google.maps.Map(document.getElementById('map'),{
        scrollwheel: false,
    });
    var bounds = new google.maps.LatLngBounds();
    var infowindow = new google.maps.InfoWindow();
    for (var i in LocationData) {
        var p = LocationData[i];
        var latlng = new google.maps.LatLng(p[0],p[1]);
        bounds.extend(latlng);
        marker = new google.maps.Marker({
            position: latlng,
            map: map,
            title: p[5],
            icon: p[3],
            content: p[4],
        });
        google.maps.event.addListener(marker, 'click', function() {
            infowindow.setContent(this.content);
            infowindow.open(map, this);
        });
    }
    map.fitBounds(bounds);
    directionsDisplay = new google.maps.DirectionsRenderer();
    directionsDisplay.setMap(map);
    google.maps.event.addListenerOnce(map, 'bounds_changed', function(event) {
        if (this.getZoom() > 15) {
            this.setZoom(15);
        }
    });
}
google.maps.event.addDomListener(window, 'load', initialize);
var directionsService = new google.maps.DirectionsService();
var control = document.getElementById('control');
jQuery(document).ready(function(e) {
    jQuery('.enter-location > input').keydown(function(event) {
        if (event.which == 13) {
            calcRoute()
        }
    });
});
function calcRoute() {
    var selectedMode = document.getElementById("mode").value;
    var start = document.getElementById('start').value;
    var end = document.getElementById('end').value;
    var request = {
        origin: start,
        destination: end,
        travelMode: google.maps.DirectionsTravelMode[selectedMode],
        provideRouteAlternatives: true,
        unitSystem: google.maps.UnitSystem.IMPERIAL,
    };
    directionsService.route(request, function(response, status) {
        if (status == google.maps.DirectionsStatus.OK) {
            directionsDisplay.setDirections(response);
            directionsDisplay.setPanel(document.getElementById('directions-panel'));
            jQuery(document).ready(function(e) {
                if (!jQuery(".directions-block > span.close").hasClass("active")) {
                    jQuery(".directions-block > span.route").addClass("active");
                    jQuery(".directions-block > span.route").click();
                }
            });
        } else {
            jQuery('.loadmoreimg').hide();
            alert('Please Enter Valid Code');
        }
    });
}
function resetRoute() {
    directionsDisplay.setMap(null);
    directionsDisplay.setPanel(null);
    directionsDisplay = new google.maps.DirectionsRenderer();
    directionsDisplay.setMap(map);
    directionsDisplay.setPanel(document.getElementById("directions-panel"));
    document.getElementById("start").value = "Please enter your start location";
}
function footerinit() {
    var footerlatlng = new google.maps.LatLng(lat,lng);
    var map_options = {
        center: footerlatlng,
        zoom: 15,
        scrollwheel: false,
    }
    var footermap = new google.maps.Map(document.getElementById('footermap'),map_options);
    new google.maps.Marker({
        position: footerlatlng,
        map: footermap
    });
}
google.maps.event.addDomListener(window, 'load', footerinit);
