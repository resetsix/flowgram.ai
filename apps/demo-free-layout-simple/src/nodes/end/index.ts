/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */

/**
 * Copyright (c) 2025 Bytedance Ltd. and/or affiliates
 * SPDX-License-Identifier: MIT
 */

import { FlowNodeRegistry } from '@flowgram.ai/free-layout-editor';

export const EndNodeRegistry: FlowNodeRegistry = {
  type: 'end',
  meta: {
    deleteDisable: true,
    copyDisable: true,
    defaultPorts: [{ type: 'input' }],
  },
};
