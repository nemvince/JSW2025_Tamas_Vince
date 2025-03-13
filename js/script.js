"use strict";
const sel = document.getElementById('name');
const hany = document.getElementById('hany');
const calcBtn = document.querySelector('button.bg-black');
const resetBtn = document.querySelector('button.bg-white');
const results = document.querySelectorAll('.grid.grid-cols-5 > div');
let error = null;

let originalStates = [];

function populate() {
    fruits.forEach(fruit => {
        const option = document.createElement('option');
        option.value = fruit.id;
        option.textContent = fruit.name;
        sel.appendChild(option);
    });
}

function showError() {
    removeError();
    error = document.createElement('div');
    error.className = 'bg-red-200 border border-red-400 p-4 rounded-lg mt-2';
    error.textContent = 'Válasszon gyümölcsöt a listából!';
    const buttonsDiv = resetBtn.parentElement;
    buttonsDiv.after(error);
}

function removeError() {
    if (error) {
        error.remove();
        error = null;
    }
}

function calculateResults() {
    if (sel.value === 'placeholder') {
        showError();
        return;
    }
    removeError();
    const selId = parseInt(sel.value);
    const selected = fruits.find(fruit => fruit.id === selId);
    const quantity = parseInt(hany.value) || 1;
    const values = [
        (selected.fat * quantity).toFixed(1) + ' g',
        (selected.fiber * quantity).toFixed(1) + ' g',
        (selected.calory * quantity).toFixed(1) + ' kcal',
        (selected.protein * quantity).toFixed(1) + ' g',
        (selected.carbohydrate * quantity).toFixed(1) + ' g'
    ];
    results.forEach((element, index) => {
        const originalText = element.textContent;
        element.innerHTML = `${originalText}<div>${values[index]}</div>`;
    });
}

function resetForm() {
    sel.selectedIndex = 0;
    hany.value = 1;
    removeError();
    results.forEach(element => {
        element.innerHTML = originalStates.shift();
    });
}

document.addEventListener('DOMContentLoaded', () => {
    populate();
    originalStates = Array.from(results).map(element => element
        .textContent.trim());
    calcBtn.addEventListener('click', calculateResults);
    resetBtn.addEventListener('click', resetForm);
    sel.addEventListener('change', () => {
        if (sel.value !== 'placeholder') {
            removeError();
        }
    });
});
