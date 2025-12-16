/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */

import { WorkflowNodeRegistry } from '@flowgram.ai/free-layout-editor';

import { LoopNodeRegistry } from './nodes/loop';
import { BlockStartNodeRegistry } from './nodes/block-start';
import { BlockEndNodeRegistry } from './nodes/block-end';
import { BatchFunctionNodeRegistry } from './nodes/batch-function';
import { BatchNodeRegistry } from './nodes/batch';

/**
 * You can customize your own node registry
 * 你可以自定义节点的注册器
 */
export const nodeRegistries: WorkflowNodeRegistry[] = [
  {
    type: 'start',
    meta: {
      isStart: true, // Mark as start
      deleteDisable: true, // The start node cannot be deleted
      copyDisable: true, // The start node cannot be copied
      defaultPorts: [{ type: 'output' }], // Used to define the input and output ports, the start node only has the output port
    },
  },
  {
    type: 'end',
    meta: {
      deleteDisable: true,
      copyDisable: true,
      defaultPorts: [{ type: 'input' }],
    },
  },
  {
    type: 'custom',
    meta: {},
    defaultPorts: [{ type: 'output' }, { type: 'input' }], // A normal node has two ports
  },
  LoopNodeRegistry,
  BlockStartNodeRegistry,
  BlockEndNodeRegistry,
  BatchNodeRegistry,
  BatchFunctionNodeRegistry,
];
