const UIlistFrom = document.querySelector('.custom-from-select');
const UIlistTo = document.querySelector('.custom-to-select');
const UIFromAmount = document.querySelector('.from-amount');
const UIToAmount = document.querySelector('.to-amount');
const UIInfo = document.querySelector('.info');

window.addEventListener('DOMContentLoaded', () => {
    getCurriences()
        .then(resp => {
            const currencies = resp.data.currencies;
            loadCurrenciesToUI(currencies);
            convertCurrency();
        });
    loadEventListeners();
});

const convertCurrency = () => {
    // get source and destination currency
    const from = localStorage.getItem('from');
    const to = localStorage.getItem('to');

    // amounts
    const fromAmount = parseFloat(UIFromAmount.value);
    if (!isNaN(fromAmount)) {
        convert(from, to, fromAmount)
            .then(data => {
                console.log(data);
                const base = data.base_currency_name;
                const rateObj = data.rates;
                let toAmount = null;
                for (let rate in rateObj) {
                    toAmount = rateObj[rate].rate_for_amount;
                }
                // console.log(toAmount);
                UIToAmount.value = toAmount;
                UIInfo.textContent = `${fromAmount} ${from} = ${toAmount} ${to}`;

            });
    } else {
        UIToAmount.value = 0;
        UIInfo.textContent = '';
    }

}
const loadCurrenciesToUI = function (currencies) {
    UIlistFrom.innerHTML = populateDropDown('USD', currencies);
    UIlistTo.innerHTML = populateDropDown('NPR', currencies);
    //load the localstorage
    localStorage.setItem('from', 'USD');
    localStorage.setItem('to', 'NPR');
}

const populateDropDown = (match, currencies) => {
    let options = '';
    for (let currency in currencies) {
        if (currency === match) {
            options += `<option value=${currency} selected>${currencies[currency]}</option>`;
        } else {
            options += `<option value=${currency}>${currencies[currency]}</option>`;
        }
    }
    return options;
}
const loadEventListeners = () => {
    UIlistFrom.addEventListener('change', (e) => {
        localStorage.setItem('from', e.target.value);
        convertCurrency();
    });
    UIlistTo.addEventListener('change', (e) => {
        localStorage.setItem('to', e.target.value);
        convertCurrency();
    });
    UIFromAmount.addEventListener('keyup', convertCurrency);
    UIFromAmount.addEventListener('click', convertCurrency);
}

