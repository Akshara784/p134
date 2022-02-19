img="";
status="";
object=[];

function preload(){
    song=loadSound('be_happy.mp3');
}

function setup(){
    canvas=createCanvas(400,400);
    canvas.center();
    video= createCapture(VIDEO);
    video.size(400,400);
    video.hide();
    ObjectDetector=ml5.objectDetector('cocossd',modelLoaded);
    document.getElementById("status").innerHTML="status: detecting baby";
}

function modelLoaded(){
    console.log("model Loaded");
    status=true;
    ObjectDetector.detect(video,gotResult);
}

function draw(){
    image(video,0,0,400,400);

    if(status != "" ){
        ObjectDetector.detect(video,gotResult);
        r= random(255);
        g=random(255);
        b=random(255);
        for(i=0; i<object.length; i++){
            document.getElementById("status").innerHTML="status: object detected";
            document.getElementById("number_of_objects").innerHTML= "Number of the objects detected are: "+object.length;
            fill(r,g,b);
            percent=floor(object[i].confidence*100);
            text(object[i].label+ " " +percent+"%",object[i].x+15, object[i].y+15);
            noFill();
            stroke(r,g,b);
            rect(object[i].x, object[i].y, object[i].width, object[i].height);
            if(object[i].label=="person"){
                document.getElementById("number_of_objects").innerHTML="baby found";
                song.stop();
            }
            else{
                document.getElementById("number_of_objects").innerHTML="baby not found";
                song.play();
            }
        }
    }
}

function gotResult(error,results){
    if(error){
        console.log(error);
    }

    else{
        console.log(results);
        object=results;
    }
}