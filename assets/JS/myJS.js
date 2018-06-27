$(document).ready(function() {
	var player = videojs("video");

	// Player will play the first item in myList, manully choose these 5 songs :)
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
	    { src: 'https://www.youtube.com/embed/EBt_88nxG4c', type: 'video/youtube'},
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
	]; // myList is over

	// videoJS' function to push the myList into player
	player.playlist(myList);
	// Initialize the playlist-ui plugin with no option (i.e. the defaults).
	player.playlistUi();

	var artistName = "";
	var trackName = "";

	var userList = [];

	$("#toMyListBtn").on("click", function(){
		//var hold the song's URL, which is playing right now		
		var currentSongURL = player.currentSrc() ;
		var currentIndex = 0;
			
		for (i=0 ; i<myList.length; i++) {
			currentIndex = i;
			var eachURL = myList[i].sources[0].src;	
			if (eachURL == currentSongURL) {
				break;
			}; //if func end
		}; // for func end
		console.log(currentIndex);
		// $("<card>").addClass("card_" + toMyListBtnCounter).attr("src", "")
	});



	
	//loop btn for loop or not loop the video is playing
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
	 
	//search function will take whatever the user type in 
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


	    	//var to hold 5 videoID | var to hold 5 videoTitle
			var videoIdArr = []; 
			var videoTitleArr = [];

			// for loop push 5 videoTitle | 5 videoID | new myList
			for (i=0; i<myList.length; i++) {
				videoIdArr[i] = response.items[i].id.videoId;
				videoTitleArr[i] = response.items[i].snippet.title;	
			}; //for loop end	

			var durationStrArr = [];
			//convert youtube api data duration into seconds. example of original data is PT1H54M40S
		    function convertTime (duration) {
		    	var durationStrArrs = duration.split(""); 
	    		var checkHour = durationStrArr.indexOf("H");      
			    if (checkHour >= 0 ){
			    	//PT1H54M40S
			        var duration_a = duration.split('T'); //[P,1H54M40S]
			    	var hour_1 = duration_a[1].split('H');//[1, 54M40S]
			    	var hour = hour_1[0] * 60 * 60 ;
			    	var min_1 = hour_1[1].split('M'); //[54,40S]
			    	var min = min_1[0] * 60;
			    	var second_1 = min_1[1].split("S"); //[40]
			    	var second = second_1[0] * 1;
			    	var duration = hour + min + second;
			    	return duration;
			    } else {
			        var duration_a = duration.split('T'); 
			    	var min_1 = duration_a[1].split('M');
			    	var min = min_1[0] * 60;
			    	var second_1 = min_1[1].split("S");
			    	var second = second_1[0] * 1;
			    	var duration = min + second;
			    	return duration;
			    };// if function end 
			}; //convertTime function end

		    //arr hold 5 queryURL for each video | arr hold all duration
		    var durationURLarr = [];
		    var durationArr = [];

		    // url to get each video duration 
		    for (i=0; i<myList.length; i++) { 
		    	durationURLarr[i] = "https://www.googleapis.com/youtube/v3/videos?part=contentDetails&id=" + 
		    						videoIdArr[i] +
		    						"&key=" + youTuBeApiKey ;
		    	$.ajax({
			      url: durationURLarr[i],
			      method: "GET",
			      async: false,
			    }).then (function (response){
				    durationStrArr[i] = response.items[0].contentDetails.duration;
				    durationArr[i] = convertTime(durationStrArr[i]);
			    }); //ajax get duration end

			    myList[i] = {
				  name: videoTitleArr[i] ,
				  duration: durationArr[i],
				  sources: [
				    { src: 'https://www.youtube.com/embed/' + videoIdArr[i], type: 'video/youtube' },
				  ],
				  // thumbnail give the pic in the playlist
				  thumbnail: [
				    {
				      srcset: 'https://i.ytimg.com/vi/' + videoIdArr[i] + '/mqdefault.jpg',
				      type: 'image/jpg',
				      media: '(min-width: 400px;)'
				    }
				  ]
				} //myList end
		    };// for loop end

		    console.log(durationStrArr);
		    console.log(durationArr);
			//place the first video in new playlist into player
			videojs('video').ready(function() {
 	    		var myPlayer = this;
 			  	myPlayer.src({ type: 'video/youtube', src: 'https://www.youtube.com/embed/' + videoIdArr[0] });
 			}); // videojs('video')

			player.playlist(myList);
			player.playlistUi();
		    
		    var res = videoTitleArr[0].split("-");

		    console.log(videoTitleArr[0]);
		    console.log(res);

		    artistName = res[0].trim();
		    var foo = res[1].split("(");
		    trackName = foo[0].trim();

		    console.log(artistName);
		    console.log(trackName);



		   

		    
					
			








		   	

















		
		}); //youTube ajax ends	
	});	// #searchButton event function ends	
});//doc ready function ends

 



