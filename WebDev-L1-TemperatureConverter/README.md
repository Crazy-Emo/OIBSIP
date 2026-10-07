# Temperature Converter Website

Task 3 of Level 1, Web Development and Designing, Oasis Infobyte SIP.

A converter for Celsius, Fahrenheit, and Kelvin, written in HTML5, CSS3, and vanilla JavaScript.

## Feature checklist

- Numeric input with validation. Text, empty input, and malformed numbers show an error message
- Unit selector for the entered unit (Celsius, Fahrenheit, Kelvin)
- All three units shown at once, with the entered unit highlighted
- Convert button (pressing Enter in the field works too)
- Results with unit labels, rounded to 2 decimal places
- Absolute zero check for every unit: below -273.15 C, -459.67 F, or 0 K shows a friendly message
- Centred layout with clear labels, plus a thermometer gauge that follows the result

## How it works

Every input is converted to Celsius first, then out to the other two units.

| From | To Celsius |
| --- | --- |
| Fahrenheit | (F - 32) x 5/9 |
| Kelvin | K - 273.15 |

## Run it

Open `index.html` in a browser. No build step.

## Screenshots

See the `screenshots` folder.
