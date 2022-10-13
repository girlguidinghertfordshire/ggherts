// eslint-disable-next-line no-unused-vars
class LocationMap {
    google = window.google || {};
    map;
    bounds;
    infowindow;
    directionsDisplay;

    constructor(locationData, showDirections=false, mapId = "map") {
        this.calcRoute = this.calcRoute.bind(this);
        this.initialize(locationData, showDirections, mapId);
        if (showDirections){
            this.directionsService = new this.google.maps.DirectionsService();
        }
    }

    static location(latlng, title, icon, content) {
        const ll = latlng.split(",");
        return {
            lat: ll[0],
            lng: ll[1],
            title: title,
            icon: icon,
            content: content
        };
    }
    initialize(locationData, showDirections, mapId) {
        this.map = new this.google.maps.Map(document.getElementById(mapId), {
            scrollwheel: false,
        });
        this.bounds = new this.google.maps.LatLngBounds();
        const infowindow = new this.google.maps.InfoWindow();
        const map=this.map;
        for (const location of locationData) {
            const latlng = new this.google.maps.LatLng(location.lat, location.lng);
            this.bounds.extend(latlng);
            const marker = new this.google.maps.Marker({
                position: latlng,
                map: map,
                title: location.title,
                icon: location.icon,
                content: location.content,
            });
            this.google.maps.event.addListener(marker, 'click', function () {
                infowindow.setContent(location.content);
                infowindow.open(this.map, this);
            });
        }
        this.map.fitBounds(this.bounds);
        if (showDirections) {
            this.directionsDisplay = new this.google.maps.DirectionsRenderer();
            this.directionsDisplay.setMap(this.map);
        }
        this.google.maps.event.addListenerOnce(this.map, 'bounds_changed', function () {
            if (this.getZoom() > 15) {
                this.setZoom(15);
            }
        });
    }
    calcRoute(){
        const selectedMode = document.getElementById("mode").value;
        const start = document.getElementById('start').value;
        // TODO: Validate start is a postcode
        const end = document.getElementById('end').value;
        const request = {
            origin: start,
            destination: end,
            travelMode: this.google.maps.DirectionsTravelMode[selectedMode],
            provideRouteAlternatives: true,
            unitSystem: this.google.maps.UnitSystem.IMPERIAL,
        };
        const g=this.google;
        const d=this.directionsDisplay;
        this.directionsService.route(request, function(response, status) {
            if (status == g.maps.DirectionsStatus.OK) {
                d.setDirections(response);
                d.setPanel(document.getElementById('directions-panel'));
            } else {
                /*jQuery('.loadmoreimg').hide();*/
                alert('Please Enter Valid Code');
            }
        });
    }
}
