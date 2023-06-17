import { useContext } from 'react';
import { Context } from './context';
import { items } from '../components/items';

import './basket.scss';
import {ReactComponent as X} from '../x .svg'

export const Basket123 = () => {
	const [context, setContext] = useContext<any>(Context);

	const toogleBasket = () => {
		const basket = document.querySelector('.basket');
		basket?.classList.toggle('basket_active');
	};

	const SummaryPrice = () => {
		let w: number = 0;

		context.map((y: any) => {
			const obj = items.find((x) => x.id === y.id);

			w = (obj!.price * y.quantity) / 100 + w;
		});
		return w;
	};

	const basketItem = (id: number, quantity: number) => {
		const findObject = () => {
			return items.findIndex((x) => x.id === id);
		};
		let w = findObject();

		const test = (id: any) => {
			let x = context.find((x: { id: any }) => x.id === id);
			console.log(x);

			return quantity;
		};

		const changeWeight = (task: string, minmax: number, id: number) => {
			console.log(minmax);
			setContext((prev: any) =>
				prev.map((el: { id: number; quantity: number }) =>
					el.id == id
						? {
								id: el.id,
								quantity: (
									task == 'add' ? el.quantity < minmax : el.quantity > minmax
								)
									? task == 'add'
										? el.quantity + 100
										: el.quantity - 100
									: el.quantity,
						  }
						: el
				)
			);
		};

		const deleteItem = (e: any) => {
			const value = Number(
				e.target.parentElement.nextElementSibling.parentElement.getAttribute(
					'data-value'
				)
			);

			let wq = context.filter(function (e: { id: number }) {
				return e.id !== value;
			});

			console.log(e);
			setContext(wq);
		};

		const price = (items: { price: number }, quantity: number) => {
			return (items.price * quantity) / 100;
		};

		return (
			<div data-value={items[w].id} className='basket_items_item'>
				<div style={{ display: 'flex', justifyContent: 'space-between' }}>
					<h2>{items[w].name}</h2>
					<span style={{cursor: 'pointer'}} onClick={(e) => deleteItem(e)}>x</span>
				</div>
				<div className='basket_items_item_wrapper'>
					<img src={items[w].img}></img>

					<div>
						<p className='basket_items_item_ingredients'>
							{items[w].ingredients}
						</p>
						<div className='basket_items_item_wrapper2'>
							<button
								onClick={() => changeWeight('subtract', 100, items[w].id)}>
								-
							</button>
							<p>{test(id)}g</p>
							<button onClick={() => changeWeight('add', 500, items[w].id)}>
								+
							</button>
							<p className='basket_items_item_price'>
								{price(items[w], quantity)} zł
							</p>
						</div>
					</div>
				</div>
			</div>
		);
	};

	return (
		<div className='basket'>
			<div className='basket_top'>
				<p>Koszyk</p>
				<span onClick={toogleBasket}>{<X/>}</span>
			</div>

			{!!context.length && (
				<>
					<div className='basket_items'>
						{context.map((e: any) => {
							return basketItem(e.id, e.quantity);
						})}
					</div>
					<div className='basket_summary'>
						<p>Łącznie: {SummaryPrice()} zł</p>
					</div>
					<p>+ koszt dostawy</p>
					<button>Zamawiam</button>
				</>
			)}
			{!context.length && <p>Dodaj coś do koszyka</p>}
		</div>
	);
};
