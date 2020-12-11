//完美运动框架
function getStyle(obj,attr){
    return window.getComputedStyle ? getComputedStyle(obj,1)[attr] : obj.currentStyle[attr];
}
function sport(obj,json,fn){
    //1. 清除上一次的计时器
    clearInterval(obj.timer);
    //2. 开启新的计时器
    obj.timer = setInterval(()=>{
        //1. 假设：所有属性都到达目标值时，标志成一个成功状态
        let flag = true;
        //2. 遍历对象
        for(let attr in json){
            //1. 获取当前值
            let cur = attr === 'opacity' ? parseInt(parseFloat(getStyle(obj,attr)) * 100) : parseInt(getStyle(obj,attr));
            //2. 计算速度
            let speed = (json[attr] - cur) / 8;
            speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed);
            //3. 检测：只要有一个属性未达目标，flag = false
            if(cur !== json[attr]){
                flag = false;
            }
            //4. 设置运动
            if(attr === 'opacity'){
                obj.style.opacity = (cur + speed) / 100;
                obj.style.filter = 'alpha(opacity=' + (cur + speed) + ')';
            }else{
                obj.style[attr] = cur + speed + 'px';
            }
        }
        //3. 停止运动
        if(flag){
            clearInterval(obj.timer);
            if(typeof fn === 'function'){  // fn instanceof Function
                 fn();
            }
        }
    },30)
}