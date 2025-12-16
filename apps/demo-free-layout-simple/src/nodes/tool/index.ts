/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */

import { FlowNodeRegistry } from '@flowgram.ai/free-layout-editor';

export const ToolNodeRegistry: FlowNodeRegistry = {
  type: 'tool',
  meta: {
    defaultPorts: [{ location: 'top', type: 'input' }],
  },
};
