import $api from "../../api/index.js";
import teamState from "./teamState.js";

const todoState = (() => {
  const subscriber = [];

  const getTodos = async (memberId) => {
    return await $api.team.getTodos(teamState.getCurrentTeamId(), memberId);
  };

  const createTodo = async (memberId, contents) => {
    await $api.team.createTodo(
      teamState.getCurrentTeamId(),
      memberId,
      contents
    );
    publish();
  };

  const subscribe = (method) => {
    subscriber.push(method);
  };

  const publish = () => {
    subscriber.forEach(async (method) => await method());
  };

  return {
    create: createTodo,
    subscribe,
    getAll: getTodos,
  };
})();

export default todoState;