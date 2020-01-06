const crypto = require('crypto');
const algorithm = 'aes-256-cbc';
const key = crypto.randomBytes(32);
const iv = crypto.randomBytes(16);
const execFile = require('child_process').exec;


module.exports = {

 encrypt : function(text) {
 let cipher = crypto.createCipheriv('aes-256-cbc', Buffer.from(key), iv);
 let encrypted = cipher.update(text);
 encrypted = Buffer.concat([encrypted, cipher.final()]);
 return { iv: iv.toString('hex'), encryptedData: encrypted.toString('hex') };
},

 decrypt : function(text) {
 let iv = Buffer.from(text.iv, 'hex');
 let encryptedText = Buffer.from(text.encryptedData, 'hex');
 let decipher = crypto.createDecipheriv('aes-256-cbc', Buffer.from(key), iv);
 let decrypted = decipher.update(encryptedText);
 decrypted = Buffer.concat([decrypted, decipher.final()]);
 return decrypted.toString();
},



login : function(username, password)  {

},

whenServerStarts : function() {
    console.log("Server restarted/ started ....")
    execFile('sh ./filemove.sh',
    (error, stdout, stderr) => {
        console.log(stdout);
        //console.log(stderr);
        if (error !== null) {
            console.log(`exec error: ${error}`);
        }
    });
    console.log("dist moved !!")
}



}
