//<------------------------------Event Functions------------------->
var Event = function(title, startTime, endTime, desc, tasks)
{
  this.title = title;
  this.startTime = startTime;
  this.endTime = endTime;
  this.desc = desc;
  this.tasks = tasks;
}
var table = document.querySelector(".events");

var createEvent = function(title, startTime, endTime, desc, tasks)
{
  newEvent = new Event(title, startTime, endTime, desc, tasks);
  postEvent(newEvent);
}

//<------------------------------AJAX------------------------------>
if (window.XMLHttpRequest) { // Mozilla, Safari, IE7+ ...
    httpRequest = new XMLHttpRequest();
} else if (window.ActiveXObject) { // IE 6 and older
    httpRequest = new ActiveXObject("Microsoft.XMLHTTP");
}

var URL = "http://localhost:3000/index";

var ajaxHandler = function(data){
  if(httpRequest.readyState === XMLHttpRequest.DONE) //receive response
  {
    if(httpRequest.status === 200)//successful call
    {
      console.log("200 OK");
      //parse = JSON.parse(data["currentTarget"]["response"]);

    }
    else
    {
      console.log("Problem with request");
    }
  }
  else
  {
    console.log("No response");
  }
}

function getEvents(getFunction)
{
  httpRequest.onreadystatechange = getFunction;
  httpRequest.open("GET", URL);
  httpRequest.send();
}

function postEvent(e)
{

  httpRequest.onreadystatechange = ajaxHandler;
  //httpRequest.open("POST", getURL);
  data1 = JSON.stringify(e);
  console.log("Stringify: " + data1);
  $.ajax({
    type:"POST",
    url: URL,
    data: data1,
    contentType: "application/json",
    dataType: "json",
    success: ajaxHandler
  });
}


postEvent("Test Event", new Date (2017, 2, 1, 1),
new Date (2017, 2, 1, 2), "test day", []);
