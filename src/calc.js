const n1 = (...x) => $('#num1').val(...x);
const n2 = (...x) => $('#num2').val(...x);
const sign = (...x) => $('#sign').val(...x);
const result = (...x) => $('#result').val(...x);

function clear() {
    n1('');
    n2('');
    sign('');
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

function inputNum(num, key) {
    let x = num();
    if (/^-?0$/.test(x) && key == '0') return;
    if (/^-?0$/.test(x) && key != '0') x = x.replace('0', '');
    num(x + key);
}
$('.digit').click(function () {
    const keyVal = $(this).text();
    if (!sign()) {
        inputNum(n1, keyVal);
    } else if (!result()) {
        inputNum(n2, keyVal);
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
    } else if (n2() && !result()) {
        n1(getResult());
        sign(keyVal);
        n2('');
    } else if (result() && !result().includes('zero')) {
        let rsl = result().slice(2);
        clear();
        n1(rsl);
        sign(keyVal);
    }
});

$('.percent').click(function () {
    const x = new Decimal(n1() || 0);
    if (n1() && !n1().includes('zero') && !sign()) {
        n1(x.div(100));
    } else if (n2() && !result()) {
        const y = new Decimal(n2());
        n2(x.times(y.div(100)));
    }
});

$('.sqrt').click(function () {
    if (!result()) {
        if (n1() && !n1().includes('zero') && !sign()) {
            const x = new Decimal(n1());
            n1(x.sqrt());
        } else if (n2() && sign()) {
            const y = new Decimal(n2());
            n2(y.sqrt());
        }
    }
});

$('.equal').click(function () {
    sanitize();
    if (n1() && n2()) {
        result('= ' + getResult());
    }
});

$('.clear').click(clear);

$('.del').click(function () {
    if (result()) {
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
    if (!result()) {
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

function toggleMinus(num) {
    const x = num();
    x.startsWith('-')
        ? num(x.slice(1))
        : num('-' + x);
}
$('.negate').click(function () {
    if (!result()) {
        if (!sign()) {
            toggleMinus(n1);
        } else {
            toggleMinus(n2);
        }
    }
});