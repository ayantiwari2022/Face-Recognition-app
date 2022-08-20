Webcam.set({
    width:350,
    width:300,
    image_format : 'png',
    png_quality:90
});

camera = document.getElementById("camera");

Webcam.attach( '#camera' );

function take_snapshot()
{
    Webcam.snap(function(data_uri) {
        document.getElementById("result").innerHTML = '<img id="captured_image" src="'+data_uri+'"/>'
    });
}
console.log('ml5 version', ml5.version);

classifier = ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/xX7rRObGe/model.json',modelLoaded);

function modelLoaded() {
    console.log('Model is Loaded! :D');
}

function speak(){
    var synth = window.speechSynthesis;
    speak_data_1 = "The first prediction is" + prediction_1;
    speak_data_2 = "And the second prediction is " + prediction_2;
    var UtterThis = new SpeechSynthesisUtterance(speak_data_1 + speak_data_2);
    UtterThis.rate = 1;
    synth.speak(UtterThis);
}

function check() {
    img = document.getElementById('captured_image');
    classifier.classify(img, gotResult);
}

function gotResult(error, results) {
    if (error){
        console.error(error)
    } else {
        console.log(results);
        document.getElementById("result_emotion_name").innerHTML = results[0].label;
        document.getElementById("result_emotion_name2").innerHTML = results[1].label;
        prediction_1 = results[0].label;
        prediction_2 = results[1].label;
        speak();
        if(results[0].label == "Laugh")
        {
            document.getElementById("update_emoji").innerHTML = "&#129315;";
        }
        if(results[0].label == "Crying")
        {
            document.getElementById("update_emoji").innerHTML = "&#128546;";
        }
        if(results[0].label == "Sad")
        {
            document.getElementById("update_emoji").innerHTML = "&#9785;";
        }
        if(results[0].label == "Angry")
        {
            document.getElementById("update_emoji").innerHTML = "&#128545;";
        }
        if(results[0].label == "Happy")
        {
            document.getElementById("update_emoji").innerHTML = "&#128512;";
        }
        if(results[1].label == "Laugh")
        {
            document.getElementById("update_emoji2").innerHTML = "&#129315;";
        }
        if(results[1].label == "Crying")
        {
            document.getElementById("update_emoji2").innerHTML = "&#128546;";
        }
        if(results[1].label == "Sad")
        {
            document.getElementById("update_emoji2").innerHTML = "&#9785;";
        }
        if(results[1].label == "Angry")
        {
            document.getElementById("update_emoji2").innerHTML = "&#128545;";
        }
        if(results[1].label == "Happy")
        {
            document.getElementById("update_emoji2").innerHTML = "&#128512;";
        }
    }
}