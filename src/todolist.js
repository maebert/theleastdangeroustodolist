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
import Themes from "./themes";

const TodoList = () => {
  fade = useRef(new Animated.Value(0)).current;
  pull = useRef(new Animated.Value(0)).current;
  mask = useRef(new Animated.Value(0)).current;

  const getDate = () => new Date().toISOString().substr(0, 10);
  const marker = useMarker();

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
    console.log("cancel pull");
    Animated.spring(pull, {
      toValue: showSettings ? Constants.screenHeight : 0,
      duration: 200,
    }).start();
  };

  const onEndPull = () => {
    console.log("end pull");
    Animated.timing(pull, {
      toValue: showSettings ? 0 : Constants.screenHeight,
      duration: 300,
    }).start();
    setShowSettings(!showSettings);
  };

  const onMarkDone = (idx) => {
    const newData = update(data, {
      [idx]: { done: { $set: true } },
    });
    setData(newData);
    onCompleteTodo(idx);
    save();
  };

  const replaceTodos = () => {
    Animated.timing(mask, {
      toValue: 1,
      duration: 500,
    }).start(() => {
      refreshTodos();
      Animated.timing(mask, {
        toValue: 0.0,
        duration: 500,
      }).start();
    });
  };

  const onCompleteTodo = (idx) => {
    const { index, pack, text } = data[idx];
    const allDone = data.map((d) => d.done).every(Boolean);
    track(events.COMPLETE, { index, pack, text });
    if (allDone && isTutorial) {
      track(events.COMPLETE_TUTORIAL);
      Store.save("tutorialCompleted", true);
      replaceTodos();
    }
  };

  const onEndDrawing = () => {
    const newLine = marker.endDrawing();
    setLines((prev) => [...prev, newLine]);
    onMarkDone(marker.activeTodo);
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
          marker.cancelDrawing();
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
    save();
  };

  const pickTheme = (theme) => {
    setTheme(theme);
    save();
    track(events.PICK_THEME, { theme });
    onEndPull();
  };

  const renderMask = () => (
    <Animated.View
      pointerEvents="none"
      style={{
        opacity: mask,
        position: "absolute",
        top: 0,
        left: 0,
        height: Constants.screenHeight,
        width: Constants.screenWidth,
      }}
    >
      {Themes[theme || "default"].map((color, index) => (
        <View
          style={{
            backgroundColor: color,
            paddingTop: index === 0 ? Constants.statusBarHeight : 0,
            height:
              Constants.itemHeight +
              (index === 0 ? Constants.statusBarHeight : 0),
          }}
          key={color}
        />
      ))}
    </Animated.View>
  );

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
        {marker.render()}
        {renderMask()}
      </Animated.View>
    </PanGestureHandler>
  );
};

export default TodoList;
