
 
let androidIndex = 0; // start from 1 (next after first visible)

function loadMoreAndroid() {

  let videos =
  document.querySelectorAll(
    "#androidVideos .video"
  );

  videos.forEach(v=>{
    v.style.display = "none";
  });

  androidIndex =
  (androidIndex + 1) % videos.length;

  videos[androidIndex].style.display =
  "block";

  videos[androidIndex].scrollIntoView({
      behavior:"smooth",
      block:"nearest"
  });
}
  function hideAll(className) {
  var items = document.getElementsByClassName(className);
  for (var i = 0; i < items.length; i++) {
    items[i].style.display = "none";
  }
}
function showPage(page) {
 
 let videos = document.querySelectorAll("#androidVideos .video");

  videos.forEach(v => v.style.display = "none");

  videos[page - 1].style.display = "block";

  androidIndex = page; // 🔥 sync index
}



let phpIndex = 0;

function loadMorePHP() {

  let videos =
  document.querySelectorAll(
    "#phpVideos .pvideo"
  );

  videos.forEach(v=>{
    v.style.display = "none";
  });

 phpIndex =
  (phpIndex + 1) % videos.length;

  videos[phpIndex].style.display =
  "block";

  videos[phpIndex].scrollIntoView({
      behavior:"smooth",
      block:"nearest"
  });
}
  function showPageP(page) {
  
     let videos = document.querySelectorAll("#phpVideos .pvideo");

  videos.forEach(v => v.style.display = "none");

  videos[page - 1].style.display = "block";

  EngIndex = page;  // 🔥 THIS FIXES "old videos appearing"
}
  
  let EngIndex = 0;

function loadMoreEnglish() {
    let videos =
  document.querySelectorAll(
    "#engVideos .evideo"
  );

  videos.forEach(v=>{
    v.style.display = "none";
  });

  EngIndex =
  (EngIndex + 1) % videos.length;

  videos[EngIndex].style.display =
  "block";

  videos[EngIndex].scrollIntoView({
      behavior:"smooth",
      block:"nearest"
  });
  
}
  function showPageE(page) {
  
     let videos = document.querySelectorAll("#engVideos .evideo");

  videos.forEach(v => v.style.display = "none");

  videos[page - 1].style.display = "block";

  EngIndex = page;  // 🔥 THIS FIXES "old videos appearing"
}
  
  function showPageS(page) {
     hideAll("svideo");
 

  document.getElementById("pa" + page).style.display = "block";
}
  function showPageEn(page) {
     hideAll("envideo");

  document.getElementById("en" + page).style.display = "block";
}
