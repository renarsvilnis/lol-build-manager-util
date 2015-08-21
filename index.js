var util = {};

util.isSubtringInString = function(string, substring) {
  return string.indexOf(substring) > - 1;
};

util.isSubstringsInString = function(string, substrings) {
  for(var i = 0, l = substrings.length; i < l; i++) {

    var substring = substrings[i];

    if(util.isSubtringInString(string, substring))
      return i;
  }

  return -1;
};

util.encodeUrlData = function(data) {
  return encodeURIComponent(JSON.stringify(data));
};

util.decodeUrlData = function(data) {
  return JSON.parse(decodeURIComponent(data));
};

module.exports = util;