/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */

'use strict';

export const coordinateSystem = {
  adjust,
  undo,
};

export default coordinateSystem;

function adjust(g) {
  let rankDir = g.graph().rankdir.toLowerCase();
  if (rankDir === 'lr' || rankDir === 'rl') {
    swapWidthHeight(g);
  }
}

function undo(g) {
  let rankDir = g.graph().rankdir.toLowerCase();
  if (rankDir === 'bt' || rankDir === 'rl') {
    reverseY(g);
  }

  if (rankDir === 'lr' || rankDir === 'rl') {
    swapXY(g);
    swapWidthHeight(g);
  }
}

function swapWidthHeight(g) {
  g.nodes().forEach((v) => swapWidthHeightOne(g.node(v)));
  g.edges().forEach((e) => swapWidthHeightOne(g.edge(e)));
}

function swapWidthHeightOne(attrs) {
  let w = attrs.width;
  attrs.width = attrs.height;
  attrs.height = w;
}

function reverseY(g) {
  g.nodes().forEach((v) => reverseYOne(g.node(v)));

  g.edges().forEach((e) => {
    let edge = g.edge(e);
    edge.points.forEach(reverseYOne);
    if (Object.hasOwn(edge, 'y')) {
      reverseYOne(edge);
    }
  });
}

function reverseYOne(attrs) {
  attrs.y = -attrs.y;
}

function swapXY(g) {
  g.nodes().forEach((v) => swapXYOne(g.node(v)));

  g.edges().forEach((e) => {
    let edge = g.edge(e);
    edge.points.forEach(swapXYOne);
    if (Object.hasOwn(edge, 'x')) {
      swapXYOne(edge);
    }
  });
}

function swapXYOne(attrs) {
  let x = attrs.x;
  attrs.x = attrs.y;
  attrs.y = x;
}
