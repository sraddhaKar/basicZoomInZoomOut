$(document).ready(function () {

	//finding canvas element
	var canvas = document.getElementById('mycanvas'),
		context= canvas.getContext('2d');


	//storing canvas height and width
	var canvas_width = canvas.width,
      canvas_height = canvas.height;


	//initializing image height and width
	var initialImageWidth = 0;
	var newImageHeight = 0;
	var image_height, image_width;


	//initializing for cursor position
	var flag = false,
	   prev_X = 0,
	   curr_X = 0,
	   prev_Y = 0,
	   curr_Y = 0,
	   dot_flag = false;


	//initializing colour of line
	var x = "black";

	//zoomin zoomout flags
	var zoomin_flag, zoomout_flag;

	//loading image into canvas
	var image;
	image = new Image();
	image.onload = function() {
		image_height = image.height;
		image_width = image.width;
		newImageHeight = image_height / image_width * initialImageWidth;
		context.drawImage(image, 0, 0)
	};
	image.src = "image/yellow.jpg";


	//Zoom In function
	$("#zoomIn").click(function () {
		if (zoomin_flag)
		{
			// after zoom out, zoom in
			initialImageWidth = initialImageWidth * 2;
			newImageHeight = image_height / image_width * initialImageWidth;
			context.clearRect(0,0, canvas_width, canvas_height);
			context.drawImage(image, 0, 0, initialImageWidth, newImageHeight);
			draw(prev_X, prev_Y, curr_X, curr_Y);
			zoomin_flag = 0;
		}
		else {
			//first time zoom in
			initialImageWidth = image_width;
			initialImageWidth = initialImageWidth * 2;
			newImageHeight = image_height / image_width * initialImageWidth;
			context.clearRect(0,0, canvas_width, canvas_height);
			context.drawImage(image, 0, 0, initialImageWidth, newImageHeight);
			draw(prev_X*2, prev_Y*2, curr_X*2, curr_Y*2);
			zoomout_flag = 1;
		}

	});


	// Zoom Out function
	$("#zoomOut").click(function () {
		if (zoomout_flag) {
			//after zoom in, zoom out
			initialImageWidth = initialImageWidth / 2;
			newImageHeight = image_height / image_width * initialImageWidth;
			context.clearRect(0,0, canvas_width, canvas_height);
			context.drawImage(image, 0, 0, initialImageWidth, newImageHeight);
			draw(prev_X, prev_Y, curr_X, curr_Y);
			zoomout_flag = 0;
		}
		else {
			//first time zoom out
			initialImageWidth = image_width;
			initialImageWidth = initialImageWidth / 2;
			newImageHeight = image_height / image_width * initialImageWidth;
			context.clearRect(0,0, canvas_width, canvas_height);
			context.drawImage(image, 0, 0, initialImageWidth, newImageHeight);
			draw(prev_X/2, prev_Y/2, curr_X/2, curr_Y/2);
			zoomin_flag = 1;
		}

	});


	//event initializer for mousedown and mouseup
	canvas.addEventListener("mousedown", function (e) { findxy('down', e)}, false);
	canvas.addEventListener("mouseup", function (e) { findxy('up', e)}, false);


	//finding position of mouse
	function findxy(respond, e) {

		//function for mousedown event
		if (respond == 'down') {
			prev_X = curr_X;
			prev_Y = curr_Y;
			curr_X = e.clientX - canvas.offsetLeft;
			curr_Y = e.clientY - canvas.offsetTop;
			flag = true;
			dot_flag = true;
			if (dot_flag) {
				context.beginPath();
				context.fillStyle = x;
				context.fillRect(curr_X, curr_Y, 2, 2);
				context.closePath();
				dot_flag = false;
			}
		}

		//function for mouseup event
		if (respond == 'up') {
			if (flag) {
				prev_X = curr_X;
				prev_Y = curr_Y;
				curr_X = e.clientX - canvas.offsetLeft;
				curr_Y = e.clientY - canvas.offsetTop;
				draw(prev_X, prev_Y, curr_X, curr_Y);
			}
		}
	}


	//function for drawing line
	function draw(prev_X, prev_Y, curr_X, curr_Y) {
		context.beginPath();
		context.moveTo(prev_X, prev_Y);
		context.lineTo(curr_X, curr_Y);
		context.strokeStyle = x;
		context.stroke();
	}
});
