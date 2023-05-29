// eslint-disable-next-line no-unused-vars
class DivisionMap {
    google;
    map;
    kmlSrc = "https://www.girlguidinghertfordshire.org.uk/assets/js/divisions/maps_regions.kml?v=1";
    constructor() {
        this.google = window.google || {};
    }
    render(){
        this.map = new this.google.maps.Map(document.getElementById('map'), {
            center: new this.google.maps.LatLng(51.778877, -0.223078),
            zoom: 10,
            mapTypeId: 'roadmap'
        });
        const kmlLayer = new this.google.maps.KmlLayer(this.kmlSrc, {
            suppressInfoWindows: false,
            preserveViewport: false,
            map: this.map
        });
        console.log(kmlLayer);
        kmlLayer.addListener('click', function(event) {
          console.log(event);
          const divisions = document.querySelectorAll(".division");
          divisions.forEach(function(division){
            division.classList.remove("selected");
            if (division.dataset.name == event.featureData.name){
                division.classList.add("selected");
            console.log(division);
            }
          });
        });
    }
}
