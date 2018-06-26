$(document).ready(function() {

	var player = videojs("video");
	// Player will play the first item in myList
	var myList = [{
	  name: 'P!nk - Just Give Me A Reason ft. Nate Ruess',
	  description: '',
	  duration: 243,
	  sources: [
	    { src: 'https://www.youtube.com/embed/OpQFFLBMEPI', type: 'video/youtube' },
	  ],
	  // thumbnail give the pic in the playlist
	  thumbnail: [
	    {
	      srcset: 'https://i.ytimg.com/vi/OpQFFLBMEPI/mqdefault.jpg',
	      type: 'image/jpg',
	      media: '(min-width: 400px;)'
	    }
	  ]
	},
	//second song in playlist
	{
	  name: 'P!nk - Try',
	  description: '',
	  duration: 249,
	  sources: [
	    { src: 'https://www.youtube.com/embed/yTCDVfMz15M', type: 'video/youtube' },
	  ],
	  thumbnail: [
	    {
	      srcset: 'https://i.ytimg.com/vi/yTCDVfMz15M/mqdefault.jpg',
	      type: 'image/jpg',
	      media: '(min-width: 400px;)'
	    },
	  ]
	},
	//3rd song in playlist
	{
	  name: 'P!nk - What About Us',
	  description: '',
	  duration: 321,
	  sources: [
	    { src: 'https://www.youtube.com/embed/ClU3fctbGls', type: 'video/youtube' },
	  ],
	  thumbnail: [
	    {
	      srcset: 'https://i.ytimg.com/vi/ClU3fctbGls/mqdefault.jpg',
	      type: 'image/jpg',
	      media: '(min-width: 400px;)'
	    },
	  ]
	 },
	 //4th song in playlist
	{
	  name: 'P!nk - Beautiful Trauma',
	  description: '',
	  duration: 297,
	  sources: [
	    { src: 'https://www.youtube.com/embed/EBt_88nxG4c', type: 'video/youtube' },
	  ],
	  thumbnail: [
	    {
	      srcset: 'https://i.ytimg.com/vi/EBt_88nxG4c/mqdefault.jpg',
	      type: 'image/jpg',
	      media: '(min-width: 400px;)'
	    },
	  ]
	 },
	 //5th song in playlist
	{
	  name: 'P!nk - Just Like Fire',
	  description: '',
	  duration: 232,
	  sources: [
	    { src: 'https://www.youtube.com/embed/5Nrv5teMc9Y', type: 'video/youtube' },
	  ],
	  thumbnail: [
	    {
	      srcset: 'https://i.ytimg.com/vi/5Nrv5teMc9Y/mqdefault.jpg',
	      type: 'image/jpg',
	      media: '(min-width: 400px;)'
	    },
	  ]
	 }	
	];

	player.playlist(myList);
	// Initialize the playlist-ui plugin with no option (i.e. the defaults).
	player.playlistUi();

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
	        			"&key=" + 
	        			youTuBeApiKey ;
	        
	    // Performing an AJAX request with the queryURL
	    $.ajax({
	      url: queryURL,
	      method: "GET"
	    }).then (function (response){
	    	console.log(response);
	    	videoId = response.items[0].id.videoId
	    	var url= "https://www.youtube.com/embed/" + videoId;
	    	
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

		    var durationURL = 	"https://www.googleapis.com/youtube/v3/videos?" +
		    					"&part=&contentDetails" + youTuBeApiKey ;

		   	console.log(durationURL);


		    // myList[0].name = str ;
		    // myList[0].duration = "";














		//youTube ajax ends
		}); 							
	// #searchButton event function ends
	});		
//doc ready function ends
});

 



