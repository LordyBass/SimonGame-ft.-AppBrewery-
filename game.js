let gamePattern = [];
let userClickedPattern = [];
let level = 0;

let buttonColours = ["red", "blue", "green", "yellow"];

// Untuk Fungsi Menaikkan Level di Game
function NextSequence() {

    // Mengosongkan Array yang diklik
    userClickedPattern = [];

    // Sistem memilih Warna Random
    let randomNumber = Math.floor(Math.random() * 4);
    let randomChosenColour = buttonColours[randomNumber];

    // Mengirim Data Warna ke Array gamePattern
    gamePattern.push(randomChosenColour);

    // Animasi Sistem Menunjukkan Warna Random
    $("#" + randomChosenColour).animate({
        opacity: 0.25
    }, 100, function(){
        $("#" + randomChosenColour).animate({
        opacity: 1
    })});

    // Sound Effect Sistem Memilih Warna Random
    playSound(randomChosenColour);

    // Menaikkan Level dan Mengubah Judul Level
    level++;
    $("h1").text("Level " + level)
}

// Untuk Fungsi Play Sound Effect di Game
function playSound(name) {
    let audio = new Audio("./sounds/"+name+".mp3");
    audio.play();
}

// Untuk Fungsi Click di Game
$(".btn").click(function(){
    if (level !== 0) {

        // Mengirimkan Data Warna yang di Klik ke Array userClickedPattern
        let userChosenColour = $(this).attr("id");
        userClickedPattern.push(userChosenColour);

        // Animasi Tekan Ketika Click dan Sound Effect ketika Click
        playSound(userChosenColour);
        animatePress(userChosenColour);

        // Cek Jawaban
        checkAnswer(userClickedPattern.length-1);
    }
})

// Animasi Tombol Ditekan / Diklik
function animatePress(currentColour) {
    $("#" + currentColour).addClass("pressed")
    setTimeout(function(){
        $("#" + currentColour).removeClass("pressed")
    },100)
}

// Untuk Fungsi Restart Game Menggunakan Enter
$(document).keydown(function(event) {
    if (event.key === "Enter" && level === 0) {
    NextSequence();
    } else {
        console.log("Not The Right Key")
    }
});

// Untuk Fungsi Mengecek Jawaban di Game
function checkAnswer(currentLevel){
    if (userClickedPattern[currentLevel] === gamePattern[currentLevel]){
        if (userClickedPattern.length === gamePattern.length){
            setTimeout(function () {
                NextSequence();
            }, 1000);
        }
    } else {
        // Audio Salah
        let audio = new Audio("./sounds/wrong.mp3");
        audio.play();

        // Efek Salah
        $("body").addClass("game-over")
        setTimeout(function(){
            $("body").removeClass("game-over")
        },300)

        // Reset Level
        level = 0;
        $("h1").text('Press "Enter" to Start');
        gamePattern = [];
    }
}