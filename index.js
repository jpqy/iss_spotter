const { fetchMyIP, fetchCoordsByIP, fetchISSFlyOverTimes } = require('./iss');


const parseDateToString = (unixTimeStamp) => {
  const date = new Date(unixTimeStamp * 1000);
  return `${date.toDateString()} ${date.toTimeString()}`;
};
/**
 * Orchestrates multiple API requests in order to determine the next 5 upcoming ISS fly overs for the user's current location.
 * Input:
 *   - A callback with an error or results. 
 * Returns (via Callback):
 *   - An error, if any (nullable)
 *   - The fly-over times as an array (null if error):
 *     [ { risetime: <number>, duration: <number> }, ... ]
 */
const nextISSTimesForMyLocation = function(callback) {
  fetchMyIP((error, ip) => {
    if (error) {
      return callback(Error("IP retrieval didn't work!"), null);
    }
    fetchCoordsByIP(ip, (error, coords) => {
      if (error) {
        return callback(Error("Fetching coordinates didn't work!", null));
      }

      fetchISSFlyOverTimes(coords, (error, times) => {
        if (error) {
          return callback(Error("Fetching flyby times didn't work!", null));
        }
        for (const time in times) {
          console.log(`Next pass at ${parseDateToString(times[time].risetime)} for ${times[time].duration} seconds!`);
        }
      });
    });
  });
};

console.log('Date: ', parseDateToString(1584040140));
nextISSTimesForMyLocation((error, passTimes) => {
  if (error) {
    return console.log("It didn't work!", error);
  }
  // success, print out the deets!
  console.log(passTimes);
});