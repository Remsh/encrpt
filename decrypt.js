var crypto = require('crypto');
var fs = require('fs');
var readline = require('readline');

var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.write("Input your password:\n");
 
var key;

var data = fs.readFileSync('encrypted.txt', 'utf-8');
console.log(data);

function aesEncrypt(data, key) {
    var cipher = crypto.createCipher('aes192', key);
    var crypted = cipher.update(data, 'utf8', 'hex');
    crypted += cipher.final('hex');
    return crypted;
}

function aesDecrypt(encrypted, key) {
    var decipher = crypto.createDecipher('aes192', key);
    var decrypted = decipher.update(encrypted, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    return decrypted;
}

function createDecrpyto(callback){
    rl.question("Input your password: ", function(answer) {
        var key = answer;
        callback(key);
    });
}

//var key = 'Password!';

createDecrpyto(function(key){
	var decrypted = aesDecrypt(data, key);
	fs.writeFileSync('output.txt', decrypted);
	console.log('Plain text: ' + data);
	console.log('Decrypted text: ' + decrypted);
});
