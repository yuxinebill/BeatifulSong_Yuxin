$(document).ready(function() {

	var player = videojs("video");

	// Player will play the first item in myList, manully choose these 5 songs :) <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
	var myList = [{
	  name: 'P!nk - Just Give Me A Reason ft. Nate Ruess',
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
	]; // myList is over >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

	// videoJS' function to push the myList into player
	player.playlist(myList);
	// Initialize the playlist-ui plugin with no option (i.e. the defaults).
	player.playlistUi();

	var artistName = "";
	var trackName = "";

	var userList = [];	

	// click add to my list btn,  start <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
	$("#toMyListBtn").on("click", function () {
		event.preventDefault();
		//var hold the song's URL, which is playing right now		
		var currentSongURL = player.currentSrc() ;

		function addIt () { 
			//find the index of the video be playing in the playlist, and the unshift it to user list
			var x = player.playlist.indexOf(currentSongURL);
			//push the selected video to userList
			userList.unshift(myList[x]);
			
			var imgURL = myList[x].thumbnail[0].srcset;
			var songNames = myList[x].name;
			var songNames_short = songNames
			//write card element to hold the selected video
			$("<card>").append($("<img>").addClass("card-img-top").attr("src",imgURL)).prependTo($("#myList")).append($("<div>").addClass("card-body px-0 pt-1 clearfix").append($("<p>").addClass("card-text d-inline").text(songNames)).append($("<a>").attr("id", imgURL).addClass("btn btn-sm btn-warning float-right d-inline deleteBtn").text('Delete')));
		};//addit fuc end, not call yet 

		//var to hold all URL of favorite list
		var userListURLarr = [];

		//if userlist has more than one oject, then create an arr to hold all URL of userList
		if (userList.length>0)  {
			var x = [];
			userListURLarr = x ;

			for (i=0 ; i<userList.length; i++) {
				var eachURL = userList[i].sources[0].src;
				x.push(eachURL);
			};

			var y = userListURLarr.indexOf(currentSongURL);

			if (y>=0) { //if current video's URL is in userList URL, then alert
				alert("This video is in your Favorite List already!");
			} else { addIt()};// if not in userList URL, then call addIt function

		} else { addIt();}//if userList has no ob, then call addIt func direacly

		// console.log(myList);
		// console.log(userList);

	});//toMyListBtn end >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>


	$(document).on("click", ".deleteBtn", function() { // delete func start <<<<<<<<<<<<<<<<<<<<<<<<<<<
		event.preventDefault();
		//get the id of the btn be clicked
		var idURL = this.id;

		var currentIndex_user = 0;
		for (i=0 ; i<userList.length; i++) {
			currentIndex_user = i;
			var eachURL = userList[i].thumbnail[0].srcset;	
			if (eachURL == idURL) {
				break;
			}; //if func end
		}; // for func end
		
		console.log(currentIndex_user);
		//delete clicked oject from userList
		userList.splice(currentIndex_user, 1);
		// console.log(userList);
		// console.log(myList);

		this.parentElement.parentElement.remove();
	}); //delete video func end >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
	
	//loop btn for loop or not loop the video is playing start <<<<<<<<<<<<<<<<<<<<<<<<<<<
	$("#loopBtn").on("click", function () {
		event.preventDefault();
		if ( videojs('video').loop() == false ) {
				videojs('video').loop(true);
				$("#loopBtn").text("Stop Looping");
			} else {
				videojs('video').loop(false);
				$("#loopBtn").text("Start Looping");				
			}
	}); // loop end >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

	$("#playMyListBtn").on("click", function () { //play my list start <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
		if (userList.length == 0) {
			alert("Please add songs to your list first."); // no video in the list ,then alert
		} else if (userList == myList) { 				   // userlist is playing
			alert("Your list is playing right now!");
		} else {	
			player.playlist(userList);
			player.playlistUi();
			player.playlist.autoadvance();
			var firstVideoInUserList = userList[0].sources[0].src;
			//place the first video in new playlist into player
			videojs('video').ready(function() {
 	    		var myPlayer = this;
 			  	myPlayer.src({ type: 'video/youtube', src: firstVideoInUserList });
 			}); 
		}
	}); // play my list end >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

	// ajax with lyrics start <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
	function lyricAjax () {
		$.ajax({ 
		    type: "GET",
		    data: {
		        apikey:"4e47003b16d7ec32ed3a07f9fdf8afc3",
		        q_track: trackName,
		        q_artist: artistName,
		        format:"jsonp",
		        callback:"jsonp_callback"
		    },
		    url: "https://api.musixmatch.com/ws/1.1/matcher.lyrics.get",
		    dataType: "jsonp",
		    jsonpCallback: 'jsonp_callback',
		    contentType: 'application/json',
		    success: function(data) {
		        console.log(data);
		        $('#currentLyric').empty();
		        // console.log(data.message.body.lyrics.lyrics_body);
		        var x = JSON.stringify(data.message.body.lyrics.lyrics_body)
		        var haha = x.replace(/\\n/g, "<br/>");

		        $('#currentLyric').html(haha);
		    },		     
		}); 
	}; // ajax for lyrics end >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

	// lyric searching button func <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
	$("#lyricBtn").on("click", function(){
		event.preventDefault();
		arN = $("#artist_name").val().trim().toLowerCase();
		trN = $("#track_name").val().trim().toLowerCase();
		//if user do not typy in any word, then ....
		if (arN == "" || trN == "") {
			$('#currentLyric').text("Hey, do NOT forgot typing in both artist name and the song's name ...");
			$("#song_title").html("Welcome to ");
			$("#song_title").append($("<span>").css("color", "pink").text("PIN"));
			$("#song_title").append($("<span>").addClass("font-weight-light").text("songs"));
			$("#song_title").append(" !");		
		} else {
			$.ajax({ 
			    type: "GET",
			    data: {
			        apikey:"4e47003b16d7ec32ed3a07f9fdf8afc3",
			        q_track: trN,
			        q_artist: arN,
			        format:"jsonp",
			        callback:"jsonp_callback"
			    },
			    url: "https://api.musixmatch.com/ws/1.1/matcher.track.get",
			    dataType: "jsonp",
			    jsonpCallback: 'jsonp_callback',
			    contentType: 'application/json',
			    success: function(data) {
			        console.log(data);
			        $('#song_title').empty();

			        if (data.message.body == "") {
			        	$('#currentLyric').text("Sorry, could not find what was requested ...");
						$("#song_title").html("Welcome to ");
						$("#song_title").append($("<span>").css("color", "pink").text("PIN"));
						$("#song_title").append($("<span>").addClass("font-weight-light").text("songs"));
						$("#song_title").append(" !");	
			        } else {
			        	artistName = data.message.body.track.artist_name;
				        trackName = data.message.body.track.track_name;

				        console.log(data.message.body.track.track_name);
				        console.log(data.message.body.track.artist_name);

				        $('#song_title').text(artistName + " - " + trackName);

				        lyricAjax ();
				    }// else end			        
			    },// success func end
			}); //ajax end		
		};// if func end	
	});//lyric searching button func end >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>



	function arSearchFun () {// ============= Artist search variables ============= 

		
	    var gooArtistQuery=	'https://kgsearch.googleapis.com/v1/entities:search?query=' + 
	    					artistName + 
	    					'&key=AIzaSyCAu8rpZg4vODYzCd1Guz3m8YwLWBZpilM&limit=5';
	// ============== Album Search by track variables=====
	// You can search by track to get info on the album. For some reason, trimming the spaces leads to disasterous results.
	    var gooSongQuery= 	'https://kgsearch.googleapis.com/v1/entities:search?query=' + 
	    					trackName + 
	    					'&types=MusicAlbum'+ '&key=AIzaSyCAu8rpZg4vODYzCd1Guz3m8YwLWBZpilM&limit=5'
	// ===========================        
	    $.ajax({
	        url: gooArtistQuery,
	        method: "GET"
	        }).then (function (response){
	        	$("#infoImg").attr("src","").removeClass("img-thumbnail");
	            $("#artist_name_info").empty();
	            $("#infoText").empty();
	            $("#artistWebsite").empty();

	            var results= response.itemListElement;
	            // console.log (results);
	            var artistName_info = results[0].result.name;
	            var artistDescription = results[0].result.detailedDescription.articleBody;
	            var artistOfficialURL = results[0].result.url;
	            var artistImageURL= results[0].result.image.contentUrl;
	            console.log(artistOfficialURL);
	            console.log(artistName_info);
	            console.log(artistDescription);
	            console.log(artistImageURL); 
	            
	            // $("<img>").attr("src", artistImageURL).attr("id", "infoImg").addClass("img-thumbnail mw-10 float-left mr-4").att("with","250").prependTo($("#bio"));
	            $("#infoImg").attr("src", artistImageURL).addClass("img-thumbnail");
	            $("#artist_name_info").text(artistName_info);
	            $("#infoText").text(artistDescription);
	            $("#artistWebsite").text("Find more info on ").append($("<span>").addClass("text-info").text(artistOfficialURL));
	    }); //end of artist search ajax

	    $.ajax({
	        url: gooSongQuery,
	        method: "GET"
	        }).then (function (response){
	        	$("#albumInfo").empty();
	        	console.log(response);
	            var album = response.itemListElement[0].result.detailedDescription.articleBody;
	            console.log(album);
	            $("#albumInfo").text(album).prepend($("<span>").addClass("text-info font-weight-bold").text("About The Album "));
	    }); // ajax end
	}// ============= artist search ajax func end ====================================================    
			
	// Artist searching button func <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
	$("#arSearchBtn").on("click", function(){
		event.preventDefault();
		$("#albumInfo").empty();
		$("#infoImg").attr("src","").removeClass("img-thumbnail");
        $("#artist_name_info").empty();
        $("#infoText").empty();
        $("#artistWebsite").empty();

        arN_info = $("#artist_name_input").val().trim().toLowerCase();
		trN_info = $("#track_name_input").val().trim().toLowerCase();
		console.log(arN_info);
		console.log(trN_info);


		//if user do not typy in any word, then ....
		if (arN_info == "" || trN_info == "") {
			$('#infoText').text("Hey, do NOT forgot typing in both artist name and the song's name ...");		
		} else {
			$.ajax({ 
			    type: "GET",
			    data: {
			        apikey:"4e47003b16d7ec32ed3a07f9fdf8afc3",
			        q_track: trN_info,
			        q_artist: arN_info,
			        format:"jsonp",
			        callback:"jsonp_callback"
			    },
			    url: "https://api.musixmatch.com/ws/1.1/matcher.track.get",
			    dataType: "jsonp",
			    jsonpCallback: 'jsonp_callback',
			    contentType: 'application/json',
			    success: function(data) {
			        console.log(data);

			        if (data.message.body == "") {
			        	$('#infoText').text("Sorry, could not find what was requested ...");
			        } else {
			        	artistName = data.message.body.track.artist_name;
				        trackName = data.message.body.track.track_name;

				        console.log(data.message.body.track.track_name);
				        console.log(data.message.body.track.artist_name);

				        arSearchFun ();		        
				    }// else end			        
			    },// success func end
			}); //ajax end		
		};// if func end	
	});//Artist searching button func end >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>



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
	      method: "GET",
	      async: false,
	    }).then (function (response){

	    	// console.log("youTube API data is below")
	    	// console.log(response);

	    	//var to hold 5 videoID | var to hold 5 videoTitle
			var videoIdArr = []; 
			var videoTitleArr = [];

			// for loop push 5 videoTitle | 5 videoID 
			for (i=0; i<myList.length; i++) {
				var x = response.items[i].id.videoId;
				var y = response.items[i].snippet.title;	
				videoIdArr.push(x);
				videoTitleArr.push(y);
			}; //for loop end	

			console.log("inside ajax, get all seaching videoId");
			console.log(videoIdArr);
			console.log("inside ajax, get all seaching videoTitle");
			console.log(videoTitleArr);

			var durationStrArr = [];
			//convert youtube api data duration into seconds. example of original data is PT1H54M40S
		    function convertTime (duration) {
		    	var durationStrArrs = duration.split(""); 
	    		var checkHour = durationStrArr.indexOf("H");      
			    if (checkHour >= 0) {
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

		    // console.log("inside ajax, myList is ")
		    // console.log(myList);
		   
		    for (i=0; i<myList.length; i++) { 
		        var ajaxList_end = [];		    	

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

			player.playlist(myList);
			player.playlistUi();
			player.playlist.autoadvance();
		    
		    var res = videoTitleArr[0].split("-");
		    $("#song_title").text(response.items[0].snippet.title);

		    // artist name and track name will be used by lyrics ajax later
		    artistName = res[0].trim();
		    var foo = res[1].split("(");
		    trackName = foo[0].trim();		
		}); //youTube ajax ends	
		// console.log(myList);
		
		//place the first video in new playlist into player
		videojs('video').ready(function() {
	    		var myPlayer = this;
	    		var firstVideoInMyList = myList[0].sources[0].src
			  	myPlayer.src({ type: 'video/youtube', src: firstVideoInMyList});
		}); // videojs('video')

		//fire lyric fuction; 
		lyricAjax ();
		//fire Artist in fo search fuction;
		arSearchFun ();	
	});	// #searchButton event function ends
});//doc ready function ends

 



