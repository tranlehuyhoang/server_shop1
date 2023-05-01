const express = require('express');
const axios = require('axios');
const app = express();

const taikhoanmb = '0586218076';
const deviceIdCommon ="86ffn1cf-mbib-0000-0000-2023050115563671";
const sessionId ="1a8917b3-e67d-49a9-bbf4-74ccd8c693b1";
const sotaikhoanmb = '104567890';
process.env.TZ = 'Asia/Ho_Chi_Minh';
const todate = new Date().toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric' }).split('/').reverse().join('/');
const now = new Date();
const formattedDate = `${now.getFullYear()}${(now.getMonth() + 1).toString().padStart(2, '0')}${now.getDate().toString().padStart(2, '0')}${now.getHours().toString().padStart(2, '0')}${now.getMinutes().toString().padStart(2, '0')}${now.getSeconds().toString().padStart(2, '0')}00`;
const dateStr = todate;
const parts = dateStr.split('/');
const todatessss = `${parseInt(parts[2])}/${parseInt(parts[1]).toString().padStart(2, '0')}/${parts[0]}`;
console.log(todate)
const data = {
    accountNo: sotaikhoanmb,
    deviceIdCommon,
    fromDate: todatessss,
    historyNumber: '',
    historyType: 'DATE_RANGE',
    refNo: `${taikhoanmb}-${formattedDate}`,
    sessionId,
    toDate: todatessss,
    type: 'ACCOUNT'
};

app.get('/api/mbbank', (req, res) => {
    axios.post('https://online.mbbank.com.vn/retail_web/common/getTransactionHistory', data, {
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json, text/plain, */*',
            'Accept-Encoding': 'gzip, deflate, br',
            'Accept-Language': 'vi-US,vi;q=0.9',
            'Authorization': 'Basic QURNSU46QURNSU4=',
            'Connection': 'keep-alive',
            'Host': 'online.mbbank.com.vn',
            'Origin': 'https://online.mbbank.com.vn',
            'Referer': 'https://online.mbbank.com.vn/information-account/source-account',
            'sec-ch-ua': '"Google Chrome";v="105", "Not)A;Brand";v="8", "Chromium";v="105"',
            'sec-ch-ua-mobile': '?0',
            'sec-ch-ua-platform': 'Windows',
            'Sec-Fetch-Dest': 'empty',
            'Sec-Fetch-Mode': 'cors',
            'Sec-Fetch-Site': 'same-origin',
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/105.0.0.0 Safari/537.36',
        }
    })
        .then(response => res.send(response.data))
        .catch(error => console.log(error));
});
app.listen(5000, () => console.log('Server started on port 3000'));
