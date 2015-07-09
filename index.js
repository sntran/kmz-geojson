(function(KMZGeoJSON) {
  KMZGeoJSON.version = '0.1.0';

  // Allow user to specify default parameters
  KMZGeoJSON.defaults = {};

  var request = require("request"),
    togeojson = require('togeojson'),
    unzip = require('unzip2'),
    xmldom = new (require('xmldom').DOMParser)();

  KMZGeoJSON.toKML = function(path, callback) {
    request( path )
    .pipe(unzip.Parse())
    .on('entry', function ( entry ) {
      var fileName = entry.path;
      var type = entry.type; // 'Directory' or 'File' 
      if (fileName.indexOf('.kml') === -1) {
        entry.autodrain();
        return;
      }
      
      var data = '';
      entry.on('error', function(err) {
        callback(err);
      });

      entry.on('data', function(chunk) {
        data += chunk;
      });

      entry.on('end', function() {
        callback(null, data);
      });
    })
    .on('error', callback);
  };

  KMZGeoJSON.toGeoJSON = function(path, callback) {
    KMZGeoJSON.toKML(path, function(error, kml) {
      var geojson = togeojson.kml(xmldom.parseFromString(kml));
      callback(null, geojson);
    });
  };

}(typeof module == 'object' ? module.exports : window.KMZGeoJSON = {}));
