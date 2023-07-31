import "./products.scss";
import { useContext, useEffect, useState } from "react";

import { collection, addDoc, getDocs } from "firebase/firestore";

import { db } from "../utils/firebase";

import { Context } from "./context";

const Products = () => {
  const [context, setContext] = useContext<any>(Context);
  const [data, setDate] = useState<any>([]);
  const [formData, setFormData] = useState({
    id: "",
    name: "",
    price: "",
    ingredients: "",
    img: "",
  });

  const collectionRef = collection(db, "testbase");

  useEffect(() => {
    const getTodo = async () => {
      let x: any = [];

      await getDocs(collectionRef)
        .then((todo) => {
          todo.forEach((doc) => {
            x = [...x, doc.data()];
            setDate(x);
          });
        })
        .catch((err) => {
          console.log(err);
        });
    };
    getTodo();
  }, []);

  const addItem = (e: any, id: number) => {
    const quantity = Number(e.target.previousSibling.childNodes[1].value);

    const changeButton = (result: boolean) => {
      e.target.innerText = result ? "Dodano!" : "Max 500g!";
      e.target.style.backgroundColor = "#004679";
      e.target.disabled = true;
      setTimeout(() => {
        e.target.innerText = "Dodaj";
        e.target.style.backgroundColor = "#078ff2";
        e.target.disabled = false;
      }, 2000);
    };

    // const showError = (text: string, element: HTMLElement) => {
    //   const item = document.createElement("p");
    //   const textnode = document.createTextNode(text);
    //   item.appendChild(textnode);
    //   item.classList.add("error");
    //   element.after(item);
    //   setTimeout(() => {
    //     document.querySelector(".error")?.remove();
    //   }, 2000);
    // };

    // Sprawdzam czy istnieje element w tablicy o danym id
    const element = context.map((e: { id: number }) => e.id);
    // Sprawdzam index znalezionego elementu
    const indexElement = element.indexOf(id);

    if (context[indexElement]?.quantity + quantity > 500) {
      //   showError("Maksymalna ilość to 500g!", e.target);
      changeButton(false);
    } else {
      if (indexElement >= 0) {
        setContext((prev: any) =>
          prev.map((el: { id: number; quantity: number }, index: number) =>
            el.id == id
              ? {
                  id: el.id,
                  quantity: el.quantity + quantity,
                  key: index,
                }
              : el
          )
        );
        changeButton(true);
      } else {
        setContext([...context, { id, quantity }]);
        changeButton(true);
      }
    }
  };
  function renderItems(
    id: number,
    name: string,
    ingredients: string,
    img: string,
    price: number,
    index: number
  ) {
    const findObject = () => {
      return data.findIndex((x: any) => x.id === id);
    };
    let w = findObject();

    const changeWeight = (event: any, type: string) => {
      const input = Number(event.target.parentElement.children[1].value);
      const index = Number(
        event.target.parentElement.parentElement.parentElement.getAttribute(
          "data-value"
        )
      );

      let elementquantity = 0;

      context.map((element: any) => {
        if (element.id === index) {
          elementquantity = element.quantity;
        }
      });

      if (type === "add") {
        if (input + elementquantity < 500) {
          event.target.parentElement.children[1].value = input + 100;
        }
      }

      if (type === "subtract") {
        if (input > 100) {
          event.target.parentElement.children[1].value = input - 100;
        }
      }
    };

    return (
      <div className="products_item" data-value={id} key={index}>
        <img className="products_item_photo" src={img}></img>
        <div>
          <h2 className="products_item_title">{name}</h2>
          <p className="products_item_ingredients">{ingredients}</p>
        </div>
        <div className="products_item_wrapper">
          <span className="products_item_price">Cena: {price} zł</span>
          <div className="products_item_wrapper_wrapper2">
            <button
              className="minus"
              onClick={(e: any) => {
                changeWeight(e, "subtract");
              }}
            >
              -
            </button>
            <input className="input" defaultValue={100} disabled></input>
            <button onClick={(e) => changeWeight(e, "add")}>+</button>
          </div>
          <button
            className="products_item_button"
            onClick={(e) => addItem(e, id)}
          >
            Dodaj
          </button>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="products">
        {data &&
          data.map((e: any, index: number) =>
            renderItems(e.id, e.name, e.ingredients, e.img, e.price, index)
          )}
      </div>
    </>
  );
};

export default Products;
