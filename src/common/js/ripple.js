/**
 * 在当前元素实现水波纹点击效果
 * @param  {object} ele 当前点击对象
 * @param  {object} e   事件对象
 * 
 **/
export var ripple = (ele, e) => {

    var ripples = document.querySelector('.ripple');
    if (ripples) {
        var parentElement = ripples.parentNode;
        if (parentElement) parentElement.removeChild(ripples);
    };

    var crntElmPos = getOffsetRect(ele),
        posX = crntElmPos.left,
        posY = crntElmPos.top,
        buttonWidth = ele.offsetWidth,
        buttonHeight = ele.offsetHeight;

    var span = document.createElement("span");
        span.className = "ripple";

    if (!ele.parentNode.querySelector('.ripple')) ele.insertBefore(span, ele.childNodes[0]);

    var ripple = ele.parentNode.querySelector('.ripple');
    
    if (buttonWidth >= buttonHeight) buttonHeight = buttonWidth;
    else buttonWidth = buttonHeight;

    var x = e.pageX - posX - buttonWidth / 2;
    var y = e.pageY - posY - buttonHeight / 2;

    ripple.style.width = buttonWidth + 'px';
    ripple.style.height = buttonHeight + 'px';
    ripple.style.top = y + 'px';
    ripple.style.left = x + 'px';

    if (!ripple.className.match('rippleEffect')) ripple.className += ' rippleEffect';

}

/**
 * 获得相对于视口的偏移量，加上页面的滚动量
 * @param  {OBJ} ele 当前元素
 * @return {OBJ}     当前元素相对于视口偏移量
 */
var getOffsetRect = (ele) => {
    var box = ele.getBoundingClientRect();
    var body = document.body,
        docElem = document.documentElement;

    var scrollTop = window.pageYOffset || docElem.scrollTop || body.scrollTop,
        scrollLeft = window.pageXOffset || docElem.scrollLeft || body.scrollLeft;
    var clientTop = docElem.clientTop || body.clientTop,
        clientLeft = docElem.clientLeft || body.clientLeft;
    var top = box.top + scrollTop - clientTop,
        left = box.left + scrollLeft - clientLeft;

    return {
        top: Math.round(top),
        left: Math.round(left)
    }
}
