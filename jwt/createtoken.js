/*
header{ 토큰의 정보
    "alg": "HS256",
    "typ": "JWT"
  }

payload  {
    "sub": "1234567890",
    "name": "John Doe",
    "iat": 1516239022
  }

signature
  HMACSHA256(
    base64UrlEncode(header) + "." +
    base64UrlEncode(payload),
    
  your-256-bit-secret

  1번째 header의 암호화 하기
  0,1 -> 2진법 16진법이랑 친구다.
  2진법
  10진법
  16진법

  바이너리 데이터 
*/

const crypto = require('crypto');

function createtoken(){
    

let header={
    "alg": "HS256",
    "typ": "JWT"
  }

let txt ="안녕하세요";
let encodeheader = Buffer.from(JSON.stringify(header))
                    .toString('base64')
                    .replace('=','');
console.log(encodeheader);
  
let payload = {
    "sub": "1234567890",
    "name": "John Doe",
    "user": "muyaho",
    "iat": 1516239022
  }

let encodepayload = Buffer.from(JSON.stringify(payload))
.toString('base64')
.replace('==','');
console.log(encodepayload);

// 1.어떤 암호화를 할거냐 (sha256)
// 2. 암호화 규칙 스트링으로 적습니다.
let signature = crypto.createHmac('sha256',Buffer.from('ickgyun'))
                .update(`${encodeheader}.${encodepayload}`) // header.payload
                .digest('base64')
                .replace('==','');
                console.log(signature);

return `${encodeheader}.${encodepayload}.${signature}`;


}

let token = createtoken();
console.log(token);
module.exports = createtoken;