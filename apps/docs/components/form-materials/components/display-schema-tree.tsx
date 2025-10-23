/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */

import React from 'react';

import { FreeFormMetaStoryBuilder, FormHeader } from '../../free-form-meta-story-builder';

const DisplaySchemaTree = React.lazy(() =>
  import('@flowgram.ai/form-materials').then((module) => ({
    default: module.DisplaySchemaTree,
  }))
);

export const BasicStory = () => (
  <FreeFormMetaStoryBuilder
    filterEndNode
    filterStartNode
    formMeta={{
      render: () => (
        <>
          <FormHeader />
          <DisplaySchemaTree
            value={{
              type: 'object',
              properties: {
                transaction_id: { type: 'integer' },
                amount: { type: 'number' },
                description: { type: 'string' },
                archived: { type: 'boolean' },
                owner: {
                  type: 'object',
                  properties: {
                    id: { type: 'integer' },
                    username: { type: 'string' },
                    friends: {
                      type: 'array',
                      items: {
                        type: 'object',
                        properties: {
                          id: { type: 'integer' },
                          username: { type: 'string' },
                        },
                      },
                    },
                  },
                },
              },
            }}
          />
        </>
      ),
    }}
  />
);
