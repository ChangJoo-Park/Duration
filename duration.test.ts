import {
  assert,
  assertEquals,
  assertObjectMatch,
  assertStrictEquals,
  assertThrows,
} from "https://deno.land/std@0.86.0/testing/asserts.ts";
import Duration from "./duration.ts";

Deno.test("Testing duration", () => {
  var d = new Duration({ days: 1 });
  assertEquals(86400000000, d.inMicroseconds);
  assertEquals(86400000, d.inMilliseconds);
  assertEquals(86400, d.inSeconds);
  assertEquals(1440, d.inMinutes);
  assertEquals(24, d.inHours);
  assertEquals(1, d.inDays);

  d = new Duration({ hours: 1 });
  assertEquals(3600000000, d.inMicroseconds);
  assertEquals(3600000, d.inMilliseconds);
  assertEquals(3600, d.inSeconds);
  assertEquals(60, d.inMinutes);
  assertEquals(1, d.inHours);
  assertEquals(0, d.inDays);

  d = new Duration({ minutes: 1 });
  assertEquals(60000000, d.inMicroseconds);
  assertEquals(60000, d.inMilliseconds);
  assertEquals(60, d.inSeconds);
  assertEquals(1, d.inMinutes);
  assertEquals(0, d.inHours);
  assertEquals(0, d.inDays);

  d = new Duration({ seconds: 1 });
  assertEquals(1000000, d.inMicroseconds);
  assertEquals(1000, d.inMilliseconds);
  assertEquals(1, d.inSeconds);
  assertEquals(0, d.inMinutes);
  assertEquals(0, d.inHours);
  assertEquals(0, d.inDays);

  d = new Duration({ milliseconds: 1 });
  assertEquals(1000, d.inMicroseconds);
  assertEquals(1, d.inMilliseconds);
  assertEquals(0, d.inSeconds);
  assertEquals(0, d.inMinutes);
  assertEquals(0, d.inHours);
  assertEquals(0, d.inDays);

  d = new Duration({ microseconds: 1 });
  assertEquals(1, d.inMicroseconds);
  assertEquals(0, d.inMilliseconds);
  assertEquals(0, d.inSeconds);
  assertEquals(0, d.inMinutes);
  assertEquals(0, d.inHours);
  assertEquals(0, d.inDays);

  d = new Duration({ milliseconds: 1, microseconds: 999 });
  assertEquals(1999, d.inMicroseconds);
  assertEquals(1, d.inMilliseconds);
  d = new Duration({ seconds: 1, milliseconds: 999 });
  assertEquals(1999, d.inMilliseconds);
  assertEquals(1, d.inSeconds);
  d = new Duration({ minutes: 1, seconds: 59 });
  assertEquals(119, d.inSeconds);
  assertEquals(1, d.inMinutes);
  d = new Duration({ hours: 1, minutes: 59 });
  assertEquals(119, d.inMinutes);
  assertEquals(1, d.inHours);
  d = new Duration({ days: 1, hours: 23 });
  assertEquals(47, d.inHours);
  assertEquals(1, d.inDays);
  d = new Duration(
    {
      days: 0,
      hours: 23,
      minutes: 59,
      seconds: 59,
      milliseconds: 999,
      microseconds: 999,
    },
  );
  assertEquals(0, d.inDays);
  d = new Duration({ days: -1 });
  assertEquals(-86400000000, d.inMicroseconds);
  assertEquals(-86400000, d.inMilliseconds);
  assertEquals(-86400, d.inSeconds);
  assertEquals(-1440, d.inMinutes);
  assertEquals(-24, d.inHours);
  assertEquals(-1, d.inDays);
  d = new Duration({ hours: -1 });
  assertEquals(-3600000000, d.inMicroseconds);
  assertEquals(-3600000, d.inMilliseconds);
  assertEquals(-3600, d.inSeconds);
  assertEquals(-60, d.inMinutes);
  assertEquals(-1, d.inHours);
  assertEquals(0, d.inDays);

  d = new Duration({ minutes: -1 });
  assertEquals(-60000000, d.inMicroseconds);
  assertEquals(-60000, d.inMilliseconds);
  assertEquals(-60, d.inSeconds);
  assertEquals(-1, d.inMinutes);
  assertEquals(0, d.inHours);
  assertEquals(0, d.inDays);
  d = new Duration({ seconds: -1 });
  assertEquals(-1000000, d.inMicroseconds);
  assertEquals(-1000, d.inMilliseconds);
  assertEquals(-1, d.inSeconds);
  assertEquals(0, d.inMinutes);
  assertEquals(0, d.inHours);
  assertEquals(0, d.inDays);
  d = new Duration({ milliseconds: -1 });
  assertEquals(-1000, d.inMicroseconds);
  assertEquals(-1, d.inMilliseconds);
  assertEquals(0, d.inSeconds);
  assertEquals(0, d.inMinutes);
  assertEquals(0, d.inHours);
  assertEquals(0, d.inDays);
  d = new Duration({ microseconds: -1 });
  assertEquals(-1, d.inMicroseconds);
  assertEquals(0, d.inMilliseconds);
  assertEquals(0, d.inSeconds);
  assertEquals(0, d.inMinutes);
  assertEquals(0, d.inHours);
  assertEquals(0, d.inDays);

  d = new Duration({ days: 1, hours: -24 });
  assertEquals(0, d.inMicroseconds);
  d = new Duration({ hours: 1, minutes: -60 });
  assertEquals(0, d.inMicroseconds);
  d = new Duration({ minutes: 1, seconds: -60 });
  assertEquals(0, d.inMicroseconds);
  d = new Duration({ seconds: 1, milliseconds: -1000 });
  assertEquals(0, d.inMicroseconds);
  d = new Duration({ milliseconds: 1, microseconds: -1000 });
  assertEquals(0, d.inMicroseconds);

  d = new Duration({ hours: 25 });
  assertEquals(1, d.inDays);
  assertEquals(25, d.inHours);
  assertEquals(1500, d.inMinutes);
  assertEquals(90000, d.inSeconds);
  assertEquals(90000000, d.inMilliseconds);
  assertEquals(90000000000, d.inMicroseconds);
  d = new Duration({ minutes: 61 });
  assertEquals(0, d.inDays);
  assertEquals(1, d.inHours);
  assertEquals(61, d.inMinutes);
  assertEquals(3660, d.inSeconds);
  assertEquals(3660000, d.inMilliseconds);
  assertEquals(3660000000, d.inMicroseconds);
  d = new Duration({ seconds: 61 });
  assertEquals(0, d.inDays);
  assertEquals(0, d.inHours);
  assertEquals(1, d.inMinutes);
  assertEquals(61, d.inSeconds);
  assertEquals(61000, d.inMilliseconds);
  assertEquals(61000000, d.inMicroseconds);
  d = new Duration({ milliseconds: 1001 });
  assertEquals(0, d.inDays);
  assertEquals(0, d.inHours);
  assertEquals(0, d.inMinutes);
  assertEquals(1, d.inSeconds);
  assertEquals(1001, d.inMilliseconds);
  assertEquals(1001000, d.inMicroseconds);
  d = new Duration({ microseconds: 1001 });
  assertEquals(0, d.inDays);
  assertEquals(0, d.inHours);
  assertEquals(0, d.inMinutes);
  assertEquals(0, d.inSeconds);
  assertEquals(1, d.inMilliseconds);
  assertEquals(1001, d.inMicroseconds);

  var d1 = new Duration({ milliseconds: 1000 });
  var d2 = new Duration({ seconds: 1 });
  assertEquals(d1, d2);

  // !!!: TypeScript does not support const Duration. this will be always false.
  // d1 = new Duration({microseconds: 1000});
  // d2 = new Duration({milliseconds: 1});
  // assertStrictEquals(d1, d2);

  d1 = new Duration({ hours: 1 });
  d2 = new Duration({ hours: -1 });
  d = d1.add(d2);
  assertEquals(0, d.inMicroseconds);
  d = d1.subtract(d2);
  assertEquals(3600000000 * 2, d.inMicroseconds);

  d2 = new Duration({ hours: 1 });
  d = d1.add(d2);
  assertEquals(3600000000 * 2, d.inMicroseconds);
  d = d1.subtract(d2);
  assertEquals(0, d.inMicroseconds);

  d = d1.multiply(2);
  assertEquals(3600000000 * 2, d.inMicroseconds);
  d = d1.multiply(-1);
  assertEquals(-3600000000, d.inMicroseconds);
  d = d1.multiply(0);
  assertEquals(0, d.inMicroseconds);

  d = d1.divide(2);
  assertEquals(1800000000, d.inMicroseconds);
  d = d1.divide(3600000001);
  assertEquals(0, d.inMicroseconds);
  d = d1.divide(-3600000001);
  assertEquals(0, d.inMicroseconds);
  d = d1.divide(3599999999);
  assertEquals(1, d.inMicroseconds);
  d = d1.divide(-3599999999);
  assertEquals(-1, d.inMicroseconds);
  d = d1.divide(-1);
  assertEquals(-3600000000, d.inMicroseconds);
  d = d1.multiply(0);
  assertEquals(0, d.inMicroseconds);
  assertThrows(() => d1.divide(0), RangeError);

  d = new Duration({ microseconds: 0 });
  assert(d.lessThan(new Duration({ microseconds: 1 })));
  assert(d.lessThanEqual(new Duration({ microseconds: 1 })));
  assert(d.lessThanEqual(d));
  assert(d.moreThan(new Duration({ microseconds: -1 })));
  assert(d.moreThanEqual(new Duration({ microseconds: -1 })));
  assert(d.moreThanEqual(d));

  d = new Duration({
    days: 1,
    hours: 3,
    minutes: 17,
    seconds: 42,
    milliseconds: 823,
    microseconds: 127,
  });
  assertEquals("27:17:42.823127", d.toString());

  d = new Duration({ hours: 1999, minutes: 17, seconds: 42 });
  assertEquals("1999:17:42.000000", d.toString());

  d = new Duration({
    days: -1,
    hours: -3,
    minutes: -17,
    seconds: -42,
    milliseconds: -823,
    microseconds: -127,
  });
  assertEquals("-27:17:42.823127", d.toString());

  d = new Duration({hours: -1999, minutes: -17, seconds: -42});
  assertEquals("-1999:17:42.000000", d.toString());

  d = new Duration({microseconds: 1});
  assertEquals("0:00:00.000001", d.toString());

  d = new Duration({microseconds: 9});
  assertEquals("0:00:00.000009", d.toString());

  d = new Duration({microseconds: 10});
  assertEquals("0:00:00.000010", d.toString());

  d = new Duration({microseconds: 99});
  assertEquals("0:00:00.000099", d.toString());

  d = new Duration({microseconds: 100});
  assertEquals("0:00:00.000100", d.toString());

  d = new Duration({microseconds: 999});
  assertEquals("0:00:00.000999", d.toString());

  d = new Duration({microseconds: 1000});
  assertEquals("0:00:00.001000", d.toString());

  d = new Duration({microseconds: 9999});
  assertEquals("0:00:00.009999", d.toString());

  d = new Duration({microseconds: 10000});
  assertEquals("0:00:00.010000", d.toString());

  d = new Duration({microseconds: 99999});
  assertEquals("0:00:00.099999", d.toString());

  d = new Duration({microseconds: 100000});
  assertEquals("0:00:00.100000", d.toString());

  d = new Duration({microseconds: 999999});
  assertEquals("0:00:00.999999", d.toString());

  d = new Duration({microseconds: 1000000});
  assertEquals("0:00:01.000000", d.toString());

  d1 = new Duration({hours: 1});
  d2 = new Duration({hours: -1});
  assert(d1.isNegative === false);
  assert(d2.isNegative);
  assertEquals(d1, d1.abs());
  assertEquals(d1, d2.abs());

  assertEquals(d2, d1.multiply(-1));
  assertEquals(d1, d2.multiply(-1));
});
