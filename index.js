
// func to make nav bar dissapear when scroll down but appear when scroll up 
let prevScrollPosition = window.pageYOffset;
window.onscroll = function () {
  let currentScrollPosition = window.pageYOffset;
  if (prevScrollPosition > currentScrollPosition) {
    document.getElementById("navbar").style.top = "0";
  } else {
    document.getElementById("navbar").style.top = "-50px";
  }
  prevScrollPosition = currentScrollPosition;
}

