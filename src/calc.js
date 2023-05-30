const n1Input = document.getElementById('num1');
const n2Input = document.getElementById('num2');
const signInput = document.getElementById('sign');
const equalInput = document.getElementById('equal');
const resultInput = document.getElementById('result');

const digitButtons = [...document.getElementsByClassName('digit')];
const signButtons = [...document.getElementsByClassName('sign')];
const equalBtn = document.getElementsByClassName('equal')[0];
const clearBtn = document.getElementsByClassName('clear')[0];
const delBtn = document.getElementsByClassName('del')[0];
const dotBtn = document.getElementsByClassName('dot')[0];
const negateBtn = document.getElementsByClassName('negate')[0];

const n1 = (x) => {
    if (x == undefined) return n1Input.value;
    n1Input.value = x;
};
const n2 = (x) => {
    if (x == undefined) return n2Input.value;
    n2Input.value = x;
};
const sign = (x) => {
    if (x == undefined) return signInput.value;
    signInput.value = x;
};
const equal = (x) => {
    if (x == undefined) return equalInput.value;
    equalInput.value = x;
};
const result = (x) => {
    if (x == undefined) return resultInput.value;
    resultInput.value = x;
};

function clear() {
    n1('');
    n2('');
    sign('');
    equal('');
    result('');
}

function sanitize() {
    while ((n1().includes('.') && n1().endsWith('0')) || n1().endsWith('.')) {
        n1(n1().slice(0, n1().length - 1))
    }
    while ((n2().includes('.') && n2().endsWith('0')) || n2().endsWith('.')) {
        n2(n2().slice(0, n2().length - 1))
    }
    if (n1() == '-') { n1('0') }
    if (n2() == '-') { n2('0') }
}

function getResult() {
    if (sign() == '/' && n2() == '0') {
        return 'Cannot divide by zero';
    }
    return eval(n1() + sign() + ' ' + n2());
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
        n2(n2().slice(0, n2().length - 1));
    } else if (sign()) {
        sign('');
    } else {
        n1(n1().slice(0, n1().length - 1));
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