function formatTime(totalSeconds) {
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = Math.round(totalSeconds % 60);
  
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  }
  
  document.getElementById("calculate").addEventListener("click", function () {
    const minutes = Number(document.getElementById("minutes").value);
    const seconds = Number(document.getElementById("seconds").value);
    const distanceKm = Number(document.getElementById("distance").value);
  
    const totalSeconds = minutes * 60 + seconds;
  
    const pacePerKm = totalSeconds / distanceKm;
    const pacePerMile = pacePerKm * 1.60934;
  
    document.getElementById("paceKm").textContent =
      `Pace per km: ${formatTime(pacePerKm)}`;
  
    document.getElementById("paceMile").textContent =
      `Pace per mile: ${formatTime(pacePerMile)}`;
  });