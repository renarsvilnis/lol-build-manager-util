'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _url = require('url');

var _url2 = _interopRequireDefault(_url);

var _urlPattern = require('url-pattern');

var _urlPattern2 = _interopRequireDefault(_urlPattern);

var _normalizeUrl = require('normalize-url');

var _normalizeUrl2 = _interopRequireDefault(_normalizeUrl);

var _lolBuildManagerConfig = require('lol-build-manager-config');

var util = {};

/**
 * Function that checks if substring is in string
 * @param  {string} string
 * @param  {string} substring
 * @return {Boolean}
 */
util.isSubtringInString = function (string, substring) {
  return string.indexOf(substring) > -1;
};

/**
 * Function that checks if any substrings are string and returns the index 
 * of the first instance it finds. Else returns 
 * @param  {string} string
 * @param  {string[]} substrings
 * @return {number} Index of the found substring in string, if not found
 *  returns -1
 */
util.isSubstringsInString = function (string, substrings) {
  for (var i = 0, l = substrings.length; i < l; i++) {

    var substring = substrings[i];

    if (util.isSubtringInString(string, substring)) return i;
  }

  return -1;
};

/**
 * Function for getting module that handles scraping of the given url
 * @param  {string} siteUrl
 * @return {string|null}
 */
util.getScrapeModule = function (siteUrl) {

  siteUrl = (0, _normalizeUrl2['default'])(siteUrl);

  var urlParts = _url2['default'].parse(siteUrl);

  var hostname = urlParts.hostname,
      pathname = urlParts.pathname;

  if (!hostname || !pathname) return null;

  // supported scrape websites
  var sites = _lolBuildManagerConfig.supportedSites;

  for (var i = 0, l = sites.length; i < l; i++) {
    var site = sites[i];
    var pathnames = site.pathnames;

    if (site.hostname !== hostname) continue;

    for (var ii = 0, ll = pathnames.length; ii < ll; ii++) {
      var entry = pathnames[ii];
      var pattern = new _urlPattern2['default'](entry.pathname);

      // if matches pattern
      if (pattern.match(pathname)) return entry.module;
    }
  }

  return null;
};

/**
 * Function for checking if a given string is supported for scraping
 * @param  {string} siteUrl
 * @return {Boolean}
 */
util.isSiteSupported = function (siteUrl) {
  return !!util.getScrapeModule(siteUrl);
};

/**
 * Function for encoding data for beetween extension and native app
 * communications
 * @param  {Object}
 * @return {string} String represnting a json object
 */
util.encodeUrlData = function (jsonData, callback) {
  try {
    var stringifiedData = encodeURIComponent(JSON.stringify(jsonData));
    callback(null, stringifiedData);
  } catch (err) {
    callback(err);
  }
};

/**
 * Function for decoding data for beetween extension and native app
 * communications
 * @param  {string} String representing a json object
 * @return {Object}
 */
util.decodeUrlData = function (stringifiedData, callback) {
  try {
    var parsedData = JSON.parse(decodeURIComponent(data));
    callback(null, parsedData);
  } catch (err) {
    callback(err);
  }
};

/**
 * Create url for communication beetween extension and native app
 * @param  {Object} data
 * @return {string}
 */
util.createAppProtocolUrl = function (data) {
  return _lolBuildManagerConfig.urlProtocol + '://' + util.encodeUrlData(data);
};

exports['default'] = util;
module.exports = exports['default'];
