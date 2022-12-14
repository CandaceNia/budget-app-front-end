import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
const API = 'https://budget-app-server-candace.herokuapp.com'

function Transactions() {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    axios
      .get(`${API}/transactions`)
      .then((res) => setTransactions(res.data))
      .catch((error) => console.log(error));
  }, []);

  const transactionsList = transactions.map((transaction, index) => {
    return (
      <li className="transaction-li" key={index}>
        <p>{transaction.date}</p>
        <Link to={`/transactions/${index}`}>
          <p>{transaction.itemName}</p>
        </Link>
        <p>${transaction.amount}</p>
      </li>
    );
  });

  const getTotal = () => {
    let sum = 0;
    for (let tran of transactions) {
      sum += Number(tran.amount);
    }
    return sum.toFixed(2);
  };

  const bankAccountSum = getTotal();

  const accountColor = (bankAccountSum) => {
    if (bankAccountSum >= 1000) {
      return 'green';
    } else if (bankAccountSum >= 0) {
      return 'blue';
    } else {
      return 'red';
    }
  };

  return (
    <div className='transaction-page'>
      <h1>
        Bank Account Total:{' '}
        <span className={accountColor(bankAccountSum)}>${bankAccountSum}</span>
      </h1>
      <ul className="transaction-ul">{transactionsList}</ul>
    </div>
  );
}

export default Transactions;