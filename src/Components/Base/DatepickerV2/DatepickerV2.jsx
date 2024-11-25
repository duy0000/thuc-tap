import { Popper, PopperTrigger, PopperContent } from '@/Components/Base'
import { useEffect, useRef } from 'react'
import { transformCls } from '@/Services/Utils/reactUtils'
import { useNamespace } from '@/Services/Hooks'
import PanelDatePick from './PanelDatePick'
import PanelHeader from './PanelHeader'
import PickLabel from './PickLabel'
import Clearable from './Clearable'
import { useDatePick } from './useDatePick'
import { DatepickerCtx } from './constants'

import './Datepicker.scss'

export default function DatepickerV2(props) {
  const { labelFormat = 'DD/MM/YYYY' } = props
  const ns = useNamespace('datepicker')

  const popperRef = useRef(null)

  const {
    shouldShowClearableIcon,
    selectTriggerKls,
    isDisabled,
    days,
    value,
    selfState,
    handleClearData,
    onMouseEnteredTrigger,
    onMouseLeavedTrigger,
    generateDaysInCalendar,
    selectMonth,
    selectYear,
    selectDate,
  } = useDatePick(props)

  useEffect(() => {
    generateDaysInCalendar()
  }, [])

  return (
    <DatepickerCtx.Provider
      value={{
        value,
        isDisabled,
        selfState,
        selectDate,
      }}
    >
      <Popper
        ref={popperRef}
        disabled={isDisabled}
        offset={0}
        arrow={false}
        teleport={props.teleport}
      >
        <PopperTrigger>
          <button
            className={transformCls([
              selectTriggerKls,
              ns.is('disabled', isDisabled),
              ns.e('trigger'),
            ])}
            onMouseEnter={onMouseEnteredTrigger}
            onMouseLeave={onMouseLeavedTrigger}
          >
            <PickLabel value={value} labelFormat={labelFormat} />
            <Clearable
              handleClearData={handleClearData}
              shouldShowClearableIcon={shouldShowClearableIcon}
            />
          </button>
        </PopperTrigger>

        <PopperContent
          className={transformCls(['slide-down', ns.e('panel-wrapper')])}
        >
          <PanelHeader
            selfState={selfState}
            selectMonth={selectMonth}
            selectYear={selectYear}
          />

          <PanelDatePick days={days} />
        </PopperContent>
      </Popper>
    </DatepickerCtx.Provider>
  )
}
