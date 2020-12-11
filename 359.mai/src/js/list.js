window.onload = function(){
class List{
    constructor(){
        // 获取所有的折扣选项
        this.pro = $('.pro-a');
        // 获取所有的 ×
        this.x = $('.pro-a i');
        // 获取所有的 + 号
        this.plus = $('.plus');
        // 获取所有的 - 号
        this.reduce = $('.reduce');
        // 获取所有的价格输入框
        this.inp = $('.inp');
        // 获取所有的加入购物车按钮
        this.add_btn = $('.goods-buy span');
        // console.log(this.add_btn);
        // 初始化
        // this.init();
        // 添加事件
        this.addEvent();
    }
    addEvent(){
        // 遍历所有的折扣选项，添加事件
        this.pro.each(function(i,v){
            $(v).click(function(e){
                if(e.target.nodeName === 'A'){
                    $(this).addClass('pro-a-plus');
                    $(this).find('i').addClass('pro-i-plus');
                }
            });
        });
        // 遍历所有的 x ，添加事件
        this.x.each(function(i,v){
            $(v).click(function(){
                $(this).removeClass('pro-i-plus');
                $(this).parent().removeClass('pro-a-plus');
            })
        });
        // 遍历所有的 + 号，添加事件
        this.plus.each(function(i,v){
            $(v).click(function(){
                let value = $(this).prev().val();
                if(value < 99){
                    value ++;
                    $(this).prev().val(value);
                }
            });
        });
        // 遍历所有的 - 号，添加事件
        this.reduce.each(function(i,v){
            $(v).click(function(){
                let value = $(this).next().val();
                if(value > 1){
                    value --;
                    $(this).next().val(value);
                }
            });
        });
        // 遍历所有的价格输入框，添加事件
        this.inp.each(function(i,v){
            $(v).blur(function(){
                let re = /^\d+$/;
                if(!re.test($(this).val()) || $(this).val() < 1){
                    $(this).val('1');
                }else if($(this).val() > 99){
                    $(this).val('99');
                }
            });
        });
        // 遍历所有的加入购物车按钮，添加事件
        this.add_btn.each(function(i,v){
            $(v).click(function(i,v){
                // 获取商品的信息，id、src、txt、num、price
                let good_id = $(this).parents('li').attr('data-goods-id');
                let good_txt = $(this).parents('li').children('a').children('p').text();
                let good_src = $(this).parents('li').children('a').children('img').attr('src');
                let good_price = $(this).parent().prev().text();
                let good_num = parseInt($(this).prev().prev().val());
                // console.log(good_id,good_txt,good_src,good_price,good_num);
                /*
                    key     goods
                    value   
                    {
                        "sp1" : {
                            "src" : "../img/0095c51318c482e3f569be6ef97f772530e6bee2.jpg",
                            "txt" : "正宗潮汕牛肉丸500g 火锅配菜必备",
                            "price" : "￥42.00",
                            "num" : "1"
                        },
                        "sp2" : {
                            "src" : "../img/0095c51318c482e3f569be6ef97f772530e6bee2.jpg",
                            "txt" : "正宗潮汕牛肉丸500g 火锅配菜必备",
                            "price" : "￥42.00",
                            "num" : "1"
                        }
                    }
                */
                // 先获取window.localStorage
                let storage = window.localStorage;
                let storage_str = storage.getItem('goods');
                let storage_obj = strToObj(storage_str);
                if(good_id in storage_obj){
                    storage_obj[good_id].num += good_num;
                }else{
                    storage_obj[good_id] = {
                        "src" : good_src,
                        "txt" : good_txt,
                        "price" : good_price,
                        "num" : good_num
                    };
                }
                storage.setItem('goods',JSON.stringify(storage_obj));
                
                // 获取加入购物车成功提示框
                let go_cart = $('.go-cart');
                // 提示语句 加入购物车成功
                go_cart.css('display' , 'block');
                // 跳转购物车页面
                $('.go-cart span').click(function(){
                    location.href = './cart.html';
                });
                // 获取关闭按钮
                $('.close').click(function(){
                    go_cart.css('display' , 'none');
                });
                // 获取总件数
                let sum = 0;
                // console.log(storage_obj);
                for(let key in storage_obj){
                    sum += storage_obj[key].num;
                    // console.log(sum);
                }
                // console.log(sum);
                go_cart.children('em').text(`加入购物车成功，共${sum}件`);
            });
        });
    }
    
    init(){
        // 初始化数据 获取购物车内所有的数量和
        let storage = window.localStorage;
        let storage_str = storage.getItem('goods');
        let storage_obj = strToObj(storage_str);
        let sum = 0;
        for(let key in storage_obj){
            sum += storage_obj[key].num;
        }
        // // 获取购物车按钮
        // let shop_btn = document.querySelector('.s-inp');
        // console.log(shop_btn);
        // console.log(3);
    }
}

// str转obj
function strToObj(str){
    if(!str){
        return {};
    }else{
        return JSON.parse(str);
    }
}

new List();
}