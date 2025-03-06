# Wild Campers

Wild Campers is a site to allow nature enthusiasts to share their favourite wild camping locations. It can be hard to find places in the wild to camp where you are not breaking any rules or tresspassing. Wild Campers is here to provide that service for you.


## Repo
The repo can be found here: [Github](https://github.com/shanedunne/wild_campers)

## Features

- **Location Summaries**: Summaries for each location
- **Login System**: The ability to create an account, login and logout

## Pages
### Index / Home
Home page prompting the user to either sign up or log in via the buttons in the nav bar

### Signup
- This page requests the users first name, last name, email address and desired password. 
- When the user provides this information and presses sign up, their data will be added to the users database along with a user ID. 
- A cookie is created to record their signed in status based on the users ID
- Users are then directed to the dashboard

### login
- If already a member, users provide their email and password and press log in
- Users are then directed to the dashboard

### Dashboard
- The dashboard is where the user can access and add wild camping locations
- The user can add a camping spots by providing the location name, coordinates and a brief description

### Location View
- The location view contains all information related to a camping spot.

### Account
- The user can come and view their account information here. There is a button that will take them to the Account Edit view if they need to change some information

### Account Editing View
- Coming soon


## Use Cases
- Add your favourite wild camping spots and keep them all in one place

- Discover new camping locations and read reviews provided by others





## Technologies used

- Javascript - for handling and rendering data and components
- Handlebars - as the HTML templating system to produce the pages
- Express JS - As the server
- Axios - for fetching data from external APIs
- Hapi
- Chai
- Mocha
- MongoDB


