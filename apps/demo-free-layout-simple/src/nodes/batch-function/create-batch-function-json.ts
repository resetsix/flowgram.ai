/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */

import { IPoint, WorkflowNodeJSON, nanoid } from '@flowgram.ai/free-layout-editor';

export const createBatchFunctionJSON = (id: string, position: IPoint): WorkflowNodeJSON => ({
  id,
  type: 'batch_function',
  data: {},
  meta: {
    position,
  },
  blocks: [
    {
      id: `block_start_${nanoid(5)}`,
      type: 'block_start',
      meta: {
        position: {
          x: 32,
          y: 0,
        },
      },
      data: {},
    },
    {
      id: `block_end_${nanoid(5)}`,
      type: 'block_end',
      meta: {
        position: {
          x: 192,
          y: 0,
        },
      },
      data: {},
    },
  ],
});
