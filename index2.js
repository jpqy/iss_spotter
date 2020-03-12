const { nextISSTimesForMyLocation } = require('./iss_promised');

// fetchMyIP()
//   .then((resolve, reject) => {
//     fetchCoordsByIP(resolve)
//       .then((resolve, reject) => {
//         console.log(resolve);
//       });
//   });


const parseDateToString = (unixTimeStamp) => {
  const date = new Date(unixTimeStamp * 1000);
  return `${date.toDateString()} ${date.toTimeString()}`;
};

nextISSTimesForMyLocation()
  .then(times => {
    for (const time in times) {
      console.log(`Next pass at ${parseDateToString(times[time].risetime)} for ${times[time].duration} seconds!`);
    }

  })
  .catch((error) => {
    console.log("It didn't work: ", error.message);
  });
