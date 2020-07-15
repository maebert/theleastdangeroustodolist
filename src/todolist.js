import React, { useState, useEffect, useRef } from "react";
import { View, Animated } from "react-native";
import Constants from "./constants";
import update from "immutability-helper";
import {
  PanGestureHandler,
  State as GestureState,
} from "react-native-gesture-handler";
import Todo from "./todo";
import Data from "../src/data";
import { sampleSize, range } from "lodash";
import Store from "./store";
import Marker, { useMarker } from "./marker";
import Settings from "./settings";
import { track, events, identify } from "./analytics";
import useMask from "./mask";

const TodoList = () => {
  fade = useRef(new Animated.Value(0)).current;
  pull = useRef(new Animated.Value(0)).current;

  const getDate = () => new Date().toISOString().substr(0, 10);
  const marker = useMarker();
  const ActiveMarker = marker.render;
  const { conceal, Mask } = useMask();

  const [data, setData] = useState(null);
  const [isTutorial, setIsTutorial] = useState(false);
  const [date, setDate] = useState(getDate());
  const [lines, setLines] = useState([]);
  const [theme, setTheme] = useState("default");
  const [showSettings, setShowSettings] = useState(false);

  const todos = data?.map((todo, index) => (
    <Todo
      key={index.toString()}
      theme={theme}
      {...todo}
      index={index}
      fade={marker.activeTodo === index ? fade : null}
      onComplete={() => onMarkDone(index)}
    />
  ));

  useEffect(() => {
    if (data !== null) return;
    load();
    identify();
  });

  useEffect(() => {
    if (!data) return;
    const allDone = data.map((d) => d.done).every(Boolean);
    if (allDone) {
      track(events.COMPLETE_TUTORIAL);
      Store.save("tutorialCompleted", true);
      replaceTodos();
    }
  }, [data, track, Store, replaceTodos, save]);

  useEffect(() => {
    if (!data || !lines) return;
    save();
  }, [data, lines, save]);

  const handleGesture = (evt) => {
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

  const onStartPull = (evt) => {
    // setState({ useMarker: false});
  };

  const onCancelPull = () => {
    Animated.spring(pull, {
      toValue: showSettings ? Constants.screenHeight : 0,
      duration: 200,
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

  const onMarkDone = (idx) => {
    const newData = update(data, {
      [idx]: { done: { $set: true } },
    });
    setData(newData);
    onCompleteTodo(idx);
  };

  const replaceTodos = () => {
    conceal(refreshTodos);
  };

  const onCompleteTodo = (idx) => {
    const { index, pack, text } = data[idx];
    track(events.COMPLETE, { index, pack, text });
  };

  const onEndDrawing = () => {
    const newLine = marker.endDrawing();
    setLines((prev) => [...prev, newLine]);
    onMarkDone(marker.activeTodo);
  };

  const onCancelDrawing = () => {
    Animated.timing(fade, {
      toValue: 0,
      duration: 500,
      useNativeDriver: false,
    }).start();
    marker.cancelDrawing();
  };

  const onGestureStateChange = (evt) => {
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
        onStartPull(nativeEvent);
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

  const getTodos = (pack, n) =>
    sampleSize(range(Data[pack].length), n).map((i) => ({
      index: i,
      text: Data[pack][i],
      done: false,
      pack: pack,
    }));

  const save = () => {
    Store.save(Constants.namespace, { data, lines, date, theme });
  };

  const load = async () => {
    const tutorialCompleted = await Store.get("tutorialCompleted");
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
    const data = Data.tutorial.map((text, index) => ({
      index,
      text,
      done: false,
      pack: "tutorial",
    }));
    setData(data);
    setLines([]);
    setDate(getDate());
    setIsTutorial(true);
    setTheme("default");
  };

  const refreshTodos = () => {
    setData(getTodos("basic", Constants.todos));
    setLines([]);
    setDate(getDate());
  };

  const pickTheme = (theme) => {
    setTheme(theme);
    save();
    track(events.PICK_THEME, { theme });
    onEndPull();
  };

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
          style={{ position: "absolute", top: -Constants.screenHeight }}
        />
        {todos}
        {lines.map((line, idx) => (
          <Marker {...line} key={idx.toString()} />
        ))}
        <ActiveMarker />
        <Mask theme={theme} />
      </Animated.View>
    </PanGestureHandler>
  );
};

export default TodoList;
