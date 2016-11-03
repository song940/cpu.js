/**
 * [CPU Profiling Library]
 * @param {[type]} options [description]
 */
function CPU(options){
  if(!(this instanceof CPU))
    return new CPU(options);
  var defaults = {
    delay: 100
  };
  for(var k in options) 
    defaults[k] = options[k];
  this.options = defaults;
  return this;
}

/**
 * [start description]
 * @return {[type]} [description]
 */
CPU.prototype.start = function () {
  var self = this;
  this.data = [];
  var prev = new Date, now, diff;
  ;(function update(){
    now = new Date;
    self.data.push(now - prev - 100);
    prev = now;
    self.timer = setTimeout(update, self.options.delay);
    if(self.data.length >= 10){
      var sum = self.data.reduce(function(a, b){
        return a + b;
      });
      
      var avg = sum / self.data.length;
      self.emit('rate', avg * 10)
      self.data = [];
    }
  })();
};

/**
 * [stop description]
 * @return {[type]} [description]
 */
CPU.prototype.stop = function () {
  clearTimeout(this.timer);
};

/**
 * [on description]
 * @param  {[type]}   ev [description]
 * @param  {Function} fn [description]
 * @return {[type]}      [description]
 */
CPU.prototype.on = function (ev, fn) {
  this.events = this.events || {};
  (this.events[ ev ] = this.events[ ev ] || []).push(fn);
  return this;
};

/**
 * [emit description]
 * @param  {[type]} ev [description]
 * @return {[type]}    [description]
 */
CPU.prototype.emit = function (ev) {
  var args = [].slice.call(arguments, 1);
  (this.events[ ev ] || []).forEach(function(fn){
    fn.apply(undefined, args);
  });
};