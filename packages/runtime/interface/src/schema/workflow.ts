/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */

import type { WorkflowNodeSchema } from './node';
import type { WorkflowEdgeSchema } from './edge';

export interface WorkflowSchema {
  nodes: WorkflowNodeSchema[];
  edges: WorkflowEdgeSchema[];
}
