import { createElement } from "../../utils/createElement.js";
import $api from "../../api/index.js";

import TodoContainer from "./TodoContainer.js";

const template = `
  <div>
    <h1>
      <span><strong class="team-name">Team</strong>'s Todo List</span>
    </h1>
    <ul class="todoapp-list-container flex-column-container">
      <li class="add-user-button-container">
        <button id="add-user-button" class="ripple">
          <span class="material-icons">add</span>
        </button>
      </li>
    </ul>
  </div>
`;

export default function Kanban({ id }) {
  const dom = createElement(template);
  const teamName = dom.querySelector(".team-name");
  const todoContainer = dom.querySelector(".todoapp-list-container");
  const memberCreateBtn = dom.querySelector(".add-user-button-container");

  const init = async () => {
    memberCreateBtn.addEventListener("click", createMember);

    await render();
  };

  const render = async () => {
    const { name, members } = await $api.team.getById(id);

    teamName.innerText = name;
    todoContainer.innerHTML = "";
    members.forEach(renderEachMember);
    todoContainer.appendChild(memberCreateBtn);
  };

  const renderEachMember = (member) => {
    const todoListContainer = TodoContainer({ member });
    todoContainer.appendChild(todoListContainer);
  };

  const createMember = async () => {
    const name = prompt("멤버 이름을 입력해주세요").trim();
    if (name.length < 2) {
      alert("멤버의 이름은 최소 2글자 이상이어야 합니다.");
      return;
    }

    await $api.team.createMember(id, name);
    await render();
  };

  init();

  return dom;
}
