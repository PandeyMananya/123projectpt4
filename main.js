song1 = "";
song2 = "";
LX = 0;
LY = 0;
RX = 0;
RY = 0;
SLW = 0;
SRW = 0;
song1_status = "";
song2_status = "";
function setup(){
canvas = createCanvas(500,400);
canvas.center();
video = createCapture(VIDEO);
video.hide();
posenet = ml5.poseNet(video, modelLoaded);
posenet.on('pose', gotposes);
}
function draw(){
    image(video, 0, 0, 500, 400);
    song1_status = song1.isPlaying();
    song2_status = song2.isPlaying();

    if(SLW>0.2){
circle(LX, LY, 20);
song2.stop();
if(song1_status == false){
song1.play();
document.getElementById("song_name").innerHTML = "Harry Potter Theme song";
}
    }
    if(SRW>0.2){
circle(RX, RY, 20);
song1.stop();
if(song2_status == false){
song2.play();
document.getElementById("song_name").innerHTML = "Peter Pan";
}
    }
}

function preload(){
    song1 = loadSound("music.mp3");
    song2 = loadSound("music2.mp3")
}

function modelLoaded(){
    console.log("modelLoaded");
}

function gotposes(results){
    console.log(results);
    LX = results[0].pose.leftWrist.x;
    LY = results[0].pose.leftWrist.y;
    RX = results[0].pose.rightWrist.x;
    RY = results[0].pose.rightWrist.y;
    console.log("leftWristx="+LX+"leftWristy="+LY+"rightWristx="+RX+"rightWristy="+RY);
SLW = results[0].pose.keypoints[9].score;
SRW = results[0].pose.keypoints[10].score;
console.log(SLW+SRW);
}