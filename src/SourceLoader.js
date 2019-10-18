'use strict';

class SourceLoader {
  constructor(props) {
    this.loadedSources = {
      js: [],
      css: []
    };
  }
  
  loadScript = function (url, async, callback) {
    let self = this;
    
    if (-1 !== self.loadedSources.js.indexOf(url)) {
      if (callback) {
        callback();
      }
      return;
    }
    
    var script = document.createElement("script");
    
    if (callback) {
      if (script.readyState) {  //IE
        script.onreadystatechange = function () {
          if (script.readyState === "loaded"
            || script.readyState === "complete"
          ) {
            script.onreadystatechange = null;
            self.loadedSources.js.push(url);
            callback();
          }
        };
      } else {  //Others
        script.onload = function () {
          self.loadedSources.js.push(url);
          callback();
        };
      }
    }
    
    script.type = "text/javascript";
    script.async = async;
    script.src = url;
    document.getElementsByTagName("body")[0].appendChild(script);
  };
  
  loadScripts = function (scripts, callback) {
    let self = this,
      progress = 0;
    
    scripts.forEach(function (script) {
      self.loadScript(script, false, function () {
        if (++progress === scripts.length) {
          callback && callback();
        }
      });
    });
  };
  
  loadStylesheet = function (url) {
    if (-1 !== this.loadedSources.css.indexOf(url)) {
      return;
    }
    this.loadedSources.css.push(url);
    
    var link = document.createElement('link');
    
    link.rel = 'stylesheet';
    link.type = 'text/css';
    link.media = 'all';
    link.href = url;
    
    document.getElementsByTagName('head')[0].appendChild(link);
  };
  
  loadStylesheets = function (styles) {
    var self = this,
      progress = 0;
    
    styles.forEach(function (style) {
      self.loadStylesheet(style);
    });
  };
}