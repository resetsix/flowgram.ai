/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */

import { FormMeta } from '@flowgram.ai/free-layout-editor';
import { SubCanvasRender } from '@flowgram.ai/free-container-plugin';

const formHeight = 48;

export const BatchFunctionFormRender = () => (
  <>
    BATCH FUNCTION
    <SubCanvasRender offsetY={-formHeight} />
  </>
);

export const formMeta: FormMeta = {
  render: BatchFunctionFormRender,
};
