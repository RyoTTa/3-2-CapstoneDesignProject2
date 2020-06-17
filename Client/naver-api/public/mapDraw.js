// boundary
var bound = new naver.maps.LatLngBounds(
  new naver.maps.LatLng(35.721397, 128.300916),
  new naver.maps.LatLng(35.973666, 128.764745)
);

function link(elementId) {
  var urlName = "./" + elementId + ".html";
  location.href = urlName;
}

// 맵 생성
var map = new naver.maps.Map("map", {
  minZoom: 11, // 읍면동 레벨
  center: new naver.maps.LatLng(35.889845, 128.6105),
  zoom: 17,
  maxBounds: bound,
  //mapTypeId: "normal",
});

var HOME_PATH = window.HOME_PATH || ".";

// 마커 위도 경도
var latLngs = [
  new naver.maps.LatLng(35.88689, 128.608494),
  new naver.maps.LatLng(35.888154, 128.6109),
  new naver.maps.LatLng(35.88814, 128.611388),
];

// 숫자를 세자리 수로 변경 ex:1 => 001
function pad(n) {
  var str = "00" + n;
  str = str.slice(-3);

  return str;
}

var markerList = [],
  urlArr = [];

for (var i = 0, ii = latLngs.length; i < ii; i++) {
  var icon = {
      url: HOME_PATH + "/marker_img/sp_pins_spot_v3.png",
      size: new naver.maps.Size(24, 37),
      anchor: new naver.maps.Point(12, 37),
      origin: new naver.maps.Point(i * 29, 0),
    },
    marker = new naver.maps.Marker({
      position: latLngs[i],
      map: map,
      icon: icon,
    });

  var dataUrl = "./getData.html?cam_id=" + pad(i + 1);

  marker.set("seq", i);

  markerList.push(marker);
  urlArr.push(dataUrl);

  marker.addListener("mouseover", onMouseOver);
  marker.addListener("mouseout", onMouseOut);

  icon = null;
  marker = null;
}

function onMouseOver(e) {
  var marker = e.overlay,
    seq = marker.get("seq");

  marker.setIcon({
    url: HOME_PATH + "/marker_img/sp_pins_spot_v3_over.png",
    size: new naver.maps.Size(24, 37),
    anchor: new naver.maps.Point(12, 37),
    origin: new naver.maps.Point(seq * 29, 50),
  });
}

function onMouseOut(e) {
  var marker = e.overlay,
    seq = marker.get("seq");

  marker.setIcon({
    url: HOME_PATH + "/marker_img/sp_pins_spot_v3.png",
    size: new naver.maps.Size(24, 37),
    anchor: new naver.maps.Point(12, 37),
    origin: new naver.maps.Point(seq * 29, 0),
  });
}

for (var i = 0, ii = markerList.length; i < ii; i++) {
  naver.maps.Event.addListener(markerList[i], "click", getClickHandler(i));
}

function getClickHandler(seq) {
  return function (e) {
    var marker = markerList[seq],
      url = urlArr[seq];
    window.open(url);
  };
}

// 경북대 테두리
var knu = new naver.maps.Polygon({
  map: map,
  paths: [
    [
      new naver.maps.LatLng(35.8958183, 128.6131888),
      new naver.maps.LatLng(35.8956304, 128.6138721),
      new naver.maps.LatLng(35.8953707, 128.6142),
      new naver.maps.LatLng(35.8953587, 128.6141994),
      new naver.maps.LatLng(35.8948959, 128.6136341),
      new naver.maps.LatLng(35.8948802, 128.6136327),
      new naver.maps.LatLng(35.8937865, 128.6141451),
      new naver.maps.LatLng(35.8932661, 128.6143972),
      new naver.maps.LatLng(35.8925697, 128.6147821),
      new naver.maps.LatLng(35.8902892, 128.6161125),
      new naver.maps.LatLng(35.8902164, 128.6161433),
      new naver.maps.LatLng(35.8901686, 128.6161527),
      new naver.maps.LatLng(35.8898068, 128.6161393),
      new naver.maps.LatLng(35.8897351, 128.616146),
      new naver.maps.LatLng(35.8894352, 128.6162734),
      new naver.maps.LatLng(35.8889018, 128.6167844),
      new naver.maps.LatLng(35.8884067, 128.6164777),
      new naver.maps.LatLng(35.8878179, 128.6161505),
      new naver.maps.LatLng(35.8873007, 128.6158877),
      new naver.maps.LatLng(35.8856031, 128.6152957),
      new naver.maps.LatLng(35.8856074, 128.6152971),
      new naver.maps.LatLng(35.885414, 128.6150986),
      new naver.maps.LatLng(35.8851619, 128.6146292),
      new naver.maps.LatLng(35.8850706, 128.6140753),
      new naver.maps.LatLng(35.8855129, 128.6138648),
      new naver.maps.LatLng(35.8861952, 128.6129005),
      new naver.maps.LatLng(35.8863354, 128.6099434),
      new naver.maps.LatLng(35.8857411, 128.609926),
      new naver.maps.LatLng(35.8856987, 128.6098911),
      new naver.maps.LatLng(35.8856998, 128.6096189),
      new naver.maps.LatLng(35.8856443, 128.6094834),
      new naver.maps.LatLng(35.885452, 128.6094821),
      new naver.maps.LatLng(35.8853771, 128.6094472),
      new naver.maps.LatLng(35.8853521, 128.6094043),
      new naver.maps.LatLng(35.8854325, 128.6088102),
      new naver.maps.LatLng(35.8854922, 128.6086787),
      new naver.maps.LatLng(35.885778, 128.608322),
      new naver.maps.LatLng(35.8857845, 128.6082348),
      new naver.maps.LatLng(35.8861474, 128.6083233),
      new naver.maps.LatLng(35.8862984, 128.6076112),
      new naver.maps.LatLng(35.8864375, 128.6076099),
      new naver.maps.LatLng(35.8864538, 128.6071566),
      new naver.maps.LatLng(35.8864766, 128.6070386),
      new naver.maps.LatLng(35.8865831, 128.6055862),
      new naver.maps.LatLng(35.8866385, 128.6055794),
      new naver.maps.LatLng(35.8866798, 128.6049035),
      new naver.maps.LatLng(35.8866983, 128.6048445),
      new naver.maps.LatLng(35.8883607, 128.6039755),
      new naver.maps.LatLng(35.8884987, 128.6039138),
      new naver.maps.LatLng(35.8895428, 128.6039634),
      new naver.maps.LatLng(35.8898837, 128.6044957),
      new naver.maps.LatLng(35.890126, 128.604955),
      new naver.maps.LatLng(35.8905432, 128.6058086),
      new naver.maps.LatLng(35.8907594, 128.6062237),
      new naver.maps.LatLng(35.8921981, 128.6091146),
      new naver.maps.LatLng(35.8923133, 128.6092702),
      new naver.maps.LatLng(35.8923839, 128.6093801),
    ],
  ],
  strokeColor: "black",
  strokeOpacity: 0.6,
  strokeWeight: 3,
});
