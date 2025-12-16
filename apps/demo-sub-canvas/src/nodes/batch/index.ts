/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */

import { FlowNodeRegistry } from '@flowgram.ai/free-layout-editor';

import { getBatchFunctionID } from '../batch-function';

export const BatchNodeRegistry: FlowNodeRegistry = {
  type: 'batch',
  meta: {
    defaultPorts: [
      { type: 'input' },
      { type: 'output', portID: 'batch-output' },
      {
        type: 'output',
        portID: 'batch-output-to-function',
        location: 'bottom',
      },
    ],
  },
  onCreate(node, json) {
    node.onDispose(() => {
      node.document.getNode(getBatchFunctionID(node.id))?.dispose();
    });
  },
};
