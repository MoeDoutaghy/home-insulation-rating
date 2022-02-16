# Home Insulation CLI Rating App

## Description

This CLI application rates the ecobee thermostat owners by the quality of insulation of their home. Each user's R-value is to be rated relative to the others in the same region (city/province/county) they live. The rating is a number between 1 and 10. For a given home and region, if the percentage of homes with better insulation (R-value) is in the [90, 100) range, then the home is rated 1, if the percentage of homes with better insulation is in the [80, 90) range, then the home is rated 2. A home that is in the top range, such that percentage of homes with better insulation falls in [0, 10) range, it is rated 10.

## Getting started

1. Make sure nodeJS and NPM are installed in your environment
2. Run these commands to install dependencies and then start the CLI app

```
npm install
npm start
```

### Sample input and output

```
=================================================
       Welcome to Home Insulation Rater App
=================================================
Enter some data in the following format.
Then you will be prompted to enter query data.
Data and query sections are seperated with a new line.
When you are done entering user data, enter a new line.
When you are done entering query data, enter 'control + c' to see the result.

Data fomrat    =>   "<name>" "<country>/<province>/<city>" <rvalue>
Query fomrat   =>   "<name>" "<region>"

<region>: Can be <country> OR <country>/<province> OR  <country>/<province>/<city>

 =================
| Program Started |
 =================
> Enter user data (When done, enter a new line):
"John Doe" "Canada/Ontario/Toronto" 1.5
"Samanta Smith" "Canada/Ontario/London" 3.7
"Adam Xin" "Canada/British Columbia/Vancouver" 2.110
"Monica Taylor" "Canada/Ontario/Toronto" 2.110
"Alicia Yazzie" "US/Arizona/Phoenix" 5.532
"Mohammed Zadeh" "Canada/Ontario/Toronto" 1.43

> Enter query string (when done, enter 'control + c' to display the output):
"John Doe" "Canada"
"John Doe" "Canada/Ontario"
"Alicia Yazzie" "US/Arizona"

 ================
| Program Result |
 ================
"John Doe" "Canada" 4
"John Doe" "Canada/Ontario" 5
"Alicia Yazzie" "US/Arizona" 10
```

## Testing

### Unit Testing

Run unit tests locally:

```
npm test
```
