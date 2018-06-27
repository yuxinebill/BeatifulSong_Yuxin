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

	// videoJS' function to push the myList into player
	player.playlist(myList);
	// Initialize the playlist-ui plugin with no option (i.e. the defaults).
	player.playlistUi();

	var artistName = "";
	var trackName = "";

	
	//loop btn loop or not loop function
	$("#loopBtn").on("click", function () {
		event.preventDefault();
		if ( videojs('video').loop() == false ) {
				videojs('video').loop(true);
				$("#loopBtn").text("Stop Looping");
			} else {
				videojs('video').loop(false);
				$("#loopBtn").text("Start Looping");				
			}
	});

	

	 
	//search function will take whatever the user typy in 
	$("#searchButton").on("click", function(){
		//prevents the submit button from trying to submit a form when clicked
	    event.preventDefault();
		//a var to hold what user type in
		var q = $("#userInput").val().trim().toLowerCase();

	    //if user do not type in any word, then show the alert
	    if ( q == "") {
	      alert("you did not type any word in!");
	    } ;

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
	        			youTuBeApiKey;
	        
	    // Performing an AJAX request with the queryURL
	    $.ajax({
	      url: queryURL,
	      method: "GET"
	    }).then (function (response){
	    	//get the ID of 5 new songs
	    	var videoId_0 = response.items[0].id.videoId ;
	    	var videoId_1 = response.items[1].id.videoId ;
	    	var videoId_2 = response.items[2].id.videoId ;
	    	var videoId_3 = response.items[3].id.videoId ;
	    	var videoId_4 = response.items[4].id.videoId ;
	    	// var url= "https://www.youtube.com/embed/" + videoId;

	    	//get the title of 5 new songs
	    	var videoTitle_0 = response.items[0].snippet.title ;
	    	var videoTitle_1 = response.items[1].snippet.title ;
	    	var videoTitle_2 = response.items[2].snippet.title ;
	    	var videoTitle_3 = response.items[3].snippet.title ;
	    	var videoTitle_4 = response.items[4].snippet.title ;

	    	//push the new songs into myList
	    	myList = [{
			  name: videoTitle_0 ,
			  description: '',
			  duration: 243,
			  sources: [
			    { src: 'https://www.youtube.com/embed/' + videoId_0, type: 'video/youtube' },
			  ],
			  // thumbnail give the pic in the playlist
			  thumbnail: [
			    {
			      srcset: 'https://i.ytimg.com/vi/' + videoId_0 + '/mqdefault.jpg',
			      type: 'image/jpg',
			      media: '(min-width: 400px;)'
			    }
			  ]
			},
			//second song in playlist
			{
			  name: videoTitle_1,
			  description: '',
			  duration: 249,
			  sources: [
			    { src: 'https://www.youtube.com/embed/' + videoId_1, type: 'video/youtube' },
			  ],
			  thumbnail: [
			    {
			      srcset: 'https://i.ytimg.com/vi/' + videoId_1 + '/mqdefault.jpg',
			      type: 'image/jpg',
			      media: '(min-width: 400px;)'
			    },
			  ]
			},
			//3rd song in playlist
			{
			  name: videoTitle_2 ,
			  description: '',
			  duration: 321,
			  sources: [
			    { src: 'https://www.youtube.com/embed/' + videoId_2, type: 'video/youtube' },
			  ],
			  thumbnail: [
			    {
			      srcset: 'https://i.ytimg.com/vi/' + videoId_2 + '/mqdefault.jpg',
			      type: 'image/jpg',
			      media: '(min-width: 400px;)'
			    },
			  ]
			 },
			 //4th song in playlist
			{
			  name: videoTitle_3 ,
			  description: '',
			  duration: 297,
			  sources: [
			    { src: 'https://www.youtube.com/embed/' + videoId_3, type: 'video/youtube' },
			  ],
			  thumbnail: [
			    {
			      srcset: 'https://i.ytimg.com/vi/' + videoId_3 + '/mqdefault.jpg',
			      type: 'image/jpg',
			      media: '(min-width: 400px;)'
			    },
			  ]
			 },
			 //5th song in playlist
			{
			  name: videoTitle_4 ,
			  description: '',
			  duration: 232,
			  sources: [
			    { src: 'https://www.youtube.com/embed/' + videoId_4, type: 'video/youtube' },
			  ],
			  thumbnail: [
			    {
			      srcset: 'https://i.ytimg.com/vi/' + videoId_4 + '/mqdefault.jpg',
			      type: 'image/jpg',
			      media: '(min-width: 400px;)'
			    },
			  ]
			 }	
			];

			player.playlist(myList);
			player.playlistUi();

	    	videojs('video').ready(function() {
	    		var myPlayer = this;
			  	myPlayer.src({ type: 'video/youtube', src: 'https://www.youtube.com/embed/' + videoId_0 });
			});
			  
			  
	    	
		    
		    var res = videoTitle_0.split("-");

		    console.log(videoTitle_0);
		    console.log(res);

		    artistName = res[0];
		    var foo = res[1].split("(");
		    trackName = foo[0];

		    console.log(artistName);
		    console.log(trackName);

		    var durationURL_0 = 	"https://www.googleapis.com/youtube/v3/videos?" +
		    						"&part=&contentDetails" + 
		    						"&id=" + videoTitle_0 +
		    						"&key=" + youTuBeApiKey ;

		   	console.log(durationURL_0);


		    // myList[0].name = str ;
		    // myList[0].duration = "";














		//youTube ajax ends
		}); 							
	// #searchButton event function ends
	});		
//doc ready function ends
});

 



