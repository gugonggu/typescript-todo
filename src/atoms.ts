import { atom, selector } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist({
  key: "toDos",
  storage: localStorage,
});

export interface IToDo {
  text: string;
  id: number;
  category: string;
}

export const categoryState = atom({
  key: "category",
  default: "To Do",
});

export const categoriesState = atom({
  key: "categories",
  default:
    localStorage.getItem("categories") === null
      ? ["To Do", "Doing", "Done"]
      : (JSON.parse(localStorage.getItem("categories") as string) as string[]),
});

export const toDoState = atom<IToDo[]>({
  key: "toDo",
  default: [],
  effects_UNSTABLE: [persistAtom],
});

export const toDoSelector = selector({
  key: "toDoSelector",
  get: ({ get }) => {
    const toDos = get(toDoState);
    const category = get(categoryState);
    return toDos.filter((toDo) => toDo.category === category);
  },
});
