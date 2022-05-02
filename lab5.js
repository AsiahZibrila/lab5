var myLayer = L.geoJSON();
var geojsonFeature;
var coordS =[];

function drawline (){
    map.dragging.disable();

    map.addEventListener('mousedown', function(e){

        $("#draw").attr("disabled", true);

        map.addEventListener('mousemove',function(ev) {

            var lat = ev.latlng.lat;
            var lng = ev.latlng.lat 
            var coord = [lng, lat];
            coords.push(coord);

            geojsonFeature={
                "type": "Feature",
                "geometry": {
                    "type": "LineString",
                    "coordinates": coords
                } 
            };

            myLayer.addData(geojsonFeature);
            myLayer.addTo(map);
        });
    });
}

map.on('mouseup', function(e){

    map.removeEventListener('mousemove');
    map.removeEventListener('mousedown');

    map.dragging.enable();

});

$('#delete').removeAttr('disabled')
$('simplify').removeAttr('disabled');



function check (){
    var geojson = turf.multiLineString([coords]);
    var options = {tolerance: 0.01, highQuality: false};
    var simplified = turf.simplify(geojson, options);
    map.removeLayer(myLayer);
    myLayer.clearLayers();
    myLayer.addData(simplified);
    myLayer.addTo(map);
    coords=[];
    $("#simplify").attr("disabled", true);
}

function deleteline (){
    map.removeLayer(myLayer);
    myLayer.clearLayers();
    coords=[];
    $('#draw').removeAttr('disabled');
    $("#simplify").attr("disabled", true);
    $('#delete').removeAttr('disabled'); 
}