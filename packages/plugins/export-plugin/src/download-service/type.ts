/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */

import { FlowDownloadFormat } from '../constant';

export interface WorkflowDownloadParams {
  format: FlowDownloadFormat;
}

export interface DownloadServiceOptions {
  getFilename?: (format: FlowDownloadFormat) => string;
  watermarkSVG?: string;
}
