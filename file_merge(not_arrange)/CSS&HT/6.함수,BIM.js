// 함수 연습문제

function BMI(height, weight) {
    const meterHeight = height / 100;
    const result = weight / (meterHeight *
    meterHeight);

    return result;
}

console.log(BMI());
