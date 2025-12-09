/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */

import { NOOP } from './objects';
import { Disposable } from './disposable';

export interface EventListener<T> {
  (args: T): void;
}

export interface Event<T> {
  (listener: EventListener<T>, thisArgs?: any): Disposable;
}

export namespace Event {
  export const None: Event<any> = () => Disposable.NULL;
}

export class Emitter<T = any> {
  private _event?: Event<T>;

  private _listeners?: EventListener<T>[];

  private _disposed = false;

  get event(): Event<T> {
    if (!this._event) {
      this._event = (listener: EventListener<T>, thisArgs?: any) => {
        if (this._disposed) {
          return Disposable.NULL;
        }
        if (!this._listeners) {
          this._listeners = [];
        }
        const finalListener = thisArgs ? listener.bind(thisArgs) : listener;
        this._listeners.push(finalListener);

        const eventDisposable: Disposable = {
          dispose: () => {
            eventDisposable.dispose = NOOP;
            if (!this._disposed) {
              const index = this._listeners!.indexOf(finalListener);
              if (index !== -1) {
                this._listeners!.splice(index, 1);
              }
            }
          },
        };

        return eventDisposable;
      };
    }
    return this._event;
  }

  fire(event: T): void {
    if (this._listeners) {
      this._listeners.forEach((listener) => listener(event));
    }
  }

  get disposed(): boolean {
    return this._disposed;
  }

  dispose(): void {
    if (this._listeners) {
      this._listeners = undefined;
    }
    this._disposed = true;
  }
}
