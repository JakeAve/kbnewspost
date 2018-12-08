module.exports = {
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
