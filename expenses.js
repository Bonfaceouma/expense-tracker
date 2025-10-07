// Data Storage / Model
const formValidity = document.querySelector('.input-data-container');
const expenseTitle = document.querySelector('.input-title');
const expenseCategory = document.querySelector('.input-Category');
const expenseAmount= document.querySelector('.input-Amount');
const expenseNote = document.querySelector('.input-note');
const expenseDate= document.querySelector('.input-date');
const tableBody = document.querySelector('.table-body');
let totalAmount = document.querySelector('.display-total-amount-value');

// store data

let expenses =JSON.parse(localStorage.getItem('expenses')) || [];


//Controller , controll how the data is displayed

const addExpense = document.querySelector('.add-expense-button')
addExpense.addEventListener('click',()=>{
   if(formValidity.checkValidity()){
       const expense = {
       title : expenseTitle.value.charAt(0).toUpperCase() + expenseTitle.value.slice(1),
       category: expenseCategory.value.charAt(0).toUpperCase() + expenseCategory.value.slice(1),
       amount : Number(expenseAmount.value).toFixed(2),
       note : expenseNote.value.charAt(0).toUpperCase() + expenseNote.value.slice(1),
       date:expenseDate.value,
       id:crypto.randomUUID()
    };
    expenses.push(expense);
    localStorage.setItem('expenses',JSON.stringify(expenses));
   
    renderExpenseData();

    let totalAmountResult = (Number(totalAmount.innerHTML)+Number(expense.amount)).toFixed(2);
    localStorage.setItem('totalAmountResult',JSON.stringify(totalAmountResult))
    totalAmountValue();

    expenseTitle.value = '';
    expenseCategory.value = '';
    expenseAmount.value = '';
    expenseNote.value = '';
    expenseDate.value = ''
   return;   
   }else{
      alert(' please fill out all the fields ')
     // formValidity.reportValidy();
         
   }
       
})

// Display / Render

function renderExpenseData(){
    tableBody.innerHTML = '';
    expenses.forEach((expense)=>{
    tableBody.innerHTML +=
     `<tr class="table-body-row">
        <td class="title-data">${expense.title}</td>
        <td class="category-data">${expense.category}</td>
        <td class="Amount-data">$${expense.amount}</td>
        <td class="note-data">${expense.note}</td>
        <td class="date-data">${expense.date}</td>
        <td class="button-delete-data"><button class="button-delete-expense" data-id =${expense.id}>Delete expense</button></td>
       </tr>
`
  
// controller

    const deleteButtons = document.querySelectorAll('.button-delete-expense');
        deleteButtons.forEach((deleteButton)=>{
            deleteButton.addEventListener('click',()=>{
             const id = deleteButton.dataset.id
             
              expenses = expenses.filter((expense)=>{
                 if(expense.id === id){

                    let totalAmountResult = (Number(totalAmount.innerHTML)-Number(expense.amount)).toFixed(2);
                    localStorage.setItem('totalAmountResult',JSON.stringify(totalAmountResult))
                    totalAmountValue();

                    return false
                 }else{
                    return true
                 }
              });
              localStorage.setItem('expenses',JSON.stringify(expenses));
              
              renderExpenseData();
            });
        });

    });

    }

    renderExpenseData();

    function totalAmountValue() {

    totalAmount.innerHTML = JSON.parse(localStorage.getItem('totalAmountResult') || 0); 
        
    }
    totalAmountValue()

