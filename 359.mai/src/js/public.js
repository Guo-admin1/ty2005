
    $('.header-module').load('./public.html header',function(){console.log(1);});
    $('.footer-module').load('./public.html footer',function(){console.log(2);});
    
    // 登录页得失焦
    $('.inp').focus(function(){
        $(this).css('outline' , 'auto')
    });
    $('.inp').blur(function(){
        $(this).css('outline' , 'none')
    });
    
    
    // 返回顶部
    $(window).scroll(function(){
        var top = document.documentElement.scrollTop;
        if(top <= '200'){
            $('aside .a-a4').css('visibility' , 'hidden');
        }else{
            $('aside .a-a4').css('visibility' , 'visible');
        }
    });
    $('.a-a4').bind("click", function() {
        $("html,body").animate({
            "scrollTop": "0px",
        },800);
    });
// window.onload =function(){
//     // 初始化数据 获取购物车内所有的数量和
//     let storage = window.localStorage;
//     let storage_str = storage.getItem('goods');
//     let storage_obj = strToObj(storage_str);
//     let sum = 0;
//     for(let key in storage_obj){
//         sum += storage_obj[key].num;
//     }
//     console.log(sum);
//     // 获取购物车按钮
//     let shop_btn = $('.shop-btn');
//     console.log(shop_btn);
//     console.log(3);
    
//     // str转obj
//     function strToObj(str){
//         if(!str){
//             return {};
//         }else{
//             return JSON.parse(str);
//         }
//     }
// }
    
    
