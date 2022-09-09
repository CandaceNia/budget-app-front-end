import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';

import axios from 'axios';

const API = 'https://budget-app-server-candace.herokuapp.com'

function TransactionEditForm() {

  const navigate = useNavigate();
  let { id} = useParams();

  const [transaction, setTransaction] = useState({
    itemName: '',
    amount: 0,
    date: '',
    from: '',
    category: '',
    type: '',
  });

  const handleTextChange = (event) => {
    setTransaction({
      ...transaction,
      [event.target.id]: event.target.value,
    });
    //console.log('target.id :', event.target.id);
  };

  useEffect(() => {
    axios
      .get(`${API}/transactions/${id}`)
      .then((res) => {
        //auto populate form fields with existing transaction data
        setTransaction(res.data.payload);
      })
      .catch();
  }, [id]);

  const handleSubmit = (event) => {
    event.preventDefault();
    axios
      .put(`${API}/transactions/${id}`, transaction)
      .then(() => {
        navigate(`/transactions/${id}`);
      })
      .catch((err) => {
        console.warn(err);
      });
  };

  return (
    <div className="edit-form">
      <form onSubmit={handleSubmit}>
        <label htmlFor="itemName">Item Name: </label>
        <input
          id="itemName"
          type="text"
          value={transaction.itemName}
          onChange={handleTextChange}
          required
          placeholder="paycheck, groceries, etc..."
        />
        <br />
        <label htmlFor="amount">Amount: </label>
        <input
          id="amount"
          type="number"
          required
          value={transaction.amount}
          onChange={handleTextChange}
          placeholder="65, -100, etc..."
        />
        <br />
        <label htmlFor="date">Date: </label>
        <input
          id="date"
          type="date"
          name="date"
          value={transaction.date}
          onChange={handleTextChange}
          required
          placeholder="EX: July 21"
        />
        <br />
        <label htmlFor="from">From: </label>
        <input
          id="from"
          type="text"
          onChange={handleTextChange}
          value={transaction.from}
          required
          placeholder="work, bank, etc..."
        />
        <br />
        <label htmlFor="category">Category: </label>
        <input
          id="category"
          type="text"
          name="category"
          value={transaction.category}
          placeholder="food, vehicle, housing, etc..."
          onChange={handleTextChange}
          required
        />
        <br />
        <label htmlFor="type">Type: </label>
        <input
          id="type"
          type="text"
          name="type"
          value={transaction.type}
          placeholder="income / expense"
          onChange={handleTextChange}
          required
        />
        <br />

        <input className="submit" type="submit" />
      </form>
      <Link to={`/transactions/${id}`}>
        {/* <button>Nevermind! {undo}</button> */}
      </Link>
    </div>
  );
}

export default TransactionEditForm;