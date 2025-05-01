# Backpack Front End Take Home

## Table of Contents
  <!-- - [Project Requirements](#project-requirements)
  - [Setup](#setup)
  - [Planning](#planning) -->


## Project Requirements
Build a UI that displays a customer’s bank account and routing
numbers, available and pending balances, and transactions.

* UI for displaying, concealing, and copying account and routing numbers
* UI for displaying the current and available balance
* UI for displaying transactions
* README that explains your decisions and design choices and also includes instructions
on how to run the application.
* Technology requirements: Build the web app using React. The rest is up to you!

## Installation
THIS IS THE SETUP SECTION

react
typescript
tailwind
headless ui

## Design & Wireframe
I used backpack branding (colors, logo, fonts - derived from inspecting the site) and design to develop a basic design system. From there I created simple wireframe, starting with a mobile and then desktop view.

### Fonts
Header Font - [Archivo](https://fonts.google.com/specimen/Archivo)
Body Font - [Montserrat](https://fonts.google.com/specimen/Montserrat )


### Tailwind organization
1. Display
2. Color
3. Size
4. Margin, border, padding


## Data

Promise.AllSettles to get the data the fastest. "parallel" also allows for more dynamic error handling (see below)
Not much gained by separate loading states, might as well get them all the together
A little prop drilling but not too much (show the specific drop drilling)


## Error handling
Might as well take advantage of the fact that have to fetch transactions and accounts separately by creating error handling that can deal with one of those fetches failing, rather than breaking the entire UI if one fails.

### Typing
Status display has very strict typing, could probably do this for other fields but most of the time I don't care about it. This component requires specific string values, unlike most other times that data is being displayed so I went a little further to ensure yada yada

### What to display
TRace number - seems like something that might be useful is something went wrong and it's big and long so we might as well use our clicktocopy component to make it more easily useable