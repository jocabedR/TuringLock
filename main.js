/* app = require("./app");

var a = parseInt(process.argv[3]);
var b = parseInt(process.argv[4]);

console.log(app.readingFile(process.argv[2])); */

var fs = require('fs')
    , filename = process.argv[2];
fs.readFile(filename, 'utf8', function(err, data) {
    var a = parseInt(process.argv[3]);
    var b = parseInt(process.argv[4]);
    if(err){
      console.error(err);
      return;
    }
    console.log("a = "+a+",b = "+b);
    var lines = data.split(/[\r\n]+/g);
    commandAnalyzer(lines, 0, a, b);
    
 });

function commandAnalyzer(text, counterLine, a, b){
    if(counterLine<(text.length-1)){
        console.log("\n"+counterLine+". "+text[counterLine]);
        var words = text[counterLine].split(" ");
        var instruction = words[0];
        var offset;
        var aux;
        var value;

        if(instruction[0]==="j"){
            if(instruction=="jmp" ){
                offset = words[1];
                aux = jumpTo(counterLine, offset, text.length-1);
            } else{
                offset = words[2];
                value = getRegisterValue(words[1].charAt(0), a, b);
                if(instruction=="jie" && value%2==0) aux = jumpTo(counterLine, offset, text.length-1);
                else if(instruction=="jio" && value==1) aux = jumpTo(counterLine, offset, text.length-1);
                else aux = counterLine+1;
            }
        } else {
            aux = counterLine+1;
            if (words[1] == "a") a =  setRegisterValue(instruction, a);
            else b = setRegisterValue(instruction, b);
        }

        console.log("Jump to: "+aux);
        console.log("a = "+a+",b = "+b);
        commandAnalyzer(text, aux, a, b);
    }
    else console.log("Program finished. \na = "+a+" b = "+b);
    
}

function jumpTo(counterLine, offset, limit){
    var longitudJump;
    var direction = offset.charAt(0)
    var longitud = parseInt(offset.substring(1,offset.length));

    if(direction === '+') longitudJump = counterLine + longitud;
    else longitudJump = counterLine -longitud;
    if(longitudJump>limit || longitudJump<0) longitudJump = limit;
    return longitudJump;
}


function getRegisterValue(register, a, b){
    if(register == 'a') return a;
    else return b;
}

function setRegisterValue(operator, register){
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