import React, { useState, useEffect, useRef } from "react";
import { Animated } from "react-native";
import update from "immutability-helper";
import * as Haptics from "expo-haptics";
import SwatchModal from "./swatch-modal";
import IAPModal from "./iap-modal";

import {
  PanGestureHandler,
  State as GestureState,
  PanGestureHandlerGestureEvent,
  PanGestureHandlerStateChangeEvent,
} from "react-native-gesture-handler";
import TodoBlock from "./todo";
import CustomTodo from "./custom-todo";
import Settings from "./settings";
import Marker from "./marker";
import EndOfDay from "./end-of-day";
import { Line, TodoData, Theme } from "../types";
import { Constants, Store, Analytics } from "../util";
import { useMarker, useTheme, useMask, useTasks, useSettings } from "../hooks";

const TodoList = () => {
  const fade = useRef(new Animated.Value(0)).current;
  const pull = useRef(new Animated.Value(0)).current;

  const getDate = () => new Date().toISOString().substr(0, 10);
  const marker = useMarker();

  const { hardcore, addTodo, customTodo, dispatch } = useSettings();

  const ActiveMarker = marker.render;
  const { conceal, Mask } = useMask();
  const { getTodos, getTutorial } = useTasks();
  const { theme, setTheme } = useTheme();

  const [showThemes, setShowThemes] = useState(false);
  const [showIAP, setShowIAP] = useState(false);

  const [data, setData] = useState<TodoData[] | null>(null);
  const [isTutorial, setIsTutorial] = useState(false);
  const [doneForToday, setDoneForToday] = useState(false);
  const [date, setDate] = useState(getDate());
  const [lines, setLines] = useState<Line[]>([]);
  const [showSettings, setShowSettings] = useState(false);

  const onUndo = (idx: number) => {
    Haptics.impactAsync();
    setLines((prev) => prev.filter((l) => l.todo !== idx));
    setData((data) =>
      update(data, {
        [idx]: { done: { $set: false } },
      })
    );
  };

  const renderTodos = () => {
    if (!data) return null;

    const dataToRender =
      (addTodo ? data?.slice(0, data.length - 1) : data) || [];
    const todos = dataToRender.map((todo: TodoData, index: number) => (
      <TodoBlock
        key={index.toString()}
        {...todo}
        index={index}
        onUndo={() => onUndo(index)}
        fade={marker.activeTodo === index ? fade : null}
      />
    ));
    if (true)
      return [
        ...todos,
        <CustomTodo
          key="custom"
          done={data[data.length - 1].done}
          index={data.length - 1}
          onUndo={() => onUndo(data.length - 1)}
          fade={marker.activeTodo === data.length - 1 ? fade : null}
        />,
      ];
    return todos;
  };

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
    Analytics.track(Analytics.events.COMPLETE, { index, pack, text });
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
        Math.abs(nativeEvent.velocityX) >
          Math.abs(nativeEvent.velocityY) * 0.6 &&
        !(
          addTodo &&
          !customTodo &&
          marker.getActiveTodo(nativeEvent.y) === Constants.todos - 1
        )
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
    } else {
      refreshTodos();
    }
  };

  const loadTutorial = () => {
    setData(getTutorial());
    setLines([]);
    setDate(getDate());
    setIsTutorial(true);
    setTheme(Theme.Default);
  };

  const refreshTodos = () => {
    setIsTutorial(false);
    setDoneForToday(false);
    setData(getTodos("Basic"));
    dispatch({ customTodo: "" });
    setLines([]);
    setDate(getDate());
  };

  useEffect(() => {
    // load
    if (data !== null) return;
    load();
    Analytics.identify();
  });

  useEffect(() => {
    // all todos done
    if (!data) return;
    const allDone = data.map((d) => d.done).every(Boolean);
    if (allDone && isTutorial) {
      Analytics.track(Analytics.events.COMPLETE_TUTORIAL);
      Store.save("tutorialCompleted", true);
      replaceTodos();
    } else if (allDone) {
      setDoneForToday(true);
    } else {
      setDoneForToday(false);
    }
  }, [data]);

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
          onReshuffle={() => {
            refreshTodos();
            onEndPull();
          }}
          onShowThemes={() => setShowThemes(true)}
          onShowIAP={() => setShowIAP(true)}
        />
        {renderTodos()}
        {lines.map((line, idx) => (
          <Marker {...line} key={idx} />
        ))}

        <ActiveMarker />
        <Mask />
        <EndOfDay
          visible={doneForToday}
          onClick={hardcore ? refreshTodos : () => setShowIAP(true)}
        />
        <SwatchModal
          visible={showThemes}
          onHide={() => setShowThemes(false)}
          color={theme[2]}
        />
        <IAPModal
          visible={showIAP}
          onHide={() => setShowIAP(false)}
          color={theme[3]}
        />
      </Animated.View>
    </PanGestureHandler>
  );
};

export default TodoList;
