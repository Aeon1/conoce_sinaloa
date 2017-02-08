function initialize(coord) {
    cc=coord.split(',');
  var myLatlng = new google.maps.LatLng(cc[0],cc[1]);//-25.363882,131.044922);
  var mapOptions = {
    zoom: 12,
    center: myLatlng
  }
  //console.log(mapOptions);
  var map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);

  var marker = new google.maps.Marker({
      position: myLatlng,
      map: map,
      title: 'Visitanos!'
  });
}
