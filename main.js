var a = process.argv[3];
var b = process.argv[4];

var fs = require('fs')
    , filename = process.argv[2];
fs.readFile(filename, 'utf8', function(err, data) {
    if(err){
      console.error(err);
      return;
    }
    console.log("a = "+a+",b = "+b);
    var lines = data.split(/[\r\n]+/g);
    analyzer(lines, 0);
    
 });

function analyzer(text, count){
    if(count<(text.length-1)){
        console.log("\n"+count+". "+text[count]);
        var words = text[count].split(" ");
        var instruction = words[0];
        var offset;
        var aux;
        var register;

        if(instruction[0]==="j"){
            
            if(instruction=="jmp" ){
                offset = words[1];
                aux = jumpTo(count, offset, text.length-1);
            } else{
                offset = words[2];
                register = registerValue(words[1].charAt(0));
                if(instruction=="jie" && register%2==0) aux = jumpTo(count, offset, text.length-1);
                else if(instruction=="jio" && register%2==1) aux = jumpTo(count, offset, text.length-1);
                else aux = count+1;
            }
        } else {
            aux = count+1;
            if (words[1] == "a") a =  operations(instruction, a);
            else b = operations(instruction,b);
        }
            analyzer(text, aux);
    }
    else console.log("Program finished. \na = "+a+" b = "+b);
    
}

function jumpTo(count, offset, limit){
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

function registerValue(register){
    if(register == 'a') return a;
    else return b;
}

function operations(operator, register){
    var response;
    switch(operator){
        case "hlf":
            response = register / 2;
            break;
        case "tpl":
            response = register * 3;
            break;
        case "inc":
                response = register + 1;
                break;
    }
    return response;
}