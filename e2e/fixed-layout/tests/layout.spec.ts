/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */

import { test, expect } from '@playwright/test';

test('page render test', async ({ page }) => {
  await page.goto('http://localhost:3000');
  await page.waitForSelector('.gedit-playground-pipeline');
});
