require('dotenv').config();
const crypto = require('crypto');
const ctoken = require('../jwt');

module.exports =(req, res, next) => {
    // let AccessToken = ctoken('root');// 클라이언트의 cookie.accesstoken
    let {AccessToken} = req.cookies;// 클라이언트의 cookie.accesstoken
    if(AccessToken == undefined){
        res.redirect('/?msg=로그인을 진행해주세요');
        return 0;
    }
   // console.log(AccessToken);

    // let tokenArr = AccessToken.split('.')
    // let header = tokenArr[0]
    // let payload = tokenArr[1]
    // console.log(tokenArr);

    let [header, payload, sign] = AccessToken.split('.');
    let signature = getSignature(header, payload);

    if (sign == signature) {
        console.log('검증된 토큰');
        //payload =  eyJ1c2VyaWQiOiJyb290IiwiZXhwIjoxNjIyMTg1ODU2ODQ3fQ=
        let { userid, exp } = JSON.parse(Buffer.from(payload, 'base64').toString())
        console.log(userid);
        console.log(exp);//토큰을 생성한 시간으로부터 2시간 뒤를 저장한 gettime() 변수
        let nexp = new Date().getTime();
        if (nexp > exp) {
            console.log('토큰이 만료되었습니다.');
            res.clearCookie('AccessToken');
            res.redirect('/?msg=토큰만료');
        }
        //모든검증이 완료. 이쪽영역에서 db에 접속해서 최소사항
        req.userid = userid;
        next();
    } else {
        res.redirect('/?msg=부적절한토큰');
    }
}
function getSignature(header, payload) {
    const signature = crypto.createHmac('sha256', Buffer.from(process.env.salt)) //암호화를 시작하겠다. 'sh256'                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 
        .update(header + "." + payload)
        .digest('base64')
        .replace('=', '')
        .replace('==', '')
    return signature;
}