/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */

import {
  EditorRenderer,
  FlowNodeRegistry,
  FreeLayoutEditorProvider,
  FreeLayoutProps,
  WorkflowJSON,
} from '@flowgram.ai/free-layout-editor';

import { useEditorProps } from './hooks/use-editor-props';
import '@flowgram.ai/free-layout-editor/index.css';
import './index.css';
interface EditorProps {
  registries: FlowNodeRegistry[];
  initialData: WorkflowJSON;
  plugins?: FreeLayoutProps['plugins'];
}

export const FreeEditor = ({ registries, initialData, plugins = () => [] }: EditorProps) => {
  const editorProps = useEditorProps({
    registries,
    initialData,
    plugins,
  });

  return (
    <FreeLayoutEditorProvider {...editorProps}>
      <div className="demo-free-container">
        <div className="demo-free-layout">
          <EditorRenderer className="demo-free-editor" />
        </div>
      </div>
    </FreeLayoutEditorProvider>
  );
};
