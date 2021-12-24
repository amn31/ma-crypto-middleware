
/**
 * 
 * const c = new MACrypto({
      secretKey: 'vOVH1sdmpNWjRRIqCc7rdxs01lwHzfr3'
    });
    let e = c.encrypt('alain');
    console.log('encrypted',e);

    console.log('decrypted',c.decrypt(e));

 */

//import { deflateSync, inflateSync, ZlibOptions } from "browserify-zlib";
//import {compress, decompress } from 'lz-string'
import * as CryptoJS from 'crypto-js';

export class MACrypto {

    secretKey = 'vOVH6sdmpNWjRRIqCc7rdxs01lwHzfr3';
    useCompress: boolean = false;

    /**
     * Permet de définir un algo de cryptage 
     * 
     * @param options  
     *      secretKey: 'vOVH6sdmpNWjRRIqCc7rdxs01lwHzfr3';
     * }
     */
    constructor(options?: any) {
        if (options) {
            if (typeof (options) == 'object') {
                if (options.secretKey) {
                    this.secretKey = options.secretKey;
                }
                if (options.compress === true) {
                    this.useCompress = true;
                }
            } else {
                this.secretKey = options
            }
        }

    }

    _crypt(s: string) {
        return CryptoJS.AES.encrypt(s, this.secretKey).toString()
    }

    _decrypt(s: string) {
        return CryptoJS.AES.decrypt(s, this.secretKey).toString(CryptoJS.enc.Utf8)
    }

    compress(c: string): string {
        var x: string = 'charCodeAt', b, e: any = {},
            f = c.split(""), d = [],
            a: any = f[0], g = 256;
        for (b = 1; b < f.length; b++)
            c = f[b], null != e[a + c] ? a += c : (d.push(1 < a.length ? e[a] : a[x](0)), e[a + c] = g, g++, a = c); d.push(1 < a.length ? e[a] : a[x](0)); for (b = 0; b < d.length; b++)d[b] = String.fromCharCode(d[b]);
        return d.join("")
    }

    decompress(n: string): string {

        var a, e: any = {}, f: any, o: number,
            d = n.split(""),
            c = f = d[0], g = [c], h = o = 256;
        for (let nbc = 1; nbc < d.length; nbc++)a = d[nbc].charCodeAt(0), a = h > a ? d[nbc] : e[a] ? e[a] : f + c, g.push(a), c = a.charAt(0), e[o] = f + c, o++, f = a; return g.join("")
    }

    _compress(s: string) {
        if (this.useCompress) {
            return this._crypt(this.compress(s));
        }
        return this._crypt(s);
    }

    _decompress(s: string) {
        if (this.useCompress) {
            return this.decompress(this._decrypt(s));
        }
        return this._decrypt(s);
    }


    _stringify(val: any, depth: number, replacer: any, space: number) {
        depth = isNaN(+depth) ? 1 : depth;
        function _build(key: any, val: any, depth: number, o?: any, a?: any) { // (JSON.stringify() has it's own rules, which we respect here by using it for property iteration)
            return !val || typeof val != 'object' ? val : (a = Array.isArray(val), JSON.stringify(val, function (k, v) { if (a || depth > 0) { if (replacer) v = replacer(k, v); if (!k) return (a = Array.isArray(v), val = v); !o && (o = a ? [] : {}); o[k] = _build(k, v, a ? depth : depth - 1); } }), o || (a ? [] : {}));
        }
        return JSON.stringify(_build('', val, depth), null, space);
    }

    public JSONencrypt(json: object): string {
        const str = this._stringify(json, 10, null, 1);
        return this.encrypt(str);
    }

    public JSONdecrypt(str: string): object {
        let jsonStringify = this.decrypt(str);
        return JSON.parse(jsonStringify);
    }

    /**
     * Permet de zipper et crypter une chaine de caractère
     * 
     * @param str 
     * @returns string 
     */
    public encrypt(str: string): string {
        // var dcompress = (s) => {
        //     return 'YYYY'+s;
        // }
        //console.log('AAAAAAAAAAAAAAAAAAAA',Buffer.from(decompress(Buffer.from(compress(str)).toString('hex'))));
        return Buffer.from(Buffer.from(this._compress(str)).toString('hex')).toString();

    }

    /**
     * Permet de dé-crypter puis dé-zipper une chaine de caractère
     * 
     * @param str 
     * @returns string 
     */
    decrypt(str: string) {

        // var ddecompress =(s) => {
        //     return s.replace(/^YYYY/,'');
        // }
        //console.log(decompress('e28281eb8286e0a5a0e79880e481a4e3809ae9a180e4ae81e3a180ea9980'))
        return this._decompress(Buffer.from((str.toString()), 'hex').toString());

    }

}




