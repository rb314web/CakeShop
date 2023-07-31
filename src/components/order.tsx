import { useState, useContext, useEffect } from "react";
import "./order.scss";

import { Context, UserContext } from "./context";

import {
  collection,
  addDoc,
  serverTimestamp,
  getDocs,
} from "firebase/firestore";
import { db } from "../utils/firebase";

const Order = () => {
  const [userContext, setUserContext] = useContext<any>(UserContext);
  const [context, setContext] = useContext<any>(Context);
  const [data, setDate] = useState<any>();

  const [formState, setFormState] = useState({
    imie: "",
    nazwisko: "",
    ulica: "",
    email: "",
  });

  const collectionRef = collection(db, "testbase");

  useEffect(() => {
    console.log(context, "con1");
  }, [context]);

  useEffect(() => {
    const getTodo = async () => {
      let x: any = [];

      await getDocs(collectionRef)
        .then((todo) => {
          todo.forEach((doc) => {
            x = [...x, doc.data()];

            console.log("dsdsds", x);
            setDate(x);
          });
        })
        .catch((err) => {
          console.log(err);
        });
    };
    getTodo();
  }, []);

  const handleInputChange = (event: any) => {
    const { name, value } = event.target;
    setFormState({ ...formState, [name]: value });
  };

  const handleSubmit = (event: any) => {
    event.preventDefault();
    alert("Na tym się kończy zamawianie 😉")

  };

  const basketItem = (id: number, quantity: number, index: number) => {
    const findObject = () => {
      return data.findIndex((x: any) => x.id === id);
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
      <div
        data-value={data && data[w].id}
        className="order_items_item"
        key={index}
      >
        <div className="order_items_item_header">
          <h2>{data[w].name}</h2>
        </div>
        <div className="order_items_item_content">
          <img src={data[w].img} alt="Product Image"></img>
          <div className="order_items_item_content_details">
            <p className="order_items_item_content_details_ingredients">
              {data[w].ingredients}
            </p>
            <div className="order_items_item_content_details_info">
              <p>{test(id)}g</p>
              <p className="order_items_item_info_price">
                {price(data[w], quantity)} zł
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const SummaryPrice = () => {
    let w: number = 0;

    context.forEach((y: any) => {
      const obj = data.find((x: any) => x.id === y.id);

      w = (obj!.price * y.quantity) / 100 + w;
    });
    return w;
  };

  return (
    <>
      <div className="order">
        {context.length && (
          <>
            <div className="order_items">
              {context.map((e: any, index: number) => {
                return data ? basketItem(e.id, e.quantity, index) : null;
              })}
              <span className="order_items_summary">
                Łącznie: {data ? SummaryPrice() : null} zł
              </span>
            </div>

            <form className="order_form" onSubmit={handleSubmit}>
              <h2 className="order_form_heading">Zamówienie</h2>
              <div className="order_form_wrapper">
                <label className="order_form_label">Imię:</label>
                <input
                  type="text"
                  name="imie"
                  value={
                    userContext?.providerData
                      ? userContext.providerData[0].displayName
                      : formState.imie
                  }
                  onChange={handleInputChange}
                  className="order_form_input"
                  placeholder="Wpisz swoje imie"
                  disabled={!!userContext?.providerData}
                />

                <label className="order_form_label">Nazwisko:</label>
                <input
                  type="text"
                  name="nazwisko"
                  value={formState.nazwisko}
                  onChange={handleInputChange}
                  className="order_form_input"
                  placeholder="Wpisz swoje nazwisko"
                />

                <label className="order_form_label">Ulica:</label>
                <input
                  type="text"
                  name="ulica"
                  value={formState.ulica}
                  onChange={handleInputChange}
                  className="order_form_input"
                  placeholder="Wpisz ulicę zamieszkania"
                />
                <label className="order_form_label">Email:</label>
                <input
                  type="email"
                  name="email"
                  value={
                    userContext?.providerData
                      ? userContext.providerData[0].email
                      : formState.email
                  }
                  onChange={handleInputChange}
                  className="order_form_input"
                  disabled={!!userContext?.providerData}
                  placeholder="Wpisz swój email"
                />

                <button type="submit" className="order_form_button">
                  Dalej
                </button>
              </div>
            </form>
          </>
        )}
        {!context.length && <p>Dodaj coś do koszyka 😉</p>}
      </div>
    </>
  );
};

export default Order;
