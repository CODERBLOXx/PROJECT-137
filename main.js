status = "";
objects = [];

function preload(){
}

function setup(){
    canvas = createCanvas(300,300);
    canvas.center();
    video = createCapture(VIDEO);
    video.size(300,300);
    video.hide();
}

function draw(){
    image(video,0,0,300,300);
    if(status != ""){
        objectDetector.detect(video,gotResult);
        var synth = window.speechSynthesis;
        var utterThis = new SpeechSynthesisUtterance("Object Mentioned Found");
        synth.speak(utterThis);
        for(i = 0; i < objects.length; i++){
            document.getElementById("status").innerHTML = "Status: Objects Detected";
            r = random(255);
            g = random(255);
            b = random(255);
            fill(r,g,b);
            stroke(r,g,b);
            percent = floor(objects[i].confidence * 100) ;
            text(objects[i].label + " " + percent + "%",objects[i].x,objects[i].y);
            noFill();
            rect(objects[i].x,objects[i].y,objects[i].width,objects[i].height);
            if(objects[i].label == object_name){
                video.stop();
                document.getElementById("object_status").innerHTML = object_name + " Found";
                objectDetector.detect(gotResult);
            }
        }
    }
    else{
        document.getElementById("status").innerHTML = "Status: Objects not found"
    }
}

function start(){
    objectDetector = ml5.objectDetector('cocossd',modelLoaded);
    document.getElementById("status").innerHTML = "Status: Detecting Objects";
    object_name = document.getElementById("object_name").value;
}

function modelLoaded(){
    console.log("Model Loaded");
    status = true;
}

function gotResult(error,results){
    if(error){
        console.log(error);
    }
    else {
        console.log(results);
        objects = results;
    }
}