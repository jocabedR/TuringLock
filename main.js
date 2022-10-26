if (process.argv.length < 3) {
    console.log('Usage: node ' + process.argv[1] + ' FILENAME');
    process.exit(1);
  }
  
  var fs = require('fs')
    , filename = process.argv[2];
  fs.readFile(filename, 'utf8', function(err, data) {
    if(err){
      console.error(err);
      return;
    }
    lineByLine(data);
  });
  
  function lineByLine(text){
      var e1, e2, e3;
      var lines = text.split(/[\r\n]+/g);
      for(var i = 0; i < lines.length; i++) {
          console.log(lines[i]);
      }
  }