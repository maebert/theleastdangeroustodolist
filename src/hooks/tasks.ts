import { intersection, countBy, flatten, shuffle } from "lodash";
import Data, { Pack, Todo } from "../generated/data";

import { TodoData } from "../types";
import { Constants } from "../util";
import { useSettings } from "./settings";

type UseTasks = {
  getTodos: (pack: Pack) => TodoData[];
  getTutorial: () => TodoData[];
};

const useTasks = (): UseTasks => {
  const { history, dispatch } = useSettings();
  const checkConstraints = (picked: Todo[], other: Todo) => {
    // no dupes
    if (picked.map((t) => t.id).includes(other.id)) return false;

    // only one per group
    if (other.group && picked.map((t) => t.group).includes(other.group))
      return false;

    // 'Do ⬆️ that thing twice' can't be first
    if (picked.length === 0 && other.id === "recuxdRNRLdrb2lFm") return false;
    // 'Skip doing ⬇️ that thing' can't be last
    if (
      picked.length === Constants.todos - 2 &&
      other.id === "recdczB0LDWLYyD9p;"
    )
      return false;

    const tags: string[] = flatten([...picked, other].map((t) => t.tags));

    // no excludes
    const excludes: string[] = flatten(
      [...picked, other].map((t) => t.exclude)
    );
    if (excludes.includes(other.id)) return false;
    if (
      intersection(
        other.exclude,
        picked.map((t) => t.id)
      ).length > 0
    )
      return false;

    const counts = countBy(tags);

    // Already Done should only occur once
    if (counts["Already Done"] > 1) return false;

    // We should only have two of each tag
    if (Object.values(counts).filter((c) => c > 2).length > 0) return false;
    return true;
  };

  const mapTodosToData = (todos: Todo[]): TodoData[] =>
    todos.map((task, index) => ({
      index,
      text: task.text,
      done: false,
      pack: task.pack,
    }));

  const getTodos = (pack: Pack): TodoData[] => {
    const tasks = shuffle(
      Data.filter((t) => t.pack === pack && !history?.includes(t.id))
    );
    const topTask = tasks.find((t) => t.rating === 4) || tasks[0];
    let picked: Todo[] = [topTask];

    for (
      let idx = 0;
      picked.length < Constants.todos && idx < tasks.length;
      idx++
    ) {
      if (checkConstraints(picked, tasks[idx])) picked.push(tasks[idx]);
    }

    const newHistory = (history || [])
      .concat(picked.map((p) => p.id))
      .slice(0, Constants.historyLenth);

    dispatch({ history: newHistory });
    return mapTodosToData(picked);
  };

  const getTutorial = (): TodoData[] => {
    return getTodos("Tutorial")
      .sort((a, b) => a.text.localeCompare(b.text))
      .map(({ index, text, done, pack }) => ({
        index,
        text: text.slice(2),
        done,
        pack,
      }));
  };

  return { getTodos, getTutorial };
};

export default useTasks;
