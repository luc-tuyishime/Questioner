/** minimal spatial calculation library
  * based on Federico Ramponi's python code (http://stackoverflow.com/a/238558)
  *
  * Semi-axes of WGS-84 geoidal reference
  * Earth radius at a given latitude, according to the WGS-84 ellipsoid [m]
  * Bounding box surrounding the point at given coordinates,
  * assuming local approximation of Earth surface as a sphere
  * of radius given by WGS84
  *
  * copyright 2012 patrick heneise
  *  
  * licensed under the apache license, version 2.0 (the "license");
  * you may not use this file except in compliance with the license.
  * you may obtain a copy of the license at
  *
  *     http://www.apache.org/licenses/LICENSE-2.0
  *
  * unless required by applicable law or agreed to in writing, software
  * distributed under the license is distributed on an "as is" basis,
  * without warranties or conditions of any kind, either express or implied.
  * see the license for the specific language governing permissions and
  * limitations under the license.
  *
  * @author Patrick Heneise, @PatrickHeneise
  * @license http://www.opensource.org/licenses/mit-license.html MIT License
  */
  
WGS84_a = 6378137.0; // Major semiaxis [m]
WGS84_b = 6356752.3; // Minor semiaxis [m]

function deg2rad(degrees) {
  return Math.PI*degrees/180.0;
}

function rad2deg(radians) {
  return 180.0*radians/Math.PI;
}

function WGS84EarthRadius(lat) {
  var An = WGS84_a*WGS84_a*Math.cos(lat);
  var Bn = WGS84_b*WGS84_b*Math.sin(lat);
  var Ad = WGS84_a*Math.cos(lat);
  var Bd = WGS84_b*Math.sin(lat);
  return Math.sqrt( (An*An + Bn*Bn)/(Ad*Ad + Bd*Bd) );
}

exports.boundingBox = function(latitudeInDegrees, longitudeInDegrees, halfSideInKm) {
  var lat = deg2rad(latitudeInDegrees);
  var lon = deg2rad(longitudeInDegrees);
  var halfSide = 1000 * halfSideInKm;

  // Radius of Earth at given latitude
  var radius = WGS84EarthRadius(lat);
  // Radius of the parallel at given latitude
  var pradius = radius * Math.cos(lat);

  var latMin = lat - halfSide/radius;
  var latMax = lat + halfSide/radius;
  var lonMin = lon - halfSide/pradius;
  var lonMax = lon + halfSide/pradius;
  
  var bbox = [rad2deg(latMin), rad2deg(lonMin), rad2deg(latMax), rad2deg(lonMax)];

  return bbox;
}