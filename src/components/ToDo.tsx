import React from "react";
import { IToDo, categoriesState } from "../atoms";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { toDoState } from "../atoms";

const ToDo = ({ text, category, id }: IToDo) => {
  const setToDos = useSetRecoilState(toDoState);
  const categories = useRecoilValue(categoriesState);
  const onClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const {
      currentTarget: { name },
    } = e;
    setToDos((cur) => {
      const targetIndex = cur.findIndex((toDo) => toDo.id === id);
      console.log(targetIndex);
      const newTodo = { text, id, category: name as IToDo["category"] };
      return [
        ...cur.slice(0, targetIndex),
        newTodo,
        ...cur.slice(targetIndex + 1),
      ];
    });
  };
  const onDelete = () => {
    setToDos((cur) => {
      const targetIndex = cur.findIndex((toDo) => toDo.id === id);
      const deletedArray = cur.filter((value, index) => index !== targetIndex);
      return deletedArray;
    });
  };
  return (
    <li>
      <span>{text}</span>
      {categories
        .filter((value) => value !== category)
        .map((category) => (
          <button key={category} name={category} onClick={onClick}>
            {category}
          </button>
        ))}
      <button onClick={onDelete}>삭제</button>
    </li>
  );
};

export default ToDo;
