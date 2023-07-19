// Function to get the expenses from local storage
function getExpenses() {
  return JSON.parse(localStorage.getItem('expenses')) || [];
}

// Function to save expenses to local storage
function saveExpenses(expenses) {
  localStorage.setItem('expenses', JSON.stringify(expenses));
}

// Function to add a new expense
function addExpense(amount, description, category) {
  const expense = {
    id: new Date().getTime(),
    amount: parseFloat(amount),
    description: description,
    category: category,
  };

  const expenses = getExpenses();
  expenses.push(expense);
  saveExpenses(expenses);
  displayExpenses();
}

// Function to remove an expense by its ID
function removeExpense(id) {
  const expenses = getExpenses().filter((expense) => expense.id !== id);
  saveExpenses(expenses);
  displayExpenses();
}

// Function to edit an expense by its ID
function editExpense(id, amount, description, category) {
  const expenses = getExpenses().map((expense) => {
    if (expense.id === id) {
      return {
        ...expense,
        amount: parseFloat(amount),
        description: description,
        category: category,
      };
    }
    return expense;
  });
  saveExpenses(expenses);
  displayExpenses();
}

// Function to display expenses in the table
function displayExpenses() {
  const expenses = getExpenses();
  const tableBody = document.getElementById('expense-table-body');
  tableBody.innerHTML = '';

  expenses.forEach((expense) => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${expense.amount}</td>
      <td>${expense.description}</td>
      <td>${expense.category}</td>
      <td>
        <button class="btn btn-primary btn-sm" onclick="editExpenseModal(${expense.id})">Edit</button>
        <button class="btn btn-danger btn-sm" onclick="removeExpense(${expense.id})">Remove</button>
      </td>
    `;
    tableBody.appendChild(row);
  });
}

// Function to open the edit expense modal with existing data
function editExpenseModal(id) {
  const expense = getExpenses().find((expense) => expense.id === id);
  if (expense) {
    const amountInput = document.getElementById('edit-amount');
    const descriptionInput = document.getElementById('edit-description');
    const categoryInput = document.getElementById('edit-category');

    amountInput.value = expense.amount;
    descriptionInput.value = expense.description;
    categoryInput.value = expense.category;

    const saveEditBtn = document.getElementById('save-edit-btn');
    saveEditBtn.onclick = function () {
      editExpense(id, amountInput.value, descriptionInput.value, categoryInput.value);
      $('#editExpenseModal').modal('hide');
    };

    $('#editExpenseModal').modal('show');
  }
}

// Handle form submission for adding expenses
document.getElementById('expense-form').addEventListener('submit', function (e) {
  e.preventDefault();
  const amountInput = document.getElementById('amount');
  const descriptionInput = document.getElementById('description');
  const categoryInput = document.getElementById('category');

  const amount = amountInput.value;
  const description = descriptionInput.value;
  const category = categoryInput.value;

  if (amount && description && category) {
    addExpense(amount, description, category);
    amountInput.value = '';
    descriptionInput.value = '';
    categoryInput.value = '';
  }
});

// Initial display of expenses on page load
displayExpenses();
