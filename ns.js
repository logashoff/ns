(function(win) {

"use strict";

/**
 * Namespace object generator.
 *
 * @param {string} namespace Comma separated namespace string.
 * @param {array} deps Dependencies array.
 * @param {function} def Module definition.
 * @returns {Object} Returns last part of namespace as object
 *  or definition return value.
 */
function ns(namespace, deps, def) {
  var part = win,
      parts = namespace.split(".");
  for (var i = 0, l = parts.length; i < l; i++) {
      if (i == l - 1 && arguments.length > 1) {
        return part[parts[i]] = def.apply(win, deps);
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
   * Creates nested object from namespace string.
   *
   * @param  {string} namespace Comma separated namespace.
   * @return {Object} last part of namespace as object.
   */
  require: function(namespace) {
    return ns(namespace);
  },

  /**
   * Creates namespace object from namespace string.
   *
   * @param {string} namespace Comma separated namespace string.
   * @param {array} deps Dependencies array.
   * @param {function} def Module definition.
   * @return {Object} Returns definition return value.
   */
  define: function(namespace, deps, def) {
    return ns(namespace, deps, def);
  }
};
})(window);