
// // 轮播js
// class Slider{
//     constructor(){
//         // 属性
//         this.init()
//     }
//     init(){
//         // 获取大盒子
//         this.o_div = document.querySelector('.slide');
//         // 获取所有图片
//         this.ul_li = document.querySelectorAll('.slide li');
//         // 获取图片数量
//         this.num = this.ul_li.length;
//         // 获取所有小圆点
//         this.ol_li = document.querySelectorAll('.slide-trigger li span');
//         // 获取左、右按钮
//         this.lt_btn = document.querySelector('.slide-l-btn');
//         this.rt_btn = document.querySelector('.slide-r-btn');
//         console.log(this.rt_btn);
//         // console.log(this.lt_btn);
//         // 当前下标
//         this.cur_index = 0;
//         // 添加事件
//         this.addEvent();
//         // 调用轮播 
//         this.slide();
//         // 设置计时器
//         this.timer = null;
//         // 自动轮播
//         this.autoPlay();
//     }
//     // 事件
//     addEvent(){
//         // 鼠标移入小圆点事件
//         for(let i = 0,len = this.ol_li.length;i < len;i ++){
//             this.ol_li[i].onmouseenter = function(){
//                 this.cur_index = i;
//                 for(let j = 0,len = this.ol_li.length;j < len;j ++){
//                     // 设置所有小圆点的背景为black
//                     this.ol_li[j].style.background = 'black';
//                 }
//                 // 设置当前下标小圆点的背景为red
//                 this.ol_li[this.cur_index].style.background = 'red';
//                 sport(this.o_div,{left : - this.cur_index * this.ul_li[0].offsetWidth});
//             }.bind(this);
//         }
//     }
//     // 轮播
//     slide(){
//         // 设置o_div的宽度等于所有ul_li的宽度总和
//         this.o_div.style.width = this.ul_li[0].offsetWidth * this.num + 'px';
//         // 设置当前下标小圆点背景颜色为红色
//         this.ol_li[this.cur_index].style.background = 'red';
        
//         // 点击左按钮
//         this.lt_btn.onclick = function(){
//             // 当前下标 --
//             this.cur_index --;
//             // 判断是否到达边界
//             if(this.cur_index === -1){
//                 // 当当前下标 == -1，使第最后一张大图定位到所有图片最前面位置
//                 this.ul_li[this.num - 1].style.position = 'relative';
//                 this.ul_li[this.num - 1].style.left = - this.num * this.ul_li[0].offsetWidth + 'px';
//                 // 轮播到最后一张大图
//                 sport(this.o_div,{left : - this.cur_index * this.ul_li[0].offsetWidth});
//                 // this.o_div.style.left = - (this.num - 1) * this.ul_li[0].offsetWidth + 'px';
//                 this.cur_index = this.num - 1;
//             }else if( this.cur_index === this.num - 2){
//                 // 如果当前下标 == this.num - 1，让最一张大图回到原来位置
//                 this.ul_li[this.num - 1].style.position = 'static';
//                 this.ul_li[this.num - 1].style.left = 0;
//                 // 整个盒子移到最后一张大图为中心的位置
//                 this.o_div.style.left = - (this.num - 1) * this.ul_li[0].offsetWidth + 'px';
//                 // 轮播到第二张图
//                 sport(this.o_div,{left : - this.cur_index * this.ul_li[0].offsetWidth});
//             }else{
//                 sport(this.o_div,{left : - this.cur_index * this.ul_li[0].offsetWidth});
//             }

//             // 改变小圆点的背景
//             for(var i = 0,len = this.ol_li.length;i < len;i ++){
//                 // 设置所有小圆点的背景为black
//                 this.ol_li[i].style.background = 'black';
//                 // 设置当前下标小圆点的背景为red
//                 this.ol_li[this.cur_index].style.background = 'red';
//             }
//         }.bind(this);

//         // 点击右按钮
//         this.rt_btn.onclick = function(){
//             // 当前下标 ++
//             this.cur_index ++;
//             // 判断当前下标是否等于大图长度
//             if(this.cur_index === this.num){
//                 // 当当前下标等于大图长度时，使第一张大图定位到所有图片最后位置
//                 this.ul_li[0].style.position = 'relative';
//                 this.ul_li[0].style.left = this.num * this.ul_li[0].offsetWidth + 'px';
//                 // 轮播到第一张大图
//                 sport(this.o_div,{left : - this.cur_index * this.ul_li[0].offsetWidth});
//                 // 当前下标 = 0 
//                 this.cur_index = 0;
                
//             }else if(this.cur_index === 1){
//                 // 如果当前下标 == 1，让第一张大图回到原来位置
//                 this.ul_li[0].style.position = 'static';
//                 this.ul_li[0].style.left = 0;
//                 // 整个盒子回到初始位置
//                 this.o_div.style.left = 0;
//                 // 轮播到第二张图
//                 sport(this.o_div,{left : - this.cur_index * this.ul_li[0].offsetWidth})
//             }else{
//                 sport(this.o_div,{left : - this.cur_index * this.ul_li[0].offsetWidth})
//             }

//             // 改变小圆点的背景
//             for(var i = 0,len = this.ol_li.length;i < len;i ++){
//                 // 设置所有小圆点的背景为black
//                 this.ol_li[i].style.background = 'black';
//                 // 设置当前下标小圆点的背景为red
//                 this.ol_li[this.cur_index].style.background = 'red';
//             }
//         }.bind(this);
//     }
//     autoPlay(){
//         this.timer = setInterval(() => {
//             this.cur_index ++;
            
//             if(this.cur_index === this.num){
//                 // 当当前下标等于大图长度时，使第一张大图定位到所有图片最后位置
//                 this.ul_li[0].style.position = 'relative';
//                 this.ul_li[0].style.left = this.num * this.ul_li[0].offsetWidth + 'px';
//                 // 轮播到第一张大图
//                 sport(this.o_div,{left : - this.cur_index * this.ul_li[0].offsetWidth});
//                 // 当前下标 = 0 
//                 this.cur_index = 0;
//             }else if(this.cur_index === 1){
//                 // 如果当前下标 == 1，让第一张大图回到原来位置
//                 this.ul_li[0].style.position = 'static';
//                 this.ul_li[0].style.left = 0;
//                 // 整个盒子回到初始位置
//                 this.o_div.style.left = 0;
//                 // 轮播到第二张图
//                 sport(this.o_div,{left : - this.cur_index * this.ul_li[0].offsetWidth})
//             }else{
//                 sport(this.o_div,{left : - this.cur_index * this.ul_li[0].offsetWidth})
//             }

//             // 改变小圆点的背景
//             for(var i = 0,len = this.ol_li.length;i < len;i ++){
//                 // 设置所有小圆点的背景为black
//                 this.ol_li[i].style.background = 'black';
//                 // 设置当前下标小圆点的背景为red
//                 this.ol_li[this.cur_index].style.background = 'red';
//             }
//         }, 3000);
//         this.o_div.onmouseenter = function(){
//             clearInterval(this.timer);
//         }.bind(this);
//         this.o_div.onmouseleave = function(){
//             this.autoPlay();
//         }.bind(this);
//     }
// }

// new Slider();
LoopSlider.init({
    el: ".rotation-c", //选择器
    navigator: {
        //前进后退按钮
        prevEl: ".prev",
        nextEl: ".next"
    },
    easing: "ease-out", //动画效果cubic-bezier(0.985, -0.060, 0.000, 1.320)
    duration: 700, //过渡时间，默认为3000ms,
    autoplay: 3000, //boolean 和 number 设置为true 默认延时为3s,如果设置为1000，延时为1s
})