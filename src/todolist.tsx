import React, { useState, useEffect, useRef } from "react";
import { View, Animated, GestureResponderEvent } from "react-native";
import Constants from "./constants";
import update from "immutability-helper";
import {
  PanGestureHandler,
  State as GestureState,
  PanGestureHandlerGestureEvent,
  PanGestureHandlerStateChangeEvent,
} from "react-native-gesture-handler";
import Todo from "./todo";
import Data, { Pack } from "./generated/data";
import { sampleSize, range } from "lodash";
import Store from "./store";
import Marker, { useMarker, Line } from "./marker";
import Settings from "./settings";
import { track, events, identify } from "./analytics";
import useMask from "./mask";
import Colors, { Theme } from "./themes";

type TodoData = {
  index: number;
  text: string;
  done: boolean;
  pack: Pack;
};

const TodoList = () => {
  const fade = useRef(new Animated.Value(0)).current;
  const pull = useRef(new Animated.Value(0)).current;

  const getDate = () => new Date().toISOString().substr(0, 10);
  const marker = useMarker();
  const ActiveMarker = marker.render;
  const { conceal, Mask } = useMask();

  const [data, setData] = useState<TodoData[] | null>(null);
  const [isTutorial, setIsTutorial] = useState(false);
  const [date, setDate] = useState(getDate());
  const [lines, setLines] = useState<Line[]>([]);
  const [theme, setTheme] = useState<Theme>(Theme.Default);
  const [showSettings, setShowSettings] = useState(false);

  const onUndo = (idx: number) => {
    setLines((prev) => prev.filter((l) => l.todo !== idx));
    setData((data) =>
      update(data, {
        [idx]: { done: { $set: false } },
      })
    );
  };

  const todos = data?.map((todo: TodoData, index: number) => (
    <Todo
      key={index.toString()}
      color={Colors[theme][index]}
      {...todo}
      index={index}
      onUndo={() => onUndo(index)}
      fade={marker.activeTodo === index ? fade : null}
    />
  ));

  const handleGesture = (evt: PanGestureHandlerGestureEvent) => {
    if (marker.isDrawing) {
      const length = evt.nativeEvent.translationX;
      marker.setLength(length);
      fade.setValue(Math.abs(length) / Constants.screenWidth);
    } else if (!showSettings && evt.nativeEvent.translationY > 0) {
      pull.setValue(evt.nativeEvent.translationY);
    } else if (showSettings && evt.nativeEvent.translationY < 0) {
      pull.setValue(Constants.screenHeight + evt.nativeEvent.translationY);
    }
  };

  const onStartPull = () => {
    // setState({ useMarker: false});
  };

  const onCancelPull = () => {
    Animated.spring(pull, {
      toValue: showSettings ? Constants.screenHeight : 0,
      useNativeDriver: true,
    }).start();
  };

  const onEndPull = () => {
    Animated.timing(pull, {
      toValue: showSettings ? 0 : Constants.screenHeight,
      duration: 300,
      useNativeDriver: true,
    }).start();
    setShowSettings(!showSettings);
  };

  const onMarkDone = (idx: number) => {
    setData((data) =>
      update(data, {
        [idx]: { done: { $set: true } },
      })
    );
    onCompleteTodo(idx);
  };

  const replaceTodos = () => {
    conceal(refreshTodos);
  };

  const onCompleteTodo = (idx: number) => {
    if (!data) return;
    const { index, pack, text } = data[idx];
    track(events.COMPLETE, { index, pack, text });
  };

  const onEndDrawing = () => {
    const newLine = marker.endDrawing();
    setLines((prev) => [...prev, newLine]);
    marker.activeTodo !== null && onMarkDone(marker.activeTodo);
  };

  const onCancelDrawing = () => {
    Animated.timing(fade, {
      toValue: 0,
      duration: 500,
      useNativeDriver: false,
    }).start();
    marker.cancelDrawing();
  };

  const onGestureStateChange = (evt: PanGestureHandlerStateChangeEvent) => {
    const { nativeEvent } = evt;
    if (
      nativeEvent.oldState === GestureState.UNDETERMINED &&
      nativeEvent.state === GestureState.BEGAN
    ) {
      if (
        !showSettings &&
        Math.abs(nativeEvent.velocityX) > Math.abs(nativeEvent.velocityY) * 0.6
      ) {
        marker.startDrawing(nativeEvent.x, nativeEvent.y);
      } else if (nativeEvent.velocityY > 0) {
        onStartPull();
      }
    }
    if (
      nativeEvent.oldState === GestureState.ACTIVE &&
      nativeEvent.state === GestureState.END
    ) {
      const up = showSettings ? -1 : 1;
      if (marker.isDrawing) {
        if (Math.abs(nativeEvent.translationX) < Constants.screenWidth * 0.2) {
          onCancelDrawing();
        } else {
          onEndDrawing();
        }
      } else {
        if (nativeEvent.translationY * up < 150) {
          onCancelPull();
        } else {
          onEndPull();
        }
      }
    }
  };

  const getTodos = (pack: Pack, n: number): TodoData[] => {
    const tasks = Data.filter((t) => t.pack === pack);
    return sampleSize(tasks, n).map((task, index) => ({
      index,
      text: task.text,
      done: false,
      pack: pack,
    }));
  };

  const save = () => {
    Store.save(Constants.namespace, { data, lines, date, theme });
  };

  const load = async () => {
    const tutorialCompleted = await Store.get("tutorialCompleted?1");
    if (!tutorialCompleted) {
      loadTutorial();
      return;
    }
    const result = await Store.get(Constants.namespace);
    if (result && result.date === getDate()) {
      const { data, date, lines, theme } = result;
      setData(data);
      setDate(date);
      setLines(lines);
      setTheme(theme);
    } else {
      refreshTodos();
    }
  };

  const loadTutorial = () => {
    const tasks = Data.filter((t) => t.pack === "Tutorial");
    const data = tasks
      .sort((a, b) => a.id.localeCompare(b.id))
      .map((todo, index) => ({
        index,
        text: todo.text,
        done: false,
        pack: "tutorial",
      }));
    setData(data);
    setLines([]);
    setDate(getDate());
    setIsTutorial(true);
    setTheme(Theme.Default);
  };

  const refreshTodos = () => {
    setData(getTodos("Basic", Constants.todos));
    setLines([]);
    setDate(getDate());
  };

  const pickTheme = (theme: Theme) => {
    setTheme(theme);
    save();
    track(events.PICK_THEME, { theme });
    onEndPull();
  };

  useEffect(() => {
    // load
    if (data !== null) return;
    load();
    identify();
  });

  useEffect(() => {
    // all done
    if (!data) return;
    const allDone = data.map((d) => d.done).every(Boolean);
    if (allDone) {
      track(events.COMPLETE_TUTORIAL);
      Store.save("tutorialCompleted", true);
      replaceTodos();
    }
  }, [data, track, Store, replaceTodos, save]);

  useEffect(() => {
    // save when new data or lines change
    if (!data || !lines) return;
    save();
  }, [data, lines, save]);

  return (
    <PanGestureHandler
      onGestureEvent={handleGesture}
      onHandlerStateChange={onGestureStateChange}
    >
      <Animated.View
        style={{ width: "100%", transform: [{ translateY: pull }] }}
      >
        <Settings
          onPickTheme={pickTheme}
          activeTheme={theme}
          onReshuffle={() => {
            refreshTodos();
            onEndPull();
          }}
        />
        {todos}
        {lines.map((line, idx) => (
          <Marker {...line} key={idx} />
        ))}

        <ActiveMarker />
        <Mask theme={theme} />
      </Animated.View>
    </PanGestureHandler>
  );
};

export default TodoList;
