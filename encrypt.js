var crypto = require('crypto');
var fs = require('fs');
var readline = require('readline');

var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

var key;
var data = fs.readFileSync('decrypted.txt', 'utf-8');

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

//var key = 'Password!';
//var encrypted = aesEncrypt(data, key);
//var decrypted = aesDecrypt(encrypted, key);

function createEncrpyto(callback){
    rl.question("Input your password: ", function(answer) {
        var key = answer;
        callback(key);
    });
}

createEncrpyto(function(key){
	var encrypted = aesEncrypt(data, key);
	fs.writeFileSync('encrypted.txt', encrypted);
	console.log('Encrypted text: ' + encrypted);
});
