const express = require('express');
const cookieParser =require('cookie-parser');
const bodyParser = require('body-parser');
const nunjucks = require('nunjucks');
let token = require('./createtoken'); // 외부 js파일 가져오기
const app = express();
const ctoken = require('./jwt');
const auth = require('./middleware/auth');


app.set('view engine','html');
nunjucks.configure('views',{
    express:app,
})

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false,}))
app.use(cookieParser());
app.use(express.static('public'));

app.get('/',(req,res)=>{
    
    let {msg} = req.query;
   
    res.render('index');
                   
});

app.get('/user/info',auth,(req,res)=>{
    res.send(`Hello ${req.userid}`);
})

app.get('/menu1',(req,res)=>{
    // console.log(req.cookies);
    res.send('menu');
})

app.post('/auth/local/login',(req,res)=>{
   let {userid,userpw} = req.body;
    //let {userid, userpw} = JSON.parse(req.get('data'));
    console.log('body req : ',userid,userpw);
    console.log('data req : ',userid,userpw);
    
    //원래대로라면 DB접속후 결과 Return
    let result = {};
    if(userid=='root' && userpw=='root'){
        //로그인성공
        result={
            result:true,
            msg:'로그인에 성공하셨습니다.'
        }

        let token = ctoken(userid);
        res.cookie('AccessToken',token,{httpOnly:true,secure:true,})

        //token 내용을
    }else {
        //로그인실패
        result = {
            result:false,
            msg:'아이디와 패스워드를 확인해주세요.'
        }// else의 값을 let result 값 안에 넣어줘서 디폴트값으로도 사용가능
    }
    res.json(result);
})

app.get('/login', (req,res)=>{
    let {id,pw} = req.query; // 비구조 할당문 사용시 let,const 변수선언문이 꼭 필요합니다.
                            // 혹시 사용할이유가 없다면 ()안으로 사용해주셔야합니다.
    if(id=='root' && pw=='root'){
        //토큰생성
        let ctoken = token();
        res.cookie('token',ctoken, {httpOnly:true,secure:true,}); 
        res.redirect('/?msg=로그인성공');
    }else{
        //토큰실패
        res.redirect('/?msg=로그인실패');
    }

                        })

app.listen(3000,()=>{
    console.log('sever start port:3000');
});