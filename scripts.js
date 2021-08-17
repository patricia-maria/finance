const Modal = {
    open(){
        //Abrir modal
        //precisa adicionar a classe active ao modal
        document
            .querySelector('.modal-overlay')
            .classList.add('active')

    },
    close(){
        //fechar o modal
        //precisa remover a classe active do modal
        document
            .querySelector('.modal-overlay')
            .classList.remove('active')
    }
}

const transactions = [
    {
        id: 1,
        description: 'Luz',
        amount: -50000,
        date: '23/01/2021',
    },
    {
        id: 2,
        description: 'Website',
        amount: 50000,
        date: '23/01/2021',
    },
    {
        id: 3,
        description: 'Internet',
        amount: -20000,
        date: '23/01/2021',
    },
    {
        id: 4,
        description: 'App',
        amount: 200000,
        date: '23/01/2021',
    },
]

const Transaction = {
    all: transactions,
    add(transaction){
        Transaction.all.push(transaction)

        App.reload()
    },

    incomes() {
        //soma das entradas
        let income = 0;
        Transaction.all.forEach (transaction => {
            if( transaction.amount > 0) {
                income = income + transaction.amount;
            }
        } )
        return income; 
        
    },

    expenses() {
        let expense = 0;
        Transaction.all.forEach(transaction => {
            if( transaction.amount < 0) {
                expense = expense + Transaction.amount;
            }
        })
        return expense;
        //somar as saídas
    },
   total() {
    
    return Transaction.incomes() + Transaction.expenses();
        //entradas - saídas = total
    }
}

const DOM = {
    transactionsContainer: document.querySelector('#data-table tbody'),

    addTransaction(transaction, index){
        const tr = document.createElement('tr')
        tr.innerHTML = DOM.innerHTMLTransaction(transaction)
        DOM.transactionsContainer.appendChild(tr)
    },
    innerHTMLTransaction(transaction) {
        const CSSclass = transaction.amount > 0 ? "income" : "expense"

        const amount = Utils.formatCurrency(transaction.amount)

        const HTML = `
        
        <td class="description">${transaction.description}</td>
        <td class="${CSSclass}">${amount}</td>
        <td class="date">${transaction.date}</td>
        <td>
            <img src="./img/minus.svg" alt="Remover transação">
        </td>
        `

        return HTML

    },

    updateBalance() {
        document
            .getElementById('incomeDisplay')
            .innerHTML = Utils.formatCurrency(Transaction.incomes())
        document     
            .getElementById('expenseDisplay')
            .innerHTML = Utils.formatCurrency(Transaction.expenses())
        document
            .getElementById('totalDisplay')
            .innerHTML = Utils.formatCurrency(Transaction.total())
    },

    clearTransactions(){
        DOM.transactionsContainer.innerHTML = ""
    }
}

const Utils = {
    formatCurrency(value){
        const signal = Number(value) < 0 ? "-" : ""
        value = String(value).replace(/\D/g, "" )

        value = Number(value) / 100

        value = value.toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL"
        })

        return signal + value
    }
     
}


const App = {
    init(){

        Transaction.all.forEach(transaction  => {
            DOM.addTransaction(transaction)
        } )
        
        DOM.updateBalance()

    },
    reload(){
        DOM.clearTransactions()
        App.init()
    },
}

App.init()

   Transaction.add({
            id:39,
            description: 'Alo',
            amount: 200,
            date: '23/01/2021'
    } )


