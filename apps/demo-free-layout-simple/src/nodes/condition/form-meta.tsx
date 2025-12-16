/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */

import {
  Field,
  DataEvent,
  EffectFuncProps,
  WorkflowPorts,
  FormMeta,
} from '@flowgram.ai/free-layout-editor';

const CONDITION_ITEM_HEIGHT = 35;

export const formMeta: FormMeta = {
  formatOnInit: (value) => ({
    portKeys: ['if', 'else'],
    ...value,
  }),
  effect: {
    portKeys: [
      {
        event: DataEvent.onValueInitOrChange,
        effect: ({ value, context }: EffectFuncProps<Array<string>, FormData>) => {
          const { node } = context;
          const defaultPorts: WorkflowPorts = [{ type: 'input' }];
          const newPorts: WorkflowPorts = value.map((portID: string, i: number) => ({
            type: 'output',
            portID,
            location: 'right',
            locationConfig: {
              right: 0,
              top: (i + 1) * CONDITION_ITEM_HEIGHT,
            },
          }));
          node.ports.updateAllPorts([...defaultPorts, ...newPorts]);
        },
      },
    ],
  },
  render: () => (
    <>
      <Field<string> name="title">
        {({ field }) => <div className="demo-free-node-title">{field.value}</div>}
      </Field>
      <Field<Array<string>> name="portKeys">
        {({ field: { value, onChange } }) => (
          <div
            className="demo-free-node-content"
            style={{
              width: 160,
              height: value.length * CONDITION_ITEM_HEIGHT,
              minHeight: 2 * CONDITION_ITEM_HEIGHT,
            }}
          >
            <div>
              <button onClick={() => onChange(value.concat(`if_${value.length}`))}>Add Port</button>
            </div>
            <div style={{ marginTop: 8 }}>
              <button onClick={() => onChange(value.filter((v, i, arr) => i !== arr.length - 1))}>
                Delete Port
              </button>
            </div>
          </div>
        )}
      </Field>
    </>
  ),
};
