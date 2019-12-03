    var map;
    function displayForm() {

    }
    function initMap() {
    /*
    Maps initialized to UMass Amherst with latlng(42.391155,-72.526711)
    */
    var campus = [42.3896166,-72.52946829999999];

    var mymap = L.map('mapid').setView(campus, 13);

    var input1 = document.getElementById('searchStart');

    //var searchBox1 = new google.maps.places.SearchBox(input1);

    var searchbutton = document.getElementById("getRoute");

    searchbutton.addEventListener('click',function(){
        //do some stuff here
        //var place = searchBox1.getPlaces();
        // var s = "";
        // for(var i = 0;i < places.length;i++){
        //     s += place[i].name;
        // }
        alert(place[0].formatted_address);
    });

    var input2 = document.getElementById('searchEnd');

    //var searchBox2 = new google.maps.places.SearchBox(input2);

    // var searchRoute = document.getElementById('getRoute');

    // searchRoute.addEventListener('click', function(){
    //   alert('hi');
    // });

    searchRoute.addEventListener('click', function(){
      //var start = searchBox1.getPlaces();
      //var end = searchBox2.getPlaces();
      var distance = document.getElementById('amount1').value;
      var eleveation = document.getElementById('amount2').value;
      alert(start[0].name + "\n" + end[0].);
    });

}
