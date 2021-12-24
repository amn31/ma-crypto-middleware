# Why crypt your data

To exchange data between frontend and backend and to secure your datas, you can use this module.
You will find an example of middleware to implement in the backend side and an example of interceptor for Angular.


# Installation

```bash
    npm install @amn31/ma-crypto-middleware
```

# How do data crypt?

```ts

    const maCrypto = require("@amn31/ma-crypto-middleware");

    // Instance MACrypto 
    const crypto = new maCrypto.MACrypto({
        secretKey: 'SecurePassword',
        compress: true
    });

    // Crypt simple data
    var data1 = '_____________ @amn31/ma-crypto-middleware _____________'
    let stringCrypted = crypto.encrypt(data1);
    console.log('Crypted data : ',stringCrypted)

    // Decrypt
    data1 = crypto.decrypt(stringCrypted);
    console.log('Decrypted data : ',data1)

    // Crypt a JSON
    let jsonData = {message:'_____________ @amn31/ma-crypto-middleware _____________'}
    stringCrypted = crypto.JSONencrypt(jsonData);
    console.log('JSON crypted data : ',stringCrypted)
    // Decrypt JSON
    jsonData = crypto.JSONdecrypt(stringCrypted);
    console.log('Decrypted data : ',jsonData)

```

# Example of usage between Angular & Express

## Frontend Project (Angular) 

Example of angular interceptor which uses MACrypto for encrypting data before sending

```ts
import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

// We use MACrypto
import { MACrypto } from '@amn31/ma-crypto-middleware';

@Injectable()
export class CryptoInterceptor implements HttpInterceptor {

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        console.log('> CryptoInterceptor ' + request.url)

        // It is possible for some requests not to use MACrypto
        if (request.url == AppConfig.API_URI_AUTHENTICATION) {
            // to custom....
            return next.handle(request);
        } else {
            try {

                if (AppConfig.ENABLE_CRYPTO) {
                    const c = new MACrypto({
                        // Strong password to exchange between server and client
                        secretKey: 'vOVH1sdmpNWjRRIqCc7rdxs01lwHzfr3'
                    });

                    if (request.body && request.body.params) {
                        // Encrypted data in a single param 'crypto'
                        let e = c.JSONencrypt(request.body.params)
                        // All parameters are deleted
                        for (var k in request.body.params) {
                            delete request.body.params[k];
                        }
                        // Create param 'crypto'
                        request.body.params['crypto'] = e;

                    } else {
                        if (request.body) {
                            // Encrypted data in a single param 'crypto'
                            let e = c.JSONencrypt(request.body);
                            // All parameters are deleted
                            for (var k in request.body) {
                                delete request.body[k];
                            }
                            // Create param 'crypto'
                            request.body['crypto'] = e;
                        }
                    }
                }

            } catch (err) {
                console.log('Error on CryptoInterceptor', err)
            }
        }
        return next.handle(request);
    }
}
```

Do not forget to add interceptor in "add.module.ts" file

```ts
    import { CryptoInterceptor } from './interceptors/Crypto_interceptor';

    @NgModule({
        ...
        providers: [
            { provide: HTTP_INTERCEPTORS, useClass: CryptoInterceptor, multi: true },
            ...	
        ],
        bootstrap: [AppComponent]

    })
    export class AppModule { }

```

## Backend Project (NodeJS)

Example of server which uses MACrypto (Decrypt)

```js
  
    //
    const maCrypto = require('@amn31/ma-crypto-middleware');

    // Express Server
    const app = express();

    
    const crypto = new maCrypto.MACrypto({
        // Strong password to exchange between server and client
        secretKey: 'vOVH1sdmpNWjRRIqCc7rdxs01lwHzfr3',
        compress: true
    })

    // Example of middleware which decrypts data of body
    var middlewareCryptoBeforeCors = function (req, res, next) {
        // If 'crypto' parameter exists
        // We have to decrypts datas
        if (req.body) {
            try {
                if (req.body.params && req.body.params['crypto']) {
                    req.body.params = crypto.JSONdecrypt(req.body.params['crypto']);
                } else {
                    if (req.body['crypto']) {
                    req.body = crypto.JSONdecrypt(req.body['crypto']);
                    }
                }
            } catch (e) {
                console.log("COULD NOT PARSE crypto", e);
                return res.status(401).json({
                    message: 'Missing Authorization header'
                });
            }
        }
        next();
    }
    app.use(middlewareCryptoBeforeCors);
    ....
    
```


## License

[MIT](LICENSE)

[Angular](https://angular.io/)

