// this sets the background color of the master UIView (when there are no windows/tab groups on it)
Titanium.UI.setBackgroundColor('#000');

var webview = Titanium.UI.createWebView({
	url : '/test.html'
});
var window = Titanium.UI.createWindow();
window.add(webview);
window.open({
	modal : true
});

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

				var videoPlayer = Titanium.Media.createVideoPlayer({
					media : e.media
				})
				w.add(videoPlayer);
				videoPlayer.addEventListener("complete", function(e) {
					w.remove(videoPlayer);
					videoPlayer = null;
					w.close();
				})
			}
		},
		error : function(e) {
			alert("There was an error");
		},
		cancel : function(e) {
			alert("the function was cancelled");
		},
		allowEditing : true,
		saveToPhotoGallery : true,
		mediaTypes : [Titanium.Media.MEDIA_TYPE_PHOTO, Titanium.Media.MEDIA_TYPE_VIDEO],
		videoQuality : Titanium.Media.QUALITY_HIGH
	});
}); 

//CAMERA API END -----------------------------------------------------------------------