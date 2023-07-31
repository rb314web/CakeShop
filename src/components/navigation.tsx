import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Cookie from "../assets/cookie.png";
import { Basket123 } from "./basket";
import { useNavigate } from "react-router-dom";

import "./navigation.scss";
import Basket from "../assets/Basket.png";
import User from "../assets/User.png";

import { Context, UserContext } from "./context";

import {
  collection,
  getDocs,
} from "firebase/firestore";
import { db } from "../utils/firebase";

import { auth } from "../utils/firebase";
import { signOut } from "firebase/auth";

const Navigation = () => {
  const [context, setContext] = useContext<any>(Context);

  const [userContext, setUserContext] = useContext<any>(UserContext);

  const [data, setDate] = useState<any>([]);

  const collectionRef = collection(db, "testbase");

  const navigate = useNavigate();

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

  useEffect(() => {
    SummaryPrice();
  }, [context]);

  const toogleBasket = () => {
    const basket = document.querySelector(".basket");

    basket?.classList.toggle("basket_active");
  };

  const basket2 = () => {
    document
      .querySelector(".navigation_item")
      ?.classList.toggle("navigation_item_active");
  };

  const basketItem = (id: number, quantity: number) => {
    const findObject = () => {
      return data.findIndex((x: any) => x.id === id);
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
                  task == "add" ? el.quantity < minmax : el.quantity > minmax
                )
                  ? task == "add"
                    ? el.quantity + 100
                    : el.quantity - 100
                  : el.quantity,
              }
            : el
        )
      );
    };

    return (
      <div data-value={data[w].id} className="navigation_basket_data_item">
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <h2>{data[w].name}</h2>
          <p onClick={(e) => deleteItem(e)}>X</p>
        </div>
        <div className="navigation_basket_data_item_wrapper">
          <img src={data[w].img}></img>

          <div>
            <p className="navigation_basket_data_item_ingredients">
              {data[w].ingredients}
            </p>
            <div className="navigation_basket_data_item_wrapper2">
              <button onClick={() => changeWeight("subtract", 100, data[w].id)}>
                -
              </button>
              <p>{test(id)}g</p>
              <button onClick={() => changeWeight("add", 500, data[w].id)}>
                +
              </button>
              <p className="navigation_basket_data_item_price">
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

    data.lenght &&  context.map((y: any) => {
      const obj = data.find((x: any) => x.id === y.id);

      w = (obj!.price * y.quantity) / 100 + w;
    });
    return w;
  };

  const price = (data: { price: number }, quantity: number) => {
    return (data.price * quantity) / 100;
  };

  const deleteItem = (e: any) => {
    const value = Number(
      e.target.offsetParent.firstElementChild.nextElementSibling.firstChild.getAttribute(
        "data-value"
      )
    );

    let wq = context.filter(function (e: { id: number }) {
      return e.id !== value;
    });

    console.log(e);
    setContext(wq);
  };

  const out = () => {
    signOut(auth);
    localStorage.removeItem("my-test-app-currentUser");
    setUserContext(null);
    navigate("/");
  };

  return (
    <nav className="navigation">
      <Link to="/">
        <div className="navigation_logo">
          <img className="navigation_logo_img" src={Cookie}></img> Ciasta
        </div>
      </Link>
      <div onClick={basket2} className="navigation_bars">
        <span></span>
      </div>
      <div className="navigation_item">
        <Link to="/">Strona główna</Link>

        <Link to="/products">Produkty</Link>

        <Link to="/contact">Kontakt</Link>

		<a className="navigation_item_basket" onClick={toogleBasket}>
          <img src={Basket}></img>
          {context?.length > 0 ? <span>{context.length}</span> : null}
        </a>

        {!userContext?.providerData && (
            <Link className="navigation_item_login" to="/login">Zaloguj się!</Link>
        )}

        {userContext?.providerData && (

            <a onClick={out}>Wyloguj</a>

        )}
        {userContext?.providerData && (
            <Link to="/settings">
              <img src={User}></img>
            </Link>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
