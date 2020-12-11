class Cart{
    constructor(){
        // 获取表格
        this.tab = $('.buy-goods');
        // 初始化页面
        this.init();
        // 获取 商品总金额 框
        this.money = $('.sum-money');
        // 获取 订单可积分 框
        this.sum_inte = $('.sum-inte span');
        // 获取 总金额 框
        this.sum_money = $('.count em');
        // console.log(this.sum_inte);
        // 获取所有的 + 
        this.plus = $('.plus');
        // console.log(this.plus);
        // 获取所有的 -
        this.reduce = $('.reduce');
        // 获取所有的积分
        this.inte = $('.integral');
        // 获取所有的小计
        this.sum = $('.good-total-price');
        // 获取所有的数量框
        this.inp = $('.inp');
        // 获取所有的移除按钮
        this.del_btn = $('.operate .del');
        console.log(this.del_btn);
        // 初始化价格
        this.initPrice();
        // 添加事件
        this.addEvent();

    }
    init(){
        // 获取localStorage中的数据
        let storage = window.localStorage;
        let storage_str = storage.getItem('goods');
        let storage_obj = strToObj(storage_str);
        // console.log(storage_obj);
        let sum = 0;
        for(let key in storage_obj){
            let good = storage_obj[key];
            this.tab[0].innerHTML += `
                <tbody data-goods-id="${key}">
                    <tr>
                        <td class="good-pic">
                            <a href="./details.html">
                                <img src="${good.src}" alt="">
                            </a>
                        </td>
                        <td class="good-txt">
                            <a href="./details.html">${good.txt}</a>
                        </td>
                        <td>${good.price}</td>
                        <td>
                            <div class="good-num">
                                <a href="javaScript:;" class="reduce">-</a>
                                <input type="text" value="${good.num}" class="inp">
                                <a href="javaScript:;" class="plus">+</a>
                            </div>
                        </td>
                        <td>￥0.00</td>
                        <td class="integral">${(good.price.slice(1) * good.num).toFixed(2)}</td>
                        <td class="good-total-price">￥${(good.price.slice(1) * good.num).toFixed(2)}</td>
                        <td class="operate">
                            <a href="javascript:;">收藏</a>|<a href="javascript:;" class="del">移除</a> 
                            <div class="del-good">
                                <i>!</i><em>确定将商品从购物车中移除吗？</em>
                                <span class="sure">确定</span>
                                <span class="close">取消</span>
                                <div></div>
                            </div>
                        </td>
                    </tr>
                </tbody>
            `;
        }
    }
    initPrice(){
        let storage = window.localStorage;
        let storage_str = storage.getItem('goods');
        let storage_obj = strToObj(storage_str);
        // 总价
        let sum = 0;
        for(let key in storage_obj){
            sum += storage_obj[key].num * storage_obj[key].price.slice(1);
        }
        // 设置总价
        this.money.text(`￥${sum.toFixed(2)}`);
        // console.log(this.money.text());
        this.sum_inte.text(sum);
        this.sum_money.text(`￥${sum.toFixed(2)}`);
    }
    addEvent(){
        let that = this;
        // 遍历所有的 +，添加事件
        this.plus.each(function(i,v){
            // console.log(v);
            $(v).click(function(){
                let value = $(this).prev().val();
                // console.log(i);
                if(value < 99){
                    value ++;
                    $(this).prev().val(value);
                }
                // 获取单价
                let price = $(this).parents('td').prev().text().slice(1);
                // 积分
                $(that.inte[i]).text(`${(price * value).toFixed(2)}`);
                // 小计
                $(that.sum[i]).text(`￥${(price * value).toFixed(2)}`);
                // 获取id
                let good_id = $(this).parents('tbody').attr('data-goods-id');
                // 设置localStorage的数据
                that.setStorage(good_id,value);
            });
        });

        // 遍历所有的 -，添加事件
        this.reduce.each(function(i,v){
            // console.log(v);
            $(v).click(function(){
                let value = $(this).next().val();
                if(value > 1){
                    value --;
                    $(this).next().val(value);
                }
                // 获取单价
                let price = $(this).parents('td').prev().text().slice(1);
                // 积分
                $(that.inte[i]).text(`${(price * value).toFixed(2)}`);
                // 小计
                $(that.sum[i]).text(`￥${(price * value).toFixed(2)}`);
                // 获取id
                let good_id = $(this).parents('tbody').attr('data-goods-id');
                // 设置localStorage的数据
                that.setStorage(good_id,value);
            });
        });

        // 遍历所有的数量框，添加事件
        this.inp.each(function(i,v){
            $(v).blur(function(){
                // console.log($(v));
                let value = $(this).val();
                let re = /^\d+$/;
                if(!re.test(value) && value < 1){
                    $(this).val('1');
                }else if(value > 99){
                    $(this).val('99');
                }
                // 获取单价
                let price = $(this).parents('td').prev().text().slice(1);
                // 积分
                $(that.inte[i]).text(`${(price * value).toFixed(2)}`);
                // 小计
                $(that.sum[i]).text(`￥${(price * value).toFixed(2)}`);
                // 获取id
                let good_id = $(this).parents('tbody').attr('data-goods-id');
                // 设置localStorage的数据
                that.setStorage(good_id,value);
            })
        })

        // 遍历所有移除按钮，添加事件
        this.del_btn.each(function(i,v){
            $(v).click(function(){
                $(this).next().css('display','block');
                // 获取确定按钮
                let sure_btn = $(this).next().find('.sure');
                // 获取关闭按钮
                let close_btn = $(this).next().find('.close');
                // 获取要移除的商品id
                let good_id = $(this).parents('tbody').attr('data-goods-id');
                // 获取要移除的商品块
                let o_tbody = $(this).parents('tbody');
                // 确定按钮添加事件
                sure_btn.click(function(){
                    // 获取localStorage中的数据
                    let storage = window.localStorage;
                    let storage_str = storage.getItem('goods');
                    let storage_obj = strToObj(storage_str);
                    // 删除localStorage中的商品
                    delete storage_obj[good_id];
                    storage.setItem('goods',JSON.stringify(storage_obj));
                    // 移除页面商品
                    o_tbody.remove();
                    // 调用初始化价格
                    that.initPrice();
                });
                // 关闭按钮添加事件
                close_btn.click(function(){
                    $(this).parent().css('display','none');
                });
                
            });
        });

    }
    setStorage(id,value){
        // 获取localStorage中的数据
        let storage = window.localStorage;
        let storage_str = storage.getItem('goods');
        let storage_obj = strToObj(storage_str);
        // 改变id的num值
        storage_obj[id].num = parseInt(value);
        // 创建localStorage
        storage.setItem('goods',JSON.stringify(storage_obj));
        // 总价
        let sum = 0;
        for(let key in storage_obj){
            sum += storage_obj[key].num * storage_obj[key].price.slice(1);
        }
        // 设置总价
        this.money.text(`￥${sum.toFixed(2)}`);
        console.log(this.money.text());
        this.sum_inte.text(sum);
        this.sum_money.text(`￥${sum.toFixed(2)}`);
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

new Cart();