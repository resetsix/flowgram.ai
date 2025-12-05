/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */

import { FlowDownloadFormat } from '../constant';

/**
 * 导出图片服务
 */
export interface IFlowExportImageService {
  /**
   * 导出
   */
  export: (options: ExportImageOptions) => Promise<string | undefined>;
}

/**
 * 导出图片选项
 */
export interface ExportImageOptions {
  /**
   * 导出的格式
   */
  format: FlowDownloadFormat;
  watermarkSVG?: string;
}
