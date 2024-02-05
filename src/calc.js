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

function sanitize() {
    while ((n1().includes('.') && n1().endsWith('0')) || n1().endsWith('.')) {
        n1(n1().slice(0, -1));
    }
    while ((n2().includes('.') && n2().endsWith('0')) || n2().endsWith('.')) {
        n2(n2().slice(0, -1));
    }
    if (n1() == '-') n1('0');
    if (n2() == '-') n2('0');
}

function getResult() {
    const x = new Decimal(n1());
    const y = new Decimal(n2());
    const opr = sign();
    if (opr == '/' && y == '0') {
        return 'Cannot divide by zero';
    }
    if (opr == '+') return x.plus(y);
    if (opr == '-') return x.minus(y);
    if (opr == '*') return x.times(y);
    if (opr == '/') return x.div(y);
    if (opr == '^') return x.pow(y);
    if (opr == 'mod') return x.mod(y);
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
    sanitize();
    if (!n1()) {
        n1('0');
        sign(keyVal);
    } else if (n1() && !n2()) {
        sign(keyVal);
    } else if (n2() && !equal()) {
        n1(getResult());
        sign(keyVal);
        n2('');
    } else if (equal() && !result().includes('zero')) {
        let rsl = result();
        clear();
        n1(rsl);
        sign(keyVal);
    }
});

$('.equal').click(function () {
    sanitize();
    if (n1() && n2()) {
        equal('=');
        result(getResult());
    }
});

$('.clear').click(clear);

$('.del').click(function () {
    if (result()) {
        equal('');
        result('');
    } else if (n2()) {
        n2(n2().slice(0, -1));
    } else if (sign()) {
        sign('');
    } else {
        n1(n1().slice(0, -1));
    }
});

$('.dot').click(function () {
    if (!equal()) {
        if (!n1()) {
            n1('0.');
        } else if (!n1().includes('.') && !sign()) {
            n1(n1() + '.');
        } else if (sign() && !n2()) {
            n2('0.');
        } else if (n2() && !n2().includes('.')) {
            n2(n2() + '.');
        }
    }
});

$('.pos-neg').click(function () {
    if (!equal()) {
        if (!sign()) {
            n1().startsWith('-')
                ? n1(n1().slice(1))
                : n1('-' + n1());
        } else {
            n2().startsWith('-')
                ? n2(n2().slice(1))
                : n2('-' + n2());
        }
    }
});