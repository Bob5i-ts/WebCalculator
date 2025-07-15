const n1Input = document.getElementById('num1');
const n2Input = document.getElementById('num2');
const signInput = document.getElementById('sign');
const resultInput = document.getElementById('result');

const digitButtons = [...document.getElementsByClassName('digit')];
const signButtons = [...document.getElementsByClassName('sign')];
const equalBtn = document.getElementsByClassName('equal')[0];
const clearBtn = document.getElementsByClassName('clear')[0];
const delBtn = document.getElementsByClassName('del')[0];
const dotBtn = document.getElementsByClassName('dot')[0];
const negateBtn = document.getElementsByClassName('negate')[0];
const percentBtn = document.getElementsByClassName('percent')[0];
const sqrtBtn = document.getElementsByClassName('sqrt')[0];

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
const result = (x) => {
    if (x == undefined) return resultInput.value;
    resultInput.value = x;
};

function clear() {
    n1('');
    n2('');
    sign('');
    result('');
}

function sanitize(num) {
    let x = num();
    while (x.includes('.') && x.endsWith('0') || x.endsWith('.')) {
        x = x.slice(0, -1);
    }
    if (x == '-' || x == '-0') x = '0';
    num(x);
}

function getResult() {
    const x = new Decimal(n1());
    const y = new Decimal(n2());
    const opr = sign();
    if (opr == '÷' && y == '0') {
        return 'Cannot divide by zero';
    }
    let rsl;
    if      (opr == '+') rsl = x.plus(y);
    else if (opr == '-') rsl = x.minus(y);
    else if (opr == '×') rsl = x.times(y);
    else if (opr == '÷') rsl = x.div(y);
    else if (opr == '^') rsl = x.pow(y);
    else if (opr == 'mod') rsl = x.mod(y);
    return rsl.tosd(16).toString();
}

function inputNum(num, key) {
    let x = num();
    if (/^-?0$/.test(x) && key == '0') return;
    if (/^-?0$/.test(x) && key != '0') x = x.replace('0', '');
    num(x + key);
}
function digitHandler(ev, key) {
    const btnVal = ev.target.textContent || key;
    if (!sign()) {
        inputNum(n1, btnVal);
    } else if (!result()) {
        inputNum(n2, btnVal);
    }
}

function oprHandler(ev, key) {
    const btnVal = ev.target.textContent || key;
    if (!n1()) {
        n1('0');
        sign(btnVal);
    } else if (n1() && !n2()) {
        sanitize(n1);
        sign(btnVal);
    } else if (n2() && !result()) {
        sanitize(n2);
        let rsl = getResult();
        if (rsl.includes('zero')) {
            result(rsl);
        } else {
            n1(rsl);
            sign(btnVal);
            n2('');
        }
    } else if (result() && !result().includes('zero')) {
        let rsl = result().slice(2);
        clear();
        n1(rsl);
        sign(btnVal);
    }
}

function percentHandler() {
    const x = new Decimal(n1() || 0);
    if (n1() && !sign()) {
        n1(x.div(100));
    } else if (n2() && !result()) {
        const y = new Decimal(n2());
        n2(x.times(y.div(100)));
    }
}

function sqrtHandler() {
    if (!result()) {
        if (n1() && !sign()) {
            const x = new Decimal(n1());
            n1(x.sqrt());
        } else if (n2()) {
            const y = new Decimal(n2());
            n2(y.sqrt());
        }
    }
}

function equalHandler() {
    if (n1() && n2()) {
        sanitize(n2);
        result('= ' + getResult());
    }
}

function delHandler() {
    if (result()) {
        result('');
    } else if (n2()) {
        n2(n2().slice(0, -1));
    } else if (sign()) {
        sign('');
    } else {
        n1(n1().slice(0, -1));
    }
}

function dotHandler() {
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
}

function toggleMinus(num) {
    const x = num();
    x.startsWith('-')
        ? num(x.slice(1))
        : num('-' + x);
}
function negateHandler() {
    if (!result()) {
        if (!sign()) {
            toggleMinus(n1);
        } else {
            toggleMinus(n2);
        }
    }
}

digitButtons.forEach(btn => btn.addEventListener('click', digitHandler));

signButtons.forEach(btn => btn.addEventListener('click', oprHandler));

equalBtn.addEventListener('click', equalHandler);

clearBtn.addEventListener('click', clear);

delBtn.addEventListener('click', delHandler);

dotBtn.addEventListener('click', dotHandler);

negateBtn.addEventListener('click', negateHandler);

percentBtn.addEventListener('click', percentHandler);

sqrtBtn.addEventListener('click', sqrtHandler);

document.addEventListener('keydown', function (ev) {
    let key = ev.key;
    if (key == 'Enter' || key == '/') {
        ev.preventDefault();
    }
    if (!isNaN(key) && key !== ' ') {
        digitHandler(key);
    } else if (['+', '-', '*', '/', '^', 'a', 's', 'x', 'd', 'e', 'm'].includes(key)) {
        if      (key == 'a') key = '+';
        else if (key == 's') key = '-';
        else if (key == '*' || key == 'x') key = '×';
        else if (key == '/' || key == 'd') key = '÷';
        else if (key == 'e') key = '^';
        else if (key == 'm') key = 'mod';
        oprHandler(key);
    } else if (key == 'Backspace') {
        delHandler();
    } else if (['Escape', 'c', 'Delete'].includes(key)) {
        clear();
    } else if (key == 'Enter') {
        equalHandler();
    } else if (key == '.' || key == ',') {
        dotHandler();
    } else if (key == 'n') {
        negateHandler();
    } else if (key == '%' || key == 'p') {
        percentHandler();
    } else if (key == 'r') {
        sqrtHandler();
    }
});
