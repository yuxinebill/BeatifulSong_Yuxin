$(document).ready(function() {

	var q = "";

	var videoId = "";

	var artistName = "";

	var trackName ="";

	//create play-list

	//search function will take whatever the user typy in 
	$("#searchButton").on("click", function(){
		//prevents the submit button from trying to submit a form when clicked
	    event.preventDefault();
		//a var to hold what user type in
		var q = $("#userInput").val().trim().toLowerCase();

	    //if user do not type in any word, then show the alert
	    if ( q == "") {
	      alert("you did not type any word in!")
	    } else {
	  		//search the song of userInput
	  		userSearch = userInput ;}

	  	//youTuBe API key
		var youTuBeApiKey = "AIzaSyCJ4ygjtnrG-r3EoZ3jiR5ssYiFN_JahCQ" ;

		 // Constructing a queryURL using the API
	    var queryURL = 	"https://www.googleapis.com/youtube/v3/search?" +
	        			"&part=snippet" +
	        			"&type=video" +
	        			"&q=" + q +
	        			"&maxResults=5" +
	        			"&videoCategoryId=10" +
	        			"&key=" + youTuBeApiKey;
	        
	    // Performing an AJAX request with the queryURL
	    $.ajax({
	      url: queryURL,
	      method: "GET"
	    }).then (function (response){
	    	console.log(response);
	    	videoId = response.items[0].id.videoId
	    	var url= "https://www.youtube.com/embed/" + videoId;
	    	//"<source src='"+url+"'>");
	    	console.log(url);	

	    	//change the video ULR whenever the user type in keyword
	    	videojs('preview-player').ready(function() {
			  var myPlayer = this;
			  myPlayer.src({ type: 'video/youtube', src: url });
			});

	    	
		    var str = response.items[0].snippet.title;
		    var res = str.split("-");

		    console.log(str);
		    console.log(res);

		    artistName = res[0];
		    trackName = res[1];

		    console.log(artistName);
		    console.log(trackName);

		}); 							

	});	
	

});



