(function(win) {

"use strict";

/**
 * Generates namespace from string.
 * @param  {string} namespace
 * @param  {Object} object
 * @return {Object}
 */
function ns(namespace, object) {
  var part = win,
      parts = namespace.split(".");
  for (var i = 0, l = parts.length; i < l; i++) {
      if (!!object && i == l - 1) {
        part[parts[i]] = object;
      } else {
        if (!part[parts[i]]) {
          part[parts[i]] = {};
        }
        part = part[parts[i]];
      }
  }

  return part;
}

win.ns = {

  /**
   * Creates namespace object from namespace string.
   * @param  {string} namespace Period separated namespace.
   * @return {Object}           Last object created from namespace.
   */
  require: function(namespace) {
    return ns(namespace);
  },

  /**
   * Creates namespace object from namespace string.
   * @param  {string} namespace Namespace string.
   * @param  {Object} object    Object to assign last namespace part to.
   * @return {Object}           Returns object specified as second parameter.
   */
  define: function(namespace, object) {
    ns(namespace, object);
    return object;
  }
};
})(window);