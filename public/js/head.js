import './sw-register.js';

let KS = function(arg) {
  if (!(this instanceof KS)) {
    return new KS(arg);
  }
  this.arg = arg;

  return this;
};

KS.prototype.testStyle = function(name, prop) {
  let div, divStyle, ret;
  let ucProp = prop.charAt(0).toUpperCase() + prop.substr(1);
  let vendorProps = (this.prefixes.join(`${ucProp} `) + ucProp).split(' ');

  if (this.divStyle) {
    divStyle = this.divStyle;
  } else {
    div = document.createElement('div');
    divStyle = div.style;
  }

  if (prop in divStyle) {
    ret = name;
  } else {

    for (let i = 0; i < vendorProps.length; i++) {

      if (vendorProps[i] in divStyle) {
        ret = name;
      }
    }

  }

  div = null;

  return ret;
};

KS.prototype.htmlClass = function(cls, test) {
  let docel = document.documentElement;
  let currentClass = docel.className;
  let rcurrentClass = new RegExp(cls);

  if (!rcurrentClass.test(` ${currentClass} `) && test) {
    docel.className += ` ${cls}`;
  }

  return this;
};

KS.prototype.htmlStyles = function(props) {
  let setClass;
  let div = document.createElement('div');

  this.prefixes = ['Webkit', 'Moz', 'O', 'ms', 'Khtml'];
  this.divStyle = div.style;

  for (let p in props) {
    setClass = this.testStyle(p, props[p]);

    if (setClass) {
      this.htmlClass(setClass, true);
    }
  }

  delete this.divStyle;
  div = null;

  return this;
};

KS.prototype.log = function(msg) {
  if (window.console && console.log) {
    console.log(msg);
  }

  return this;
};

(function(doc) {
  let ks = new KS();
  let inp = doc.createElement('input');
  let pl = 'placeholder';
  let styleProps = {
    csstransitions: 'transitionProperty',
    flexbox: 'flexbox',
    csscolumns: 'columnCount',
  };

  ks.htmlClass('js', true).htmlClass(pl, pl in inp);
  ks.htmlStyles(styleProps);

  inp = null;
})(document);
