import { Popper, PopperTrigger, PopperContent } from '@/Components/Base'
import {
  isArray,
  isBoolean,
  isEmpty,
  isEqual,
  isFunction,
  isNil,
  isNumber,
  isObject,
  isString,
} from 'lodash-unified'
import { BiChevronDown, BiLoader } from 'react-icons/bi'
import { SelectCtx } from './token'
import { createRef, useEffect, useMemo, useRef, useState } from 'react'
import Option from './Option'
import { ensureArray } from '@/Services/Utils/arrayUtils'
import Empty from '../Icons/Empty'
import { transformCls } from '@/Services/Utils/reactUtils'
import { convertVietnameseStrToLatinStr } from '@/Services/Utils/stringUtils'
import CloseCircle from '../Icons/CloseCircle'
import Icon from '../Icon/Icon'
import { scrollIntoView } from '@/Services/Utils/scroll'
import { Chip } from './Chip'
import { BsPlus } from 'react-icons/bs'

export const Select = ({
  placement = 'bottom',
  data = [],
  label = '',
  valueKey = '',
  labelKey = '',
  multiple = false,
  disabled = false,
  triggerClass = '',
  popperClass = '',
  defaultFirstOption = false,
  modelValue = null,
  filterable = true,
  clearable = true,
  valueOnClear = null,
  isLoading = false,
  onChange = () => {},
  customLabel = null,
  dangerouslySetInnerHTML = false,
  autoFocusFilterable = false,
  noDataText = 'Không có dữ liệu',
  allowCreate = false,
}) => {
  const popperRef = useRef(null)

  const filterRef = useRef(null)
  const [filterValue, setFilterValue] = useState('')
  const [isHoveringTrigger, setIsHoveringTrigger] = useState(false)

  const [dataCreated, setDataCreated] = useState([])

  const onSelect = ({ value }) => {
    if (disabled || isLoading) return

    let _value = modelValue

    if (isSelectedOption(value)) {
      _value = multiple
        ? ensureArray(modelValue).filter((e) => !isEqual(e, value))
        : _value

      // remove created data
      if (allowCreate) {
        setDataCreated(
          dataCreated.filter((e) => !isEqual(getOptionValue(e), value)),
        )
      }
    } else {
      if (multiple) {
        _value = [...ensureArray(modelValue), value]
      } else {
        _value = value
      }
    }

    onChange(_value)

    !multiple && popperRef.current?.hide?.()
  }

  const getOptionValue = (option) => {
    return valueKey && isObject(option) ? option[valueKey] : option
  }

  const getFirstIndexSelectedOption = () => {
    return data.findIndex((e) => isEqual(modelValue, getOptionValue(e)))
  }

  const getOptionLabel = (option) => {
    if (!option) return ''
    if (isFunction(customLabel)) return customLabel(option)

    return `${labelKey && isObject(option) ? option[labelKey] : option}`
  }

  const isSelectedOption = (option) => {
    return multiple
      ? modelValue.includes(getOptionValue(option))
      : isEqual(modelValue, getOptionValue(option))
  }

  const onPopperShow = () => {
    if (filterable && autoFocusFilterable && filterRef.current) {
      filterRef.current.focus()
    }
  }

  const onPopperHide = () => {
    setFilterValue('')
  }

  const onMouseEnteredTrigger = () => {
    setIsHoveringTrigger(true)
  }

  const onMouseLeavedTrigger = () => {
    setIsHoveringTrigger(false)
  }

  const handleClearData = () => {
    onChange(multiple ? [] : valueOnClear)
    setDataCreated([])
    setFilterValue('')
  }

  const handleCreateNewOption = () => {
    const newOption = valueKey
      ? { [valueKey]: filterValue, [labelKey]: filterValue }
      : filterValue
    setDataCreated([...dataCreated, newOption])

    onSelect({
      value: filterValue,
    })
    setFilterValue('')
  }

  const shouldShowClearableIcon = useMemo(() => {
    return (
      clearable &&
      (!isEmpty(modelValue) || modelValue != valueOnClear) &&
      isHoveringTrigger
    )
  }, [clearable, modelValue, isHoveringTrigger])

  const selectTriggerKls = useMemo(() => {
    return transformCls([
      'flex items-center justify-between px-2 py-1 outline-none rounded-lg w-[200px] bg-input-bg',
      'select-none cursor-pointer',
      triggerClass,
    ])
  }, [triggerClass])

  const _data = useMemo(() => {
    return [...data, ...dataCreated]
  }, [data, dataCreated])

  const selectedLabel = useMemo(() => {
    if (multiple && isArray(modelValue) && !isEmpty(modelValue)) {
      return modelValue.map((e) =>
        getOptionLabel(_data.find((item) => isEqual(e, getOptionValue(item)))),
      )
    }
    return getOptionLabel(_data.find((e) => isSelectedOption(e))) || label
  }, [_data, modelValue])

  const optionsToShow = useMemo(() => {
    return _data.filter((e) =>
      convertVietnameseStrToLatinStr(getOptionLabel(e))
        .toLowerCase()
        .includes(convertVietnameseStrToLatinStr(filterValue).toLowerCase()),
    )
  }, [_data, filterValue])

  useEffect(() => {
    if (multiple) {
      if (!isArray(modelValue)) {
        onChange(isEmpty(modelValue) ? [] : ensureArray(modelValue))
      }
    } else {
      if (!isNil(modelValue) && _data.length) {
        if (
          (!isString(modelValue) &&
            !isNumber(modelValue) &&
            !isBoolean(modelValue)) ||
          _data.every((e) => !isSelectedOption(e))
        ) {
          onChange(valueOnClear)
        }
      }
    }
  }, [_data, modelValue])

  useEffect(() => {
    if (allowCreate) {
      const _modelValue = isEmpty(modelValue) ? [] : ensureArray(modelValue)

      const _dataCreated = _modelValue.filter(
        (e) => !_data.some((item) => isEqual(e, getOptionValue(item))),
      )
      setDataCreated((prev) => [...prev, ..._dataCreated])
    }
  }, [modelValue])

  useEffect(() => {
    if (defaultFirstOption && !isEmpty(data[0]) && !isSelectedOption(data[0])) {
      const optionValue = getOptionValue(data[0])

      onChange(multiple ? [optionValue] : optionValue)
    }
  }, [data])

  const arrLength = _data.length
  const optionContainerRef = useRef()
  const [elRefs, setElRefs] = useState([])

  useEffect(() => {
    setElRefs((elRefs) =>
      Array(arrLength)
        .fill()
        .map((_, i) => elRefs[i] || createRef()),
    )
  }, [arrLength])

  useEffect(() => {
    if (popperRef.current?.isVisible) {
      const indexFirstOption = getFirstIndexSelectedOption()
      if (indexFirstOption == -1) return

      scrollIntoView(
        optionContainerRef.current,
        elRefs[indexFirstOption].current,
      )
    }
  }, [popperRef.current?.isVisible])

  return (
    <SelectCtx.Provider
      value={{
        dangerouslySetInnerHTML,
        valueKey,
        labelKey,
        multiple,
        disabled,
        modelValue,
        onSelect,
        getOptionLabel,
        getOptionValue,
        isSelectedOption,
      }}
    >
      <Popper
        ref={popperRef}
        placement={placement}
        fit
        onHide={onPopperHide}
        onShow={onPopperShow}
        disabled={disabled}
        offset={0}
      >
        <PopperTrigger>
          <button
            className={transformCls([
              selectTriggerKls,
              disabled
                ? 'opacity-90 pointer-events-none cursor-not-allowed bg-gray-100/80'
                : 'opacity-100',
              'transition-all',
              multiple ? 'min-h-[32px]' : 'h-[32px] ',
            ])}
            onMouseEnter={onMouseEnteredTrigger}
            onMouseLeave={onMouseLeavedTrigger}
          >
            {multiple && isArray(selectedLabel) ? (
              <div className="flex flex-wrap gap-1">
                {selectedLabel.map((item, index) => (
                  <Chip
                    key={index}
                    text={item}
                    itemHtml={dangerouslySetInnerHTML}
                    onClose={() => onSelect({ value: modelValue[index] })}
                    closable={!disabled}
                  />
                ))}
              </div>
            ) : (
              <Chip
                normal
                text={selectedLabel}
                itemHtml={dangerouslySetInnerHTML}
                closable={false}
              />
            )}

            {shouldShowClearableIcon ? (
              <Icon size={16} onClick={handleClearData}>
                <CloseCircle />
              </Icon>
            ) : (
              <Icon size={16}>
                <BiChevronDown />
              </Icon>
            )}
          </button>
        </PopperTrigger>

        <PopperContent
          className={transformCls([
            popperClass,
            'rounded-xl bg-white slide-down',
          ])}
        >
          {filterable && (
            <div className="my-2">
              <input
                ref={filterRef}
                value={filterValue}
                onInput={(e) => setFilterValue(e.target.value)}
                placeholder={'Tìm kiếm' + (allowCreate ? ' hoặc tạo mới' : '')}
                className="base-input w-full"
              />
            </div>
          )}

          {isLoading && (
            <div className="absolute-full bg-gray-800/10 z-10 flex items-center justify-center rounded-[6px_6px_0_0]">
              <div className="loading inline-flex">
                <Icon size={30}>
                  <BiLoader />
                </Icon>
              </div>
            </div>
          )}

          {optionsToShow.length || (allowCreate && filterValue) ? (
            <div
              ref={optionContainerRef}
              className="scroll-smooth max-h-[200px] overflow-auto scrollbox custom-scrollbar"
            >
              {optionsToShow.map((option, index) => (
                <Option
                  key={index}
                  ref={elRefs[index]}
                  value={getOptionValue(option)}
                  label={getOptionLabel(option)}
                  isSelected={isSelectedOption(getOptionValue(option))}
                />
              ))}
              {allowCreate && filterValue && (
                <div className="flex items-center justify-start">
                  <button
                    className="flex items-center justify-start w-full px-3 py-1 rounded-lg bg-gray-50 border-uneti-primary border border-dashed text-vs-text"
                    onClick={handleCreateNewOption}
                  >
                    <Icon>
                      <BsPlus />
                    </Icon>
                    {filterValue}
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="flex items-center justify-center my-2">
              <Empty />
              <p className="opacity-80 text-slate-700">{noDataText}</p>
            </div>
          )}
        </PopperContent>
      </Popper>
    </SelectCtx.Provider>
  )
}
