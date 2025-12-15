/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */

import { useMemo } from 'react';

import { createMinimapPlugin } from '@flowgram.ai/minimap-plugin';
import { createFreeSnapPlugin } from '@flowgram.ai/free-snap-plugin';
import { Field, FreeLayoutPluginContext, FreeLayoutProps } from '@flowgram.ai/free-layout-editor';
import { createContainerNodePlugin } from '@flowgram.ai/free-container-plugin';

import { NodeRender } from './node-render';
import { nodeRegistries } from './node-registries';
import { initialData } from './initial-data';

export const useEditorProps = () =>
  useMemo<FreeLayoutProps>(
    () => ({
      plugins: () => [
        createMinimapPlugin({
          disableLayer: true,
          canvasStyle: {
            canvasWidth: 100,
            canvasHeight: 50,
            canvasPadding: 50,
          },
        }),
        createFreeSnapPlugin({}),
        /**
         * This is used for the rendering of the loop node sub-canvas
         * 这个用于 loop 节点子画布的渲染
         */
        createContainerNodePlugin({}),
      ],
      /**
       * Content change
       */ onContentChange: (ctx: FreeLayoutPluginContext, event) => {
        if (ctx.document.disposed) return;

        console.log('Auto Save: ', event, ctx.document.toJSON());
      },
      onAllLayersRendered: (ctx) => {
        ctx.tools.fitView(false);
      },
      materials: {
        renderDefaultNode: NodeRender,
      },
      nodeRegistries,
      canDeleteNode: () => true,
      canDeleteLine: (ctx, line) => {
        if (line.from?.flowNodeType === 'batch' && line.to?.flowNodeType === 'batch_function') {
          return false;
        }
        return true;
      },
      isHideArrowLine(ctx, line) {
        if (line.from?.flowNodeType === 'batch' && line.to?.flowNodeType === 'batch_function') {
          return true;
        }
        return false;
      },
      initialData,
      /**
       * Node engine enable, you can configure formMeta in the FlowNodeRegistry
       */
      nodeEngine: {
        enable: true,
      },
      /**
       * Redo/Undo enable
       */
      history: {
        enable: true,
        enableChangeNode: true, // Listen Node engine data change
      },
      getNodeDefaultRegistry(type) {
        return {
          type,
          meta: {
            defaultExpanded: true,
          },
          formMeta: {
            /**
             * Render form
             */
            render: () => (
              <>
                <Field<string> name="title">{({ field }) => <div>{field.value}</div>}</Field>
              </>
            ),
          },
        };
      },
    }),
    []
  );
