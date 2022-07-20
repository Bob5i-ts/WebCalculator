const n1 = (...x) => $('#num1').val(...x);
const n2 = (...x) => $('#num2').val(...x);
const sign = (...x) => $('#sign').val(...x);
const equal = (...x) => $('#equal').val(...x);
const result = (...x) => $('#result').val(...x);

function clear() {
    n1('');
    n2('');
    sign('');
    equal('');
    result('');
}

function getResult() {
    if (sign() == '/' && n2() == '0') {
        return 'Can not divide by zero';
    }
    return eval(n1() + sign() + n2());
}

