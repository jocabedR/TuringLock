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
        var register;

        if(instruction[0]==="j"){
            
            if(instruction=="jmp" ){
                offset = words[1];
                aux = jump(count, offset, text.length-1);
                console.log("instruction ="+instruction+", offsets="+offset);
            } else{
                offset = words[2];
                console.log("offset="+offset);
                register = registerValue(words[1].charAt(0));
                console.log("instruction ="+instruction+", register="+words[1].charAt(0)+" registerValue="+register);
                if(instruction=="jie" && register%2==0) aux = jump(count, offset, text.length-1);
                else if(instruction=="jio" && register%2==1) aux = jump(count, offset, text.length-1);
                else aux = count+1; 
            }
            
        }else {
            aux = count+1;
        }
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


function registerValue(register){
    if(register == 'a') return a;
    else return b;
}