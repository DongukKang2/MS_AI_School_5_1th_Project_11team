console.log('script2 시작');
try {
    const module1 = require('./module_1');
    console.log('module1:', module1);
} catch(err) {
    console.error('에러 발생:', err);
}