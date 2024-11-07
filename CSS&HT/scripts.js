/*
**********************************************************
1. 지도 생성 & 확대 축소 컨트롤러
https://apis.map.kakao.com/web/sample/addMapControl/

*/

var container = document.getElementById("map"); //지도를 담을 영역의 DOM 레퍼런스
var options = {
  //지도를 생성할 때 필요한 기본 옵션
  center: new kakao.maps.LatLng(37.54, 126.96), //지도의 중심좌표. 서울 한가운데
  level: 8, //지도의 레벨(확대, 축소 정도) 3에서 8레벨로 확대
};

var map = new kakao.maps.Map(container, options); //지도 생성 및 객체 리턴

// 일반 지도와 스카이뷰로 지도 타입을 전환할 수 있는 지도타입 컨트롤을 생성합니다
var mapTypeControl = new kakao.maps.MapTypeControl();

// 지도에 컨트롤을 추가해야 지도위에 표시됩니다
// kakao.maps.ControlPosition은 컨트롤이 표시될 위치를 정의하는데 TOPRIGHT는 오른쪽 위를 의미합니다
map.addControl(mapTypeControl, kakao.maps.ControlPosition.TOPRIGHT);

// 지도 확대 축소를 제어할 수 있는  줌 컨트롤을 생성합니다
var zoomControl = new kakao.maps.ZoomControl();
map.addControl(zoomControl, kakao.maps.ControlPosition.RIGHT);

/*
**********************************************************
2. 더미데이터 준비하기 (제목, 주소, url, 카테고리)
*/
const dataSet = [
    {
      title: "100% 메밀냉면 소바애 우면점",
      address: "서울 서초구 양재대로2길 100-11 1층 107호",
      url: "https://search.naver.com/search.naver?where=nexearch&sm=top_hty&fbm=0&ie=utf8&query=100%25+%EB%A9%94%EB%B0%80%EB%83%89%EB%A9%B4+%EC%86%8C%EB%B0%94%EC%95%A0+%EC%9A%B0%EB%A9%B4%EC%A0%90",
      category: "한식",
    },
    {
      title: "즉석우동짜장",
      address: "서울 영등포구 대방천로 260",
      url: "https://www.youtube.com/watch?v=1YOJbOUR4vw&t=88s",
      category: "한식",
    },
    {
      title: "아카사카",
      address: "서울 서초구 서초대로74길 23",
      url: "https://www.youtube.com/watch?v=1YOJbOUR4vw&t=88s",
      category: "일식",
    },

  ];/*
  **********************************************************
  3. 여러개 마커 찍기
  * 주소 - 좌표 변환
https://apis.map.kakao.com/web/sample/multipleMarkerImage/ (여러개 마커)
https://apis.map.kakao.com/web/sample/addr2coord/ (주소로 장소 표시하기)
*/

// 주소 - 좌표 변환 함수 (비동기 문제 발생 해결) ****************
// 주소-좌표 변환 객체를 생성합니다
var geocoder = new kakao.maps.services.Geocoder();
function getCoordsByAddress(address) {
  // promise 형태로 반환
  return new Promise((resolve, reject) => {
    // 주소로 좌표를 검색합니다
    geocoder.addressSearch(address, function (result, status) {
      // 정상적으로 검색이 완료됐으면
      if (status === kakao.maps.services.Status.OK) {
        var coords = new kakao.maps.LatLng(result[0].y, result[0].x);
        return resolve(coords);
      }
      reject(new Error("getCoordsByAddress Error: not valid Address"));
    });
  });
}

async function setMap() {
  for (var i = 0; i < dataSet.length; i++) {
    let position = await getCoordsByAddress(dataSet[i].address);
    console.log(position);

    // 마커를 생성합니다
    var marker = new kakao.maps.Marker({
      map: map, // 마커를 표시할 지도
      // position: positions[i].latlng, // 마커를 표시할 위치
      position: position,
      // title: positions[i].title, // 마커의 타이틀, 마커에 마우스를 올리면 타이틀이 표시됩니다
    });
  }
}

setMap(dataSet);

/* 
******************************************************************************
4. 마커에 인포윈도우 붙이기
  * 마커에 클릭 이벤트로 인포윈도우 https://apis.map.kakao.com/web/sample/multipleMarkerEvent/
  * url에서 섬네일 따기
  * 클릭한 마커로 지도 센터 이동 https://apis.map.kakao.com/web/sample/moveMap/
*/

async function setMap(dataSet) {
  for (var i = 0; i < dataSet.length; i++) {
    let position = await getCoordsByAddress(dataSet[i].address);

    // 마커를 생성합니다
    var marker = new kakao.maps.Marker({
      map: map, // 마커를 표시할 지도
      position: position, // 마커를 표시할 위치
    });

    markerArray.push(marker);

    // 마커에 표시할 인포윈도우를 생성합니다
    var infowindow = new kakao.maps.InfoWindow({
      content: getContent(dataSet[i]), // 인포윈도우에 표시할 내용
      disableAutoPan: true, // 인포윈도우를 열 때 지도가 자동으로 패닝하지 않을지의 여부 (기본값: false)
    });

    infowindowArray.push(infowindow);

    // 마커에 mouseover 이벤트와 mouseout 이벤트를 등록합니다
    // 이벤트 리스너로는 클로저를 만들어 등록합니다
    // for문에서 클로저를 만들어 주지 않으면 마지막 마커에만 이벤트가 등록됩니다
    kakao.maps.event.addListener(
      marker,
      "click",
      makeOverListener(map, marker, infowindow, position)
    );
    // 커스텀: 맵을 클릭하면 현재 나타난 인포윈도우가 없어지게끔
    kakao.maps.event.addListener(map, "click", makeOutListener(infowindow));
  }
}

// 인포윈도우를 표시하는 클로저를 만드는 함수입니다
/* 
  커스텀
  1. 클릭시 다른 인포윈도우 닫기
  2. 클릭한 곳으로 지도 중심 이동하기
  */

function makeOverListener(map, marker, infowindow, position) {
  return function () {
    // 1. 클릭시 다른 인포윈도우 닫기
    closeInfowindow();
    infowindow.open(map, marker);
    // 2. 클릭한 곳으로 짇 중심 이동하기
    map.panTo(position);
  };
}

// 커스텀
// 1. 클릭시 다른 인포윈도우 닫기
let infowindowArray = [];
function closeInfowindow() {
  for (let infowindow of infowindowArray) {
    infowindow.close();
  }
}

// 인포윈도우를 닫는 클로저를 만드는 함수입니다
function makeOutListener(infowindow) {
  return function () {
    infowindow.close();
  };
}

// HTML 코드로 바꾸는 함수
function getContent(data) {
  let videoId = "";
  let replaceUrl = data.url;
  replaceUrl = replaceUrl.replace("https://youtu.be/", "");
  replaceUrl = replaceUrl.replace("https://www.youtube.com/embed/", "");
  replaceUrl = replaceUrl.replace("https://www.youtube.com/watch?v=", "");
  videoId = replaceUrl.split("&")[0];

  const result = `<div class="infowindow">
    <div class="infowindow-img-container">
      <img src="https://img.youtube.com/vi/${videoId}/sddefault.jpg" class="infowindow-img" alt="...">
    </div>
    <div class="infowindow-body">
      <h5 class="infowindow-title">${data.title}</h5>
      <p class="infowindow-text">${data.address}</p>
      <a href="https://youtu.be/${videoId}" target="_blank" class="infowindow-btn">영상이동</a>
    </div>
  </div>`;
  return result;
}


/*
**********************************************
5. 카테고리 분류
*/

// 카테고리
const categoryMap = {
  korea: "한식",
  china: "중식",
  japan: "일식",
  america: "양식",
  wheat: "분식",
  meat: "구이",
  sushi: "회/초밥",
  etc: "기타",
};

const categoryList = document.querySelector(".category-list");
categoryList.addEventListener("click", categoryHandler);

function categoryHandler(event) {
  const categoryId = event.target.id;
  const category = categoryMap[categoryId];

  // 데이터 분류
  let categorizedDataSet = [];
  for (let data of dataSet) {
    if (data.category === category) {
      categorizedDataSet.push(data);
    }
  }

  // 기존 마커 삭제
  closeMarker();

  // 기존 인포윈도우 닫기
  closeInfowindow();

  setMap(categorizedDataSet);

}

let markerArray = [];
function closeMarker() {
  for (marker of markerArray) {
    marker.setMap(null);
  }
}