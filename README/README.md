<h1 align="center">Rick and Morty App</h1>
<h2 align="center">
  
  EDITANDO AINDA

<img src="https://img.shields.io/badge/made%20by-joaoricardotg-blue.svg" >

## The App

<img src="./login.jpeg" width="500">
EDITANDO AINDA
The app consists of a graphical interface for the control of a space probe landed on Mars. The app controls the position and orientation of the probe, which runs in a backend server and displays the probe data for the user. The probe is landed on a 5 x 5 rectangular grid and cannot move over its  bounds. If the user inputs a sequence of movements for the probe that forces it to move outside of the grid, an error message is returned in the interface, stating that such movement sequence is not permited. The position of the space probe is represented by a (x,y) coordinate. The probe can face four directions, it rotates only 90ᵒ and moves one grid cell per movement, as described by the table below:


| Movements and Directions | Description |
|--------------------------|-------------|
| D| The probe is facing the 'right' direction.|
| C| The probe is facing the 'up' direction.|
| B| The probe is facing the 'down' direction.|
| E| The probe is facing the 'left' direction.|
| GD| Rotates the probe to the right.|
| GE| Rotates the probe to the left.|
| M| Moves the probe one cell forward.|


The control interface for the probe contains 6 buttons, a display for the 5x5 grid and the position and orientation of the probe. Two textfields are displayed, one renders the stack of user inputs for the probe and the other displays the movement performed by the probe. 

## Controller interface

### Buttons

There are 6 buttons in total, three for inserting new orders on the stack of order to be sent to the probe ('turn probe to the left', 'turn probe to the right' and 'move forward'), one to reset the probe position ('reset probe position'), one to send the movements to the probe ('submit movements') and another to clear the stack of movements ('clear movements queue'). The buttons are displayed bellow.

<p align="center">
  <img src="./buttons.png" width="50%">
</p>

### Grid display

The app displays a 5x5 grid. Each cell in the grid represents a possible coordinate for the position of the probe, which is represented by a cell with red background and a white chevron. This last element represents the probe orientation. The image below represents the configuration of the probe the moment it has landed, in position (0,0) facing the right direction.

<p align="center">
  <img src="./init_configuration.png" width="50%">
</p>

### Text displays

There are two text displays, one for rendering the stack of movements inputed by the user through the input buttons and the other displays a string that describes the movement performed by the probe. For example, let's use the following sequence, with the probe starting at (0,0) facing the right direction: 
```
turn left - move forward - move forward - turn probe to the right - move forward
```
then the first text display will show:

<p align="center">
  <img src="./text_display1.png" width="20%">
</p>

And the result for the probe movement displayed in the second text display should be:

<p align="center">
  <img src="./text_display2.png" width="20%">
</p>

## Technologies used
The frontend was built with React.js, while the backend was built in Node.js and Express.js. The app saves the probe info in a Mongo database running in MongoDB Atlas.

The site is live at https://joaoricardotg-credere.netlify.app/, while the backend is hosted in https://credere-backend.herokuapp.com/ (the backend doesn't display anything, it just serves the requests from the frontend. If you want to interact with it, access the routes explained below through the app or Postman).

## Backend routes

### GET /getPosition
Returns an object that informs the frontend of the current position and orientation of the probe, for example, if the probe is is position (2,2) facing the 'C' direction, the route returns {x:2, y:2, direction:'C'}.

### POST /resetPosition
Returns the object {x:0, y:0, direction:'D'}, confirming that the probe is on its initial position and direction.

### POST /moveProbe
Can either return an object with the new position of the probe or an error message in case the inputed sequence moves the probe out of the 5x5 grid. Also, in case the probe didn't return an error, a string describing the movement of the probe is returned to the frontend. A movement sequence is represented by an array. So for example, if the backend receives ["M", "M", "GE", "M", "GD"] and the probe is in position (0,0) facing the right direction, it must move two cells on the x-axis to the right, turn left, move up one cell and turn right, returning the following object to the interface 

```
{
    "NLinstructions": "The probe moved 2 cells in the x-axis, turned to the left, moved 1 cell in the y-axis and turned to the right.",
    "x": "2",
    "y": "1",
    "direction": "D"
}
```
When an invalid sequence of movements is sent to the backend, it returns with the following error message:
```
{
    "error": "The inputed sequence moves the probe outside of the grid."
}
```

## Tests

Tests were written for both backend and frontend and they are present in the files 'functions.test.js'. The tests were performed with Jest, a javascript testing framework. Each test is described in their own file.

## Commands for this app

To run this app, you must have node installed. To check if you have it installed, type:

```
node -v
```
If you have it installed, something like ```v10.19.0``` must appear on your console. Then, download all the content of this repository in a specific folder. To install the frontend, while inside your folder, type the following in the console: 

```
cd  frontend
npm install
```
This will install all the dependencies necessary to run the app.
For the backend, do the same:

```
cd  backend
npm install
```

After that, to run the app, type the following in the frontend folder to run the frontend app, or in the backend folder to run the backend app:

### `npm start`

This runs the app in development mode.\
Open [http://localhost:3000](http://localhost:3000) to view the frontend in the browser or [http://localhost:7000](http://localhost:7000) to view the backend.

The page will reload if you make edits.\
You will also see any lint errors in the console.

To run the tests, either for backend or frontend, type:

### `npm test`

All tests are named 'functions.test.js' for both frontend or backend tests.
