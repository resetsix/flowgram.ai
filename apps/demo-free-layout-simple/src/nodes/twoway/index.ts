/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */

import { FlowNodeRegistry } from '@flowgram.ai/free-layout-editor';

export const TwowayNodeRegistry: FlowNodeRegistry = {
  type: 'twoway',
  meta: {
    defaultPorts: [
      { type: 'input', portID: 'input-left', location: 'left' },
      { type: 'output', portID: 'output-left', location: 'left' },
      { type: 'input', portID: 'input-right', location: 'right' },
      { type: 'output', portID: 'output-right', location: 'right' },
    ],
  },
};
