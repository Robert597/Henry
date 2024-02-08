

let calcScrollValue = (color) => {
    let scrollProgress = document.getElementById("progress");
    let pos = document.documentElement.scrollTop;
    let calcHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    let scrollValue = Math.round((pos * 100) / calcHeight);
    if(pos > 150){
      scrollProgress.style.display = "flex";
    }else{
      scrollProgress.style.display = "none";
    }
    scrollProgress.addEventListener("click", () => {
      document.documentElement.scrollTop = 0;
    });
    scrollProgress.style.background = `conic-gradient(#2196f3 ${scrollValue}%, #d7d7d7 ${scrollValue}%)`;
    };
    export default calcScrollValue