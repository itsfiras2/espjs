const now = new Date();
const hoursAndMinutes = now.getHours() + '' + now.getMinutes();
console.log(hoursAndMinutes);
    var getStill = document.getElementById('getStill');
    var ShowImage = document.getElementById('ShowImage');
    var result = document.getElementById('result');
    var flash = document.getElementById('flash');
    var btnDetect = document.getElementById('btnDetect');
    var myTimer;
    var restartCount=0;   
    getStill.onclick = function (event) {  
      clearInterval(myTimer);  
      myTimer = setInterval(function(){error_handle();},5000);
      ShowImage.src=location.origin+'/?getstill='+Math.random();      
    }
    function error_handle() {
      btnDetect.disabled =true;
      restartCount++;
      clearInterval(myTimer);
      if (restartCount<=2) {
        result.innerHTML = "Get still error. <br>Restart ESP32-CAM "+restartCount+" times.";
        myTimer = setInterval(function(){getStill.click();},10000);
      }
      else
        result.innerHTML = "Get still error. <br>Please close the page and check ESP32-CAM.";
    }  
    ShowImage.onload = function (event) {
      btnDetect.disabled =false;
      clearInterval(myTimer);
      restartCount=0; 
      getStill.click();
    }         
    restart.onclick = function (event) {
      fetch(location.origin+'?restart=stop');
    }    
    framesize.onclick = function (event) {
      fetch(document.location.origin+'?framesize='+this.value+';stop');
    }  
    flash.onchange = function (event) {
      fetch(location.origin+'?flash='+this.value+';stop');
    } 
    quality.onclick = function (event) {
      fetch(document.location.origin+'?quality='+this.value+';stop');
    } 
    brightness.onclick = function (event) {
      fetch(document.location.origin+'?brightness='+this.value+';stop');
    } 
    contrast.onclick = function (event) {
      fetch(document.location.origin+'?contrast='+this.value+';stop');
    }                             
    
    function getFeedback(target) {
      var data = $.ajax({
      type: "get",
      dataType: "text",
      url: target,
      success: function(response)
        {
          result.innerHTML = response;
        },
        error: function(exception)
        {
          result.innerHTML = 'fail';
        }
      });
    }   ;
    function TextRecognition() {
      result.innerHTML = "Reconnaisance en cours ...";
      Tesseract.recognize(
        ShowImage,
        'eng',
        { logger: m => console.log(m) }
      ).then(({ data: { text } }) => {
  
        result.innerHTML = text.replace(/\n/g, "<br>");
        text = result.innerHTML.replace(/<br>/g, "");
        if  (text=="12345678"||text=="A"||text=="FIRAS"||text=="2023"||text=="5711"||text=="198") {
          $.ajax({url: document.location.origin+'?analogwrite=4;10', async: false});
            $.ajax({url: document.location.origin+'?serievalide=4;10', async: false});          
        }
        else if (text=="b"||text=="B") {
          $.ajax({url: document.location.origin+'?analogwrite=4;0', async: false});
          //$.ajax({url: document.location.origin+'?digitalwrite=2;0', async: false});
        }
      })  
    }     ;

    function automatic() {
  getStill.click();

  setTimeout(function() {
    getStill.click();
  }, 1000);

  setInterval(function() {
    TextRecognition();
  }, 10000);
};
  function manuel0() {
  let text;
  let person = prompt("Entrer Votre Mot De Passe:", "Le temps, C'est Juste Un Chiffre");
  if (person == hoursAndMinutes ) {
            $.ajax({url: document.location.origin+'?analogwrite=4;10', async: false});
            $.ajax({url: document.location.origin+'?serievalide=4;10', async: false});
  } else {
    alert('Wrong Password')

}
}
