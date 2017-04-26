/**
* 深度拷贝对象
* @param   object   des      生成的目标对象
* @param   object   src      源对象1
* @param   object   override 源对象2
* @return  object            新对象
*/
var extend = (des, src, override) =>  {
    if (src instanceof Array) {
        for (var i = 0, len = src.length; i < len; i++)
            this.extend(des, src[i], override);
    }
    for (var i in src) {
        if (override || !(i in des)) {
            des[i] = src[i];
        }
    }
    return des;
}

/**
* 快速排序,从小到大排列数组
* @param  Array  arr   要排序的数组
* @return Array        完成排序的数组
*/
var quickSort = (arr) => {
 　　if (arr.length <= 1) { return arr; }//检查数组的元素个数，如果小于等于1，就返回。
      //接着，选择"基准"（pivot），并将其与原数组分离，再定义两个空数组，用来存放一左一右的两个子集。
 　　var pivotIndex = Math.floor(arr.length / 2);
 　　var pivot = arr.splice(pivotIndex, 1)[0];
 　　var left = [];
 　　var right = [];
     //然后，开始遍历数组，小于"基准"的元素放入左边的子集，大于基准的元素放入右边的子集。
   　for (var i = 0; i < arr.length; i++){
 　　　if (arr[i] < pivot) {
 　　　　left.push(arr[i]);
 　　　} else {
　　　　　right.push(arr[i]);
     　}
     }
   //最后，使用递归不断重复这个过程，就可以得到排序后的数组。
      return quickSort(left).concat([pivot], quickSort(right));
  };


/**
* 获取控制点坐标
* @param  {Array} arr 4个点坐标数组
* @param  {Float} smooth_value [0, 1] 平滑度
*   p1 上一个点
*   p2 左端点
*   P3 右端点
*   p4 下一个点
* @return {Array}     2个点坐标数组
*/
var getControlPoints = (arr, smooth_value) => {
        let x0 = arr[0].x, y0 = arr[0].y;
        let x1 = arr[1].x, y1 = arr[1].y;
        let x2 = arr[2].x, y2 = arr[2].y;
        let x3 = arr[3].x, y3 = arr[3].y;
        // Assume we need to calculate the control
        // points between (x1,y1) and (x2,y2).
        // Then x0,y0 - the previous vertex,
        //      x3,y3 - the next one.
        // 1.假设控制点在(x1,y1)和(x2,y2)之间，第一个点和最后一个点分别是曲线路径上的上一个点和下一个点
        // 2.求中点
        let xc1 = (x0 + x1) / 2.0;
        let yc1 = (y0 + y1) / 2.0;
        let xc2 = (x1 + x2) / 2.0;
        let yc2 = (y1 + y2) / 2.0;
        let xc3 = (x2 + x3) / 2.0;
        let yc3 = (y2 + y3) / 2.0;
        // 3.求各中点连线长度
        let len1 = Math.sqrt((x1-x0) * (x1-x0) + (y1-y0) * (y1-y0));
        let len2 = Math.sqrt((x2-x1) * (x2-x1) + (y2-y1) * (y2-y1));
        let len3 = Math.sqrt((x3-x2) * (x3-x2) + (y3-y2) * (y3-y2));
        // 4.求中点连线长度比例（用来确定平移前p2, p3的位置）
        let k1 = len1 / (len1 + len2);
        let k2 = len2 / (len2 + len3);
        // 5.平移p2
        let xm1 = xc1 + (xc2 - xc1) * k1;
        let ym1 = yc1 + (yc2 - yc1) * k1;
        // 6.平移p3
        let xm2 = xc2 + (xc3 - xc2) * k2;
        let ym2 = yc2 + (yc3 - yc2) * k2;
        // Resulting control points. Here smooth_value is mentioned
        // above coefficient K whose value should be in range [0...1].
        // 7.微调控制点与顶点之间的距离，越大曲线越平直
        let ctrl1_x = xm1 + (xc2 - xm1) * smooth_value + x1 - xm1;
        let ctrl1_y = ym1 + (yc2 - ym1) * smooth_value + y1 - ym1;
        let ctrl2_x = xm2 + (xc2 - xm2) * smooth_value + x2 - xm2;
        let ctrl2_y = ym2 + (yc2 - ym2) * smooth_value + y2 - ym2;

        return [{x: ctrl1_x, y: ctrl1_y}, {x: ctrl2_x, y: ctrl2_y}];
    }

/**
* 根据所有温度值计算各段控制点、起始点，返回完整svg三次贝塞尔曲线路径
* @param  {Array} coordinate  所有要绘制曲线的温度坐标数据
* @param  {Number} x1         控制点1横轴方向相对于末尾点的偏移
* @param  {Number} x2         控制点2横轴方向相对于末尾点的偏移
* @return {String}            完整的曲线路径
*/
var getSVGPathByCoordinate = (coordinate, x1=21.5, x2=41.5) => {
        let str = '';
        for (let i = 0; i < coordinate.length-1; i++) {
            let arr = coordinate.slice(i, i+2); 
            str += `C${arr[1].x-x2},${arr[0].y} ${arr[1].x-x1},${arr[1].y} ${arr[1].x},${arr[1].y} `;
        }
        return `M${coordinate[0].x},${coordinate[0].y} ${str}`;
    }


export {extend,quickSort,getSVGPathByCoordinate};
