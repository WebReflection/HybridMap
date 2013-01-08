/*! (C) WebReflection *//** @license Mit Style License */
// https://github.com/WebReflection/HybridMap
this.HybridMap || (this.HybridMap = function(defineProperty) {

  // the half map, half weak, fully cross platform solution

  try {
    // fix IE8 inconsistency
    if (!defineProperty({},"_",{value:1})._)
      // drop the function, is pointless
      throw (defineProperty = 0)
    ;
  } catch(o_O) {}

  var
    // quirks are ignored, Singletons are used instead
    NAN = {},
    MZERO = {},
    // native WeakMap is preferred
    noWeakMap = typeof WeakMap == typeof noWeakMap,
    // partial shim
    indexOf = [].indexOf || function indexOf(value) {
      for(var i = this.length; i-- && this[i] !== value;);
      return i;
    },
    // returns NaN or -0 as singleton
    avoidQuirks = noWeakMap && function avoidQuirks(key) {
      // optimistic with all truthy values
      return key ? key : (
        // for non NaN only
        key == key ? (
          // and 0 only
          key === 0 ? (
            // check if positive
            1/key === Infinity ? key : MZERO
          ) : key
        ) : /*BAT*/NAN/*, naNaNaNa NaNaNa naNaNaNa!*/
      );
    },
    WM = noWeakMap ?
      // partial WeakMap shim, not as weak but consistent
      function WM() {
        var
          keys = [],
          values = [],
          k, i, m, u
        ;
        return m = {
          // dat property name ...
          "delete": function del(key) {
            if (m.has(key)) {
              keys.splice(i, 1);
              values.splice(i, 1);
            }
          },
          get: function get(key) {
            return m.has(key) ? values[i] : u;
          },
          has: function has(key) {
            i = indexOf.call(keys, k = avoidQuirks(key));
            return -1 < i;
          },
          set: function set(key, value) {
            values[
              m.has(key) ? i : keys.push(k) - 1
            ] = value;
          }
        };
      } :
      WeakMap
    ,
    // partial Map shim, same as WeakMap
    M = noWeakMap ?
      WM : Map
    ,
    vDesc = defineProperty ? Object.create(null) : null,
    /**
     * HybridMap,
     *   the half map, half weak, fully cross platform solution
     * @constructor
     */
    HybridMap = defineProperty ?
      function HybridMap() {
        // this should be the constructor for all browsers
        // with the lovely exception of IE < 9
        vDesc.value = holder();
        defineProperty(this, "__map__", vDesc);
      } :
      function HybridMap() {
        // as __map__ guard and for consistency sake,
        // try to avoid enumerability
        // of the __map__ property
        // this should be IE < 9 only version
        // or really old browsers not relevant
        // for the market share
        var toString = this.toString;
        (this.toString = function () {
          return toString.call(this);
        }).__map__ = holder();
      }
    ,
    // as soon as I decide consistency ain't a problem
    // and performace is really affected I might drop this
    // internal stuff ... 'till that day ...
    getMapHolder = defineProperty ?
      function getMapHolder(self) {
        return self.__map__;
      } :
      function getMapHolder(self) {
        return self.toString.__map__;
      }
    ,
    HybridMapPrototype = HybridMap.prototype
  ;

  /**
   * drop all stored keys / empty fresh new map
   * @returns {HybridMap} the instance itself
   */
  HybridMapPrototype.clear = defineProperty ? (
      noWeakMap || !WeakMap.prototype.clear ?
        // clear needs to overwrite the __map__
        (vDesc.configurable = true) &&
        // the intermediate, current, situation
        function clear() {
          HybridMap.call(this);
          return this;
        } :
        // while theoretically should be like this
        function clear() {
          var holder = getMapHolder(this);
          holder.w.clear();
          holder.m.clear();
          return this;
        }
    ) :
    // then ... you know, IE < 9 happens
    function clear() {
      this.toString.__map__ = holder();
      return this;
    }
  ;

  /**
   * remove a key, if present, from the map
   * @param {*} key to delete
   * @returns {boolean} true if removed, false otherwise
   */
  HybridMapPrototype.del = function del(key) {
    var
      m = getMap(this, key),
      has = m.has(key)
    ;
    has && m["delete"](key);
    return has;
  };

  /**
   * get a value associated with a key
   * @param {*} key previously used to store a value
   * @returns {*} the associated value, if any, undefined otherwise
   */
  HybridMapPrototype.get = function get(key) {
    return getMap(this, key).get(key);
  };

  /**
   * check if a key has been used to store a value
   * @param {*} generic key
   * @returns {boolean} true if the key is present, false otherwise
   */
  HybridMapPrototype.has = function has(key) {
    return getMap(this, key).has(key);
  };

  /**
   * set a value associated with a key. Overwrite if already preset
   * @param {*} generic key
   * @param {*} generic value
   * @returns {*} the same value that has been set
   */
  HybridMapPrototype.set = function set(key, value) {
    getMap(this, key).set(key, value);
    return value;
  };

  // in order to retrieve the right internal map to use
  function getMap(self, key) {
    var holder = getMapHolder(self);
    // check the typeof key
    switch (typeof key) {
      // since only objects, and functions,
      // can be used with WeakMap.prototype
      case "object":
      case "function":
        if (key) return holder.w;
    }
    return holder.m;
  }
  // utility to associate empty Weak and normal Map
  function holder() {
    return {
      w: new WM,
      m: new M
    };
  }
  return HybridMap;
}(Object.defineProperty));