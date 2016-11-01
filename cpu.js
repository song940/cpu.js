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
  var prev = new Date, now, diff, self = this;
  this.timer = setInterval(function(){
    now = new Date;
    diff = now - prev;
    prev = now;
    self.emit('data', diff);
  }, this.options.delay);
};

/**
 * [stop description]
 * @return {[type]} [description]
 */
CPU.prototype.stop = function () {
  clearInterval(this.timer);
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