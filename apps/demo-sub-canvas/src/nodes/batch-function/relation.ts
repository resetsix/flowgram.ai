/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */

/* eslint-disable  @typescript-eslint/naming-convention*/
export const BatchFunctionIDPrefix = 'BatchFunction_';
export const getBatchFunctionID = (batchID: string) => BatchFunctionIDPrefix + batchID;
export const getBatchID = (batchFunctionID: string) =>
  batchFunctionID.replace(BatchFunctionIDPrefix, '');
