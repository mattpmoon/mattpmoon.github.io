// write js to calculate running pace when the calculate button is clicked
// 1. create a function called formatTime that expects a input of a number of seconds, and turns it into minutes and seconds
function formatTime(totalSeconds) {
    const minutes = Math.floor(totalSeconds / 60);
    // rounds down to the whole minute
    const seconds = Math.round(totalSeconds % 60);
    // gets the leftover seconds using %=modulo e.g. 275 % 60 = 35
  
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
    // this is a templated string where variables can be inserted inside text using ${}
    // toString coverts into text, and padStart(2, "0") makes sure that seconds always has two digits e.g 34:05 rather than 34:5
  }
// end function

// below is a 'helper' function like the above - it doesn't actually calculate results; it controls the form display
function updateFormDisplay() {
  const mode = document.getElementById("mode").value;

  if (mode === "pace") {
    document.getElementById("timeInputs").style.display = "block";
    document.getElementById("paceInputs").style.display = "none";

    document.getElementById("calculate").textContent = "Calculate Pace";
  } else {
    document.getElementById("timeInputs").style.display = "none";
    document.getElementById("paceInputs").style.display = "block";

    document.getElementById("calculate").textContent = "Calculate Race Time";
  }

  document.getElementById("resultBox").style.display = "none";
}

// this below will 'listen' for th dropdown changing, and then updates before anyone has clicked anything
document.getElementById("mode").addEventListener("change", updateFormDisplay);
updateFormDisplay();


// 2. finds the HTML element with ID=calculate, and when it is clicked - run the code inside this function:  
  document.getElementById("calculate").addEventListener("click", function () {
    const minutes = Number(document.getElementById("minutes").value);
    // find the input box with ID=minutes, get the value entered and then convert to a Number
    const seconds = Number(document.getElementById("seconds").value);
    // find the input box with ID=seconds, get the value entered and then convert to a Number
    const distanceKm = Number(document.getElementById("distance").value);
    // find the input box with ID=distance, get the value entered and then convert to a Number
    const paceMinutes = Number(document.getElementById("paceMinutes").value);
    const paceSeconds = Number(document.getElementById("paceSeconds").value);
    // read the new inputs from id=paceMinutes and id=paceSeconds
    const paceUnit = document.getElementById("paceUnit").value;
    // get the user's choice of min/mile or min/km
    const mode = document.getElementById("mode").value;
    // find the id=mode that someone has selected

    //if (distanceKm <= 0 || minutes < 0 || seconds < 0) {
    //  document.getElementById("paceKm").textContent = "Please enter a valid time and distance.";
    //  document.getElementById("paceMile").textContent = "";
    //  return;
    //}

    // adding some validation to ensure that users can only enter numbers (and not 0 for distance)
    // ask if the condition is true - i.e. is the input dirty? If it fails one or more of 3 tests, then display error message & return. If not true (i.e. input is good, skip everything after in the curly braces)
    // adding some validation to ensure that users can only enter numbers (and not 0 for distance)
  
    if (mode === "pace") {

      if (distanceKm <= 0 || minutes < 0 || seconds < 0 || seconds > 59) {
        document.getElementById("paceKm").textContent =
          "Please enter a valid race time and distance.";
      
        document.getElementById("paceMile").textContent = "";
      
        document.getElementById("resultBox").style.display = "block";
      
        return;
      }

      document.getElementById("resultBox").style.display = "block";
    
    const totalSeconds = minutes * 60 + seconds;
    // convert the full time into seconds, eg. 35min 30 secs = 2130 seconds
  
    const pacePerKm = totalSeconds / distanceKm;
    // calculate seconds per KM e.g. 1110 seconds / 5 km = 222 seconds per km
    const pacePerMile = pacePerKm * 1.60934;
    // calculate seconds per Mile e.g. 222 * 1.60934 = 357.27 seconds
  
    document.getElementById("paceKm").textContent =
      `Pace per km: ${formatTime(pacePerKm)}`;
      // find the HTML element with id=paceKm and then changes text to show 'Pace per km:' followed by the seconds reformatted using the earlier formatTime function
  
    document.getElementById("paceMile").textContent =
      `Pace per mile: ${formatTime(pacePerMile)}`;
      // find the HTML element with id=paceMile and then changes text to show 'Pace per mile:' followed by the seconds reformatted using the earlier formatTime function

    } else {
      // race time calculator goes in here:

      if (distanceKm <= 0 || paceMinutes < 0 || paceSeconds < 0 || paceSeconds > 59) {
        document.getElementById("paceKm").textContent =
          "Please enter a valid pace and distance.";
      
        document.getElementById("paceMile").textContent = "";
      
        document.getElementById("resultBox").style.display = "block";
      
        return;
      }

      const paceTotalSeconds = paceMinutes * 60 + paceSeconds;

      let pacePerKmSeconds;

      if (paceUnit === "km") {

        document.getElementById("resultBox").style.display = "block";

        pacePerKmSeconds = paceTotalSeconds;
      } else {
        pacePerKmSeconds = paceTotalSeconds / 1.60934;
      }

      const raceTimeSeconds = pacePerKmSeconds * distanceKm;
      
      document.getElementById("paceKm").textContent =
        `Race time at ${paceMinutes}:${paceSeconds.toString().padStart(2, "0")} per ${paceUnit}: ${formatTime(raceTimeSeconds)}`
      
      document.getElementById("paceMile").textContent = "";
    }
  });
  // ends the event listener