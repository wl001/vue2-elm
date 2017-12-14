/**
 * 解析url参数 window.location.search
 * @example ?id=12345&a=b
 * @return Object {id:12345,a:b}
 */
export function urlParse() {
    let url = window.location.search;
    let obj = {};
    let reg = /[?&][^?&]+=[^?&]+/g;
    let arr = url.match(reg);
    // ['?id=12345', '&a=b']
    if (arr) {
        arr.forEach((item) => {
            let tempArr = item.substring(1).split('=');
            let key = decodeURIComponent(tempArr[0]);
            let val = decodeURIComponent(tempArr[1]);
            obj[key] = val;
        });
    }
    return obj;
}
/**
 * 初始化时间戳
 * 1232213122转变成2016-07-14 12:51
 */

export function formatDate(date, fmt) {
    if (/(y+)/.test(fmt)) {
        fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
    }
    let o = {
        'M+': date.getMonth() + 1,
        'd+': date.getDate(),
        'h+': date.getHours(),
        'm+': date.getMinutes(),
        's+': date.getSeconds()
    };
    for (let k in o) {
        if (new RegExp(`(${k})`).test(fmt)) {
            let str = o[k] + '';
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : padLeftZero(str));
        }
    }
    return fmt;
};
//时间不满两位加0补齐
function padLeftZero(str) {
    return ('00' + str).substr(str.length);
}
/**
 * http://www.jianshu.com/p/da6f85856788
 * saveToLocal 存数据  loadFromLocal 读数据
 * 新增&&修改本地缓存
 *  @param {string} id 唯一id
 *  @param {string} key 标示
 *  @param {string} value 新增&修改的值
 *
 *  存储前先用JSON.stringify()方法将json对象转换成字符串形式
 *  后续要操作该JSON对象，JSON.parse()将之前存储的JSON字符串先转成JSON对象再进行操作
 */
export function saveToLocal(id, key, value) {
    //声明空间 所有的参数都存储在__seller__中
    let seller = window.localStorage.__seller__;
    // 如果此时保存的这个全局localStorage变量为undefined时
    if (!seller) {
        //把seller设为一个空对象
        seller = {};
    // 每一个id都是一个 object 对象里面的唯一个标准，可也以认为是否个活动也设为一个空对象
        seller[id] = {};
    } else {
        // 此时不为underfined
        // 如果防止seller在localstorage全局中被占用则,把存在的seller转为真正的对象
        seller = JSON.parse(seller);
        // 再进行判断，如果此时的活动id是一个undefined的时候
        if (!seller[id]) {
           // 把活动里面id设为一个对象
            seller[id] = {};
        }
    }
    // 然后把整个localstroage进行对象传参编译 将key赋值给这个id
    seller[id][key] = value;
    //存储前先用JSON.stringify()方法将json对象转换成字符串形式
    // 再把全局localstorage里的__seller__转成字符串放入
    window.localStorage.__seller__ = JSON.stringify(seller);
};

/** 查询本地缓存
*  @param {string} id 唯一id
*  @param {string} key 标示
*  @param {string} def 如果查询不到显示的值
*/
export function loadFromLocal(id, key, def) {
    let seller = window.localStorage.__seller__;
    //如果此时保存的这个全局变量为undefined时
    if (!seller) {
        //返回false
        return def;
    }
    //如果这时候有seller的时候,因为此时localstorage存的是字符串，我们要把它转为真正的json对象再进行操作
    // 再查询里面的id编号，这个编号也可以把他看作是否个公司
    seller = JSON.parse(seller)[id];
    //如果里面是一个空对象
    if (!seller) {
        //还是返回一个false
        return def;
    }
    //如果ret里面有这个唯一标示为undfined的时候，可能首屏加载页的活动页已经换了的话我们 返回一个false
    let ret = seller[key];
    return ret || def;
};