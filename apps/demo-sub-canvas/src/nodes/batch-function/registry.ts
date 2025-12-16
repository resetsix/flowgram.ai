/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */

import {
  WorkflowNodeEntity,
  PositionSchema,
  FlowNodeTransformData,
  FlowNodeRegistry,
} from '@flowgram.ai/free-layout-editor';

import { getBatchID } from './relation';
import { formMeta } from './form-meta';

export const BatchFunctionNodeRegistry: FlowNodeRegistry = {
  type: 'batch_function',
  meta: {
    defaultPorts: [{ type: 'input', location: 'top', portID: 'batch-function-input' }],
    /**
     * Mark as subcanvas
     * 子画布标记
     */
    isContainer: true,
    /**
     * The subcanvas default size setting
     * 子画布默认大小设置
     */

    size: {
      width: 424,
      height: 244,
    },
    // autoResizeDisable: true,
    /**
     * The subcanvas padding setting
     * 子画布 padding 设置
     */
    padding: (transform) => {
      if (!transform.isContainer) {
        return {
          top: 0,
          bottom: 0,
          left: 0,
          right: 0,
        };
      }
      return {
        top: 65,
        bottom: 40,
        left: 80,
        right: 80,
      };
    },
    /**
     * Controls the node selection status within the subcanvas
     * 控制子画布内的节点选中状态
     */
    selectable(node: WorkflowNodeEntity, mousePos?: PositionSchema): boolean {
      if (!mousePos) {
        return true;
      }
      const transform = node.getData<FlowNodeTransformData>(FlowNodeTransformData);
      // 鼠标开始时所在位置不包括当前节点时才可选中
      return !transform.bounds.contains(mousePos.x, mousePos.y);
    },
    // expandable: false, // disable expanded
    wrapperStyle: {
      minWidth: 'unset',
      width: '100%',
    },
    // defaultPorts: [{ type: 'output', location: 'right' }, { type: 'input', location: 'left'}, { type: 'output', location: 'bottom', portID: 'bottom' }, { type: 'input', location: 'top', portID: 'top'}]
  },
  formMeta,
  onCreate(node, json) {
    node.onDispose(() => {
      node.document.getNode(getBatchID(node.id))?.dispose();
    });
  },
};
