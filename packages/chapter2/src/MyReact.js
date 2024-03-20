import { createHooks } from './hooks';
import { render as updateElement, createElement } from './render';

function MyReact() {
  const _render = () => {};

  function render($root, rootComponent) {
    const jsx = rootComponent();
    const element = createElement(jsx);

    $root.appendChild(element);
  }

  const {
    useState,
    useMemo,
    resetContext: resetHookContext,
  } = createHooks(_render);

  return { render, useState, useMemo };
}

export default MyReact();
