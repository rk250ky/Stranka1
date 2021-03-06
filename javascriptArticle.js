import { render } from "mustache";

function table() {
  var checkBox = document.getElementById("Doyoubuygames");
  var text = document.getElementById("text");
  if (checkBox.checked == true) {
    text.style.display = "block";
  } else {
    text.style.display = "none";
  }
}

function tablereset() {
  var text = document.getElementById("text");
  text.style.display = "none";
}

/////////////////dotanik/////////////////

function opinion2html(opinion) {
  opinion.createdDate = new Date(opinion.created).toDateString();
  opinion.willReturnMessage = opinion.willReturn
    ? "I will return to this page."
    : "Sorry, one visit was enough.";

  const template = document.getElementById("mTmplOneOpinion").innerHTML;
  const htmlWOp = render(template, opinion);

  delete opinion.createdDate;
  delete opinion.willReturnMessage;

  return htmlWOp;
}

function opinionArray2html(sourceData) {
  return sourceData.reduce(
    (htmlWithOpinions, opn) => htmlWithOpinions + opinion2html(opn),
    ""
  );
}

let opinions = [];

const opinionsElm = document.getElementById("opinionsContainer"); /////////////////////////////

if (localStorage.myTreesComments) {
  opinions = JSON.parse(localStorage.myTreesComments);
}

opinionsElm.innerHTML = opinionArray2html(opinions);

let myFrmElm = document.getElementById("formmenu");
myFrmElm.addEventListener("submit", processOpnFrmData);

// story
function processOpnFrmData(event) {
  event.preventDefault();

  nopBoughgame = "Never Bought Game";
  // Read and adjust data from the form
  const nopOpn = document.getElementById("story").value.trim();
  const nopName = document.getElementById("name").value.trim();
  const nopEmail = document.getElementById("email").value.trim();
  const nopGender = document.getElementById("Gender").value.trim();
  const nopDoyoubuygames = document.getElementById("Doyoubuygames").checked;
  if (document.getElementById("Doyoubuygames").checked) {
    nopBoughgame = document.querySelector('input[name="Boughtgame"]:checked')
      .value;
  }
  const game = document.querySelector('input[name="Typeofgame"]:checked').value;
  const nopWhatgamedoyouplathemost = document.querySelector(
    'input[name="Gameplayedthemost"]:checked'
  ).value;

  // var rates = document.getElementsByName('Boughtgame');      da sa aj takto
  // var rate_value;
  // for(var i = 0; i < rates.length; i++){
  //     if(rates[i].checked){
  //         rate_value = rates[i].value;
  //     }
  // }

  if (nopOpn == "" || nopName == "" || nopEmail == "") {
    window.alert("Please, enter both your name and opinion");
    return;
  }
  const newOpinion = {
    Name: nopName,
    Email: nopEmail,
    Gender: nopGender,
    Gameplayedmost: nopWhatgamedoyouplathemost,
    Typeofgame: game,
    Boughtgame: nopDoyoubuygames,
    RadioBoughtgame: nopBoughgame,
    Textbox: nopOpn,
    Created: new Date()
  };

  opinions.push(newOpinion);
  localStorage.myTreesComments = JSON.stringify(opinions);

  opinionsElm.innerHTML += opinion2html(newOpinion);

  // window.alert("Your opinion has been stored. Look to the console");
  // console.log("New opinion added");
  // console.log(opinions);

  myFrmElm.reset(); //resets the form
}
