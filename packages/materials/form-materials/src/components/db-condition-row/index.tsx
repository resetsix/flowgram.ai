/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */

import React, { useMemo } from 'react';

import { I18n } from '@flowgram.ai/editor';
import { Button, Icon, Input, Select } from '@douyinfe/semi-ui';
import { IconChevronDownStroked } from '@douyinfe/semi-icons';

import { useTypeManager } from '@/plugins';
import { InjectDynamicValueInput } from '@/components/dynamic-value-input';
import {
  useCondition,
  type ConditionOpConfigs,
  type IConditionRule,
} from '@/components/condition-context';

import { DBConditionOptionType, DBConditionRowValueType } from './types';
import './styles.css';

interface PropTypes {
  value?: DBConditionRowValueType;
  onChange: (value?: DBConditionRowValueType) => void;
  style?: React.CSSProperties;
  options?: DBConditionOptionType[];
  readonly?: boolean;
  /**
   * @deprecated use ConditionContext instead to pass ruleConfig to multiple
   */
  ruleConfig?: {
    ops?: ConditionOpConfigs;
    rules?: Record<string, IConditionRule>;
  };
}

export function DBConditionRow({
  style,
  value,
  onChange,
  readonly,
  options,
  ruleConfig,
}: PropTypes) {
  const { left, operator, right } = value || {};

  const typeManager = useTypeManager();

  const leftSchema = useMemo(
    () => options?.find((item) => item.value === left)?.schema,
    [left, options]
  );

  const { opConfig, rule, opOptionList, targetSchema } = useCondition({
    leftSchema,
    operator,
    ruleConfig,
  });

  const renderDBOptionSelect = () => (
    <Select
      className="gedit-m-db-condition-row-select"
      disabled={readonly}
      size="small"
      style={{ width: '100%' }}
      value={left}
      onChange={(v) =>
        onChange({
          ...value,
          left: v as string,
        })
      }
      optionList={
        options?.map((item) => ({
          label: (
            <div className="gedit-m-db-condition-row-option-label">
              <Icon size="small" svg={typeManager.getDisplayIcon(item.schema)} />
              {item.label}
            </div>
          ),
          value: item.value,
        })) || []
      }
    />
  );

  const renderOpSelect = () => (
    <Select
      style={{ height: 22 }}
      disabled={readonly}
      size="small"
      value={operator}
      optionList={opOptionList}
      onChange={(v) => {
        onChange({
          ...value,
          operator: v as string,
        });
      }}
      triggerRender={({ value }) => (
        <Button size="small" disabled={!rule}>
          {opConfig?.abbreviation || <IconChevronDownStroked size="small" />}
        </Button>
      )}
    />
  );

  return (
    <div className="gedit-m-db-condition-row-container" style={style}>
      <div className="gedit-m-db-condition-row-operator">{renderOpSelect()}</div>
      <div className="gedit-m-db-condition-row-values">
        <div className="gedit-m-db-condition-row-left">{renderDBOptionSelect()}</div>
        <div className="gedit-m-db-condition-row-right">
          {targetSchema ? (
            <InjectDynamicValueInput
              readonly={readonly || !rule}
              value={right}
              schema={targetSchema}
              onChange={(v) => onChange({ ...value, right: v })}
            />
          ) : (
            <Input
              size="small"
              disabled
              style={{ pointerEvents: 'none' }}
              value={opConfig?.rightDisplay || I18n.t('Empty')}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export { type DBConditionRowValueType, type DBConditionOptionType };
