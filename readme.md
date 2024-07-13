--------------------------------------------Learnings from this Project---------------------------------------------------

1) check if browser supports geolocation

2) set options for high accuracy. a 5 second timeout, and no caching.

3) Use watchPosition to track the users location continously.

4) Emit the latitude and longitude via a socket with "send-location". Log any errors to the console.

5) Initialize a map centred at coordinates (0,0) with a zoom level of 15 using Leaflet. Add OpenStreetMaptiles to the map.

6) Create an empty object markers.

7) When receiving location data via the socket- extract id, latitude and longitude and centre the map on the new coordinates

8) If a marker for the id exists update its position, otherwise create a new marker at the given coordinates and add it to the map. When a user disconnects, remove their marker from the map and delete it from markers.