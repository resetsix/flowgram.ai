/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */

import { WorkflowNodeEntity, WorkflowDocument, IPoint } from '@flowgram.ai/free-layout-editor';

import { BatchFunctionIDPrefix } from './relation';
import { createBatchFunctionLines } from './create-batch-function-lines';
import { createBatchFunctionJSON } from './create-batch-function-json';

/** 创建 Batch 循环体节点 */
export const createBatchFunction = (batchNode: WorkflowNodeEntity, batchPosition: IPoint) => {
  const document = batchNode.document as WorkflowDocument;
  const id = `${BatchFunctionIDPrefix}${batchNode.id}`;
  const offset: IPoint = {
    x: -112,
    y: 230,
  };
  const position = {
    x: batchPosition.x + offset.x,
    y: batchPosition.y + offset.y,
  };
  const batchFunctionJSON = createBatchFunctionJSON(id, position);
  const batchFunctionNode = document.createWorkflowNode(batchFunctionJSON);
  createBatchFunctionLines({
    document,
    batchId: batchNode.id,
    batchFunctionId: batchFunctionNode.id,
  });
};
