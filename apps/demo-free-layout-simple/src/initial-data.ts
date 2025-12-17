/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */

import { WorkflowJSON } from '@flowgram.ai/free-layout-editor';

export const initialData: WorkflowJSON = {
  nodes: [
    {
      id: 'start_0',
      type: 'start',
      meta: {
        position: {
          x: 86.5,
          y: 57.5,
        },
      },
      data: {
        title: 'Start',
        content: 'Start content',
      },
    },
    {
      id: 'node_0',
      type: 'condition',
      meta: {
        position: {
          x: 359.5,
          y: 43.25,
        },
      },
      data: {
        portKeys: ['if', 'else'],
        title: 'Condition',
        content: 'Condition node content',
        ports: ['if', 'else'],
      },
    },
    {
      id: 'end_0',
      type: 'end',
      meta: {
        position: {
          x: 1393.5,
          y: 52.5,
        },
      },
      data: {
        title: 'End',
        content: 'End content',
      },
    },
    {
      id: '100260',
      type: 'tool',
      meta: {
        position: {
          x: 86.5,
          y: 399.75,
        },
      },
      data: {
        title: 'New Tool',
        content: 'xxxx',
      },
    },
    {
      id: '105108',
      type: 'tool',
      meta: {
        position: {
          x: 359.5,
          y: 399.75,
        },
      },
      data: {
        title: 'New Tool',
        content: 'xxxx',
      },
    },
    {
      id: '106070',
      type: 'twoway',
      meta: {
        position: {
          x: 86.5,
          y: 563.75,
        },
      },
      data: {
        title: 'New Twoway',
        content: 'xxxx',
      },
    },
    {
      id: '122116',
      type: 'twoway',
      meta: {
        position: {
          x: 359.5,
          y: 563.75,
        },
      },
      data: {
        title: 'New Twoway',
        content: 'xxxx',
      },
    },
    {
      id: 'BatchFunction_193210',
      type: 'batch_function',
      meta: {
        position: {
          x: 626,
          y: 420.38853503184714,
        },
      },
      data: {},
      blocks: [
        {
          id: '118937',
          type: 'node2',
          meta: {
            position: {
              x: 250.5,
              y: 0,
            },
          },
          data: {
            title: 'New Node2',
            content: 'xxxx',
          },
        },
        {
          id: 'block_start_Y04Mt',
          type: 'block_start',
          meta: {
            position: {
              x: 32,
              y: 0,
            },
          },
          data: {},
        },
        {
          id: 'block_end_7QesT',
          type: 'block_end',
          meta: {
            position: {
              x: 469,
              y: 0,
            },
          },
          data: {},
        },
      ],
      edges: [
        {
          sourceNodeID: 'block_start_Y04Mt',
          targetNodeID: '118937',
        },
        {
          sourceNodeID: '118937',
          targetNodeID: 'block_end_7QesT',
        },
      ],
    },
    {
      id: 'loop_9OpIm',
      type: 'loop',
      meta: {
        position: {
          x: 626,
          y: 0,
        },
      },
      data: {
        title: 'New Loop',
        content: 'xxxx',
      },
      blocks: [
        {
          id: '144150',
          type: 'node1',
          meta: {
            position: {
              x: 250.5,
              y: 1.4210854715202004e-14,
            },
          },
          data: {
            title: 'New Node1',
            content: 'xxxx',
          },
        },
        {
          id: 'block_start_ptqXx',
          type: 'block_start',
          meta: {
            position: {
              x: 32,
              y: 0,
            },
          },
          data: {},
        },
        {
          id: 'block_end_1zf_a',
          type: 'block_end',
          meta: {
            position: {
              x: 469,
              y: 0,
            },
          },
          data: {},
        },
      ],
      edges: [
        {
          sourceNodeID: 'block_start_ptqXx',
          targetNodeID: '144150',
        },
        {
          sourceNodeID: '144150',
          targetNodeID: 'block_end_1zf_a',
        },
      ],
    },
    {
      id: '193210',
      type: 'batch',
      meta: {
        position: {
          x: 876.5,
          y: 197.69426751592357,
        },
      },
      data: {
        title: 'New Batch',
        content: 'xxxx',
      },
    },
    {
      id: 'chain0',
      type: 'chain',
      meta: {
        position: {
          x: 221.02229299363057,
          y: 197.69426751592357,
        },
      },
      data: {
        title: 'Chain',
        content: 'xxxx',
      },
    },
  ],
  edges: [
    {
      sourceNodeID: 'start_0',
      targetNodeID: 'node_0',
    },
    {
      sourceNodeID: 'node_0',
      targetNodeID: 'loop_9OpIm',
      sourcePortID: 'if',
    },
    {
      sourceNodeID: 'node_0',
      targetNodeID: '193210',
      sourcePortID: 'else',
    },
    {
      sourceNodeID: '193210',
      targetNodeID: 'end_0',
      sourcePortID: 'batch-output',
    },
    {
      sourceNodeID: 'loop_9OpIm',
      targetNodeID: 'end_0',
    },
    {
      sourceNodeID: 'chain0',
      targetNodeID: '100260',
      sourcePortID: 'p4',
    },
    {
      sourceNodeID: 'chain0',
      targetNodeID: '105108',
      sourcePortID: 'p5',
    },
    {
      sourceNodeID: '122116',
      targetNodeID: '106070',
      sourcePortID: 'output-left',
      targetPortID: 'input-right',
    },
    {
      sourceNodeID: '106070',
      targetNodeID: '122116',
      sourcePortID: 'output-right',
      targetPortID: 'input-left',
    },
    {
      sourceNodeID: '193210',
      targetNodeID: 'BatchFunction_193210',
      sourcePortID: 'batch-output-to-function',
      targetPortID: 'batch-function-input',
    },
  ],
};
