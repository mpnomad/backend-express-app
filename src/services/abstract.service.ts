import { IncomingMessage } from 'http';
import https from 'https';

export class AbstractService {
    async get(url: string): Promise<any> {
        return new Promise((resolve, reject)=>{
            let req = https.request(url,(res: IncomingMessage) => {
                if (res.statusCode && (res.statusCode < 200 || res.statusCode > 299)) {
                    return reject(new Error(`Status code: ${res.statusCode}`))
                }
                let data:any = [];
                res.on('data', (chunk) => {
                    data.push(chunk);
                });
                res.on('end', () => {
                    //console.log(data);
                    resolve(data);
                })
            });

            req.on('error', (err) => {
               reject(err);
            });

            req.on('timeout', () => {
                reject(new Error('Request call time out.'));
            });

            req.end();
        });
    };
}
