/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */

import {
  WorkflowLineEntity,
  WorkflowNodeEntity,
  WorkflowNodeLinesData,
} from '@flowgram.ai/free-layout-core';
import { FlowNodeBaseType } from '@flowgram.ai/document';

import type { StackingContext } from './type';

export class StackingComputing {
  private currentLevel: number;

  private topLevel: number;

  private maxLevel: number;

  private nodeIndexes: Map<string, number>;

  private nodeLevel: Map<string, number>;

  private lineLevel: Map<string, number>;

  private context: StackingContext;

  public compute(params: {
    root: WorkflowNodeEntity;
    nodes: WorkflowNodeEntity[];
    context: StackingContext;
  }): {
    /** 节点层级 */
    nodeLevel: Map<string, number>;
    /** 线条层级 */
    lineLevel: Map<string, number>;
    /** 正常渲染的最高层级 */
    topLevel: number;
    /** 选中计算叠加后可能计算出的最高层级 */
    maxLevel: number;
  } {
    this.clearCache();
    const { root, nodes, context } = params;
    this.context = context;
    this.nodeIndexes = this.computeNodeIndexesMap(nodes);
    this.topLevel = this.computeTopLevel(nodes);
    this.maxLevel = this.topLevel * 2;
    this.layerHandler(root.blocks);
    return {
      nodeLevel: this.nodeLevel,
      lineLevel: this.lineLevel,
      topLevel: this.topLevel,
      maxLevel: this.maxLevel,
    };
  }

  private clearCache(): void {
    this.currentLevel = 0;
    this.topLevel = 0;
    this.maxLevel = 0;
    this.nodeIndexes = new Map();
    this.nodeLevel = new Map();
    this.lineLevel = new Map();
  }

  private computeNodeIndexesMap(nodes: WorkflowNodeEntity[]): Map<string, number> {
    const nodeIndexMap = new Map<string, number>();
    nodes.forEach((node, index) => {
      nodeIndexMap.set(node.id, index);
    });
    return nodeIndexMap;
  }

  private computeTopLevel(nodes: WorkflowNodeEntity[]): number {
    const nodesWithoutRoot = nodes.filter((node) => node.id !== FlowNodeBaseType.ROOT);
    const nodeHasChildren = nodesWithoutRoot.reduce((count, node) => {
      if (node.blocks.length > 0) {
        return count + 1;
      } else {
        return count;
      }
    }, 0);
    // 最高层数 = 节点个数 + 容器节点个数（线条单独占一层） + 抬高一层
    return nodesWithoutRoot.length + nodeHasChildren + 1;
  }

  private layerHandler(layerNodes: WorkflowNodeEntity[], pinTop: boolean = false): void {
    const nodes = this.sortNodes(layerNodes);
    const lines = this.getNodesAllLines(nodes);

    // 线条统一设为当前层级最低
    lines.forEach((line) => {
      if (
        line.isDrawing || // 正在绘制
        this.context.hoveredEntityID === line.id || // hover
        this.context.selectedIDs.includes(line.id) // 选中
      ) {
        // 线条置顶条件：正在绘制 / hover / 选中
        this.lineLevel.set(line.id, this.maxLevel);
      } else {
        this.lineLevel.set(line.id, this.getLevel(pinTop));
      }
    });
    this.levelIncrease();
    nodes.forEach((node) => {
      const selected = this.context.selectedIDs.includes(node.id);
      if (selected) {
        // 节点置顶条件：选中
        this.nodeLevel.set(node.id, this.topLevel);
      } else {
        this.nodeLevel.set(node.id, this.getLevel(pinTop));
      }
      // 节点层级逐层增高
      this.levelIncrease();
      if (node.blocks.length > 0) {
        // 子节点层级需低于后续兄弟节点，因此需要先进行计算
        this.layerHandler(node.blocks, pinTop || selected);
      }
    });
  }

  private sortNodes(nodes: WorkflowNodeEntity[]): WorkflowNodeEntity[] {
    return nodes.sort((a, b) => {
      const aIndex = this.nodeIndexes.get(a.id);
      const bIndex = this.nodeIndexes.get(b.id);
      if (aIndex === undefined || bIndex === undefined) {
        return 0;
      }
      return aIndex - bIndex;
    });
  }

  private getNodesAllLines(nodes: WorkflowNodeEntity[]): WorkflowLineEntity[] {
    const lines = nodes
      .map((node) => {
        const linesData = node.getData<WorkflowNodeLinesData>(WorkflowNodeLinesData);
        const outputLines = linesData.outputLines.filter(Boolean);
        const inputLines = linesData.inputLines.filter(Boolean);
        return [...outputLines, ...inputLines];
      })
      .flat();

    // 过滤出未计算层级的线条，以及高度优先（需要覆盖计算）的线条
    const filteredLines = lines.filter(
      (line) => this.lineLevel.get(line.id) === undefined || this.isHigherFirstLine(line)
    );

    return filteredLines;
  }

  private isHigherFirstLine(line: WorkflowLineEntity): boolean {
    // 父子相连的线条，需要作为高度优先的线条，避免线条不可见
    return line.to?.parent === line.from || line.from?.parent === line.to;
  }

  private getLevel(pinTop: boolean): number {
    if (pinTop) {
      return this.topLevel + this.currentLevel;
    }
    return this.currentLevel;
  }

  private levelIncrease(): void {
    this.currentLevel += 1;
  }
}
