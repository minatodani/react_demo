import React, { useState, useEffect } from "react";
import firebase from "../firebase";
import InputForm from "./InputForm";
import Item from "./Item";

const ItemList = (props) => {
  const [todoList, setTodoList] = useState(null);

  const getTodosFromFirestore = async () => {
    const itemListArray = await firebase
      .firestore()
      .collection("todos")
      .orderBy("isDone")
      .orderBy("limit")
      .get();

    console.log(itemListArray);

    const todoArray = itemListArray.docs.map((x) => {
      return {
        id: x.id,
        data: x.data(),
      };
    });
    setTodoList(todoArray);
    return todoArray;
  };

  useEffect(() => {
    const result = getTodosFromFirestore();
  }, [props]);

  return (
    <div>
      <InputForm getTodosFromFirestore={getTodosFromFirestore} />
      <ul>
        {todoList?.map(
          (x, index) => (
            // ↓新しく作成した`Item.jsx`
            <Item
              key={index}
              todo={x}
              index={index}
              getTodosFromFirestore={getTodosFromFirestore}
            />
          )
          // ↓直接記述したものは削除してOK．
          // <li key={index} id={x.id}>
          //   <input type="checkbox" value={x.id} />
          //   <button value={x.id}>delete</button>
          //   <p>締め切り：{x.data.limit.seconds}</p>
          //   <p>やること：{x.data.todo}</p>
          // </li>
        )}
      </ul>
    </div>
  );
};
export default ItemList;
