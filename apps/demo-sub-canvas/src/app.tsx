/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */

import '@flowgram.ai/free-layout-editor/index.css';
import { createRoot } from 'react-dom/client';
import { FreeLayoutEditorProvider, EditorRenderer } from '@flowgram.ai/free-layout-editor';

import { useEditorProps } from './use-editor-props';
import { Tools } from './tools';
import { Minimap } from './minimap';
import { AddNode } from './add-node';

export const FlowGramApp = () => {
  const editorProps = useEditorProps();
  return (
    <FreeLayoutEditorProvider {...editorProps}>
      <EditorRenderer />
      <Tools />
      <Minimap />
      <AddNode />
    </FreeLayoutEditorProvider>
  );
};

const app = createRoot(document.getElementById('root')!);

app.render(<FlowGramApp />);
