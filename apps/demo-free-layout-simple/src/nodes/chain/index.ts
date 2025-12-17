/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */

import { FlowNodeRegistry } from '@flowgram.ai/free-layout-editor';

export const ChainNodeRegistry: FlowNodeRegistry = {
  type: 'chain',
  meta: {
    defaultPorts: [
      { type: 'input' },
      { type: 'output' },
      {
        portID: 'p4',
        location: 'bottom',
        locationConfig: { left: '33%', bottom: 0 },
        type: 'output',
      },
      {
        portID: 'p5',
        location: 'bottom',
        locationConfig: { left: '66%', bottom: 0 },
        type: 'output',
      },
    ],
  },
};
