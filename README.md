# Duration

 A span of time as 2^31-1 seconds.

 `Duration` is complete successor of dart's [Duration](https://api.dart.dev/stable/2.10.5/dart-core/Duration-class.html) class.

 Duration is not depends on Date, Timezone. Duration based on microseconds,
 You can convert to days, hours, minutes, seconds, milliseconds and microseconds itself.

 To create a new Duration object, use single constructor giving the appropriate arguments:

 ```ts
 Duration fastestMarathon = new Duration({hours:2, minutes:3, seconds:2});
 ```

 The Duration is sum of all individual parts notice above.

 ```ts
 assert(fastestMarathon === 123);
 ```
 The parts of Duration can be a negative one.

 Duration has arithmetic and compare method, You can add, subtract, multiply, divide and compare like >, <, >=, <=.
