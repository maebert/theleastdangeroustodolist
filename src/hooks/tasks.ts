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
  const { history, setNumber, dispatch } = useSettings();
  const checkConstraints = (picked: Todo[], other: Todo) => {
    // First task has to be good!
    if (picked.length === 0 && other.rating && other.rating < 4) return false;
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

    let picked: Todo[] = [];
    const onboardingTask = getOnBoardingTask(setNumber || 0);

    for (
      let idx = 0;
      picked.length < Constants.todos && idx < tasks.length;
      idx++
    ) {
      if (checkConstraints(picked, tasks[idx])) {
        picked.push(tasks[idx]);
        if (picked.length == 1 && onboardingTask) {
          picked.push(onboardingTask);
        }
      }
    }

    const newHistory = (history || [])
      .concat(picked.map((p) => p.id))
      .slice(0, Constants.historyLenth);

    dispatch({ history: newHistory, setNumber: (setNumber || 0) + 1 });
    return mapTodosToData(picked);
  };

  const getTutorial = (): TodoData[] => {
    return mapTodosToData(
      Data.filter((t) => t.pack === "Tutorial").sort((a, b) =>
        a.group.localeCompare(b.group)
      )
    );
  };

  const getOnBoardingTask = (day: number): Todo | undefined => {
    return Data.filter((t) => t.pack === "Onboarding").find(
      (p) => p.group === day.toString()
    );
  };

  return { getTodos, getTutorial };
};

export default useTasks;
