import Axios from 'axios';
import * as com from "@/common/js/common";

/**
 * IP定位API获取当前大致所在城市
 * @return object  返回promise对象
 */
var getCurrentPositionByIP = () => {
    const url = '/api/ip';
    return new Promise((resolve, reject) => {

        Axios.get(url).then(res => {
            res = res.data.data || res.data
            resolve(JSON.parse(res));
        });
    });
}

/*var getCurrentPositionByIPReqwest = () => {
    let url = '/ip';
    return reqwest({
        url: url,
        contentType: 'application/json',
        crossOrigin: true,
        withCredentials: true,
        type: 'jsonp',
        jsonpCallback: 'foo'
    });
}*/

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
            Axios.get('https://mainsite-restapi.ele.me/v1/cities?type=group').then(res => {
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
            Axios.get('https://mainsite-restapi.ele.me/v1/cities?type=hot').then(res => {
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
    let URL = "http://wthrcdn.etouch.cn/weather_mini?citykey=" + code;
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
        Axios.all([getAllCity(), getCurrentPositionByIP()])
            .then(Axios.spread(function(city, position) {
                let citys = city.data.data;
                // let cityNamesByIp = position.data.address || position.data.data.address;
                // let cityNameByIp = cityName || cityNamesByIp.split('|')[2];
                // let cityNameByIp = cityName || position.data.data.area;
                let cityNameByIp = cityName || position.data.city || position.city;
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
