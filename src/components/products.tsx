import "./products.scss";
import { useContext, useEffect, useState } from "react";

import {
  collection,
  addDoc,
  doc,
  deleteDoc,
  getDocs,
} from "firebase/firestore";

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

  const handleChange = (e: any) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    addDoc(collectionRef, formData)
      .then((docRef) => {
        console.log("Document has been added successfully");
      })
      .catch((error) => {
        console.log(error);
      });
  };

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
    const quantity = Number(e.target.previousSibling.value);

    const changeButton = () => {
      e.target.innerText = "Dodano!";
      e.target.style.backgroundColor = "#004679";
      e.target.disabled = true;
      setTimeout(() => {
        e.target.innerText = "Dodaj";
        e.target.style.backgroundColor = "#078ff2";
        e.target.disabled = false;
      }, 2000);
    };

    console.log(e.target);

    if (context.map((e: { id: any }) => e.id).indexOf(id) >= 0) {
      setContext((prev: any) =>
        prev.map((el: { id: number; quantity: number }, index: number) =>
          el.id == id
            ? {
                id: el.id,
                quantity:
                  el.quantity + quantity <= 500
                    ? el.quantity + quantity
                    : el.quantity,
                key: index,
              }
            : el
        )
      );
      changeButton();
    } else {
      setContext([...context, { id, quantity }]);
      changeButton();
    }
  };

  const renderItems = () => {
    return (
      data &&
      data.map((el: any, index: number) => {
        return (
          <div className="products_item" data-value={el.id} key={index}>
            <img className="products_item_photo" src={el.img}></img>
            <div>
              <h2 className="products_item_title">{el.name}</h2>
              <p className="products_item_ingredients">{el.ingredients}</p>
            </div>
            <div className="products_item_wrapper">
              <span className="products_item_price">Cena: {el.price} zł</span>
              <select>
                <option value="100">100 g</option>
                <option value="200">200 g</option>
                <option value="300">300 g</option>
                <option value="400">400 g</option>
                <option value="500">500 g</option>
              </select>
              <button
                className="products_item_button"
                onClick={(e) => addItem(e, el.id)}
              >
                Dodaj
              </button>
            </div>
          </div>
        );
      })
    );
  };

  return (
    <>
      <div className="products">{renderItems()}</div>
    </>
  );
};

export default Products;
