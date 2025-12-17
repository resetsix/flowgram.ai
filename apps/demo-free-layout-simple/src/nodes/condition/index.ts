/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */

import { FlowNodeRegistry } from '@flowgram.ai/free-layout-editor';

import { formMeta } from './form-meta';

export const ConditionNodeRegistry: FlowNodeRegistry = {
  type: 'condition',
  meta: {
    defaultPorts: [{ type: 'input' }],
  },
  formMeta,
};
