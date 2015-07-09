# kmz-geojson
Convert KMZ to GeoJSON

## Usage

Install it into your project with `npm install --save kmz-geojson`.

```javascript
var KMZGeoJSON = require('kmz-geojson');

var KMZUrl = "http://kml-samples.googlecode.com/svn/trunk/kml/time/time-stamp-point.kmz";

KMZGeoJSON.toKML(KMZUrl, function(err, kml) {
  // Do something with the KML
});

KMZGeoJSON.toGeoJSON(KMZUrl, function(err, json) {
  // Do something with the GeoJSON data.
});
```
