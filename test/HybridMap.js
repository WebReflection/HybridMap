//remove:
// ------------------------
// test based on wru
// ------------------------
// npm install wru -g
// wru test/HybridMap.js
// ------------------------
var HybridMap = require("../src/HybridMap.js").HybridMap;
//:remove

wru.test([{
  name: "basic general usage test",
  test: function () {
    for (var
      hm = new HybridMap,
      o = {},
      k = "k",
      i = 0,
      list = [
        hm.set(o, k) === k,
        hm.set(k, o) === o,
        hm.has(k) && hm.has(o),
        hm.clear() === hm,
        !hm.has(k) && !hm.has(o),
        !hm.del(k) && !hm.del(o),
        hm.set(o, k) === k,
        hm.set(k, o) === o,
        hm.del(k) && hm.del(o),
        !hm.has(k) && !hm.has(o),
        hm.get(k) === undefined,
        hm.get(o) === undefined,
        hm.set(k, hm) === hm.get(k),
        hm.set(o, hm) === hm.get(o),
        hm.clear() === hm,
        hm.set(-0, "-0") !== hm.set(0, "+0"),
        hm.set(NaN, "NaN") === hm.get(NaN),
        hm.get(-0) === "-0",
        hm.get(+0) === "+0",
        hm.set(false, "false") !== hm.set(true, "true"),
        hm.set(function(){}, 1) !== hm.set(function(){}, 2),
        hm.clear() === hm
      ];
      i < list.length; i++
    ) {
      wru.assert("test #" + i, list[i]);
    }
  }
}]);