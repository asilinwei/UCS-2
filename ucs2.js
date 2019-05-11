function ucs2Encode(array) {
  "use strict";

  if (!Array.isArray(array)) {
    throw new Error('Not array');
  }

  var result = '',
      length = array.length;

  for (var i = 0; i < length; i += 1) {
    var codePoint = array[i];
    if (!Number.isInteger(codePoint) || codePoint < 0 || codePoint > 0x10FFFF) {
      throw new Error('Invalid code point');
    }
    if (codePoint > 0xFFFF) {
      var diff = codePoint - 0x10000;
      result += String.fromCharCode(0xD800 | (diff >> 10)) + String.fromCharCode(0xDC00 | (diff & 0x3FF));
    } else {
      result += String.fromCharCode(codePoint);
    }
  }    
  return result;
}

function ucs2Decode(string) {
  "use strict";

  if (typeof string !== 'string') {
    throw new Error('Not string');
  }

  var result = [],
      index = -1,
      length = string.length;  
       
  while (++index < length) {
    var value = string.charCodeAt(index);
    if (value >= 0xD800 && value <= 0xDBFF) {
      var next = string.charCodeAt(++index);
      if (next >= 0xDC00 && next <= 0xDFFF && index < length) {
        result.push((((value & 0x3FF) << 10) | (next & 0x3FF)) + 0x10000);
      } else {
        index -= 1;
        result.push(value);
      }
    } else {
      result.push(value);
    }
  } 
  return result;    
}

