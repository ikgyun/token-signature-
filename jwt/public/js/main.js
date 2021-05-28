document.addEventListener('DOMContentLoaded',init);
function init(){
    const loginBtn = document.querySelector('#loginBtn');
    const layerPopup = document.querySelector('.layerPopup');
    const localLogin = document.querySelector('#localLogin');
    loginBtn.addEventListener('click', loginBtnFn)
    layerPopup.addEventListener('click',popupClose);
    localLogin.addEventListener('click',login);
}

function loginBtnFn(){
    const layerPopup = document.querySelector('.layerPopup');
    layerPopup.classList.add('open');
    // console.log(this);
}

function popupClose(event){
    // console.log(event);
    // console.log(this); 
    if(event.target == this){
        this.classList.remove('open')    
    }
}

async function login(){
    const userid = document.querySelector('#userid');
    const userpw = document.querySelector('#userpw');

    if(userid.value == ""){
        alert('아이디를 입력해주세~요!');
        userid.focus();
        return 0;
    }

    if(userpw.value == ""){
        alert('패스워드를 입력해주세~요!');
        userpw.focus();
        return 0;
    }

    // POST auth/local/login post로 보내는 방법이 두가지있는데 두가지중 하나임.
    let url = 'http://localhost:3000/auth/local/login';
    // let options = {
    //     method:'POST',
    //     headers:{
    //         'content-type':'application/x-www-form-urlencoded'
    //     },
    //     body:`userid=${userid.value}&userpw=${userpw.value}`,
    // }

    let options = {
        method: 'POST',
        headers:{
            'content-type': 'application/json',
            'data':JSON.stringify({
                userid:userid.value,
                userpw:userpw.value,
            }),
        },
        body:JSON.stringify({
            userid:userid.value,
            userpw:userpw.value,
        }) //이러면 내용은 보내지는데 응답받는쪽에서 처리가 잘 안될것임. 미들웨어를 하나 놔줘야함.
    } // 파이어폭스의 request메시지가 어떻게 뜨는지 확인
    //  headers
    //  key=value&key2=value2
    //  값을 2개를 보낼거다. userid,userpw
    let response = await fetch(url,options); //promise 객체 reserve, 
    console.log(response); //상태값을 받아주는 것.
    let json = await response.json();
   
    let {result,msg} =json;
     alert(msg);
   if(result){
       //로그인 성공됬을때 이부분어렵다.
       let layerPopup = document.querySelector('.layerPopup');
       layerPopup.classList.remove('open')
   }else{
       userid.value = '';
       userpw.value = '';
       userid.focus();
   }
}