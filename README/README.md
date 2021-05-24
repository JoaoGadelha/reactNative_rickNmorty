<h1 align="center">Rick and Morty App</h1>
<h2 align="center">
  
  EDITANDO AINDA
  <img src="https://img.shields.io/badge/made%20by-joaoricardotg-blue.svg" >
 
## The App

  <p align="center">
<img src="./login.jpeg" width="500">
 </p>
EDITANDO AINDA<br/>
  This is an app built in React Native using Expo for the frontend and Node.js/Express.js and MongoDB Atlas for the backend. The app works for both Android and iOS. 
  The app features a login and a signup pages. After the user is authenticated, a list of characters from the cartoon 'Rick and Morty' is displayed. The list is divided in 20 characters per page. The user can mark characters as favorites, which will be saved on the cloud. 
  The login page:
  <p align="center">
<img src="./login.jpeg" width="500">
 </p>
  The signup page:
  <p align="center">
<img src="./signup.jpeg" width="500">
 </p>
  Whenever the user inputs info in the login and signup pages, a loading animation will be displayed. The animation persists until the server returns an answer:
  <p align="center">
<img src="./loading.jpeg" width="500">
 </p>
The list of characters page:
  <p align="center">
<img src="./charlist.jpeg" width="500">
 </p>
  
## Database  
  The database is stored in MongoDB Atlas, a cloud version of MongoDB. Each registry contains the email, password, the ID of the client and an array of favorite characters IDs.
  
## Backend routes

### POST /authUsr
Receives an object with the email and password inputed by the user and compares the data with the information stored in the cloud at the MongoDB Atlas website. Whenever the user inputs something wrong, such as when both email and password fields are empty, an alert informs the user that his/her inputs are wrong.
  
 
### POST /favorites
    Receives the ID of the client (clientID), the ID of the character (charID) and the flag favAction. If favAction = 1, the character will be added to the favorites. Otherwise, it will be removed.  Returns the updated array of favorites.


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
