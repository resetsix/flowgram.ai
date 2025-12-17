/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */

import { FlowNodeRegistry } from '@flowgram.ai/free-layout-editor';

import { formMeta } from './form-meta';

export const BlockEndNodeRegistry: FlowNodeRegistry = {
  type: 'block_end',
  meta: {
    isNodeEnd: true,
    deleteDisable: true,
    copyDisable: true,
    sidebarDisabled: true,
    nodePanelVisible: false,
    defaultPorts: [{ type: 'input' }],
    size: {
      width: 100,
      height: 100,
    },
    wrapperStyle: {
      minWidth: 'unset',
      width: '100%',
      borderWidth: 2,
      cursor: 'move',
    },
  },
  /**
   * Render node via formMeta
   */
  formMeta,
  /**
   * Start Node cannot be added
   */
  canAdd() {
    return false;
  },
};
