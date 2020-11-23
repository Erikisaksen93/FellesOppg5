// model
const morseCodeArray = ['.-', '-...', '-.-.', '-..', '.', '..-.', '--.', '....',
                          '..', '.---', '-.-', '.-..', '--', '-.', '---', '.--.',
                          '--.-', '.-.', '...', '-', '..-', '...-', '.--', '-..-',
                          '-.--', '--..', ' ', '·−·−', '−−−·', '·−−·−'];
const alphabetArray = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P',
                       'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', ' ', 'Æ', 'Ø', 'Å'];
let my_array = [];
let letters = [];
let shortBeep = new Audio('./sounds/MorseShort.mp3');
let longBeep = new Audio('./sounds/MorseLong.mp3');
let longDelay = 500;
let shortDelay = 250;
let beepArray;
let beepIndex;
let beepCount;
let playbackState = false;
let beepDelay = 500;

// hjelpevariabler for view
const html = document.getElementById('app');
// view
updateView();
function updateView() {
    html.innerHTML += `     
                   <div class="texts">
                      <H1 id="over-input">Input:</H1>
                        <H1 id="over-output">Output:</H1>
                    </div>
                    <div id="input-area">
                        <textarea id="text-input" onkeyup="logKey();" placeholder="Skriv inn tekst her :)" autofocus></textarea>
                    </div>
                    <div id="output-area">
                        <img id="reciever" src="./images/reciever2.png">
                        <textarea id="text-output" onkeyup="logKey();" disabled></textarea>
                    </div>
                    <button id="playbutton" onclick="playMorse()"></button>
                    
                `;
}




function logKey() {
    playbackState = false;
    my_array = [];
    let inputField = document.getElementById('text-input');
    let outputField = document.getElementById('text-output');
    my_array.push(inputField.value);

    if (inputField.value.includes('.', '-', '/')) {
        let outputNormal;
        outputNormal = toNormal();
        outputField.innerHTML = outputNormal;
    } else {
        let outputMorse;
        outputMorse = toMorse();
        outputMorse = outputMorse.join("/");
        outputField.innerHTML = outputMorse;
    }
}



// controller

// function resetText(){
//   playbackState = false;
//   let clearInput = document.getElementById('text-input');
//   let clearOutput = document.getElementById('text-output');
//   clearInput.value = "";
//   clearOutput.value = "";
// }

function toMorse() {
  let morseArray = [];
  letters = my_array[0].split("");
  letters.forEach(letter => {
//   console.log(letter);
  letter = letter.toUpperCase();
  if (alphabetArray.includes(letter)) {  
    let index = alphabetArray.indexOf(letter);
    let morse = morseCodeArray[index];
    morseArray.push(morse);
  };
  })

  return morseArray;
}

function toNormal() {
    let normalArray = [];
    letters = my_array[0].split("/");
    letters.forEach(letter => {
    if (morseCodeArray.includes(letter)) {
        let index = morseCodeArray.indexOf(letter);
        let normal = alphabetArray[index];
        normalArray.push(normal)
    }    
    })
    return normalArray;
}


function playMorse() {
  
let morseArray = toMorse();
morseArray = morseArray.join("/");
beepArray = morseArray.split("")
beepCount = beepArray.length;
beepIndex = 0;
playbackState = true;
let beepDelay = 500;
myLoop()

}

function myLoop() {  
        
  switch(beepArray[beepIndex + 1]) {
    case ".":
    beepDelay = 300
    break;

    case "-":
    beepDelay = 500
    break;

    case "/":
    beepDelay = 500
    break;

    default:
    beepDelay = 500
    break;
  }



  setTimeout(function() {  //  call a 1s setTimeout when the loop is called
    
    

         switch(beepArray[beepIndex]) {
           case ".":
           shortBeep.play();
           console.log("short");
          
          
           break;
           case "-":
           longBeep.play();
           console.log("long")
          
          
           break;
          
           case "/":
           console.log("pause")
           beepDelay
          
           break;
         }
         beepIndex++;                    //  increment the counter
         if (beepIndex < beepCount && playbackState) {           //  if the counter < 10, call the loop function
           myLoop();             //  ..  again which will trigger another 
         }
                                
       }, beepDelay)
}