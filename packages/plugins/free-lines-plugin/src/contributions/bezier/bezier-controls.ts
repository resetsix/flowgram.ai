/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */

import { type IPoint, Rectangle } from '@flowgram.ai/utils';

export enum BezierControlType {
  RIGHT_TOP,
  RIGHT_BOTTOM,
  LEFT_TOP,
  LEFT_BOTTOM,
}

const CONTROL_MAX = 300;
/**
 * 获取贝塞尔曲线横向的控制节点
 * @param fromPos
 * @param toPos
 */
export function getBezierHorizontalControlPoints(fromPos: IPoint, toPos: IPoint): IPoint[] {
  const rect = Rectangle.createRectangleWithTwoPoints(fromPos, toPos);
  let type: BezierControlType;
  if (fromPos.x <= toPos.x) {
    type = fromPos.y <= toPos.y ? BezierControlType.RIGHT_BOTTOM : BezierControlType.RIGHT_TOP;
  } else {
    type = fromPos.y <= toPos.y ? BezierControlType.LEFT_BOTTOM : BezierControlType.LEFT_TOP;
  }

  let controls: IPoint[];
  // eslint-disable-next-line default-case
  switch (type) {
    case BezierControlType.RIGHT_TOP:
      controls = [
        {
          x: rect.rightBottom.x - rect.width / 2,
          y: rect.rightBottom.y,
        },
        {
          x: rect.leftTop.x + rect.width / 2,
          y: rect.leftTop.y,
        },
      ];
      break;
    case BezierControlType.RIGHT_BOTTOM:
      controls = [
        {
          x: rect.rightTop.x - rect.width / 2,
          y: rect.rightTop.y,
        },
        {
          x: rect.leftBottom.x + rect.width / 2,
          y: rect.leftBottom.y,
        },
      ];
      break;
    case BezierControlType.LEFT_TOP:
      controls = [
        {
          x: rect.rightBottom.x + Math.min(rect.width, CONTROL_MAX),
          y: rect.rightBottom.y,
        },
        {
          x: rect.leftTop.x - Math.min(rect.width, CONTROL_MAX),
          y: rect.leftTop.y,
        },
      ];
      break;
    case BezierControlType.LEFT_BOTTOM:
      controls = [
        {
          x: rect.rightTop.x + Math.min(rect.width, CONTROL_MAX),
          y: rect.rightTop.y,
        },
        {
          x: rect.leftBottom.x - Math.min(rect.width, CONTROL_MAX),
          y: rect.leftBottom.y,
        },
      ];
  }
  return controls;
}

/**
 * 获取贝塞尔曲线垂直方向的控制节点
 * @param fromPos 起始点
 * @param toPos 终点
 */
export function getBezierVerticalControlPoints(fromPos: IPoint, toPos: IPoint): IPoint[] {
  const rect = Rectangle.createRectangleWithTwoPoints(fromPos, toPos);
  let type: BezierControlType;

  if (fromPos.y <= toPos.y) {
    type = fromPos.x <= toPos.x ? BezierControlType.RIGHT_BOTTOM : BezierControlType.LEFT_BOTTOM;
  } else {
    type = fromPos.x <= toPos.x ? BezierControlType.RIGHT_TOP : BezierControlType.LEFT_TOP;
  }

  let controls: IPoint[];

  switch (type) {
    case BezierControlType.RIGHT_BOTTOM:
      controls = [
        {
          x: rect.leftTop.x,
          y: rect.leftTop.y + rect.height / 2,
        },
        {
          x: rect.rightBottom.x,
          y: rect.rightBottom.y - rect.height / 2,
        },
      ];
      break;
    case BezierControlType.LEFT_BOTTOM:
      controls = [
        {
          x: rect.rightTop.x,
          y: rect.rightTop.y + rect.height / 2,
        },
        {
          x: rect.leftBottom.x,
          y: rect.leftBottom.y - rect.height / 2,
        },
      ];
      break;
    case BezierControlType.RIGHT_TOP:
      controls = [
        {
          x: rect.leftBottom.x,
          y: rect.leftBottom.y + Math.min(rect.height, CONTROL_MAX),
        },
        {
          x: rect.rightTop.x,
          y: rect.rightTop.y - Math.min(rect.height, CONTROL_MAX),
        },
      ];
      break;
    case BezierControlType.LEFT_TOP:
      controls = [
        {
          x: rect.rightBottom.x,
          y: rect.rightBottom.y + Math.min(rect.height, CONTROL_MAX),
        },
        {
          x: rect.leftTop.x,
          y: rect.leftTop.y - Math.min(rect.height, CONTROL_MAX),
        },
      ];
      break;
  }

  return controls;
}
