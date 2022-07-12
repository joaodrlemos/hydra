# Hydra

## Description

A web app made for the HydraDev technical challenge as a way to test (and improve) the knowledge in web development.

What the app does:

- Acesses an api endpoint to get a collection of users.
- Displays it in list form with all their relevant data.
- Able to filter the list by gender or names.
- Able to click on a specific user to see their picture zoomed in.
- Able to favorite different users, saving them locally.

## Technologies used

- HTML, CSS, JS
- React, Sass

## The challenge requirements

● List all users
○ Fetch only the first 10 users
○ Each user should have the following properties
■ First Name
■ Last Name
■ Gender
■ Photo
○ Create a button named “Load More” that every time it is pressed fetches an
additional 10 users
■ You should be able to scroll through the users
■ All previous users should still be visible
○ For each user we should be able to favorite that user
■ All favorite users should show first in the list of users
● Modal
○ Create a modal to display a bigger version of the photo when we click on a user
■ We should also be able to favorite a user in this modal
● Filter
○ Create a filter that allows filtering by:
■ Gender
■ Favorite
○ List should display a message if there are no users to show
● Bonus
○ Saving favorite users after reload
○ Proper use of reusable components
○ Search by user’s name (first or last)

## Setting up the app

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
The app is ready to be deployed!
