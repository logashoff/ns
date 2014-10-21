(function(win) {

'use strict';

var nsCache = {};

/**
 * Namespace object generator.
 *
 * @param {String} namespace Dot separated namespace string.
 * @param {Array} [deps] Dependencies array.
 * @param {Function} [def] Module definition.
 * @return {Object} Last part of namespace as object
 *  or definition return value.
 * @example
 *  ns('foo.bar');
 *  // Generates
 *  window.foo = {
 *    bar: {}
 *  }
 *
 *  ns('foo.Bar', [window], function(win) {
 *    return function Bar() {
 *
 *    };
 *  }
 *  // Generates
 *  window.foo = {
 *    Bar: function Bar() {}
 *  }
 */
function ns(namespace, deps, def) {
  var part = win,
      parts = namespace.split('.');
  for (var i = 0, l = parts.length; i < l; i++) {
      if (i == l - 1 && (typeof def === 'function')) {
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
   * Returns object associated with a namespace.
   * Namespace must be defined using <code>ns.define</code>.
   *
   * @param  {String} namespace Defined namespace.
   * @return {Object} Object associated with a namespace.
   */
  require: function(namespace) {
    if (!namespace in nsCache) {
      throw new Error('Namespace "' + namespace + '" is not defined');
    }

    return nsCache[namespace];
  },

  /**
   * Creates nested object from namespace string.
   * Optionally assigns definition return value to namespace.
   *
   * @param {String} namespace Dot separated namespace string.
   * @param {Array} [deps] Dependencies array.
   * @param {Function} [def] Module definition.
   * @return {Object} Definition return value or
   *  last part of namespace as object.
   */
  define: function(namespace, deps, def) {
    return nsCache[namespace] = ns(namespace, deps, def);
  }
};
})(window);
