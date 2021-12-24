import { JsonData } from "./data";
import { MACrypto } from "./lib/ma-crypto-middleware";


const crypto1 = new MACrypto({
    secretKey: 'simple',
    compress: true
});
const crypto2 = new MACrypto({
    secretKey: 'simple',
    compress: false
});

var data1 = 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa';
let ee = crypto1.encrypt(data1);
console.log('encrypted', ee, '('+ee.length+') compressed');
console.log('decrypted', crypto1.decrypt(ee));

ee = crypto2.encrypt(data1);
console.log('encrypted', ee, '('+ee.length+') NOT compressed');
console.log('decrypted', crypto1.decrypt(ee));

let json =  { a: 1 };

// Lib
//import { MACrypto } from "./lib/ma-crypto-middleware";


// Instance MACrypto 
const crypto = new MACrypto({
    secretKey: 'SecurePassword',
    compress: true
});

// Crypt
var data1 = '_____________ @amn31/ma-crypto-middleware _____________'
let stringCrypted = crypto.encrypt(data1);
console.log('Crypted data : ',stringCrypted)
// Decrypt
data1 = crypto.decrypt(stringCrypted);
console.log('Decrypted data : ',data1)

// Crypt
let jsonData:any = {message:'_____________ @amn31/ma-crypto-middleware _____________'}
stringCrypted = crypto.JSONencrypt(jsonData);
console.log('JSON crypted data : ',stringCrypted)
// Decrypt
jsonData = crypto.JSONdecrypt(stringCrypted);
console.log('Decrypted data : ',jsonData)

process.exit(1);
console.log('SMALL JSON ',json)
ee = crypto1.JSONencrypt(json);
console.log('JSON encrypted', ee, '('+ee.length+') compressed');
console.log('JSON decrypted', crypto1.JSONdecrypt(crypto1.JSONencrypt(json)));

ee = crypto2.JSONencrypt(json);
console.log('JSON encrypted', ee, '('+ee.length+') NOT compressed');
console.log('JSON decrypted', crypto2.JSONdecrypt(crypto2.JSONencrypt(json)));

json = JsonData;
console.log('BIG JSON ')
ee = crypto1.JSONencrypt(json);
console.log('JSON encrypted', '('+ee.length+') compressed');
var d:any = crypto1.JSONdecrypt(crypto1.JSONencrypt(json));
console.log('JSON decrypted', d.context.info);

ee = crypto2.JSONencrypt(json);
console.log('JSON encrypted', '('+ee.length+') NOT compressed');
var d:any = crypto2.JSONdecrypt(crypto2.JSONencrypt(json));
console.log('JSON decrypted', d.context.info);

var compressed = crypto1.compress("http://www.ScriptCompress.com - Simple Packer/Minify/Compress JavaScript Minify, Fixify & Prettify 75 JS Obfuscators In 1 App 25 JS Compressors (Gzip, Bzip, LZMA, etc) PHP, HTML & JS Packers In 1 App PHP Source Code Packers Text Packer HTML Packer or v2 or v3 or LZW Twitter Compress or More Words DNA & Base64 Packer (freq tool) or v2 JS JavaScript Code Golfer Encode Between Quotes Decode Almost Anything Password Protect Scripts HTML Minifier v2 or Encoder or Escaper CSS Minifier or Compressor v2 SVG Image Shrinker HTML To: SVG or SVGZ (Gzipped) HTML To: PNG or v2 2015 JS Packer v2 v3 Embedded File Generator Extreme Packer or version 2 Our Blog DemoScene JS Packer Basic JS Packer or New Version Asciify JavaScript Escape JavaScript Characters UnPacker Packed JS JavaScript Minify/Uglify Text Splitter/Chunker Twitter, Use More Characters Base64 Drag 'n Drop Redirect URL DataURI Get Words Repeated LZMA Archiver ZIP Read/Extract/Make BEAUTIFIER & CODE FIXER WHAK-A-SCRIPT JAVASCRIPT MANGLER 30 STRING ENCODERS CONVERTERS, ENCRYPTION & ENCODERS 43 Byte 1px GIF Generator Steganography PNG Generator WEB APPS VIA DATAURL OLD VERSION OF WHAK PAKr Fun Text Encrypt Our Google");
var decompressed = crypto1.decompress(compressed);

console.log(' (' + compressed.length + ') <=> (' + decompressed.length + ')')
// console.log('compressed', compressed , ' (' + compressed.length + ')');
// console.log('decompressed', decompressed , ' (' + decompressed.length + ')');
