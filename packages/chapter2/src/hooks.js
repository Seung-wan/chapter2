export function createHooks(callback) {
  let options = {
    states: [],
    currentStateIndex: 0,
    memos: [],
    currentMemoIndex: 0,
  };

  const useState = (initState) => {
    const { currentStateIndex, states } = options;
    if (states.length === currentStateIndex) {
      states.push(initState);
    }

    const state = states[currentStateIndex];
    const setter = (newState) => {
      states[currentStateIndex] = newState;
    };

    options.currentStateIndex += 1;

    return [state, setter];
  };

  const useMemo = (fn, refs) => {
    let { memos, memoDeps, currentMemoIndex } = options;

    if (memos[currentMemoIndex] === undefined) {
      const nextValue = fn();

      memos[currentMemoIndex] = [nextValue, refs];
      currentMemoIndex += 1;

      return nextValue;
    }

    const nextRefs = refs;
    const [prevValue, prevRefs] = memos[currentMemoIndex];
    if (prevRefs.every((prev, idx) => prev === nextRefs[idx])) {
      currentMemoIndex += 1;
      return prevValue;
    }

    const nextValue = fn();

    memos[currentMemoIndex] = [nextValue, nextRefs];
    currentMemoIndex += 1;
    return nextValue;
  };

  const resetContext = () => {
    options.currentMemoIndex = 0;
    options.currentStateIndex = 0;
  };

  return { useState, useMemo, resetContext };
}
