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

// 2. finds the HTML element with ID=calculate, and when it is clicked - run the code inside this function:  
  document.getElementById("calculate").addEventListener("click", function () {
    const minutes = Number(document.getElementById("minutes").value);
    // find the input box with ID=minutes, get the value entered and then convert to a Number
    const seconds = Number(document.getElementById("seconds").value);
    // find the input box with ID=seconds, get the value entered and then convert to a Number
    const distanceKm = Number(document.getElementById("distance").value);
    // find the input box with ID=distance, get the value entered and then convert to a Number

    if (distanceKm <= 0 || minutes < 0 || seconds < 0) {
      document.getElementById("paceKm").textContent = "Please enter a valid time and distance.";
      document.getElementById("paceMile").textContent = "";
      return;
    }
    // adding some validation to ensure that users can only enter numbers (and not 0 for distance)
    // ask if the condition is true - i.e. is the input dirty? If it fails one or more of 3 tests, then display error message & return. If not true (i.e. input is good, skip everything after in the curly braces)
    // adding some validation to ensure that users can only enter numbers (and not 0 for distance)
  
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
  });
  // ends the event listener