// 所有信息填写完才可提交注册
let arr = [false,false,false,false,false,false]
// 1.注册手机号表单验证
$('#uphone').blur(function(){
    let re = /^1\d{10}$/;
    if(re.test($(this).val())){
        $('.tips-1').css('display','none');
        arr[0] = true;
    }else{
        $('.tips-1').css('display','block');
        arr[0] = false;
    }
});

// 2.密码表单验证
$('#pwd').blur(function(){
    let re = /^[\w,./_]{6,20}$/;
    if(re.test($(this).val())){
        $('.tips-2').css('display','none');
        arr[1] = true;
    }else{
        $('.tips-2').css('display','block');
        arr[1] = false;
    }
});

// 3.确认密码表单验证
$('#sure').blur(function(){
    if($(this).val() === $('#pwd').val()){
        $('.tips-3').css('display','none');
        arr[2] = true;
    }else{
        $('.tips-3').css('display','block');
        arr[2] = false;
    }
});

// 4.用户名表单验证
$('#uname').blur(function(){
    let re = /^[\w\u4e00-\u9fa5]{2,6}$/;
    if(re.test($(this).val())){
        $('.tips-4').css('display','none');
        arr[3] = true;
    }else{
        $('.tips-4').css('display','block');
        arr[3] = false;
    }
});

// 5.QQ表单验证
$('#uqq').blur(function(){
    let re = /^\d{6,}$/;
    if(re.test($(this).val())){
        $('.tips-5').css('display','none');
        arr[4] = true;
    }else{
        $('.tips-5').css('display','block');
        arr[4] = false;
    }
});

// 6.邮箱表单验证
$('#ucom').blur(function(){
    let re = /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
    if(re.test($(this).val())){
        $('.tips-6').css('display','none');
        arr[5] = true;
    }else{
        $('.tips-6').css('display','block');
        arr[5] = false;
    }
});

// 7.验证码

// 8.复选框 
$('.check-inp').click(function(){
    
});

/*
    key  users
    value  {用户名 ：密码;用户名 ：密码}
*/
// 9.注册按钮
$('.registor-btn').click(function(){
    if(arr.indexOf(false) === -1){
        let storage = window.localStorage;
        let storage_str = storage.getItem('users') ? storage.getItem('users') : '';
        let storage_obj = strToObj(storage_str);
        if($('#uname').val() in storage_obj){
            $('.tips-repeat').css('display','block');
        }else{
            $('.tips-repeat').css('display','none');
            storage_obj[$('#uname').val()] = $('#pwd').val();
            console.log(storage_obj);
            storage.setItem('users',JSON.stringify(storage_obj));
            alert('注册成功！点击确定跳转登录页面');
            location.href = './login.html';
        }
    }else{
        alert('请完善用户信息！')
    }
});

// str转obj
function strToObj(str){
    if(!str){
        return {};
    }else{
        return JSON.parse(str);
    }
}