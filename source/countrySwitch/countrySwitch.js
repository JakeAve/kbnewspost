/*
function getCountryCode() {
    switch (document.querySelector('#countryCode').value) {
        case 'us76':
            cc = '1717';
            break;
        case 'ca51':
            cc = '2450';
            break;
        case 'mx18':
            cc = '2451';
            break;
        case 'ec87':
            cc = '6205';
            break;
        case 'hk46':
            cc = '4298';
            break;
        case 'my94':
            cc = '4216';
            break;
        case 'sg39':
            cc = '3770';
            break;
        case 'tw16':
            cc = '4286';
            break;
        case 'id73':
            cc = '4267';
            break;
        case 'jp94':
            cc = '5711';
            break;
        case au73:
            cc = '4270';
            break;
        case 'eu39':
            cc = '4439';
            break;
        case 'cn03':
            cc = '6189';
            break;
        case 'ph97':
            cc = '6432';
        default:
            cc = 'invalid';
    }

    if (cc == 'invalid') {
        invalidCountryCode();
    } else {
        return cc;
    }
};

switch (cc) {
    case '1717':
        //us
        months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
        month = months[d.getMonth()];
        hour = d.getHours() == 0 ? 12 : d.getHours() > 12 ? d.getHours() -12 : d.getHours();
        mid = d.getHours() < 12 ? 'AM' : 'PM';
        timeStamp = `${month} ${d.getDate()}, ${yyyy} | ${hour}:${mm} ${mid}`;
        break;
    case '2450':
    //canada
        months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
        month = months[d.getMonth()];
        hour = d.getHours() == 0 ? 12 : d.getHours() > 12 ? d.getHours() -12 : d.getHours();
        mid = d.getHours() < 12 ? 'AM' : 'PM';
        timeStamp = `${d.getDate()} ${month} , ${yyyy} | ${hour}:${mm} ${mid}`;
        break;
    case '2451':
        //mexico
        months = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'];
        month = months[d.getMonth()];
        hour = d.getHours() == 0 ? 12 : d.getHours() > 12 ? d.getHours() -12 : d.getHours();
        mid = d.getHours() < 12 ? 'AM' : 'PM';
        timeStamp = `${d.getDate()} ${month} , ${yyyy} | ${hour}:${mm} ${mid}`;
        break;
    case '6205':
        //ecuador
        months = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'];
        month = months[d.getMonth()];
        hour = d.getHours();
        timeStamp = `${d.getDate()} ${month} , ${yyyy} | ${hour}:${mm}`;
        break;
    case '4298':
        //hong kong';
        months = ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'];
        month = months[d.getMonth()];
        hour = d.getHours();
        timeStamp = `${d.getDate()}日 ${month} , ${yyyy} | ${hour}:${mm}`;
        break;
        case '4216':
        //'malaysia';
        months = ['Januari', 'Februari', 'Mac', 'April', 'Mei', 'Jun', 'Julai', 'Ogos', 'September', 'Oktober', 'November', 'Disember'];
        month = months[d.getMonth()];
        hour = d.getHours();
        timeStamp = `${d.getDate()} ${month} , ${yyyy} | ${hour}:${mm}`;
        break;
    case '3770':
        //singapore';
        months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
        month = months[d.getMonth()];
        hour = d.getHours();
        timeStamp = `${d.getDate()} ${month} , ${yyyy} | ${hour}:${mm}`;
        break;
    case '4286':
        //taiwan';
        months = ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'];
        month = months[d.getMonth()];
        hour = d.getHours();
        timeStamp = `${d.getDate()}日 ${month} , ${yyyy} | ${hour}:${mm}`;
        break;
    case '4267':
        //indonesia';
        months = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'];
        month = months[d.getMonth()];
        hour = d.getHours();
        timeStamp = `${d.getDate()} ${month} , ${yyyy} | ${hour}:${mm}`;
        break;
    case '5711':
        //japan';
        months = ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'];
        month = months[d.getMonth()];
        hour = d.getHours();
        timeStamp = `${d.getDate()}日 ${month} , ${yyyy} | ${hour}:${mm}`;
        break;
    case '4270':
        //australia';
        months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
        month = months[d.getMonth()];
        hour = d.getHours() == 0 ? 12 : d.getHours() > 12 ? d.getHours() -12 : d.getHours();
        mid = d.getHours() < 12 ? 'AM' : 'PM';
        timeStamp = `${d.getDate()} ${month} , ${yyyy} | ${hour}:${mm} ${mid}`;
        break;
    case '4439':
        //Europe';
        months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
        month = months[d.getMonth()];
        hour = d.getHours();
        timeStamp = `${d.getDate()} ${month} , ${yyyy} | ${hour}:${mm} ${mid}`;
        break;
    case '6189':
        //china';
        months = ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'];
        month = months[d.getMonth()];
        hour = d.getHours();
        timeStamp = `${d.getDate()}日 ${month} , ${yyyy} | ${hour}:${mm}`;
        break;
    default:
        cc = 'invalid';
}

function formatTimeAndDate(cc) {
    const d = new Date();
    
    const yyyy = `${d.getFullYear()}`;
    const MM = d.getMonth() < 10 ? `0${d.getMonth() + 1}` : `${d.getMonth() + 1}`;
    const dd = d.getDate() < 10 ? `0${d.getDate()}` : `${d.getDate()}`;
    const hh = d.getHours() < 10 ? `0${d.getHours()}` : `${d.getHours()}`;
    const mm = d.getMinutes() < 10 ? `0${d.getMinutes()}` : `${d.getMinutes()}`;
    const ss = d.getSeconds() < 10 ? `0${d.getSeconds()}` : `${d.getSeconds()}`;
    const aTagId = `${MM}-${dd}-${yyyy}at${hh}-${mm}-${ss}`;
    
    let months;
    let month;
    let hour;
    let mid;
    let timeStamp;
    switch (cc) {
        case '1717':
            //us
            months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
            month = months[d.getMonth()];
            hour = d.getHours() == 0 ? 12 : d.getHours() > 12 ? d.getHours() -12 : d.getHours();
            mid = d.getHours() < 12 ? 'AM' : 'PM';
            timeStamp = `${month} ${d.getDate()}, ${yyyy} | ${hour}:${mm} ${mid}`;
            break;
        case '2450':
        //canada
            months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
            month = months[d.getMonth()];
            hour = d.getHours() == 0 ? 12 : d.getHours() > 12 ? d.getHours() -12 : d.getHours();
            mid = d.getHours() < 12 ? 'AM' : 'PM';
            timeStamp = `${d.getDate()} ${month}, ${yyyy} | ${hour}:${mm} ${mid}`;
            break;
        case '2451':
            //mexico
            months = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'];
            month = months[d.getMonth()];
            hour = d.getHours() == 0 ? 12 : d.getHours() > 12 ? d.getHours() -12 : d.getHours();
            mid = d.getHours() < 12 ? 'AM' : 'PM';
            timeStamp = `${d.getDate()} ${month}, ${yyyy} | ${hour}:${mm} ${mid}`;
            break;
        case '6205':
            //ecuador
            months = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'];
            month = months[d.getMonth()];
            hour = d.getHours();
            timeStamp = `${d.getDate()} ${month}, ${yyyy} | ${hour}:${mm}`;
            break;
        case '4298':
            //hong kong';
            months = ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'];
            month = months[d.getMonth()];
            hour = d.getHours();
            timeStamp = `${d.getDate()}日 ${month}, ${yyyy} | ${hour}:${mm}`;
            break;
        case '4216':
            //'malaysia';
            months = ['Januari', 'Februari', 'Mac', 'April', 'Mei', 'Jun', 'Julai', 'Ogos', 'September', 'Oktober', 'November', 'Disember'];
            month = months[d.getMonth()];
            hour = d.getHours();
            timeStamp = `${d.getDate()} ${month}, ${yyyy} | ${hour}:${mm}`;
            break;
        case '3770':
            //singapore';
            months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
            month = months[d.getMonth()];
            hour = d.getHours();
            timeStamp = `${d.getDate()} ${month}, ${yyyy} | ${hour}:${mm}`;
            break;
        case '4286':
            //taiwan';
            months = ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'];
            month = months[d.getMonth()];
            hour = d.getHours();
            timeStamp = `${d.getDate()}日 ${month}, ${yyyy} | ${hour}:${mm}`;
            break;
        case '4267':
            //indonesia';
            months = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'];
            month = months[d.getMonth()];
            hour = d.getHours();
            timeStamp = `${d.getDate()} ${month}, ${yyyy} | ${hour}:${mm}`;
            break;
        case '5711':
            //japan';
            months = ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'];
            month = months[d.getMonth()];
            hour = d.getHours();
            timeStamp = `${d.getDate()}日 ${month}, ${yyyy} | ${hour}:${mm}`;
            break;
        case '4270':
            //australia';
            months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
            month = months[d.getMonth()];
            hour = d.getHours() == 0 ? 12 : d.getHours() > 12 ? d.getHours() -12 : d.getHours();
            mid = d.getHours() < 12 ? 'AM' : 'PM';
            timeStamp = `${d.getDate()} ${month}, ${yyyy} | ${hour}:${mm} ${mid}`;
            break;
        case '4439':
            //Europe';
            months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
            month = months[d.getMonth()];
            hour = d.getHours();
            timeStamp = `${d.getDate()} ${month}, ${yyyy} | ${hour}:${mm}`;
            break;
        case '6189':
            //china';
            months = ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'];
            month = months[d.getMonth()];
            hour = d.getHours();
            timeStamp = `${d.getDate()}日 ${month}, ${yyyy} | ${hour}:${mm}`;
            break;
        default:
            cc = 'invalid';
    };
    
    const arr = [timeStamp, aTagId];
    return arr;
};

console.log(formatTimeAndDate('1717'));
console.log(formatTimeAndDate('2450'));
console.log(formatTimeAndDate('2451'));
console.log(formatTimeAndDate('6205'));
console.log(formatTimeAndDate('4298'));
console.log(formatTimeAndDate('4216'));
console.log(formatTimeAndDate('3770'));
console.log(formatTimeAndDate('4286'));
console.log(formatTimeAndDate('4267'));
console.log(formatTimeAndDate('5711'));
console.log(formatTimeAndDate('4270'));
console.log(formatTimeAndDate('4439'));
console.log(formatTimeAndDate('6189'));
*/

const markets = {
    unitedStates: {
        cc: '1717',
        countryCode: 'us76',
        name2: 'United States',
        name: 'United States'
    },

    canada: {
        cc: '2450',
        countryCode: 'ca51',
        name: 'Canada',
        name2: 'Canada'
    },

    mexico: {
        cc: '2451',
        countryCode: 'mx18',
        name: 'Mexico',
        name2: 'México'
    },

    ecuador: {
        cc: '6205',
        countryCode: 'ec87',
        name: 'Ecuador',
        name2: 'Ecuador'
    },

    hongKong: {
        cc: '4298',
        countryCode: 'hk46',
        name: 'Hong Kong',
        name2: '香港'
    },

    maylasia: {
        cc: '4216',
        countryCode: 'my94',
        name: 'Malaysia',
        name2: 'Malaysia'
    },

    singpore: {
        cc: '3770',
        countryCode: 'sg39',
        name: 'Singapore',
        name2: 'Singapore'
    },

    taiwan: {
        cc: '4286',
        countryCode: 'tw16',
        name: 'Taiwan',
        name2: '台湾'
    },

    indonesia: {
        cc: '4267',
        countryCode: 'id73',
        name: 'Indonesia',
        name2: 'Indonesia'
    },

    japan: {
        cc: '5711',
        countryCode: '5711',
        name: 'Japan',
        name2: '日本'
    },

    australia: {
        cc: '4270',
        countryCode: 'au73',
        name: 'Australia',
        name2: 'Australia'
    },

    europe: {
        cc: '4439',
        countryCode: 'eu39',
        name: 'Europe',
        name2: 'Europe'
    },

    china: {
        cc: '6189',
        countryCode: 'cn03',
        name: 'China',
        name2: '中国'
    },

    philippines: {
        cc: '6432',
        countryCode: 'ph97',
        name: 'Philippines',
        name2: 'Philippines'
    },

    testPage: {
        cc: '5654',
        countryCode: 'test',
        name: 'Test Page',
        name2: 'Test Page'
    },

    getCountryName: function(cc) {
        const arr = Object.keys(this);
        let name;
        for (let i = 0; i < arr.length; i ++) {
            this[arr[i]].cc == cc ? name = this[arr[i]].name : cc;
        }
        return name
    }, 

    getCountryName2: function(cc) {
        const arr = Object.keys(this);
        let name2;
        for (let i = 0; i < arr.length; i ++) {
            this[arr[i]].cc == cc ? name2 = this[arr[i]].name2 : cc;
        }
        return name2
    }, 

    getAnswerIdByName: function(name) {
        const arr = Object.keys(this);
        let cc;
        for (let i = 0; i < arr.length; i ++) {
            this[arr[i]].name == name ? cc = this[arr[i]].cc : name;
        }
        return cc
    },

    getAnswerIdByName2: function(name2) {
        const arr = Object.keys(this);
        let cc;
        for (let i = 0; i < arr.length; i ++) {
            this[arr[i]].name2 == name2 ? cc = this[arr[i]].cc : name2;
        }
        return cc
    },

    authenticate: function(countryCode) {
        const arr = Object.keys(this);
        let cc;
        for (let i = 0; i < arr.length; i ++) {
            this[arr[i]].countryCode == countryCode ? cc = this[arr[i]].cc : countryCode;
        }

        if (cc) {return cc} else {return false} 
    }
}

console.log(markets.getCountryName('1717'));
console.log(markets.getAnswerIdByName('Mexico'));
console.log(markets.getCountryName2('6189'));
console.log(markets.authenticate('us76'));
console.log(markets.authenticate('us77'));
console.log(markets.getCountryName2(markets.getAnswerIdByName('Japan')));

/*function idNames(code) {
    let name;
    switch (code) {
        case '1717':
            name = 'United States';
            break;
        case '2450':
            name = 'Canada';
           break;
        case '2451':
            name = 'Mexico';
            break;
        case '6205':
           name = 'Ecuador';
           break;
        case '4298':
            name = 'Hong Kong';
            break;
        case '4216':
            name = 'Malaysia';
            break;
        case '3770':
           name = 'Singapore';
           break;
        case '4286':
            name = 'Taiwan';
            break;
        case '4267':
            name = 'Indonesia';
            break;
        case '5711':
            name = 'Japan';
            break;
        case '4270':
            name = 'Australia';
            break;
        case '4439':
            name = 'Europe';
            break;
        case '6189':
            name = 'China';
            break;
        case '6432':
            name = 'Philippines';
            break;
        case '5654':
            name = 'Test Page';
            break;
        default:
            name = 'invalid';
    }
    return name
}*/