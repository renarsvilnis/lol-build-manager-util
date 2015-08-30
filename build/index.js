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
 * @param  {Object} data
 * @return {string}
 */
util.encodeUrlData = function (data) {
  return encodeURIComponent(JSON.stringify(data));
};

/**
 * Function for decoding data for beetween extension and native app
 * communications
 * @param  {string} data
 * @return {Object}
 */
util.decodeUrlData = function (data) {
  return JSON.parse(decodeURIComponent(data));
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

//# sourceMappingURL=data:application/json;base64,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LENBQUMsQ0FBQztDQUM3QyxDQUFDOzs7Ozs7O0FBT0YsSUFBSSxDQUFDLG9CQUFvQixHQUFHLFVBQVMsSUFBSSxFQUFFO0FBQ3pDLFNBQU8scUNBQWMsS0FBSyxHQUFHLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLENBQUM7Q0FDdkQsQ0FBQzs7cUJBRWEsSUFBSSIsImZpbGUiOiJpbmRleC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB1cmwgZnJvbSAndXJsJztcbmltcG9ydCBVcmxQYXR0ZXJuIGZyb20gJ3VybC1wYXR0ZXJuJztcbmltcG9ydCBub3JtYWxpemVVcmwgZnJvbSAnbm9ybWFsaXplLXVybCc7XG5pbXBvcnQge3VybFByb3RvY29sLCBzdXBwb3J0ZWRTaXRlc30gZnJvbSAnbG9sLWJ1aWxkLW1hbmFnZXItY29uZmlnJztcblxubGV0IHV0aWwgPSB7fTtcblxuLyoqXG4gKiBGdW5jdGlvbiB0aGF0IGNoZWNrcyBpZiBzdWJzdHJpbmcgaXMgaW4gc3RyaW5nXG4gKiBAcGFyYW0gIHtzdHJpbmd9IHN0cmluZ1xuICogQHBhcmFtICB7c3RyaW5nfSBzdWJzdHJpbmdcbiAqIEByZXR1cm4ge0Jvb2xlYW59XG4gKi9cbnV0aWwuaXNTdWJ0cmluZ0luU3RyaW5nID0gZnVuY3Rpb24oc3RyaW5nLCBzdWJzdHJpbmcpIHtcbiAgcmV0dXJuIHN0cmluZy5pbmRleE9mKHN1YnN0cmluZykgPiAtIDE7XG59O1xuXG4vKipcbiAqIEZ1bmN0aW9uIHRoYXQgY2hlY2tzIGlmIGFueSBzdWJzdHJpbmdzIGFyZSBzdHJpbmcgYW5kIHJldHVybnMgdGhlIGluZGV4IFxuICogb2YgdGhlIGZpcnN0IGluc3RhbmNlIGl0IGZpbmRzLiBFbHNlIHJldHVybnMgXG4gKiBAcGFyYW0gIHtzdHJpbmd9IHN0cmluZ1xuICogQHBhcmFtICB7c3RyaW5nW119IHN1YnN0cmluZ3NcbiAqIEByZXR1cm4ge251bWJlcn0gSW5kZXggb2YgdGhlIGZvdW5kIHN1YnN0cmluZyBpbiBzdHJpbmcsIGlmIG5vdCBmb3VuZFxuICogIHJldHVybnMgLTFcbiAqL1xudXRpbC5pc1N1YnN0cmluZ3NJblN0cmluZyA9IGZ1bmN0aW9uKHN0cmluZywgc3Vic3RyaW5ncykge1xuICBmb3IobGV0IGkgPSAwLCBsID0gc3Vic3RyaW5ncy5sZW5ndGg7IGkgPCBsOyBpKyspIHtcblxuICAgIGxldCBzdWJzdHJpbmcgPSBzdWJzdHJpbmdzW2ldO1xuXG4gICAgaWYodXRpbC5pc1N1YnRyaW5nSW5TdHJpbmcoc3RyaW5nLCBzdWJzdHJpbmcpKVxuICAgICAgcmV0dXJuIGk7XG4gIH1cblxuICByZXR1cm4gLTE7XG59O1xuXG4vKipcbiAqIEZ1bmN0aW9uIGZvciBnZXR0aW5nIG1vZHVsZSB0aGF0IGhhbmRsZXMgc2NyYXBpbmcgb2YgdGhlIGdpdmVuIHVybFxuICogQHBhcmFtICB7c3RyaW5nfSBzaXRlVXJsXG4gKiBAcmV0dXJuIHtzdHJpbmd8bnVsbH1cbiAqL1xudXRpbC5nZXRTY3JhcGVNb2R1bGUgPSBmdW5jdGlvbihzaXRlVXJsKSB7XG5cbiAgc2l0ZVVybCA9IG5vcm1hbGl6ZVVybChzaXRlVXJsKTtcblxuICBsZXQgdXJsUGFydHMgPSB1cmwucGFyc2Uoc2l0ZVVybCk7XG5cbiAgbGV0IGhvc3RuYW1lID0gdXJsUGFydHMuaG9zdG5hbWUsXG4gICAgICBwYXRobmFtZSA9IHVybFBhcnRzLnBhdGhuYW1lO1xuXG4gIGlmKCFob3N0bmFtZSB8fCAhcGF0aG5hbWUpXG4gICAgcmV0dXJuIG51bGw7XG5cbiAgLy8gc3VwcG9ydGVkIHNjcmFwZSB3ZWJzaXRlc1xuICBsZXQgc2l0ZXMgPSBzdXBwb3J0ZWRTaXRlcztcblxuICBmb3IobGV0IGkgPSAwLCBsID0gc2l0ZXMubGVuZ3RoOyBpIDwgbDsgaSsrKSB7XG4gICAgbGV0IHNpdGUgPSBzaXRlc1tpXTtcbiAgICBsZXQgcGF0aG5hbWVzID0gc2l0ZS5wYXRobmFtZXM7XG5cbiAgICBpZihzaXRlLmhvc3RuYW1lICE9PSBob3N0bmFtZSlcbiAgICAgIGNvbnRpbnVlO1xuXG4gICAgZm9yKGxldCBpaSA9IDAsIGxsID0gcGF0aG5hbWVzLmxlbmd0aDsgaWkgPCBsbDsgaWkrKykge1xuICAgICAgbGV0IGVudHJ5ID0gcGF0aG5hbWVzW2lpXTtcbiAgICAgIGxldCBwYXR0ZXJuID0gbmV3IFVybFBhdHRlcm4oZW50cnkucGF0aG5hbWUpO1xuXG4gICAgICAvLyBpZiBtYXRjaGVzIHBhdHRlcm5cbiAgICAgIGlmKHBhdHRlcm4ubWF0Y2gocGF0aG5hbWUpKVxuICAgICAgICByZXR1cm4gZW50cnkubW9kdWxlO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiBudWxsO1xufTtcblxuLyoqXG4gKiBGdW5jdGlvbiBmb3IgY2hlY2tpbmcgaWYgYSBnaXZlbiBzdHJpbmcgaXMgc3VwcG9ydGVkIGZvciBzY3JhcGluZ1xuICogQHBhcmFtICB7c3RyaW5nfSBzaXRlVXJsXG4gKiBAcmV0dXJuIHtCb29sZWFufVxuICovXG51dGlsLmlzU2l0ZVN1cHBvcnRlZCA9IGZ1bmN0aW9uKHNpdGVVcmwpIHtcbiAgcmV0dXJuICEhdXRpbC5nZXRTY3JhcGVNb2R1bGUoc2l0ZVVybCk7XG59O1xuICBcbi8qKlxuICogRnVuY3Rpb24gZm9yIGVuY29kaW5nIGRhdGEgZm9yIGJlZXR3ZWVuIGV4dGVuc2lvbiBhbmQgbmF0aXZlIGFwcFxuICogY29tbXVuaWNhdGlvbnNcbiAqIEBwYXJhbSAge09iamVjdH0gZGF0YVxuICogQHJldHVybiB7c3RyaW5nfVxuICovXG51dGlsLmVuY29kZVVybERhdGEgPSBmdW5jdGlvbihkYXRhKSB7XG4gIHJldHVybiBlbmNvZGVVUklDb21wb25lbnQoSlNPTi5zdHJpbmdpZnkoZGF0YSkpO1xufTtcblxuLyoqXG4gKiBGdW5jdGlvbiBmb3IgZGVjb2RpbmcgZGF0YSBmb3IgYmVldHdlZW4gZXh0ZW5zaW9uIGFuZCBuYXRpdmUgYXBwXG4gKiBjb21tdW5pY2F0aW9uc1xuICogQHBhcmFtICB7c3RyaW5nfSBkYXRhXG4gKiBAcmV0dXJuIHtPYmplY3R9XG4gKi9cbnV0aWwuZGVjb2RlVXJsRGF0YSA9IGZ1bmN0aW9uKGRhdGEpIHtcbiAgcmV0dXJuIEpTT04ucGFyc2UoZGVjb2RlVVJJQ29tcG9uZW50KGRhdGEpKTtcbn07XG5cbi8qKlxuICogQ3JlYXRlIHVybCBmb3IgY29tbXVuaWNhdGlvbiBiZWV0d2VlbiBleHRlbnNpb24gYW5kIG5hdGl2ZSBhcHBcbiAqIEBwYXJhbSAge09iamVjdH0gZGF0YVxuICogQHJldHVybiB7c3RyaW5nfVxuICovXG51dGlsLmNyZWF0ZUFwcFByb3RvY29sVXJsID0gZnVuY3Rpb24oZGF0YSkge1xuICByZXR1cm4gdXJsUHJvdG9jb2wgKyAnOi8vJyArIHV0aWwuZW5jb2RlVXJsRGF0YShkYXRhKTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IHV0aWw7XG4iXX0=