/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */

import { Field, FormMeta } from '@flowgram.ai/free-layout-editor';
import { SubCanvasRender } from '@flowgram.ai/free-container-plugin';

const formHeight = 48;

export const LoopFormRender = () => (
  <>
    <Field<string> name="title">
      {({ field }) => <div className="demo-free-node-title">{field.value}</div>}
    </Field>
    <SubCanvasRender offsetY={-formHeight} />
  </>
);

export const formMeta: FormMeta = {
  render: LoopFormRender,
};
