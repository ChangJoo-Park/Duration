import { truncateDivide } from "./helpers.ts";

/**
 * A span of time as 2^31-1 seconds.
 *
 * `Duration` is complete successor of dart's [Duration](https://api.dart.dev/stable/2.10.5/dart-core/Duration-class.html) class.
 *
 * Duration is not depends on Date, Timezone. Duration based on microseconds,
 * You can convert to days, hours, minutes, seconds, milliseconds and microseconds itself.
 *
 * To create a new Duration object, use single constructor giving the appropriate arguments:
 *
 * ```ts
 * Duration fastestMarathon = new Duration({hours:2, minutes:3, seconds:2});
 * ```
 *
 * The Duration is sum of all individual parts notice above.
 *
 * ```ts
 * assert(fastestMarathon === 123);
 * ```
 * The parts of Duration can be a negative one.
 *
 * Duration has arithmetic and compare method, You can add, subtract, multiply, divide and compare like >, <, >=, <=.
 */
export default class Duration {
  static microsecondsPerMillisecond = 1000;
  static millisecondsPerSecond = 1000;
  static secondsPerMinute = 60;
  static minutesPerHour = 60;
  static hoursPerDay = 24;

  static microsecondsPerSecond = Duration.microsecondsPerMillisecond *
    Duration.millisecondsPerSecond;
  static microsecondsPerMinute = Duration.microsecondsPerSecond *
    Duration.secondsPerMinute;
  static microsecondsPerHour = Duration.microsecondsPerMinute *
    Duration.minutesPerHour;
  static microsecondsPerDay = Duration.microsecondsPerHour *
    Duration.hoursPerDay;
  static millisecondsPerMinute = Duration.millisecondsPerSecond *
    Duration.secondsPerMinute;
  static millisecondsPerHour = Duration.millisecondsPerMinute *
    Duration.minutesPerHour;
  static millisecondsPerDay = Duration.millisecondsPerHour *
    Duration.hoursPerDay;
  static secondsPerHour = Duration.secondsPerMinute * Duration.minutesPerHour;
  static secondsPerDay = Duration.secondsPerHour * Duration.hoursPerDay;
  static minutesPerDay = Duration.minutesPerHour * Duration.hoursPerDay;
  static zero = new Duration({ seconds: 0 });

  /*
   * The value of this Duration object in **microseconds**.
   */
  private _duration: number;

  /**
   *
   * @param DurationOptions
   */
  constructor(
    {
      days = 0,
      hours = 0,
      minutes = 0,
      seconds = 0,
      milliseconds = 0,
      microseconds = 0,
    }: DurationOptions,
  ) {
    this._duration = Duration.microsecondsPerDay * days +
        Duration.microsecondsPerHour * hours +
        Duration.microsecondsPerMinute * minutes +
        Duration.microsecondsPerSecond * seconds +
        Duration.microsecondsPerMillisecond * milliseconds +
        microseconds ?? 0;
  }

  /**
   * Returns new Duration with microseconds
   * @param microseconds
   */
  _microseconds(microseconds = 0): Duration {
    return new Duration({ microseconds });
  }

  /**
   * Returns this Duration sum with given other Duration
   * @param other
   */
  add(other: Duration): Duration {
    return this._microseconds(this.duration + other.duration);
  }

  /**
   * Returns this Duration subtract with given other Duration
   * @param other
   */
  subtract(other: Duration): Duration {
    return this._microseconds(this.duration - other.duration);
  }

  /**
   * Returns this Duration multiply with given factor
   * @param other
   */
  multiply(factor: number): Duration {
    return this._microseconds(Math.round(this.duration * factor));
  }

  /**
   * Returns this Duration divide with given quotient
   * @param other
   */
  divide(quotient: number): Duration {
    return this._microseconds(truncateDivide(this.duration, quotient));
  }

  /**
   * Returns true if this Duration is greater than other Duration
   * @param other
   */
  moreThan(other: Duration): boolean {
    return this.duration > other.duration;
  }

  /**
   * Returns true if this Duration is greater than equal with other Duration
   * @param other
   */
  moreThanEqual(other: Duration): boolean {
    return this.duration >= other.duration;
  }

  /**
   * Returns true if this Duration is less than other Duration
   * @param other
   */
  lessThan(other: Duration): boolean {
    return this.duration < other.duration;
  }

  /**
   * Returns true if this Duration is less than equal with other Duration
   * @param other
   */
  lessThanEqual(other: Duration): boolean {
    return this.duration <= other.duration;
  }

  /**
   * Returns number of whole milliseconds spanned by this Duration
   *
   * Same as inMilliseconds
   */
  get duration(): number {
    return this._duration;
  }
  /**
   * Returns the number of whole days spanned by this Duration.
   */
  get inDays(): number {
    return truncateDivide(this.duration, Duration.microsecondsPerDay);
  }

  /**
   * Returns the number of whole hours spanned by this Duration.
   */
  get inHours(): number {
    return truncateDivide(this.duration, Duration.microsecondsPerHour);
  }

  /**
   * Returns number of whole microseconds spanned by this Duration.
   */
  get inMinutes(): number {
    return truncateDivide(this.duration, Duration.microsecondsPerMinute);
  }

  /**
   * Returns the number of whole seconds spanned by this Duration.
   */
  get inSeconds(): number {
    return truncateDivide(this.duration, Duration.microsecondsPerSecond);
  }

  /**
   * Returns number of whole milliseconds spanned by this Duration.
   */
  get inMilliseconds(): number {
    return truncateDivide(this.duration, Duration.microsecondsPerMillisecond);
  }

  /**
   * Returns number of whole microseconds spanned by this Duration.
   */
  get inMicroseconds(): number {
    return this.duration;
  }

  /**
   * Returns whether this Duration is zero
   */
  get isZero(): boolean {
    return this.duration === 0;
  }

  /**
   * Returns whether this Duration is negative
   */
  get isNegative(): boolean {
    return this.duration < 0;
  }

  /**
   * Returns a new Duration representing the absolute value of this Duration.
   */
  abs(): Duration {
    return this._microseconds(Math.abs(this.duration));
  }

  /**
   * Compares this Duration to other, returning zero if the values are equal.
   *
   * ```ts
   * const duration1 = new Duration({ days: 2 });
   * const duration2 = new Duration({ days: 1 });
   *
   * assert(duration1.compareTo(duration2) === 1)
   *
   * const duration1 = new Duration({ days: 1 });
   * const duration2 = new Duration({ days: 2 });
   *
   * assert(duration1.compareTo(duration2) === -1)
   *
   * const duration1 = new Duration({ days: 1 });
   * const duration2 = new Duration({ days: 1 });
   *
   * assert(duration1.compareTo(duration2) === 0)
   *
   * ```
   * @param other {Duration}
   */
  compareTo(other: Duration): number {
    if (this.duration > other.duration) {
      return 1;
    } else if (this.duration < other.duration) {
      return -1;
    }
    return 0;
  }

  toString(): string {
    function sixDigits(n: number): string {
      if (n >= 100000) return `${n}`;
      if (n >= 10000) return `0${n}`;
      if (n >= 1000) return `00${n}`;
      if (n >= 100) return `000${n}`;
      if (n >= 10) return `0000${n}`;
      return `00000${n}`;
    }
    function twoDigits(n: number): string {
      if (n >= 10) return `${n}`;
      return `0${n}`;
    }

    if (this.inMicroseconds < 0) {
      return `-${this._microseconds(-this._duration)}`;
    }

    const twoDigitMinutes = twoDigits(
      this.inMinutes % (Duration.minutesPerHour),
    );
    const twoDigitSeconds = twoDigits(
      this.inSeconds % (Duration.secondsPerMinute),
    );
    const sixDigitUs = sixDigits(
      this.inMicroseconds % (Duration.microsecondsPerSecond),
    );
    return `${this.inHours}:${twoDigitMinutes}:${twoDigitSeconds}.${sixDigitUs}`;
  }
}

/**
 * DurationOptions using Duration constructor
 *
 * all properties can be omitted.
 */
interface DurationOptions {
  days?: number;
  hours?: number;
  minutes?: number;
  seconds?: number;
  milliseconds?: number;
  microseconds?: number;
}
