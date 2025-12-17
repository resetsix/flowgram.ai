/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */

import React from 'react';

import {
  WorkflowDocument,
  WorkflowDragService,
  useClientContext,
  useService,
} from '@flowgram.ai/free-layout-editor';

import { createBatchFunction } from '../nodes/batch-function';

const cardkeys = ['Node1', 'Node2', 'Condition', 'Chain', 'Tool', 'Twoway', 'Loop', 'Batch'];

export const NodeAddPanel: React.FC = (props) => {
  const startDragService = useService(WorkflowDragService);
  const workflowDocument = useService(WorkflowDocument);
  const context = useClientContext();

  return (
    <div className="demo-free-sidebar">
      {cardkeys.map((nodeType) => (
        <div
          key={nodeType}
          className="demo-free-card"
          onMouseDown={async (e) => {
            const type = nodeType.toLowerCase();
            const registry = workflowDocument.getNodeRegistry(type);
            const json = registry.onAdd?.(context);
            const node = await startDragService.startDragCard(type, e, {
              ...json,
              data: {
                title: `New ${nodeType}`,
                content: 'xxxx',
              },
            });
            if (node?.flowNodeType === 'batch') {
              createBatchFunction(node, node.getNodeMeta().position);
            }
          }}
        >
          {nodeType}
        </div>
      ))}
    </div>
  );
};
