/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */

import { debounce } from 'lodash';
import { inject, injectable } from 'inversify';
import { domUtils } from '@flowgram.ai/utils';
import { Disposable } from '@flowgram.ai/utils';
import {
  WorkflowHoverService,
  WorkflowNodeEntity,
  WorkflowSelectService,
} from '@flowgram.ai/free-layout-core';
import { WorkflowLineEntity } from '@flowgram.ai/free-layout-core';
import { WorkflowDocument } from '@flowgram.ai/free-layout-core';
import { FlowNodeRenderData } from '@flowgram.ai/document';
import { EntityManager, PipelineRegistry, PipelineRenderer } from '@flowgram.ai/core';

import type { StackingContext } from './type';
import { StackingComputing } from './stacking-computing';
import { StackingConfig } from './constant';

@injectable()
export class StackingContextManager {
  @inject(WorkflowDocument) private readonly document: WorkflowDocument;

  @inject(EntityManager) private readonly entityManager: EntityManager;

  @inject(PipelineRenderer)
  private readonly pipelineRenderer: PipelineRenderer;

  @inject(PipelineRegistry)
  private readonly pipelineRegistry: PipelineRegistry;

  @inject(WorkflowHoverService)
  private readonly hoverService: WorkflowHoverService;

  @inject(WorkflowSelectService)
  private readonly selectService: WorkflowSelectService;

  public readonly node = domUtils.createDivWithClass(
    'gedit-playground-layer gedit-flow-render-layer'
  );

  private disposers: Disposable[] = [];

  constructor() {}

  public init(): void {
    this.pipelineRenderer.node.appendChild(this.node);
    this.mountListener();
  }

  public ready(): void {
    this.compute();
  }

  public dispose(): void {
    this.disposers.forEach((disposer) => disposer.dispose());
  }

  /**
   * 触发计算
   * 10ms内仅计算一次
   */
  private compute = debounce(this._compute, 10);

  private _compute(): void {
    const context = this.context;
    const stackingComputing = new StackingComputing();
    const { nodeLevel, lineLevel } = stackingComputing.compute({
      root: this.document.root,
      nodes: this.nodes,
      context,
    });
    this.nodes.forEach((node) => {
      const level = nodeLevel.get(node.id);
      const nodeRenderData = node.getData<FlowNodeRenderData>(FlowNodeRenderData);
      const element = nodeRenderData.node;
      element.style.position = 'absolute';
      if (level === undefined) {
        nodeRenderData.stackIndex = 0;
        element.style.zIndex = 'auto';
        return;
      }
      nodeRenderData.stackIndex = level;
      const zIndex = StackingConfig.startIndex + level;
      element.style.zIndex = String(zIndex);
    });
    this.lines.forEach((line) => {
      const level = lineLevel.get(line.id);
      const element = line.node;
      element.style.position = 'absolute';
      if (level === undefined) {
        line.stackIndex = 0;
        element.style.zIndex = 'auto';
        return;
      }
      line.stackIndex = level;
      const zIndex = StackingConfig.startIndex + level;
      element.style.zIndex = String(zIndex);
    });
  }

  private get nodes(): WorkflowNodeEntity[] {
    return this.entityManager.getEntities<WorkflowNodeEntity>(WorkflowNodeEntity);
  }

  private get lines(): WorkflowLineEntity[] {
    return this.entityManager.getEntities<WorkflowLineEntity>(WorkflowLineEntity);
  }

  private get context(): StackingContext {
    return {
      hoveredEntity: this.hoverService.hoveredNode,
      hoveredEntityID: this.hoverService.hoveredNode?.id,
      selectedEntities: this.selectService.selection,
      selectedIDs: this.selectService.selection.map((entity) => entity.id),
    };
  }

  private mountListener(): void {
    const entityChangeDisposer = this.onEntityChange();
    const zoomDisposer = this.onZoom();
    const hoverDisposer = this.onHover();
    const selectDisposer = this.onSelect();
    this.disposers = [entityChangeDisposer, zoomDisposer, hoverDisposer, selectDisposer];
  }

  private onZoom(): Disposable {
    return this.pipelineRegistry.onZoom((scale: number) => {
      this.node.style.transform = `scale(${scale})`;
    });
  }

  private onHover(): Disposable {
    return this.hoverService.onHoveredChange(() => {
      this.compute();
    });
  }

  private onEntityChange(): Disposable {
    return this.entityManager.onEntityChange(() => {
      this.compute();
    });
  }

  private onSelect(): Disposable {
    return this.selectService.onSelectionChanged(() => {
      this.compute();
    });
  }
}
