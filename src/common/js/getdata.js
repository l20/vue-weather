import Axios from 'axios';
import * as com from "@/common/js/common";

/**
 * 反向代理百度IP定位API获取当前大致所在城市
 * url示例：http://api.map.baidu.com/location/ip?ak=请输入您的AK&coor=bd09ll
 * coor参数可选，aK必须向百度申请。
 * @return object  返回promise对象
 */
var getCurrentPositionByIP = () => {
    let url = '/location/ip?ak=yourAk';
    return Axios.get(url); //使用百度定位API,使用时将注释去掉，自己申请百度AK
}

/**
 * IP定位请求模拟函数
 * 当没有百度IP定位AK时候，可使用此函数模拟
 *
 * @return promise 
 */
var getCurtCity = () => {

    // 这里是模拟的百度IP定位API返回的JSON数据，城市为北京
    let city = {"data":{ "address": "CN|\u5317\u4eac|\u5317\u4eac|None|UNICOM|0|0", "content": { "address_detail": { "province": "\u5317\u4eac\u5e02", "city": "\u5317\u4eac\u5e02", "district": "", "street": "", "street_number": "", "city_code": 131 }, "address": "\u5317\u4eac\u5e02", "point": { "y": "4825907.72", "x": "12958160.97" } }, "status": 0 }}

    return new Promise((resolve, reject) => {
        resolve(city);
    });
}

/**
 * 获取全国所有县级、市、区json对象
 * @return object  返回promise对象
 */
var getAllCity = () => {
    return Axios.get('/api/citycode');
}

/**
 * 获取全国所有县级、市、区名称、拼音
 * @return object  返回promise对象
 */
var getAllCityInfo = (key) => {
    if (com.queryData(key)) {
        return new Promise(resolve => {
            resolve(com.queryData(key));
        });
    } else {
        return new Promise(resolve => {
            Axios.get('/v1/cities?type=group').then(res => {
                com.addData(key, res.data)
                resolve(res.data);
            });
        });
    }
}

/**
 * 获取所有热门城市
 * @return object  返回promise对象
 */
var getHotCityInfo = (key) => {
    if (com.queryData(key)) {
        return new Promise(resolve => {
            resolve(com.queryData(key));
        });
    } else {
        return new Promise(resolve => {
            Axios.get('/v1/cities?type=hot').then(res => {
                com.addData(key, res.data)
                resolve(res.data);
            });
        });
    }
}

/**
 * 根据城市代码请求相应城市的天气信息
 * @param  String  城市代码
 * @return object  返回promise对象
 */
var getWeatherByCityCode = (code) => {
    // let URL = "/WeatherApi?citykey=101010100";
    let URL = "/weather_mini?citykey=" + code;
    return Axios.get(URL);
}


/**
 * 根据IP定位到的城市获取城市代码，再根据城市代码请求天气信息
 * @param  String cityName  城市名
 * @return Promise          
 */
var getWeatherInfo = (cityName) => {

    return new Promise((resolve, reject) => {
        // 等两个函都获取到数据
        // 这里若使用百度IP定位API可以将 getCurtCity（）函数换成 getCurrentPositionByIP（）
        Axios.all([getAllCity(), getCurtCity()])
            .then(Axios.spread(function(city, position) {

                let citys = city.data.data;
                let cityNamesByIp = position.data.address || position.data.data.address;
                let cityNameByIp = cityName || cityNamesByIp.split('|')[2];
                let weatherData = '';
                // 遍历城市json对象获取城市代码
                citys.zone.forEach(province => {

                    province.zone.forEach(city => {

                        city.zone.forEach(area => {

                            // let cityNameByJson = area.name.match(cityNameByIp);
                            if (cityNameByIp.includes(area.name)) {
                                // 根据城市代码获取天气信息
                                getWeatherByCityCode(area.code).then(data => {
                                    // 将数据传给下一个then
                                    resolve(data.data.data);
                                });
                            }

                        });
                    });
                })
            }));
    });
}

export { getWeatherInfo, getAllCityInfo, getHotCityInfo };
