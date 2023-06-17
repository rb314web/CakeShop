import './products.scss';
import { useContext, useEffect } from 'react';

import { Context } from './context';

import { items } from '../components/items';

const Products = () => {
	const [context, setContext] = useContext<any>(Context);

	const addItem = (e: any, id: number) => {
		const quantity = Number(e.target.previousSibling.value);

		if (context.map((e: { id: any }) => e.id).indexOf(id) >= 0) {
			const index = context.map((e: { id: any }) => e.id).indexOf(id);

			setContext((prev: any) =>
				prev.map((el: { id: number; quantity: number }) =>
					el.id == id
						? {
								id: el.id,
								quantity:
									el.quantity + quantity <= 500
										? el.quantity + quantity
										: el.quantity,
						  }
						: el
				)
			);
		} else {
			setContext([...context, { id, quantity }]);
		}
	};

	const renderItems = () => {
		return items.map((el) => {
			return (
				<div className='products_item' data-value={el.id}>
					<h2 className='products_item_title'>{el.name}</h2>
					<img className='products_item_photo' src={el.img}></img>
					<p className='products_item_ingredients'>{el.ingredients}</p>
					<span className='products_item_price'>Cena: {el.price} zł</span>
					<select>
						<option value='100'>100 g</option>
						<option value='200'>200 g</option>
						<option value='300'>300 g</option>
						<option value='400'>400 g</option>
						<option value='500'>500 g</option>
					</select>
					<button className='products_item_button' onClick={(e) => addItem(e, el.id)}>Dodaj</button>
				</div>
			);
			{
				console.log(el);
			}
		});
	};

	return (
		// <div className='products'>
		// 	<div className='products_item'>
		// 		<h2>Torty</h2>
		// 		<div className='products_item_photo'></div>
		// 		<p>Od 200 zł</p>
		// 		<select>
		// 						<option value='100'>100g</option>
		// 						<option value='200'>200g</option>
		// 						<option value='300'>300g</option>
		// 						<option value='400'>400g</option>
		// 						<option value='500'>500g</option>
		// 					</select>
		// 		<button onClick={(e) => addItem(e, 25)}>Zobacz więcej</button>
		// 	</div>
		// 	<div className='products_item'>
		// 		<h2>Ciasta</h2>
		// 		<div className='products_item_photo'></div>
		// 		<p>Od 100 zł</p>
		// 		<select>
		// 						<option value='100'>100g</option>
		// 						<option value='200'>200g</option>
		// 						<option value='300'>300g</option>
		// 						<option value='400'>400g</option>
		// 						<option value='500'>500g</option>
		// 					</select>
		// 		<button onClick={(e) => addItem(e, 26)}>Zobacz więcej</button>
		// 	</div>
		// 	<div className='products_item'>
		// 		<h2>Desery</h2>
		// 		<div className='products_item_photo'></div>
		// 		<p>Od 50 zł</p>
		// 		<select>
		// 						<option value='100'>100g</option>
		// 						<option value='200'>200g</option>
		// 						<option value='300'>300g</option>
		// 						<option value='400'>400g</option>
		// 						<option value='500'>500g</option>
		// 					</select>
		// 		<button onClick={(e) => addItem(e, 27)}>Zobacz więcej</button>
		// 	</div>
		// </div>

		<>
			<div className='products'>{renderItems()}</div>

		</>
	);
};

export default Products;
