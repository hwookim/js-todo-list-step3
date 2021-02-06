import { createElement } from "../../utils/createElement.js";
import $store from "../../store/index.js";

const template = `
  <input
    class="new-todo"
    placeholder="할 일을 입력해주세요."
    autofocus
  />
`;

export default function TodoInput({ _id }) {
  const dom = createElement(template);

  const init = () => {
    dom.addEventListener("keypress", onAddTodo);
  };

  const onAddTodo = async ({ target, key }) => {
    if (key !== "Enter") {
      return;
    }

    const contents = target.value.trim();
    if (contents.length < 2) {
      return;
    }

    await $store.todo.create(_id, contents);
    target.value = "";
  };

  init();

  return dom;
}
