import React from "react";
import { Text, View, Animated, Image } from "react-native";
import Constants from "./constants";
import update from "immutability-helper";
import { PanGestureHandler } from "react-native-gesture-handler";
import Todo from "./todo";
import Data from "../src/data";
import { sampleSize, range } from "lodash";
import Store from "./store";
import * as Haptics from "expo-haptics";
import Marker from "./marker";
import Settings from "./settings";
import {track, events, identify} from "./analytics"

export default class TodoList extends React.Component {
  lineWidth = new Animated.Value(0);
  fade = new Animated.Value(0);
  pull = new Animated.Value(0);
  lineX = new Animated.Value(0);
  lineY = new Animated.Value(0);

  constructor(props) {
    super(props);
    this.state = {
      data: [],
      style: 0,
      lines: [],
      panRight: false,
      panTodo: 0
    };
    this.load();
  }

  componentDidMount() {
    identify()
  }

  handleGesture = evt => {
    if (this.state.useMarker) {
      this.lineWidth.setValue(Math.abs(evt.nativeEvent.translationX));
      this.fade.setValue(
        Math.abs(evt.nativeEvent.translationX) / Constants.screenWidth
      );
      this.setState({ panRight: evt.nativeEvent.translationX > 0 });
    } else if (!this.state.showSettings && evt.nativeEvent.translationY > 0) {
      this.pull.setValue(evt.nativeEvent.translationY);
    } else if (this.state.showSettings && evt.nativeEvent.translationY < 0) {
      this.pull.setValue(Constants.screenHeight + evt.nativeEvent.translationY);
    }
  };

  onStartSwipe = evt => {
    Haptics.selectionAsync();
    this.lineX.setValue(evt.x);
    this.lineY.setValue(evt.y);
    const panTodo = Math.floor(
      ((evt.y - Constants.statusBarHeight + 10) /
        (Constants.screenHeight - Constants.statusBarHeight)) *
        Constants.todos
    );
    this.setState({
      useMarker: true,
      showSettings: false,
      style: Math.floor(Math.random() * Constants.todos),
      panTodo
    });
  };

  onStartPull = evt => {
    // this.setState({ useMarker: false});
  };

  onCancelPull = () => {
    Animated.spring(this.pull, {
      toValue: this.state.showSettings ? Constants.screenHeight : 0,
      duration: 200
    }).start();
  };

  onEndPull = () => {
    Animated.timing(this.pull, {
      toValue: this.state.showSettings ? 0 : Constants.screenHeight,
      duration: 300
    }).start();
    this.setState(prevState => ({ showSettings: !prevState.showSettings }));
  };

  onCancelSwipe = evt => {
    Animated.timing(this.lineWidth, {
      toValue: 0,
      duration: 500
    }).start();
    Animated.timing(this.fade, {
      toValue: 0,
      duration: 500
    }).start();
    this.setState({ useMarker: false });
  };

  onEndSwipe = evt => {
    const newLine = {
      startX: this.state.panRight
        ? this.lineX._value
        : Constants.screenWidth - this.lineX._value,
      startY: this.lineY._value,
      width: this.lineWidth._value,
      style: this.state.style,
      direction: this.state.panRight
    };
    this.lineWidth.setValue(0);
    const newData = update(this.state.data, {
      [this.state.panTodo]: { done: { $set: true } }
    });
    this.setState(
      {
        useMarker: false,
        data: newData,
        lines: [...this.state.lines, newLine]
      },
      () => {
        this.onCompleteTodo(this.state.panTodo);
        this.save()
      }
    );
  };

  onMarkDone = (idx) => {
    const newData = update(this.state.data, {
      [idx]: { done: { $set: true } }
    });
    this.setState(
      {
        data: newData,
      },
      () => {
        this.onCompleteTodo(idx);
        this.save()
      }
    );
  }

  onCompleteTodo = (idx) => {
    const {index, pack, text} = this.state.data[idx];
    const allDone = this.state.data.map(d => d.done).every(Boolean)
    track(events.COMPLETE, {index, pack, text})
    if (allDone && this.state.isTutorial) {
      track(events.COMPLETE_TUTORIAL)
      Store.save("tutorialCompleted", true);
      this.refreshTodos();
    }
  }

  onGestureStateChange = evt => {
    const { nativeEvent } = evt;
    if (nativeEvent.oldState === 0 && nativeEvent.state === 2) {
      if (
        !this.state.showSettings &&
        Math.abs(nativeEvent.velocityX) > Math.abs(nativeEvent.velocityY) * 0.6
      ) {
        this.onStartSwipe(nativeEvent);
      } else if (nativeEvent.velocityY > 0) {
        this.onStartPull(nativeEvent);
      }
    }
    if (nativeEvent.oldState === 4 && nativeEvent.state === 5) {
      const up = this.state.showSettings ? -1 : 1
      if (this.state.useMarker) {
        if (Math.abs(nativeEvent.translationX) < Constants.screenWidth * 0.2) {
          this.onCancelSwipe();
        } else {
          this.onEndSwipe();
        }
      } else {
        if (nativeEvent.translationY * up < 150) {
          this.onCancelPull();
        } else {
          this.onEndPull();
        }
      }
    }
  };

  renderMarker() {
    const { panRight } = this.state;
    return (
      <Marker
        startX={
          panRight
            ? this.lineX
            : Animated.subtract(Constants.screenWidth, this.lineX)
        }
        startY={this.lineY}
        width={this.lineWidth}
        direction={panRight}
        style={this.state.style}
      />
    );
  }

  getTodos = (pack, n) => {
    return sampleSize(range(Data[pack].length), n).map(i => ({
      index: i,
      text: Data[pack][i],
      done: false,
      pack: pack
    }));
  };

  getDate = () => new Date().toISOString().substr(0, 10);

  save = () => {
    const { data, lines, date, palette } = this.state;
    Store.save(Constants.namespace, { data, lines, date, palette });
  };

  load = async () => {
    const tutorialCompleted = await Store.get("tutorialCompleted2");
    if (!tutorialCompleted) {
      this.loadTutorial();
      return;
    }
    const result = await Store.get(Constants.namespace);
    if (result && result.date === this.getDate()) {
      this.setState(result);
    } else {
      this.refreshTodos();
    }
  };

  loadTutorial = () => {
    const data = Data.tutorial.map((text, index) => ({
      index, text,
      done: false,
      pack: "tutorial"
    }))
    this.setState({ data, lines: [], date: this.getDate(), isTutorial: true, palette: "default" });
  }

  refreshTodos = () => {
    this.setState({ data: this.getTodos("basic", Constants.todos), lines: [], date: this.getDate(), panTodo: null }, () => {
      this.save();
    });
  };

  pickPalette = palette => {
    this.setState({palette}, () => this.save())
    track(events.PICK_THEME, {palette})
    this.onEndPull();
  }

  render() {
    const todos = this.state.data.map((todo, index) => (
      <Todo
        key={index.toString()}
        palette={this.state.palette}
        {...todo}
        index={index}
        fade={this.state.panTodo === index ? this.fade : null}
        onComplete={() => this.onMarkDone(index)}
      />
    ));

    return (
      <PanGestureHandler
        onGestureEvent={this.handleGesture}
        onHandlerStateChange={this.onGestureStateChange}
      >
        <Animated.View
          style={{ width: "100%", transform: [{ translateY: this.pull }] }}
        >
          <Settings
            onPickPalette={this.pickPalette}
            activePalette={this.state.palette}
            onReshuffle={() => {this.refreshTodos(); this.onEndPull();}}
            style={{ position: "absolute", top: -Constants.screenHeight }}
          />
          {todos}
          {this.state.lines.map((line, idx) => (
            <Marker {...line} key={idx.toString()} />
          ))}
          {this.renderMarker()}
        </Animated.View>
      </PanGestureHandler>
    );
  }
}
