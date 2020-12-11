let arr = [false,false]
// 1.用户名表单验证
$('#uname').blur(function(){
    let re = /^[\w\u4e00-\u9fa5]{2,6}$/;
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

// 3.登录按钮事件
$('.login-btn').click(function(){
    let $uname = $('#uname').val();
    let $pwd = $('#pwd').val();
    if($uname && $pwd){
        if(arr.indexOf(false) === -1){
            // 如果输入框都有内容隐藏提示
            $('.tips-1').css('display','none');
            $('.tips-2').css('display','none');
            // 获取本地存储的数据
            let storage = window.localStorage;
            let storage_str = storage.getItem('users');
            let storage_obj = strToObj(storage_str);
            if($uname in storage_obj && $pwd === storage_obj[$uname]){
                alert('登录成功');
                location.href = '../index.html';
            }else{
                $('.login-failure').fadeTo('200',1,function(){
                    setTimeout(() => {
                        $('.login-failure').fadeTo('200',0);
                    }, 1500);
                })
            }
        }
    }else{
        $('.tips-1').css('display','block');
        $('.tips-2').css('display','block');
    }
    
})

// str转obj
function strToObj(str){
    if(!str){
        return {};
    }else{
        return JSON.parse(str);
    }
}