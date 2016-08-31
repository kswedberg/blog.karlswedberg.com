import './sw-register';

var KS = function(arg) {
  if (!(this instanceof KS)) {
    return new KS(arg);
  }
  this.arg = arg;

  return this;
};

KS.prototype = {
  htmlClass: function(cls, test) {
    var docel = document.documentElement;
    var currentClass = docel.className;
    var rcurrentClass = new RegExp(cls);

    if (!rcurrentClass.test(' ' + currentClass + ' ') && test) {
      docel.className += ' ' + cls;
    }

    return this;
  },
  testStyle: function(name, prop) {
    var div, divStyle, ret;
    var ucProp = prop.charAt(0).toUpperCase() + prop.substr(1);
    var vendorProps = (this.prefixes.join(ucProp + ' ') + ucProp).split(' ');

    if (this.divStyle) {
      divStyle = this.divStyle;
    } else {
      div = document.createElement('div');
      divStyle = div.style;
    }

    if (prop in divStyle) {
      ret = name;
    } else {

      for (var i = 0; i < vendorProps.length; i++) {

        if (vendorProps[i] in divStyle) {
          ret = name;
        }
      }

    }

    div = null;

    return ret;
  },

  htmlStyles: function(props) {
    var setClass;
    var div = document.createElement('div');

    this.prefixes = ['Webkit', 'Moz', 'O', 'ms', 'Khtml'];
    this.divStyle = div.style;

    for (var p in props) {
      setClass = this.testStyle(p, props[p]);

      if (setClass) {
        this.htmlClass(setClass, true);
      }
    }

    delete this.divStyle;
    div = null;

    return this;
  },
  log: function(msg) {
    if (window.console && console.log) {
      console.log(msg);
    }

    return this;
  }

};

(function(doc) {
  var ks = new KS();
  var inp = doc.createElement('input');
  var pl = 'placeholder';
  var styleProps = {
    csstransitions: 'transitionProperty',
    boxflex: 'boxFlex',
    csscolumns: 'columnCount'
  };

  ks.htmlClass('js', true).htmlClass(pl, pl in inp);
  ks.htmlStyles(styleProps);

  inp = null;
})(document);
