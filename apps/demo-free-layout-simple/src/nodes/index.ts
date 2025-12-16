/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */

import { WorkflowNodeRegistry } from '@flowgram.ai/free-layout-editor';

import { TwowayNodeRegistry } from './twoway';
import { ToolNodeRegistry } from './tool';
import { StartNodeRegistry } from './start';
import { LoopNodeRegistry } from './loop';
import { EndNodeRegistry } from './end';
import { CustomNodeRegistry } from './custom';
import { ConditionNodeRegistry } from './condition';
import { ChainNodeRegistry } from './chain';
import { BlockStartNodeRegistry } from './block-start';
import { BlockEndNodeRegistry } from './block-end';
import { BatchFunctionNodeRegistry } from './batch-function';
import { BatchNodeRegistry } from './batch';

export const nodeRegistries: WorkflowNodeRegistry[] = [
  LoopNodeRegistry,
  BlockStartNodeRegistry,
  BlockEndNodeRegistry,
  BatchNodeRegistry,
  BatchFunctionNodeRegistry,
  StartNodeRegistry,
  ConditionNodeRegistry,
  ChainNodeRegistry,
  ToolNodeRegistry,
  TwowayNodeRegistry,
  EndNodeRegistry,
  CustomNodeRegistry,
];
