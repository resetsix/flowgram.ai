/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */

import {
  getAntiOverlapPosition,
  IPoint,
  useService,
  WorkflowDocument,
  WorkflowNodeEntity,
  WorkflowSelectService,
} from '@flowgram.ai/free-layout-editor';

import { LoopNodeRegistry } from './nodes/loop';
import { createBatchFunction } from './nodes/batch-function';

const getNodeDefaultPosition = (document: WorkflowDocument, nodeType: string): IPoint => {
  const { size } = document.getNodeRegistry(nodeType).meta || {};
  // 当前可视区域的中心位置
  let position = document.playgroundConfig.getViewport(true).center;
  if (size) {
    position = {
      x: position.x,
      y: position.y - size.height / 2,
    };
  }
  // 去掉叠加的
  return getAntiOverlapPosition(document, position);
};

export const AddNode = () => {
  const workflowDocument = useService(WorkflowDocument);
  const selectService = useService(WorkflowSelectService);

  return (
    <div style={{ position: 'absolute', zIndex: 10, bottom: 16, left: 8, display: 'flex', gap: 8 }}>
      <button
        style={{
          border: '1px solid #e0e0e0',
          borderRadius: '50%',
          cursor: 'pointer',
          padding: '4px',
          color: '#ffffff',
          background: '#7e72e8',
          width: 70,
          height: 70,
          fontSize: 14,
        }}
        onClick={() => {
          const node: WorkflowNodeEntity = workflowDocument.createWorkflowNodeByType(
            'custom',
            undefined, // position undefined means create node in center of canvas - position undefined 可以在画布中间创建节点
            {
              data: {
                title: 'New Node',
              },
            }
          );
          selectService.selectNode(node);
        }}
      >
        + Node
      </button>
      <button
        style={{
          border: '1px solid #e0e0e0',
          borderRadius: '50%',
          cursor: 'pointer',
          padding: '4px',
          color: '#ffffff',
          background: '#7e72e8',
          width: 70,
          height: 70,
          fontSize: 14,
        }}
        onClick={() => {
          const json = LoopNodeRegistry.onAdd();
          const node: WorkflowNodeEntity = workflowDocument.createWorkflowNodeByType(
            'loop',
            undefined, // position undefined means create node in center of canvas - position undefined 可以在画布中间创建节点
            json
          );
          selectService.selectNode(node);
        }}
      >
        + Loop
      </button>
      <button
        style={{
          border: '1px solid #e0e0e0',
          borderRadius: '50%',
          cursor: 'pointer',
          padding: '4px',
          color: '#ffffff',
          background: '#7e72e8',
          width: 70,
          height: 70,
          fontSize: 14,
        }}
        onClick={() => {
          const position = getNodeDefaultPosition(workflowDocument, 'batch');

          const node: WorkflowNodeEntity = workflowDocument.createWorkflowNodeByType(
            'batch',
            position, // position undefined means create node in center of canvas - position undefined 可以在画布中间创建节点
            {
              data: {
                title: 'New batch node',
              },
            }
          );
          createBatchFunction(node, position);
          selectService.selectNode(node);
        }}
      >
        + Batch
      </button>
    </div>
  );
};
