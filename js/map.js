// const 

mapboxgl.accessToken = 'pk.eyJ1Ijoibm9tYW4zNzAxIiwiYSI6ImNreGhwaGh0YzJ1azcydW8xampucjNyaXoifQ.titVVazdLY-TCNPMBhDkrg';

setUpMap();

function setUpMap(center) {
  var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/streets-v11',
    zoom: 15,
    center: {
      lat: 1.4043,
      lng: 103.7906
    }
  });

  const nav = new mapboxgl.NavigationControl();
  map.addControl(nav);

  var directions = new MapboxDirections({
    accessToken: mapboxgl.accessToken
  });

  map.addControl(directions, "top-left");
}

const animalData = {
  "Singapore Zoo Entrance": {
    "index": 0,
    "0" : 0,
    "1": 0.57,
    "2": 0.68,
    "3": 0.34,
    "4": 0.29,
    "5": 0.49,
    "6": 0.6,
    "7": 0.62
  },
  "Tiger": {
    "index": 1,
    "0": 0.57,
    "1": 0,
    "2": 0.54,
    "3": 0.45,
    "4": 0.73,
    "5": 1.23,
    "6": 0.42,
    "7": 1.06
  },
  "Elephant": {
    "index": 2,
    "0": 0.68,
    "1": 0.54,
    "2": 0,
    "3": 0.55,
    "4": 0.83,
    "5": 1.03,
    "6": 0.44,
    "7": 1.16
  },
  "Lions": {
    "index": 3,
    "0": 0.34,
    "1": 0.45,
    "2": 0.55,
    "3": 0,
    "4": 0.5,
    "5": 0.69,
    "6": 0.26,
    "7": 0.82
  },
  "Panda": {
    "index": 4,
    "0": 0.29,
    "1": 0.73,
    "2": 0.83,
    "3": 0.5,
    "4": 0,
    "5": 0.24,
    "6": 0.71,
    "7": 0.37
  },
  "Spider Monkey": {
    "index": 5,
    "0": 0.49,
    "1": 1.23,
    "2": 1.03,
    "3": 0.69,
    "4": 0.24,
    "5": 0,
    "6": 0.91,
    "7": 0.33
  },
  "Hippo": {
    "index": 6,
    "0": 0.6,
    "1": 0.42,
    "2": 0.44,
    "3": 0.26,
    "4": 0.71,
    "5": 0.91,
    "6": 0,
    "7": 1.04
  },
  "Chimpanzee": {
    "index": 7,
    "0": 0.62,
    "1": 1.06,
    "2": 1.16,
    "3": 0.82,
    "4": 0.37,
    "5": 0.33,
    "6": 1.04,
    "7": 0
  }
}
const animalDataLength = 8;

const checkboxes = document.querySelectorAll(".short-route-container input");

const btnRun = document.querySelector(".short-route-container .short-route-btn");
btnRun.addEventListener("click", run);

function run() {
  var nameArr = [0];
  var graphOneD = [];
  var graphTwoD = [];
  var count=1;
  checkboxes.forEach(function (element) {
    if (element.checked&&count!==1) {
      nameArr.push(parseInt(element.getAttribute("index")));
    }
    count=2;
  });

  for (const [key, value] of Object.entries(animalData)) {

     if(containsNumber(nameArr,value.index)){
       for(var i=1;i<animalDataLength+1;i++){
          if(containsNumber(nameArr,i-1)){
            graphOneD.push(value[i-1]);
          }
       }
       graphTwoD.push(graphOneD);
       graphOneD = [];
     }
  } 
  
  zooAnimalTraversal(graphTwoD,graphTwoD.length, 0,nameArr);
}


function containsNumber(arr,val){
  for(var i=0;i<arr.length;i++){
    if(arr[i]===val)
      return true;
  }
  return false;
}


function zooAnimalTraversal(graph,len, s,nameArr) {
  const vertexO = [];
  var resultArr = [s];
  for (var i = s; i < len; i++) {
    if (i != s) {
      vertexO.push(i);
    }
  }

  var minPath = 10000000;
  do {
    var currentPathweight = 0;
    var k = s;
    for (var i = 0; i < vertexO.length; i++) {
      currentPathweight += graph[k][vertexO[i]];
      k = vertexO[i];
    }
    currentPathweight += graph[k][s];
    minPath = Math.min(minPath, currentPathweight);
    if (minPath == currentPathweight) {
      resultArr = [s];
      for (var i = 0; i < vertexO.length; i++) {
        resultArr.push(vertexO[i]);
      }
      resultArr.push(s);
    }
  } while (findNextPermutation(vertexO));

  appendMinPathList(Math.round(minPath * 100) / 100, resultArr, nameArr, resultArr.length);
  return;
}

function appendMinPathList(minPath, resultArr, nameArr, len){
  const minPathContainer = document.querySelector(".minPath-list");
  minPathContainer.innerHTML="";
  minPathContainer.innerHTML+=`<h2 class="info">Visit animal in the following order to save time</h2>
                              <ol></ol>`;
  const orderedList = minPathContainer.querySelector("ol");
  for(var i=0;i<len;i++){
    resultArr[i]=nameArr[resultArr[i]];
  }

  for(var i=0;i<len;i++){
    for (const [key, value] of Object.entries(animalData)) {
      if(resultArr[i]===value.index){
        orderedList.innerHTML+=`<li>${key}</li>`;
        break;
      }
    }
  }

  minPathContainer.innerHTML+=`<div class="minPath"><span>Total Distance to travel :<span> ${minPath}miles</div>`;
}

function swap(data, left, right) {
  var temp = data[left];
  data[left] = data[right];
  data[right] = temp;

  return data;
}

function reverse(data, left, right) {
  while (left < right) {
    var temp = data[left];
    data[left] = data[right];
    left++;
    data[right] = temp;
    right--;
  }

  return data;
}

function findNextPermutation(dataK) {
  var data = dataK;
  if (data.length <= 1)
    return false;

  var last = data.length - 2;

  while (last >= 0) {
    if (data[last] < data[last + 1])
      break;

    last--;
  }

  if (last < 0)
    return false;

  var nextGreater = data.length - 1;

  for (var i = data.length - 1; i > last; i--) {
    if (data[i] > data[last]) {
      nextGreater = i;
      break;
    }
  }

  data = swap(data, nextGreater, last);

  data = reverse(data, last + 1, data.length - 1);

  return true;
}


