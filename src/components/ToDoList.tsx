import { useRecoilState, useRecoilValue } from "recoil";

import { categoriesState, categoryState, toDoSelector } from "../atoms";
import CreateToDo from "./CreateToDo";
import ToDo from "./ToDo";

const ToDoList = () => {
  const toDos = useRecoilValue(toDoSelector);
  const [category, setCategory] = useRecoilState(categoryState);
  const [categories, setCategories] = useRecoilState(categoriesState);
  const onInput = (e: React.FormEvent<HTMLSelectElement>) => {
    setCategory(e.currentTarget.value as any);
  };
  return (
    <div>
      <h1>To Dos</h1>
      <hr />
      <select value={category} onInput={onInput}>
        {categories.map((category) => (
          <option key={category}>{category}</option>
        ))}
      </select>
      <button
        onClick={() => {
          const newCategory = prompt("추가할 카테고리를 입력해 주세요.", "");
          if (newCategory === null || newCategory === "") {
            return alert("카테고리 값을 입력해주세요.");
          } else {
            const newCategories = [...categories, newCategory];
            setCategories(newCategories);
            localStorage.setItem("categories", JSON.stringify(newCategories));
          }
        }}
      >
        카테고리 추가
      </button>
      <hr />
      <CreateToDo />
      {toDos?.map((toDo) => (
        <ToDo key={toDo.id} {...toDo} />
      ))}
    </div>
  );
};

export default ToDoList;
