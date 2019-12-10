    var map;
    // function displayForm() {

    // }
    function initMap() {
    /*
    Maps initialized to UMass Amherst with latlng(42.391155,-72.526711)
    */
    var campus = {lat: 42.3896166, lng: -72.52946829999999};
    map = new google.maps.Map(document.getElementById('map'), {
        center: campus,
        zoom: 13
    });

    var infoWindow = new google.maps.InfoWindow;
    var input1 = document.getElementById('searchStart');

    var searchBox1 = new google.maps.places.SearchBox(input1);

    var searchRoute = document.getElementById("getRoute");

    var input2 = document.getElementById('searchEnd');

    var searchBox2 = new google.maps.places.SearchBox(input2);

    // var searchRoute = document.getElementById('getRoute');

    // searchRoute.addEventListener('click', function(){
    //   alert('hi');
    // });

    var select = document.getElementById("mySelect");
    select.addEventListener("change", function() {
        var x = document.getElementById("mySelect").value;
        document.getElementById("searchStart").value = x;
    });
    var line;
    var select2 = document.getElementById("mySelect2");
    select2.addEventListener("change", function() {
        var y = document.getElementById("mySelect2").value;
        document.getElementById("searchEnd").value = y;
    });
    searchRoute.addEventListener('click', function(){
      var start = searchBox1.getPlaces();
      var end = searchBox2.getPlaces();
      var distance = (100 - document.getElementById('rangeInput').value)/100;
      var elevation = (document.getElementById('rangeInput').value)/100;
      if (start == undefined || end == undefined) {
        alert("Please enter a value for start and end!")
      }
      $.ajax({
        type: "POST",
        url: "/route",
        async: false,
        data: { start: start[0].geometry.location.lat(), start2: start[0].geometry.location.lng(), end: end[0].geometry.location.lat(), end2: end[0].geometry.location.lng(), distance: distance, elevation: elevation}
      })
        .done(function( msg ) {
          var points = []
            for (var point in msg) {
              var coords = new google.maps.LatLng(msg[point][1],msg[point][0]);
              points.push(coords)
            }
            if (line) {
              line.setMap(null);
            }
        var poly = new google.maps.Polyline({
             path:points,
             //geodesic: true,
             strokeColor: '#FF0000',
             strokeOpacity: 1.0,
             strokeWeight: 3
           });
           poly.setMap(map);
           line = poly;
        });
    });


}
