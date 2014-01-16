// this sets the background color of the master UIView (when there are no windows/tab groups on it)
Titanium.UI.setBackgroundColor('#000');

var webview = Titanium.UI.createWebView({
	url : '/helloworld.html'
});
var window = Titanium.UI.createWindow();
window.add(webview);
window.open({
	modal : true
});
Ti.API.info("udiowjio");

//CAMERA API START -----------------------------------------------------------------------
Titanium.App.addEventListener("cameraButtonClick", function(e) {
	Titanium.Media.showCamera({
		success : function(e) {
			if (e.mediaType === Titanium.Media.MEDIA_PHOTO) {
				//It's a photo
				var imageView = Titanium.UI.createImageView({
					image : e.media,
					width : 288,
					height : 215,
					top : 12,
					zIndex : 1
				})
				win.add(imageView);
			} else if (e.mediaType === Titanium.Media.MEDIA_VIDEO) {
				//It's a Video
				var w = Titanium.UI.createWindow({
					title : "New Video",
					backgroundColor : "#000000"
				})
				// Plays the video after recording
				var videoPlayer = Titanium.Media.createVideoPlayer({
					media : e.media
					//hier würden theoretisch die abspiel einstellungen rein kommen
				})
				w.add(videoPlayer);
				videoPlayer.addEventListener("complete", function(e) {
					w.remove(videoPlayer);
					videoPlayer = null;
					w.close();
				})
			}
		},
		//couldn't start camera error
		error : function(e) {
			alert("There was an error");
		},
		//canceled error
		cancel : function(e) {
			alert("the function was cancelled");
		},
		//settings
		allowEditing : true,
		saveToPhotoGallery : true,
		mediaTypes : [Titanium.Media.MEDIA_TYPE_PHOTO, Titanium.Media.MEDIA_TYPE_VIDEO],
		videoQuality : Titanium.Media.QUALITY_HIGH
	});
});

//CAMERA API END -----------------------------------------------------------------------

//Mikrofon "Start" ----------------------------------------------------------------------

var recorder;
var sound = Titanium.Media.createSound();

Titanium.App.addEventListener("MicrophoneStart", function(e) {


	if (recorder == null) {
		recorder = Titanium.Media.createAudioRecorder();
		Titanium.Media.audioSessionMode = Ti.Media.AUDIO_SESSION_MODE_PLAY_AND_RECORD;
	}

	if (e.status === "start") {
		if (!recorder.recording) {
			recorder.start();
		}

	} else if (e.status === "stop") {
		if (!recorder.stopped) {
			var recording = recorder.stop();

			var file = Ti.Filesystem.getFile(Ti.Filesystem.applicationDataDirectory, "TestAufnahme.mp3");

			file.write(recording);

			if (file.exists) {
				sound.url = file;
			} else {
				alert("file does not exist");
			}

		}

	} else if (e.status === "pause") {
		recorder.pause();
	} else if (e.status === "play") {
		sound.play();

	}
	Ti.API.info("Microphone Status: " + e.status);

});

// Mikrofon Ende ------------------------------------------------------------------------

//Mikrofon "Stop" ------------------------------------------------------------------------

// Mikrofon Ende ------------------------------------------------------------------------

