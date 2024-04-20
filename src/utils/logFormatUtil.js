(function () {
    var originalLog = console.log;
    var originalError = console.error;
  
    console.log = function () {
      var timestamp = new Date().toISOString();
      var formattedArguments = Array.prototype.slice.call(arguments).map(function(arg) {
        return '[' + timestamp + '] ' + arg;
      });
  
      originalLog.apply(console, formattedArguments);
    };
  
    console.error = function () {
      var timestamp = new Date().toISOString();
      var formattedArguments = Array.prototype.slice.call(arguments).map(function(arg) {
        return '[' + timestamp + '] ' + arg;
      });
  
      originalError.apply(console, formattedArguments);
    };
  })();