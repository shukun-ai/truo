import { Injectable } from '@nestjs/common';
import {
  parseISO,
  addMilliseconds as addMillisecondsFns,
  addSeconds as addSecondsFns,
  addMinutes as addMinutesFns,
  addHours as addHoursFns,
  addBusinessDays as addBusinessDaysFns,
  addDays as addDaysFns,
  addWeeks as addWeeksFns,
  addMonths as addMonthsFns,
  addQuarters as addQuartersFns,
  addYears as addYearsFns,
  format as formatFns,
  isEqual as isEqualFns,
  isAfter as isAfterFns,
  isBefore as isBeforeFns,
} from 'date-fns';

@Injectable()
export class DateResolverService {
  now(): string {
    return new Date().toISOString();
  }

  /**
   * @see {@link https://date-fns.org/v2.29.3/docs/addMilliseconds}
   */
  addMilliseconds(isoDate: string, amount: number): string {
    return addMillisecondsFns(parseISO(isoDate), amount).toISOString();
  }

  /**
   * @see {@link https://date-fns.org/v2.29.3/docs/addSeconds}
   */
  addSeconds(isoDate: string, amount: number): string {
    return addSecondsFns(parseISO(isoDate), amount).toISOString();
  }

  /**
   * @see {@link https://date-fns.org/v2.29.3/docs/addMinutes}
   */
  addMinutes(isoDate: string, amount: number): string {
    return addMinutesFns(parseISO(isoDate), amount).toISOString();
  }

  /**
   * @see {@link https://date-fns.org/v2.29.3/docs/addHours}
   */
  addHours(isoDate: string, amount: number): string {
    return addHoursFns(parseISO(isoDate), amount).toISOString();
  }

  /**
   * @see {@link https://date-fns.org/v2.29.3/docs/addBusinessDays}
   */
  addBusinessDays(isoDate: string, amount: number): string {
    return addBusinessDaysFns(parseISO(isoDate), amount).toISOString();
  }

  /**
   * @see {@link https://date-fns.org/v2.29.3/docs/addDays}
   */
  addDays(isoDate: string, amount: number): string {
    return addDaysFns(parseISO(isoDate), amount).toISOString();
  }

  /**
   * @see {@link https://date-fns.org/v2.29.3/docs/addWeeks}
   */
  addWeeks(isoDate: string, amount: number): string {
    return addWeeksFns(parseISO(isoDate), amount).toISOString();
  }

  /**
   * @see {@link https://date-fns.org/v2.29.3/docs/addMonths}
   */
  addMonths(isoDate: string, amount: number): string {
    return addMonthsFns(parseISO(isoDate), amount).toISOString();
  }

  /**
   * @see {@link https://date-fns.org/v2.29.3/docs/addQuarters}
   */
  addQuarters(isoDate: string, amount: number): string {
    return addQuartersFns(parseISO(isoDate), amount).toISOString();
  }

  /**
   * @see {@link https://date-fns.org/v2.29.3/docs/addYears}
   */
  addYears(isoDate: string, amount: number): string {
    return addYearsFns(parseISO(isoDate), amount).toISOString();
  }

  /**
   * @see {@link https://date-fns.org/v2.29.3/docs/format}
   */
  format(
    isoDate: string,
    formatString: string,
    options?: {
      weekStartsOn?: 0 | 1 | 2 | 3 | 4 | 5 | 6;
    },
  ): string {
    const date = parseISO(isoDate);
    return formatFns(date, formatString, options);
  }

  /**
   * @see {@link https://date-fns.org/v2.29.3/docs/isEqual}
   */
  isEqual(leftIsoDate: string, rightIsoDate: string): boolean {
    return isEqualFns(parseISO(leftIsoDate), parseISO(rightIsoDate));
  }

  /**
   * @see {@link https://date-fns.org/v2.29.3/docs/isAfter}
   * @example
   * // Is 10 July 1989 after 11 February 1987?
   * const result = isAfter(new Date(1989, 6, 10), new Date(1987, 1, 11))
   * //=> true
   */
  isAfter(isoDate: string, isoDateToCompare: string): boolean {
    return isAfterFns(parseISO(isoDate), parseISO(isoDateToCompare));
  }

  /**
   * @see {@link https://date-fns.org/v2.29.3/docs/isBefore}
   * @example
   * // Is 10 July 1989 before 11 February 1987?
   * const result = isBefore(new Date(1989, 6, 10), new Date(1987, 1, 11))
   * //=> false
   */
  isBefore(isoDate: string, isoDateToCompare: string): boolean {
    return isBeforeFns(parseISO(isoDate), parseISO(isoDateToCompare));
  }
}
