var a = process.argv[3];
var b = process.argv[4];

var fs = require('fs')
    , filename = process.argv[2];
fs.readFile(filename, 'utf8', function(err, data) {
    if(err){
      console.error(err);
      return;
    }
    console.log("a = "+a+",b = "+b)
    var lines = data.split(/[\r\n]+/g);
    analyzer(lines, 0);
    
 });

function analyzer(text, count){
    if(count<(text.length-1)){
        console.log(count+". "+text[count]);
        var words = text[count].split(" ");
        var instruction = words[0];
        var offset;
        var aux;

        if(instruction[0]==="j"){
            offset = words[2];
            aux = jump(count, offset, text.length-1);
        }else {
            aux = count+1;
        }

        //console.log(aux);
        analyzer(text, aux);

    
    }
    else console.log("Program finished. \na = "+a+" b = "+b);
    
}

function jump(count, offset, limit){
    var longitudJump;
    var direction = offset.charAt(0)
    var longitud = parseInt(offset.substring(1,offset.length));

    if(direction === '+') longitudJump = count + longitud;
    else longitudJump = count -longitud;
    if(longitudJump>limit || longitudJump<0) longitudJump = limit;
    return longitudJump;
}