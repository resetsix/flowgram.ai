/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */

import { definePluginCreator, PluginContext } from '@flowgram.ai/core';

import { CreateDownloadPluginOptions } from './type';
import { WorkflowExportImageService } from './export-image-service';
import { FlowDownloadService } from './download-service';

export const createDownloadPlugin = definePluginCreator<CreateDownloadPluginOptions>({
  onBind: ({ bind }) => {
    bind(WorkflowExportImageService).toSelf().inSingletonScope();
    bind(FlowDownloadService).toSelf().inSingletonScope();
  },
  onInit: (ctx: PluginContext, opts: CreateDownloadPluginOptions) => {
    ctx.get(FlowDownloadService).init(opts);
  },
  onDispose: (ctx: PluginContext) => {
    ctx.get(FlowDownloadService).dispose();
  },
});
