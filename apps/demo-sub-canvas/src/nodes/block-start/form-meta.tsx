/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */

import { FormMeta } from '@flowgram.ai/free-layout-editor';

export const renderForm = () => (
  <>
    <div
      style={{
        width: 60,
        height: 60,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <div
        style={{
          width: 40,
          height: 40,
          borderRadius: '50%',
          cursor: 'move',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        START
      </div>
    </div>
  </>
);

export const formMeta: FormMeta = {
  render: renderForm,
};
