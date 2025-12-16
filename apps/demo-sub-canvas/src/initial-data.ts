/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */

import { WorkflowJSON } from '@flowgram.ai/free-layout-editor';

export const initialData: WorkflowJSON = {
  nodes: [
    {
      id: '1',
      type: 'start',
      meta: {
        position: {
          x: 140,
          y: 240.5,
        },
      },
      data: {
        title: 'Start Node',
      },
    },
    {
      id: '5',
      type: 'end',
      meta: {
        position: {
          x: 2196,
          y: 313.75,
        },
      },
      data: {
        title: 'End Node',
      },
    },
    {
      id: 'loop_yvdFr',
      type: 'loop',
      meta: {
        position: {
          x: 840,
          y: 52.5,
        },
      },
      data: {
        title: 'Loop_1',
      },
      blocks: [
        {
          id: 'block_start_MYgCG',
          type: 'block_start',
          meta: {
            position: {
              x: 44,
              y: 94,
            },
          },
          data: {},
        },
        {
          id: 'block_end_hVfcS',
          type: 'block_end',
          meta: {
            position: {
              x: 612,
              y: 94,
            },
          },
          data: {},
        },
        {
          id: '144478',
          type: 'custom',
          meta: {
            position: {
              x: 328,
              y: 0,
            },
          },
          data: {
            title: 'New Node',
          },
        },
        {
          id: '152294',
          type: 'custom',
          meta: {
            position: {
              x: 328,
              y: 188,
            },
          },
          data: {
            title: 'New Node',
          },
        },
      ],
      edges: [
        {
          sourceNodeID: 'block_start_MYgCG',
          targetNodeID: '144478',
        },
        {
          sourceNodeID: 'block_start_MYgCG',
          targetNodeID: '152294',
        },
        {
          sourceNodeID: '144478',
          targetNodeID: 'block_end_hVfcS',
        },
        {
          sourceNodeID: '152294',
          targetNodeID: 'block_end_hVfcS',
        },
      ],
    },
    {
      id: '190959',
      type: 'batch',
      meta: {
        position: {
          x: 1168,
          y: 481,
        },
      },
      data: {
        title: 'New batch node',
      },
    },
    {
      id: '172297',
      type: 'custom',
      meta: {
        position: {
          x: 520,
          y: 481,
        },
      },
      data: {
        title: 'New Node',
      },
    },
    {
      id: 'BatchFunction_190959',
      type: 'batch_function',
      meta: {
        position: {
          x: 840,
          y: 721.5,
        },
      },
      data: {},
      blocks: [
        {
          id: 'block_start_fMPc6',
          type: 'block_start',
          meta: {
            position: {
              x: 44,
              y: 0,
            },
          },
          data: {},
        },
        {
          id: 'block_end_vSpPm',
          type: 'block_end',
          meta: {
            position: {
              x: 612,
              y: 0,
            },
          },
          data: {},
        },
        {
          id: '184839',
          type: 'custom',
          meta: {
            position: {
              x: 328,
              y: 0,
            },
          },
          data: {
            title: 'New Node',
          },
        },
      ],
      edges: [
        {
          sourceNodeID: 'block_start_fMPc6',
          targetNodeID: '184839',
        },
        {
          sourceNodeID: '184839',
          targetNodeID: 'block_end_vSpPm',
        },
      ],
    },
    {
      id: '153487',
      type: 'custom',
      meta: {
        position: {
          x: 1816,
          y: 134,
        },
      },
      data: {
        title: 'New Node',
      },
    },
    {
      id: '151923',
      type: 'custom',
      meta: {
        position: {
          x: 1816,
          y: 481,
        },
      },
      data: {
        title: 'New Node',
      },
    },
    {
      id: '173026',
      type: 'custom',
      meta: {
        position: {
          x: 520,
          y: 134,
        },
      },
      data: {
        title: 'New Node',
      },
    },
  ],
  edges: [
    {
      sourceNodeID: '1',
      targetNodeID: '173026',
    },
    {
      sourceNodeID: '1',
      targetNodeID: '172297',
    },
    {
      sourceNodeID: '151923',
      targetNodeID: '5',
    },
    {
      sourceNodeID: '153487',
      targetNodeID: '5',
    },
    {
      sourceNodeID: '173026',
      targetNodeID: 'loop_yvdFr',
    },
    {
      sourceNodeID: 'loop_yvdFr',
      targetNodeID: '153487',
    },
    {
      sourceNodeID: '172297',
      targetNodeID: '190959',
    },
    {
      sourceNodeID: '190959',
      targetNodeID: '151923',
      sourcePortID: 'batch-output',
    },
    {
      sourceNodeID: '190959',
      targetNodeID: 'BatchFunction_190959',
      sourcePortID: 'batch-output-to-function',
      targetPortID: 'batch-function-input',
    },
  ],
};
