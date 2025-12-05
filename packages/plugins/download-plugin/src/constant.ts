/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */

export enum FlowDownloadFormat {
  JSON = 'json',
  YAML = 'yaml',
  PNG = 'png',
  JPEG = 'jpeg',
  SVG = 'svg',
}

export const FlowImageFormats = [
  FlowDownloadFormat.PNG,
  FlowDownloadFormat.JPEG,
  FlowDownloadFormat.SVG,
];

export const FlowDataFormats = [FlowDownloadFormat.JSON, FlowDownloadFormat.YAML];
