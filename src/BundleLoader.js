'use strict';

class BundleLoader {
  load = function (bundles, callback) {
    var self = this,
      args = [],
      countDown = bundles.length;
    
    bundles.forEach(function (bundleLoad, i) {
      bundleLoad(function (Bundle) {
        if (Bundle && Bundle.__esModule && Bundle.default) {
          Bundle = Bundle.default;
        }
        
        args[i] = Bundle;
        countDown--;
        
        if (0 === countDown && callback) {
          callback.apply(null, args);
        }
      });
    });
  };
}

export default BundleLoader;
