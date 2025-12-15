/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */

import {
  FlowNodeMeta,
  useNodeRender,
  WorkflowNodeProps,
  WorkflowNodeRenderer,
} from '@flowgram.ai/free-layout-editor';

export const NodeRender = (props: WorkflowNodeProps) => {
  const { node, form, selected } = useNodeRender();
  const meta = node.getNodeMeta<FlowNodeMeta>();
  return (
    <WorkflowNodeRenderer
      style={{
        minWidth: 280,
        minHeight: 88,
        height: 'auto',
        background: '#fff',
        border: '1px solid rgba(6, 7, 9, 0.15)',
        borderColor: selected ? '#4e40e5' : 'rgba(6, 7, 9, 0.15)',
        borderRadius: 8,
        boxShadow: '0 2px 6px 0 rgba(0, 0, 0, 0.04), 0 4px 12px 0 rgba(0, 0, 0, 0.02)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        position: 'relative',
        padding: 12,
        cursor: 'move',
        ...meta.wrapperStyle,
      }}
      node={props.node}
    >
      {form?.render()}
    </WorkflowNodeRenderer>
  );
};
