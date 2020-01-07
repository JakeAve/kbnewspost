module.exports = {
    unitedStates: {
        cc: '1717',
        countryCode: 'us76',
        name2: 'United States',
        name: 'United States',
        date: function(d) {
            const yyyy = d.getFullYear();
            const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
            const month = months[d.getMonth()];
            const hour = d.getHours() == 0 ? 12 : d.getHours() > 12 ? d.getHours() -12 : d.getHours();
            const mid = d.getHours() < 12 ? 'AM' : 'PM';
            const mm = d.getMinutes() < 10 ? `0${d.getMinutes()}` : `${d.getMinutes()}`;
            return `${month} ${d.getDate()}, ${yyyy} | ${hour}:${mm} ${mid}`
        }
    },

    canada: {
        cc: '2450',
        countryCode: 'ca84',
        name: 'Canada',
        name2: 'Canada',
        date: function(d) {
            const yyyy = d.getFullYear();
            const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
            const month = months[d.getMonth()];
            const hour = d.getHours() == 0 ? 12 : d.getHours() > 12 ? d.getHours() -12 : d.getHours();
            const mid = d.getHours() < 12 ? 'AM' : 'PM';
            const mm = d.getMinutes() < 10 ? `0${d.getMinutes()}` : `${d.getMinutes()}`;
            return `${d.getDate()} ${month}, ${yyyy} | ${hour}:${mm} ${mid}`
        }
    },

    mexico: {
        cc: '2451',
        countryCode: 'mx30',
        name: 'Mexico',
        name2: 'México',
        date: function(d) {
            const yyyy = d.getFullYear();
            const months = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'];
            const month = months[d.getMonth()];
            const hour = d.getHours() == 0 ? 12 : d.getHours() > 12 ? d.getHours() -12 : d.getHours();
            const mid = d.getHours() < 12 ? 'AM' : 'PM';
            const mm = d.getMinutes() < 10 ? `0${d.getMinutes()}` : `${d.getMinutes()}`;
            return `${d.getDate()} ${month}, ${yyyy} | ${hour}:${mm} ${mid}`
        }
    },

    ecuador: {
        cc: '6205',
        countryCode: 'ec87',
        name: 'Ecuador',
        name2: 'Ecuador',
        date: function(d) {
            const yyyy = d.getFullYear();
            const months = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'];
            const month = months[d.getMonth()];
            const hour = d.getHours();
            const mm = d.getMinutes() < 10 ? `0${d.getMinutes()}` : `${d.getMinutes()}`;
            return `${d.getDate()} ${month}, ${yyyy} | ${hour}:${mm}`
        }
    },

    hongKong: {
        cc: '4298',
        countryCode: 'hk43',
        name: 'Hong Kong',
        name2: '香港',
        date: function(d) {
            const yyyy = d.getFullYear();
            const months = ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'];
            const month = months[d.getMonth()];
            const hour = d.getHours();
            const mm = d.getMinutes() < 10 ? `0${d.getMinutes()}` : `${d.getMinutes()}`;
            return `${d.getDate()}日 ${month}, ${yyyy} | ${hour}:${mm}`
        }
    },

    malaysia: {
        cc: '4216',
        countryCode: 'my37',
        name: 'Malaysia',
        name2: 'Malaysia',
        date: function(d) {
            const yyyy = d.getFullYear();
            const months = ['Januari', 'Februari', 'Mac', 'April', 'Mei', 'Jun', 'Julai', 'Ogos', 'September', 'Oktober', 'November', 'Disember'];
            const month = months[d.getMonth()];
            const hour = d.getHours();
            const mm = d.getMinutes() < 10 ? `0${d.getMinutes()}` : `${d.getMinutes()}`;
            return `${d.getDate()} ${month}, ${yyyy} | ${hour}:${mm}`
        }
    },

    singpore: {
        cc: '3770',
        countryCode: 'sg08',
        name: 'Singapore',
        name2: 'Singapore',
        date: function(d) {
            const yyyy = d.getFullYear();
            const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
            const month = months[d.getMonth()];
            const hour = d.getHours();
            const mm = d.getMinutes() < 10 ? `0${d.getMinutes()}` : `${d.getMinutes()}`;
            return `${d.getDate()} ${month}, ${yyyy} | ${hour}:${mm}`
        }
    },

    taiwan: {
        cc: '4286',
        countryCode: 'tw51',
        name: 'Taiwan',
        name2: '台湾',
        date: function(d) {
            const yyyy = d.getFullYear();
            const months = ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'];
            const month = months[d.getMonth()];
            const hour = d.getHours();
            const mm = d.getMinutes() < 10 ? `0${d.getMinutes()}` : `${d.getMinutes()}`;
            return `${d.getDate()}日 ${month}, ${yyyy} | ${hour}:${mm}`
        }
    },

    indonesia: {
        cc: '4267',
        countryCode: 'id07',
        name: 'Indonesia',
        name2: 'Indonesia',
        date: function(d) {
            const yyyy = d.getFullYear();
            const months = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'];
            const month = months[d.getMonth()];
            const hour = d.getHours();
            const mm = d.getMinutes() < 10 ? `0${d.getMinutes()}` : `${d.getMinutes()}`;
            return `${d.getDate()} ${month}, ${yyyy} | ${hour}:${mm}`
        }
    },

    japan: {
        cc: '5711',
        countryCode: 'jp26',
        name: 'Japan',
        name2: '日本',
        date: function(d) {
            const yyyy = d.getFullYear();
            const months = ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'];
            const month = months[d.getMonth()];
            const hour = d.getHours();
            const mm = d.getMinutes() < 10 ? `0${d.getMinutes()}` : `${d.getMinutes()}`;
            return `${d.getDate()}日 ${month}, ${yyyy} | ${hour}:${mm}`
        }
    },

    australia: {
        cc: '4270',
        countryCode: 'au71',
        name: 'Australia',
        name2: 'Australia',
        date: function(d) {
            const yyyy = d.getFullYear();
            const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
            const month = months[d.getMonth()];
            const hour = d.getHours() == 0 ? 12 : d.getHours() > 12 ? d.getHours() -12 : d.getHours();
            const mid = d.getHours() < 12 ? 'AM' : 'PM';
            const mm = d.getMinutes() < 10 ? `0${d.getMinutes()}` : `${d.getMinutes()}`;
            return `${d.getDate()} ${month}, ${yyyy} | ${hour}:${mm} ${mid}`
        }
    },

    europe: {
        cc: '4439',
        countryCode: 'eu05',
        name: 'Europe',
        name2: 'Europe',
        date: function(d) {
            const yyyy = d.getFullYear();
            const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
            const month = months[d.getMonth()];
            const hour = d.getHours();
            const mm = d.getMinutes() < 10 ? `0${d.getMinutes()}` : `${d.getMinutes()}`;
            return `${d.getDate()} ${month}, ${yyyy} | ${hour}:${mm}`
        }
    },

    china: {
        cc: '6189',
        countryCode: 'cn65',
        name: 'China',
        name2: '中国',
        date: function(d) {
            const yyyy = d.getFullYear();
            const months = ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'];
            const month = months[d.getMonth()];
            const hour = d.getHours();
            const mm = d.getMinutes() < 10 ? `0${d.getMinutes()}` : `${d.getMinutes()}`;
            return `${d.getDate()}日 ${month}, ${yyyy} | ${hour}:${mm}`
        }
    },

    philippines: {
        cc: '6432',
        countryCode: 'pi12',
        name: 'Philippines',
        name2: 'Philippines',
        date: function(d) {
            const yyyy = d.getFullYear();
            const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
            const month = months[d.getMonth()];
            const hour = d.getHours() == 0 ? 12 : d.getHours() > 12 ? d.getHours() -12 : d.getHours();
            const mid = d.getHours() < 12 ? 'AM' : 'PM';
            const mm = d.getMinutes() < 10 ? `0${d.getMinutes()}` : `${d.getMinutes()}`;
            return `${month} ${d.getDate()}, ${yyyy} | ${hour}:${mm} ${mid}`
        }
    },

    testPage: {
        cc: '5654',
        countryCode: 'test',
        name: 'Test Page',
        name2: 'Test Page',
        date: function(d) {
            const yyyy = d.getFullYear();
            const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
            const month = months[d.getMonth()];
            const hour = d.getHours() == 0 ? 12 : d.getHours() > 12 ? d.getHours() -12 : d.getHours();
            const mid = d.getHours() < 12 ? 'AM' : 'PM';
            const mm = d.getMinutes() < 10 ? `0${d.getMinutes()}` : `${d.getMinutes()}`;
            return `${month} ${d.getDate()}, ${yyyy} | ${hour}:${mm} ${mid}`
        }
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
    },

    formatDateFor: function (d, cc) {
        const arr = Object.keys(this);
        let date;
        for (let i = 0; i < arr.length; i ++) {
            this[arr[i]].cc == cc ? date = this[arr[i]].date(d) : cc;
        }
        return date
    }
}
