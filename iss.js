const request = require('request');
/**
 * Makes a single API request to retrieve the user's IP address.
 * Input:
 *   - A callback (to pass back an error or the IP string)
 * Returns (via Callback):
 *   - An error, if any (nullable)
 *   - The IP address as a string (null if error). Example: "162.245.144.188"
 */
const fetchMyIP = function(callback) {
  // use request to fetch IP address from JSON API
  request('https://api.ipify.org?format=json', (error, response, body) => {
    if (error) return callback(error, null);
    if (response.statusCode !== 200) {
      return callback(Error(`${response.statusCode} when fetching IP. Response: ${body}`), null);
    }
    const bodyObj = JSON.parse(body);
    return callback(null, bodyObj.ip);
  });
};

const fetchCoordsByIP = function(ip, cb) {

};

module.exports = { fetchMyIP, fetchCoordsByIP };