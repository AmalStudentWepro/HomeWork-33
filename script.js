const mainForm = document.forms['userDetails'];
const inputElements = document.querySelectorAll('input');
const mandatoryFields = document.querySelectorAll('.mandatory');

const regexRules = {
    username: /^[a-zA-Z]+$/,
    age: /^(?:[1-9][0-9]?|100)$/,
    aboutYou: /^[a-zA-Z]+$/,
    emailAdress: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
    whatIsJavaScript: /^[a-zA-Z]+$/,
    html: /^[a-zA-Z]+$/,
    css: /^[a-zA-Z]+$/,
};

function updateStats() {
    const validFields = document.querySelectorAll('.passed');
    const invalidFields = document.querySelectorAll('.failed');

    document.getElementById('totalCount').textContent = `Total fields: ${inputElements.length}`;
    document.getElementById('mandatoryCount').textContent = `Required: ${mandatoryFields.length}`;
    document.getElementById('validCount').textContent = `Valid: ${validFields.length}/${mandatoryFields.length}`;
    document.getElementById('invalidCount').textContent = `Invalid: ${invalidFields.length}/${mandatoryFields.length}`;
}

function checkInputs(fieldsToCheck) {
    let formIsValid = true;

    fieldsToCheck.forEach((input) => {
        const rule = regexRules[input.name];
        const value = input.value.trim();

        if (value.trim() !== '' && rule.test(value)) {
            input.style.border = '2px solid green';
            input.previousElementSibling.style.color = 'green';
            input.nextElementSibling.textContent = '✔ Всё ок';
            input.nextElementSibling.style.color = 'green';
        } else {
            input.style.border = '2px solid red';
            input.previousElementSibling.style.color = 'red';
            input.nextElementSibling.textContent = '✘ Ошибка';
            input.nextElementSibling.style.color = 'red';
            formIsValid = false;
        }
        
    });

    updateStats();
    return formIsValid;
}

inputElements.forEach((input) => {
    input.addEventListener('input', () => {
        checkInputs([input]);
    });
});

mainForm.addEventListener('submit', (e) => {
    e.preventDefault();

    if (!checkInputs(mandatoryFields)) return;

    const collected = new FormData(mainForm);
    const result = {};

    for (let [key, value] of collected.entries()) {
        result[key] = value;
    }

    console.log(result);
});

updateStats();
