$("#AddEventBtn").click(function()
{
  $(".modal").css("display", "block");
});

$(".close").click(function()
{
  $(".modal").css("display", "none");
});

$("#submitEvent").click(function()
{
  $(".modal").css("display", "none");
  location.reload();
});

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

function submitEvent()
{
  console.log("!!!");
  title = $("#eventTitle").val();
  date = document.querySelector("#date").value;
  startDate = new Date(date);
  startTime = $("#startTime").val();
  endDate = new Date(date);
  endTime = $("#endTime").val();
  startDate.setHours(startTime.substring(0, 2));
  startDate.setMinutes(startTime.substring(3, 5));
  endDate.setHours(endTime.substring(0,2));
  endDate.setMinutes(endTime.substring(3, 5));


  eventDesc = $("#eventDesc").val();
  tasks = [$("#task1").val()];

  createEvent(title, startDate, endDate, eventDesc, tasks);
}


//<------------------------------AJAX------------------------------>
if (window.XMLHttpRequest) { // Mozilla, Safari, IE7+ ...
    httpRequest = new XMLHttpRequest();
} else if (window.ActiveXObject) { // IE 6 and older
    httpRequest = new ActiveXObject("Microsoft.XMLHTTP");
}

var URL = "http://localhost:3000/cruds";

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


var getFunction = function(data)
{
  if(httpRequest.readyState === XMLHttpRequest.DONE) //receive response
  {
    if(httpRequest.status === 200)//successful call
    {
    //alert(httpRequest.responseText);
      console.log("200 OK");
      parse = JSON.parse(data["currentTarget"]["response"]);
      for (i = 0; i < parse.length; i++)
      {
        currentEvent = parse[i];
        console.log("Event added: " + currentEvent["title"]);
        eventBody = $(".events tbody");
        eventBody.append($('<tr>')
        .append($('<th>')
        .append($('<div>')
        .hover(function()
        {
          $(this).toggleClass("hoverColor");
        })
        .text(currentEvent["title"])
        // .append($('<p>')
        // .text(currentEvent["tasks"])
        // .addClass("task")
        // .attr("hidden", "true"))

        .attr("id", currentEvent["title"]))));
        for(j = 0; j < currentEvent["tasks"].length;j++)
        {
          $("#" + currentEvent["title"])
          .append($('<p>')
          .text(j+ 1 + ". " + currentEvent["tasks"][j])
          .addClass("task"));
        }

      }
    }
    else
    {
      console.log("Problem with request");
    }
  }
  else
  {

  }
}


function getEvents()
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

getEvents();
// postEvent(new Event("Test Event", new Date (2017, 2, 1, 1),
// new Date (2017, 2, 1, 2), "test day", ["work", "cooking"]));
