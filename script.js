// BudgetPal — Simple Personal Budget Manager

// DOM Elements
const entryForm = document.getElementById('entry-form');
const descriptionInput = document.getElementById('description');
const amountInput = document.getElementById('amount');
const typeInput = document.getElementById('type');
const entriesList = document.getElementById('entries-list');
const totalIncomeEl = document.getElementById('total-income');
const totalExpenseEl = document.getElementById('total-expense');
const currentBalanceEl = document.getElementById('current-balance');

// Data storage
let entries = [];

// Format number as currency
function formatCurrency(num) {
    return '$' + Number(num).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

// Update summary values
function updateSummary() {
    let totalIncome = 0;
    let totalExpense = 0;
    entries.forEach(entry => {
        if (entry.type === 'income') {
            totalIncome += entry.amount;
        } else {
            totalExpense += entry.amount;
        }
    });
    totalIncomeEl.textContent = formatCurrency(totalIncome);
    totalExpenseEl.textContent = formatCurrency(totalExpense);
    currentBalanceEl.textContent = formatCurrency(totalIncome - totalExpense);
}

// Render the entries list
function renderEntries() {
    entriesList.innerHTML = '';
    if (entries.length === 0) {
        const emptyMsg = document.createElement('li');
        emptyMsg.textContent = "No entries yet. Add your first entry!";
        emptyMsg.style.color = '#64748b';
        emptyMsg.style.textAlign = 'center';
        emptyMsg.style.padding = '0.8rem 0';
        entriesList.appendChild(emptyMsg);
        return;
    }
    entries.slice().reverse().forEach(entry => {
        const li = document.createElement('li');
        li.className = 'entry-item';
        li.innerHTML = `
            <span class="entry-description">${entry.description}</span>
            <span class="entry-amount ${entry.type}">${entry.type === 'income' ? '+' : '-'}${formatCurrency(entry.amount)}</span>
            <span class="entry-type">${entry.type.charAt(0).toUpperCase() + entry.type.slice(1)}</span>
        `;
        entriesList.appendChild(li);
    });
}

// Validate inputs
function validateInputs(description, amount) {
    if (!description.trim()) {
        alert('Please enter a description.');
        return false;
    }
    if (isNaN(amount) || amount <= 0) {
        alert('Please enter a valid amount greater than 0.');
        return false;
    }
    return true;
}

// Handle form submission
entryForm.addEventListener('submit', function(e) {
    e.preventDefault();
    const description = descriptionInput.value.trim();
    const amount = parseFloat(amountInput.value);
    const type = typeInput.value;

    if (!validateInputs(description, amount)) return;

    // Add entry
    entries.push({ description, amount, type });
    updateSummary();
    renderEntries();

    // Clear inputs
    descriptionInput.value = '';
    amountInput.value = '';
    typeInput.value = 'income';
    descriptionInput.focus();
});

// Initial render
updateSummary();
renderEntries();
