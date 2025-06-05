import React, { useMemo, useState } from 'react';

import { Button, Checkbox, IconButton } from '@douyinfe/semi-ui';
import {
  IconExpand,
  IconShrink,
  IconPlus,
  IconChevronDown,
  IconChevronRight,
  IconMinus,
} from '@douyinfe/semi-icons';

import { TypeSelector } from '../type-selector';
import { IJsonSchema } from '../../typings';
import { ConfigType, PropertyValueType } from './types';
import {
  IconAddChildren,
  UIActions,
  UICollapseTrigger,
  UICollapsible,
  UIContainer,
  UIExpandDetail,
  UILabel,
  UIProperties,
  UIPropertyLeft,
  UIPropertyMain,
  UIPropertyRight,
  UIRequired,
  UIType,
} from './styles';
import { UIName } from './styles';
import { DefaultValueWrapper, UIRow } from './styles';
import { usePropertiesEdit } from './hooks';
import { DefaultValue } from './default-value';
import { BlurInput } from './components/blur-input';

export function JsonSchemaEditor(props: {
  value?: IJsonSchema;
  onChange?: (value: IJsonSchema) => void;
  config?: ConfigType;
}) {
  const { value = { type: 'object' }, config = {}, onChange: onChangeProps } = props;
  const { propertyList, onAddProperty, onRemoveProperty, onEditProperty } = usePropertiesEdit(
    value,
    onChangeProps
  );

  return (
    <UIContainer>
      <UIProperties>
        {propertyList.map((_property, index) => (
          <PropertyEdit
            key={_property.key}
            value={_property}
            config={config}
            $index={index}
            onChange={(_v) => {
              onEditProperty(_property.key!, _v);
            }}
            onRemove={() => {
              onRemoveProperty(_property.key!);
            }}
          />
        ))}
      </UIProperties>
      <Button size="small" style={{ marginTop: 10 }} icon={<IconPlus />} onClick={onAddProperty}>
        {config?.addButtonText ?? 'Add'}
      </Button>
    </UIContainer>
  );
}

function PropertyEdit(props: {
  value?: PropertyValueType;
  config?: ConfigType;
  onChange?: (value: PropertyValueType) => void;
  onRemove?: () => void;
  $isLast?: boolean;
  $index?: number;
  $isFirst?: boolean;
  $parentExpand?: boolean;
  $parentType?: string;
  $showLine?: boolean;
  $level?: number; // 添加层级属性
}) {
  const {
    value,
    config,
    $level = 0,
    onChange: onChangeProps,
    onRemove,
    $index,
    $isFirst,
    $isLast,
    $parentExpand = false,
    $parentType = '',
    $showLine,
  } = props;

  const [expand, setExpand] = useState(false);
  const [collapse, setCollapse] = useState(false);

  const { name, type, items, default: defaultValue, description, isPropertyRequired } = value || {};

  const typeSelectorValue = useMemo(() => ({ type, items }), [type, items]);

  const { propertyList, isDrilldownObject, onAddProperty, onRemoveProperty, onEditProperty } =
    usePropertiesEdit(value, onChangeProps);

  const onChange = (key: string, _value: any) => {
    onChangeProps?.({
      ...(value || {}),
      [key]: _value,
    });
  };

  const showCollapse = isDrilldownObject && propertyList.length > 0;

  return (
    <>
      <UIPropertyLeft
        type={type}
        $index={$index}
        $isFirst={$isFirst}
        $isLast={$isLast}
        $showLine={$showLine}
        $isExpand={expand}
        $parentExpand={$parentExpand}
        $parentType={$parentType}
      >
        {showCollapse && (
          <UICollapseTrigger onClick={() => setCollapse((_collapse) => !_collapse)}>
            {collapse ? <IconChevronDown size="small" /> : <IconChevronRight size="small" />}
          </UICollapseTrigger>
        )}
      </UIPropertyLeft>
      <UIPropertyRight>
        <UIPropertyMain
          $showCollapse={showCollapse}
          $collapse={collapse}
          $expand={expand}
          type={type}
        >
          <UIRow>
            <UIName>
              <BlurInput
                placeholder={config?.placeholder ?? 'Input Variable Name'}
                size="small"
                value={name}
                onChange={(value) => onChange('name', value)}
              />
            </UIName>
            <UIType>
              <TypeSelector
                value={typeSelectorValue}
                onChange={(_value) => {
                  onChangeProps?.({
                    ...(value || {}),
                    ..._value,
                  });
                }}
              />
            </UIType>
            <UIRequired>
              <Checkbox
                checked={isPropertyRequired}
                onChange={(e) => onChange('isPropertyRequired', e.target.checked)}
              />
            </UIRequired>
            <UIActions>
              <IconButton
                size="small"
                theme="borderless"
                icon={expand ? <IconShrink size="small" /> : <IconExpand size="small" />}
                onClick={() => {
                  setExpand((_expand) => !_expand);
                }}
              />
              {isDrilldownObject && (
                <IconButton
                  size="small"
                  theme="borderless"
                  icon={<IconAddChildren />}
                  onClick={() => {
                    onAddProperty();
                    setCollapse(true);
                  }}
                />
              )}
              <IconButton
                size="small"
                theme="borderless"
                icon={<IconMinus size="small" />}
                onClick={onRemove}
              />
            </UIActions>
          </UIRow>
          {expand && (
            <UIExpandDetail>
              <UILabel>{config?.descTitle ?? 'Description'}</UILabel>
              <BlurInput
                size="small"
                value={description}
                onChange={(value) => onChange('description', value)}
                placeholder={config?.descPlaceholder ?? 'Help LLM to understand the property'}
              />
              {$level === 0 && type && type !== 'array' && (
                <>
                  <UILabel style={{ marginTop: 10 }}>
                    {config?.defaultValueTitle ?? 'Default Value'}
                  </UILabel>
                  <DefaultValueWrapper>
                    <DefaultValue
                      value={defaultValue}
                      schema={value}
                      type={type}
                      placeholder={config?.defaultValuePlaceholder}
                      jsonFormatText={config?.jsonFormatText}
                      onChange={(value) => onChange('default', value)}
                    />
                  </DefaultValueWrapper>
                </>
              )}
            </UIExpandDetail>
          )}
        </UIPropertyMain>
        {showCollapse && (
          <UICollapsible $collapse={collapse}>
            <UIProperties $shrink={true}>
              {propertyList.map((_property, index) => (
                <PropertyEdit
                  key={_property.key}
                  value={_property}
                  config={config}
                  $level={$level + 1} // 传递递增的层级
                  $parentExpand={expand}
                  $parentType={type}
                  onChange={(_v) => {
                    onEditProperty(_property.key!, _v);
                  }}
                  onRemove={() => {
                    onRemoveProperty(_property.key!);
                  }}
                  $isLast={index === propertyList.length - 1}
                  $isFirst={index === 0}
                  $index={index}
                  $showLine={true}
                />
              ))}
            </UIProperties>
          </UICollapsible>
        )}
      </UIPropertyRight>
    </>
  );
}
