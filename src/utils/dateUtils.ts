import * as moment from 'moment-timezone';

export default {
    getTodayDateStringOfChina: function () {
        return moment().tz('Asia/Shanghai').format('YYYY-MM-DD');
    },
};

