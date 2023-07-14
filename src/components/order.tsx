import { useState, useContext, useEffect } from 'react';
import './order.scss'

import { Context } from './context';

import { collection, addDoc, serverTimestamp, getDocs } from 'firebase/firestore'
import { db } from '../utils/firebase'


const Order = () => {

    const [context, setContext] = useContext<any>(Context);
    const [data, setDate] = useState<any>();

    const [formState, setFormState] = useState({
        imie: '',
        nazwisko: '',
        ulica: '',
        email: ''
      });

      const collectionRef = collection(db, 'testbase');

      useEffect(() => {
		const getTodo = async () => {

			let x:any = []

		  await getDocs(collectionRef).then((todo) => {
			  todo.forEach(doc => {

				x = [...x, doc.data()]

				console.log('dsdsds',x);
				setDate( x)
			})

		}).catch((err) => {
			console.log(err);
			})
		  }
		getTodo()
		}, [])
    
      const handleInputChange = (event: any) => {
        const { name, value } = event.target;
        setFormState({ ...formState, [name]: value });
      };
    
      const handleSubmit = (event: any) => {
        event.preventDefault();
        // Tutaj możesz dodać kod obsługujący zatwierdzenie formularza, np. wysłanie danych na serwer
        console.log(formState);
      };

      console.log('cont',context)



      const basketItem = (id: number, quantity: number, index:number) => {
		const findObject = () => {
			return data.findIndex((x:any) => x.id === id);
		};
		let w = findObject();

		const test = (id: any) => {
			let x = context.find((x: { id: any }) => x.id === id);
			console.log(x);

			return quantity;
		};


		const price = (data: { price: number }, quantity: number) => {
			return (data.price * quantity) / 100;
		};

		return (
<div data-value="{data && data[w].id}" className="order_item" key="{index}">
  <div className="order_item_header">
    <h2>{data[w].name}</h2>
  </div>
  <div className="order_item_content">
    <img src={data[w].img} alt="Product Image"></img>
    <div className="order_item_details">
      <p className="order_item_ingredients">
        {data[w].ingredients}
      </p>
      <div className="order_item_info">
        <p>{test(id)}g</p>
        <p className="order_item_price">
          {price(data[w], quantity)} zł
        </p>
      </div>
    </div>
  </div>
</div>
		);
	};

return(
    <div className='order'>
        <h1>Zamówienie</h1>



          {context.map((e: any, index:number) => {
              console.log(data, 'data')
							return data ? basketItem(e.id, e.quantity, index) : null
						})}
<form className="order-form" onSubmit={handleSubmit}>
  <label className="order_form_label">
    Imię:
    <input
      type="text"
      name="imie"
      value={formState.imie}
      onChange={handleInputChange}
      className="order_form_input"
    />
  </label>

  <label className="order_form_label">
    Nazwisko:
    <input
      type="text"
      name="nazwisko"
      value={formState.nazwisko}
      onChange={handleInputChange}
      className="order_form_input"
    />
  </label>

  <label className="order_form_label">
    Ulica:
    <input
      type="text"
      name="ulica"
      value={formState.ulica}
      onChange={handleInputChange}
      className="order_form_input"
    />
  </label>

  <label className="order_form_label">
    Email:
    <input
      type="email"
      name="email"
      value={formState.email}
      onChange={handleInputChange}
      className="order_form_input"
    />
  </label>

  <button type="submit" className="order_form_button">Dalej</button>
</form>
    </div>
)
}

export default Order