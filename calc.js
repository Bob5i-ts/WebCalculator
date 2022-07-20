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

$('.digit').click(function () {
    const keyVal = $(this).text();
    if (!sign()) {
        n1(n1() + keyVal);
    } else if (!equal()) {
        n2(n2() + keyVal);
    }
});

$('.sign').click(function () {
    const keyVal = $(this).text();
    if (!n1()) {
        n1('0');
        sign(keyVal);
    }
    else if (n1() && !n2()) {
        sign(keyVal);
    }
    else if (n2() && !equal()) {
        n1(getResult());
        sign(keyVal);
        n2('');
    }
    else if (equal()) {
        let res = result();
        clear();
        n1(res);
        sign(keyVal);
    }
});

