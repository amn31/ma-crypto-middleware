
const JsonData = {
    "versionsDownloads": {
        "1.0.1": 42,
        "1.0.4": 47,
        "1.0.3": 45,
        "1.0.0": 41,
        "1.0.2": 43
    },
    "starAction": "/package/%40amn31%2Fma-parallel-promises/star",
    "scope": "amn31"
}
//const maCrypto = require("./dist/ma-crypto-middleware");
const maCrypto = require("@amn31/ma-crypto-middleware");


const crypto1 = new maCrypto.MACrypto({
    secretKey: 'ThePassword',
    compress: true
});
const crypto2 = new maCrypto.MACrypto({
    secretKey: 'ThePassword',
    compress: false
});

var data1 = '_____________ @amn31/ma-crypto-middleware _____________';
let ee = crypto1.encrypt(data1);
console.log('encrypted', ee, '('+ee.length+') compressed');
console.log('decrypted', crypto1.decrypt(ee));

ee = crypto2.encrypt(data1);
console.log('encrypted', ee, '('+ee.length+') NOT compressed');
console.log('decrypted', crypto1.decrypt(ee));

let json =  { a: 1 };

console.log('\nSMALL JSON ',json)
ee = crypto1.JSONencrypt(json);
console.log('JSON encrypted', ee, '('+ee.length+') compressed');
console.log('JSON decrypted', crypto1.JSONdecrypt(crypto1.JSONencrypt(json)));

ee = crypto2.JSONencrypt(json);
console.log('JSON encrypted', ee, '('+ee.length+') NOT compressed');
console.log('JSON decrypted', crypto2.JSONdecrypt(crypto2.JSONencrypt(json)));

json = JsonData;
console.log('\nMEDIUM JSON ')
ee = crypto1.JSONencrypt(json);
console.log('JSON encrypted', '('+ee.length+') compressed');
var d = crypto1.JSONdecrypt(crypto1.JSONencrypt(json));
console.log('JSON decrypted', d);

ee = crypto2.JSONencrypt(json);
console.log('JSON encrypted', '('+ee.length+') NOT compressed');
var d = crypto2.JSONdecrypt(crypto2.JSONencrypt(json));
console.log('JSON decrypted', d);

var compressed = crypto1.compress("http://www.ScriptCompress.com - Simple Packer/Minify/Compress JavaScript Minify, Fixify & Prettify 75 JS Obfuscators In 1 App 25 JS Compressors (Gzip, Bzip, LZMA, etc) PHP, HTML & JS Packers In 1 App PHP Source Code Packers Text Packer HTML Packer or v2 or v3 or LZW Twitter Compress or More Words DNA & Base64 Packer (freq tool) or v2 JS JavaScript Code Golfer Encode Between Quotes Decode Almost Anything Password Protect Scripts HTML Minifier v2 or Encoder or Escaper CSS Minifier or Compressor v2 SVG Image Shrinker HTML To: SVG or SVGZ (Gzipped) HTML To: PNG or v2 2015 JS Packer v2 v3 Embedded File Generator Extreme Packer or version 2 Our Blog DemoScene JS Packer Basic JS Packer or New Version Asciify JavaScript Escape JavaScript Characters UnPacker Packed JS JavaScript Minify/Uglify Text Splitter/Chunker Twitter, Use More Characters Base64 Drag 'n Drop Redirect URL DataURI Get Words Repeated LZMA Archiver ZIP Read/Extract/Make BEAUTIFIER & CODE FIXER WHAK-A-SCRIPT JAVASCRIPT MANGLER 30 STRING ENCODERS CONVERTERS, ENCRYPTION & ENCODERS 43 Byte 1px GIF Generator Steganography PNG Generator WEB APPS VIA DATAURL OLD VERSION OF WHAK PAKr Fun Text Encrypt Our Google");
var decompressed = crypto1.decompress(compressed);

console.log(' (' + compressed.length + ') <=> (' + decompressed.length + ')')
// console.log('compressed', compressed , ' (' + compressed.length + ')');
// console.log('decompressed', decompressed , ' (' + decompressed.length + ')');
