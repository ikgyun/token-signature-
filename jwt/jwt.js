// npm install dotenv
require('dotenv').config();
const crypto = require('crypto'); // 암호화 모듈

// JMT 토큰생성 header.payload.signature
function createtoken(userid) {
    let header = {
        'tpy': 'JWT',
        'alg': 'HS256',
    }

    // let exp = new Date().getTime() + ((60 * 60 * 2) * 1000) // 현재시간으로부터 2시간을 더한 숫자
    let exp = new Date().getTime() + ((60 * 60 * 2) * 1000) // 현재시간으로부터 2시간을 더한 숫자

    let payload = {
       userid,
        exp //시간을 기준점을 정하기위해서
    }

    const encodingHeader = Buffer.from(JSON.stringify(header))//바이너리 파일을 만든다
        .toString('base64')
        .replace('=', '')
        .replace('==', '')
    const encodingPayload = Buffer.from(JSON.stringify(payload))
        .toString('base64')
        .replace('=', '')
        .replace('==', '')
    const signature = crypto.createHmac('sha256', Buffer.from(process.env.salt)) //암호화를 시작하겠다. 'sh256' 
        .update(encodingHeader + "." + encodingPayload)
        .digest('base64')
        .replace('=', '')
        .replace('==', '')
    let jwt = `${encodingHeader}.${encodingPayload}.${signature}`
    return jwt;
}

let token = createtoken('root');
console.log(token);

module.exports = createtoken;
