import Dayjs from 'dayjs'
import weekOfYear from 'dayjs/plugin/weekOfYear'
import weekday from 'dayjs/plugin/weekday'
import calendar from 'dayjs/plugin/calendar'
import isBetween from 'dayjs/plugin/isBetween'
import isoWeek from 'dayjs/plugin/isoWeek'
import utc from 'dayjs/plugin/utc'
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore'
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter'
import relativeTime from 'dayjs/plugin/relativeTime'

Dayjs.extend(utc)
Dayjs.extend(isoWeek)
Dayjs.extend(relativeTime)
Dayjs.extend(isBetween)
Dayjs.extend(calendar)
Dayjs.extend(weekOfYear)
Dayjs.extend(weekday)
Dayjs.extend(utc)
Dayjs.extend(isSameOrBefore)
Dayjs.extend(isSameOrAfter)

export const dayjs = Dayjs
