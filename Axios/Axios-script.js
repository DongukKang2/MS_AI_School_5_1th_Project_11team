/* 지도 생성 & 기본 설정 유지 */
var container = document.getElementById("map");
var options = {
  center: new kakao.maps.LatLng(37.54, 126.96),
  level: 8,
};

var map = new kakao.maps.Map(container, options);
var zoomControl = new kakao.maps.ZoomControl();
map.addControl(zoomControl, kakao.maps.ControlPosition.RIGHT);

/* API 호출 함수 */
async function getDataSet(category) {
  let qs = category;
  if (!qs) {
    qs = "";
  }

  try {
    const dataSet = await axios({
      method: "get",
      url: `http://localhost:3000/restaurants?category=${qs}`,
      headers: {},
      data: {},
    });
    console.log('Received data:', dataSet.data); // 데이터 확인용
    return dataSet.data.result;
  } catch (error) {
    console.error('Error fetching data:', error);
    return [];
  }
}

/* 주소-좌표 변환 함수 */
var geocoder = new kakao.maps.services.Geocoder();

function getCoordsByAddress(address) {
  return new Promise((resolve, reject) => {
    geocoder.addressSearch(address, function (result, status) {
      if (status === kakao.maps.services.Status.OK) {
        var coords = new kakao.maps.LatLng(result[0].y, result[0].x);
        resolve(coords);
        return;
      }
      reject(new Error("getCoordsByAddress Error: not Valid Address"));
    });
  });
}

/* 인포윈도우 컨텐츠 생성 함수 - videoUrl 제거하고 간단화 */
function getContent(data) {
  return `
  <div class="infowindow">
    <div class="infowindow-body">
      <h5 class="infowindow-title">${data.title}</h5>
      <p class="infowindow-address">${data.address}</p>
      <p class="infowindow-category">${data.category}</p>
    </div>
  </div>
  `;
}

/* 마커 및 인포윈도우 설정 */
async function setMap(dataSet) {
  markerArray = [];
  infowindowArray = [];

  for (var i = 0; i < dataSet.length; i++) {
    try {
      let coords = await getCoordsByAddress(dataSet[i].address);
      var marker = new kakao.maps.Marker({
        map: map,
        position: coords,
      });

      markerArray.push(marker);

      var infowindow = new kakao.maps.InfoWindow({
        content: getContent(dataSet[i]),
      });

      infowindowArray.push(infowindow);

      kakao.maps.event.addListener(
        marker,
        "click",
        makeOverListener(map, marker, infowindow, coords)
      );
      kakao.maps.event.addListener(
        map, 
        "click", 
        makeOutListener(infowindow)
      );
    } catch (error) {
      console.error('Error setting marker:', error);
    }
  }
}

/* 이벤트 리스너 함수들 */
function makeOverListener(map, marker, infowindow, coords) {
  return function () {
    closeInfoWindow();
    infowindow.open(map, marker);
    map.panTo(coords);
  };
}

function makeOutListener(infowindow) {
  return function () {
    infowindow.close();
  };
}

/* 12개의 카테고리로 수정 */
const categoryMap = {
  korean: "한식",
  japanese: "일식",
  chinese: "중식",
  western: "양식",
  grillset: "구이/정식",
  sashimi: "횟집",
  chicken: "치킨",
  foreign: "외국음식전문점",
  snack: "분식",
  buffet: "뷔페식",
  cafe: "카페",
  etc: "기타"
};

/* 카테고리 이벤트 처리 */
const categoryList = document.querySelector(".category-list");
categoryList.addEventListener("click", categoryHandler);

async function categoryHandler(event) {
  const categoryId = event.target.id;
  const category = categoryMap[categoryId];

  try {
    let categorizedDataSet = await getDataSet(category);
    closeMarker();
    closeInfoWindow();
    await setMap(categorizedDataSet);
  } catch (error) {
    console.error('Error in category handler:', error);
  }
}

let markerArray = [];
function closeInfoWindow() {
  for (let infowindow of infowindowArray) {
    infowindow.close();
  }
}

function closeMarker() {
  for (marker of markerArray) {
    marker.setMap(null);
  }
}

/* 초기 설정 */
async function setting() {
  try {
    const dataSet = await getDataSet();
    await setMap(dataSet);
  } catch (error) {
    console.error('Error in initial setting:', error);
  }
}

setting();