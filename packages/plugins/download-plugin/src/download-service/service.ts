/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */
import { nanoid } from 'nanoid';
import { inject, injectable } from 'inversify';
import { DisposableCollection, Emitter } from '@flowgram.ai/utils';
import { FlowDocument } from '@flowgram.ai/document';

import type { DownloadServiceOptions, WorkflowDownloadParams } from './type';
import { WorkflowExportImageService } from '../export-image-service';
import { FlowDataFormats, FlowDownloadFormat, FlowImageFormats } from '../constant';

@injectable()
export class FlowDownloadService {
  @inject(FlowDocument) private readonly document: FlowDocument;

  @inject(WorkflowExportImageService)
  private readonly exportImageService: WorkflowExportImageService;

  private toDispose: DisposableCollection = new DisposableCollection();

  public downloading = false;

  private onDownloadingChangeEmitter = new Emitter<boolean>();

  private options: DownloadServiceOptions = {};

  public onDownloadingChange = this.onDownloadingChangeEmitter.event;

  public init(options?: Partial<DownloadServiceOptions>) {
    this.options = options ?? {};
    this.toDispose.push(this.onDownloadingChangeEmitter);
  }

  public dispose(): void {
    this.toDispose.dispose();
  }

  public async download(params: WorkflowDownloadParams): Promise<void> {
    if (this.downloading) {
      return;
    }

    const { format } = params;

    if (FlowImageFormats.includes(format)) {
      await this.handleImageDownload(format);
    } else if (FlowDataFormats.includes(format)) {
      await this.handleDataDownload(format);
    }
  }

  public setDownloading(value: boolean) {
    this.downloading = value;
    this.onDownloadingChangeEmitter.fire(value);
  }

  private async handleImageDownload(format: FlowDownloadFormat): Promise<void> {
    this.setDownloading(true);
    try {
      await this.downloadImage(format);
    } finally {
      this.setDownloading(false);
    }
  }

  private async handleDataDownload(format: FlowDownloadFormat): Promise<void> {
    this.setDownloading(true);
    try {
      await this.downloadData(format);
    } finally {
      this.setDownloading(false);
    }
  }

  private async downloadData(format: FlowDownloadFormat): Promise<void> {
    const json = this.document.toJSON();
    const { content, mimeType } = await this.formatDataContent(json, format);

    const blob = new Blob([content], { type: mimeType });
    const url = URL.createObjectURL(blob);
    const filename = this.getFileName(format);

    this.downloadFile(url, filename);
    URL.revokeObjectURL(url);
  }

  private async formatDataContent(
    json: unknown,
    format: FlowDownloadFormat
  ): Promise<{ content: string; mimeType: string }> {
    if (format === FlowDownloadFormat.YAML) {
      const yaml = await import('js-yaml');
      return {
        content: yaml.dump(json, {
          indent: 2,
          lineWidth: -1,
          noRefs: true,
        }),
        mimeType: 'application/x-yaml',
      };
    }

    return {
      content: JSON.stringify(json, null, 2),
      mimeType: 'application/json',
    };
  }

  private async downloadImage(format: FlowDownloadFormat): Promise<void> {
    const imageUrl = await this.exportImageService.export({
      format,
      watermarkSVG: this.options.watermarkSVG,
    });
    if (!imageUrl) {
      return;
    }

    const filename = this.getFileName(format);
    this.downloadFile(imageUrl, filename);
  }

  private getFileName(format: FlowDownloadFormat): string {
    if (this.options.getFilename) {
      return this.options.getFilename(format);
    }
    return `flowgram-${nanoid(5)}.${format}`;
  }

  private downloadFile(href: string, filename: string): void {
    const link = document.createElement('a');
    link.href = href;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
}
