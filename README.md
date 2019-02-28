[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
# Racoon

This is a library for masking, it is still on the initial states.

By now we support normal `input` and PrimeNG `p-calendar`


For the `input` usage:

`<input rInputMask='A99-99-99'/>`

`9` means a Numeric value and `A` means a Alpha value, anything else is considered as a fixed string.


For the `p-calendar` usage:

`<p-calendar rPCalendarMask></p-calendar>`

It will take the date format and set the mask using it.

We still do not support th full length of the date format, just the mostly used by now.

| Date Format Part | Supported |
| :--------------- | :-------- | 
|d                 | Partially |
|dd                | Yes       |
|o                 | No        |
|oo                | No        |
|D                 | No        |
|DD                | No        |
|m                 | Partially |
|mm                | Yes       |
|M                 | No        |
|MM                | No        |
|y                 | Yes       |
|yy                | Yes       |
|@                 | No        |
|!                 | No        |
|'...'             | No        |
|''                | No        |
|anything else     | Yes       | 
|Hour              | Yes       |
|Minutes           | Yes       |
|Seconds           | Yes       |

The Partially supported, only works with ONE digit
