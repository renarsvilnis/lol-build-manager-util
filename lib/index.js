import url from 'url';
import UrlPattern from 'url-pattern';
import normalizeUrl from 'normalize-url';
import {urlProtocol, supportedSites} from 'lol-build-manager-config';

let util = {};

/**
 * Function that checks if substring is in string
 * @param  {string} string
 * @param  {string} substring
 * @return {Boolean}
 */
util.isSubtringInString = function(string, substring) {
  return string.indexOf(substring) > - 1;
};

/**
 * Function that checks if any substrings are string and returns the index 
 * of the first instance it finds. Else returns 
 * @param  {string} string
 * @param  {string[]} substrings
 * @return {number} Index of the found substring in string, if not found
 *  returns -1
 */
util.isSubstringsInString = function(string, substrings) {
  for(let i = 0, l = substrings.length; i < l; i++) {

    let substring = substrings[i];

    if(util.isSubtringInString(string, substring))
      return i;
  }

  return -1;
};

/**
 * Function for getting module that handles scraping of the given url
 * @param  {string} siteUrl
 * @return {string|null}
 */
util.getScrapeModule = function(siteUrl) {

  siteUrl = normalizeUrl(siteUrl);

  let urlParts = url.parse(siteUrl);

  let hostname = urlParts.hostname,
      pathname = urlParts.pathname;

  if(!hostname || !pathname)
    return null;

  // supported scrape websites
  let sites = supportedSites;

  for(let i = 0, l = sites.length; i < l; i++) {
    let site = sites[i];
    let pathnames = site.pathnames;

    if(site.hostname !== hostname)
      continue;

    for(let ii = 0, ll = pathnames.length; ii < ll; ii++) {
      let entry = pathnames[ii];
      let pattern = new UrlPattern(entry.pathname);

      // if matches pattern
      if(pattern.match(pathname))
        return entry.module;
    }
  }

  return null;
};

/**
 * Function for checking if a given string is supported for scraping
 * @param  {string} siteUrl
 * @return {Boolean}
 */
util.isSiteSupported = function(siteUrl) {
  return !!util.getScrapeModule(siteUrl);
};
  
/**
 * Function for encoding data for beetween extension and native app
 * communications
 * @param  {Object} data
 * @return {string}
 */
util.encodeUrlData = function(data) {
  return encodeURIComponent(JSON.stringify(data));
};

/**
 * Function for decoding data for beetween extension and native app
 * communications
 * @param  {string} data
 * @return {Object}
 */
util.decodeUrlData = function(data) {
  return JSON.parse(decodeURIComponent(data));
};

/**
 * Create url for communication beetween extension and native app
 * @param  {Object} data
 * @return {string}
 */
util.createAppProtocolUrl = function(data) {
  return urlProtocol + '://' + util.encodeUrlData(data);
};

export default util;
