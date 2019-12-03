    var map;
    function displayForm() {

    }
    function initMap() {
    /*
    Maps initialized to UMass Amherst with latlng(42.391155,-72.526711)
    */
    var campus = {lat: 42.3896166, lng: -72.52946829999999};
    map = new google.maps.Map(document.getElementById('map'), {
        center: campus,
        zoom: 13
    });
    var marker = new google.maps.Marker({position:campus, map:map});

    var infocontent = document.createElement("div");

    var list = document.createElement('ul');
    var item1 = document.createElement('li');
    var item2 = document.createElement('li');
    item1.textContent = "UMass Amherst";
    //item2.textContent = "test message 2";
    list.appendChild(item1)
    //list.appendChild(item2)
    list.classList.add("list");

    var pic = document.createElement("img");
    pic.src = "image.jpg";
    pic.classList.add('pics')

    //infocontent.appendChild(pic);
    infocontent.appendChild(list);
    var infoWindow = new google.maps.InfoWindow;
    var input1 = document.getElementById('searchStart');

    var searchBox1 = new google.maps.places.SearchBox(input1);

    var searchbutton = document.getElementById("searchRoute");
    searchbutton.addEventListener('click',function(){
        //do some stuff here
        alert("hi");
    });

    var input2 = document.getElementById('searchEnd');

    var searchBox2 = new google.maps.places.SearchBox(input2);

    var searchRoute = document.getElementById('getRoute');

    searchRoute.addEventListener('click', function(){
      alert('hi');
    });
    
    marker.addListener('mouseover',function(){
        infoWindow.setContent(infocontent);
        infoWindow.open(map,marker);
    });

    marker.addListener('mouseout',function(){
        infoWindow.close();
    });

    marker.addListener('click',function(){
        window.open( "img.html", "_blank");
    });

    
}

