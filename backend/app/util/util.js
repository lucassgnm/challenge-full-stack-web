class Util {
  /**
   * Extrai somente os números de uma string
   * @param {*} obj 
   * @returns bool
   */
   async isEmpty(obj) {
    for(var prop in obj) {
      if(Object.prototype.hasOwnProperty.call(obj, prop)) {
        return false;
      }
    }
    return JSON.stringify(obj) === JSON.stringify({});
  };
}

module.exports = new Util;