# Introduction
This exercise is meant to give additional practice understanding and using Express.

There are four parts to this exercise.  Read the instructions carefully before proceeding with each part.

This exercise is built around an Express and Sequelize application for board game related content.  By the end of the exercise, a user should expect to be able to:
- Sign up as a user
- Delete their own user account
- View all board games
- View individual board games
- Add a board game to the database
- Add a review to a board game
- Delete their own reviews

Postman will help you test each of the end points for accomplishing the above tasks.

# Part Zero - Set up
You will need to run `npm install` and create a `.env` file.  Copy the contents of the `.env.example` file into the `.env` file.

# Part One - Debugging

Currently, the application is capable of creating and destroying users, viewing all board games, viewing individual board games, and creating a board game.

However, the existing code is broken!

For Part One, you must:
Set up the database using the existing files
Test each of the 5 existing end points

You will encounter a number of bugs during this process.  Identify and fix them as you encounter them.

I have introduced 16 individual bugs to the code base.  15 of those bugs will rear their heads during Part One.  You won't encounter the last bug until Part 4 (though you may spot it before then)

Note that in the example request and response bodies below, the data itself can by anything, as long as it fits within the database's expected parameters.  Check the database constraints, model validations, and Express-level validations to get an understanding of what these parameters are.

## Sign up as a user
// found the 33 in the model do I need to re run the model after the change? 

Path: `POST /users/signup`
Users should have a username at least 3 characters long and their email must be unique.  Their password must be at least 7 characters long.
When testing this route, use a request body with the following structure:
```js
{
    "username": "yourusername",
    "email": "youremail",
    "password": "apassword",
    "faveCategoryId": 1 //Note, this value can be null
}
```
This end point should send back a response with the following structure:
```js
{
    "message": "New User created",
    "user": {
        "id": X,
        "username": "yourusername",
        "email": "youremail",
        "password": "apassword",
        "faveCategoryId": 1,
        "updatedAt": "2022-10-13T21:57:38.162Z",
        "createdAt": "2022-10-13T21:57:38.162Z"
    }
}
```
## Delete their own user account
Path: `DELETE /users/:id/destroy`
When testing this route, you must provide a request body with a `userId` that matches the `id` in the route parameter:
```js
{
    "userId": 5
}
```
This takes the place of real authentication/authorization
## View all board games
Path: `GET /boardgames`
This end point should respond with an array of game objects, and should have the following structure:
```js
[
    {
        "id": X,
        "name": "Brass: Birmingham",
        "maxPlayers": 4,
        "categoryId": 2,
        "createdAt": "2022-10-13T20:33:44.916Z",
        "updatedAt": "2022-10-13T20:33:44.916Z",
        "Category": {
            "name": "Economic"
        },
        "Reviews": []
    },
    {
        "id": X,
        "name": "Gloomhaven",
        "maxPlayers": 4,
        "categoryId": 3,
        "createdAt": "2022-10-13T20:33:44.916Z",
        "updatedAt": "2022-10-13T20:33:44.916Z",
        "Category": {
            "name": "Adventure"
        },
        "Reviews": [
            {
                "content": "N/A",
                "rating": 3,
                "User": {
                    "username": "Dan"
                }
            }
        ]
    },
    ... //cut off for brevity
]
```
## View individual board games
Path: `GET /boardgames/:id`
This end point should respond with an object containing a game's data, as well as the average rating and the number of reviews that game has received, and should have the following structure:
```js
{
    "id": X,
    "name": "Twilight Imperium: Fourth Edition",
    "maxPlayers": 6,
    "categoryId": 1,
    "createdAt": "2022-10-13T20:33:44.916Z",
    "updatedAt": "2022-10-13T20:33:44.916Z",
    "Category": {
        "name": "Strategy"
    },
    "Reviews": [
        {
            "content": "This game is far too long!",
            "rating": 1,
            "User": {
                "username": "Olivia"
            }
        },
        {
            "content": "10/10, I can be a space pirate, favorite game hands down.",
            "rating": 5,
            "User": {
                "username": "Alec"
            }
        }
    ],
    "averageRating": 3,
    "numReviews": 2
}
```
## Add a board game to the database
Path: `POST /boardgames`
When testing this route, use a request body with the following structure:
```js
{
  "name": "Monopoly",
  "maxPlayers": 8,
  "categoryId": 2
}
```
This end point should send back a response with the following structure:
```js
{
    "message": "Game successfully created",
    "game": {
        "id": X,
        "name": "Monopoly",
        "maxPlayers": 8,
        "categoryId": 2,
        "updatedAt": "2022-10-13T21:55:31.835Z",
        "createdAt": "2022-10-13T21:55:31.835Z"
    }
}
```

# Part Two - Navigating the Middleware Jungle
Your goal during Part Two is to adjust existing middleware code such that sending a request to /jungle will print the numbers One through Ten to your console in sequence, and only once apiece.  No other messages should be printed to the console.

You may not write or remove code, and you may not move code from one file to another.  You may only move existing code within the file in which it is already located.  All of the code for this part of the exercise is contained in the `theJungle` directory.

# Part Three - Refactor
In Part Three, you must refactor the code base such that the Boardgame-related end points are located in their own router file.  Make sure that any middleware applied to these end points continue to function.

Once you have made the necessary adjustments, test each end point to ensure they continue to work.

# Part Four - Add Functionality
Finally, you will add two additional end points to the code base.

## Create a Review
Create an end point that will allow a user to create a review.  A user may not create a review for a game they have already reviewed.  Because this application does not have a real authentication/authorization setup, a `userId` must be included in the request body.
Path: `POST /boardgames/:id/reviews`
When testing this route, use a request body with the following structure (note that the data itself can be anything you choose):
```js
{
    "userId": 5,
    "content": "This game is amazing",
    "rating": 3,
}
```
The end point send a response with the following structure and success message:
```js
{
    "message": "You have added a review to the board game with and id of X",
    "review": {
        "id": X
        "userId": 5,
        "content": "This game is amazing",
        "rating": 3,
        "gameId": X // This value should be retrieved from the route parameters
    }
}
```
If the user with the provided `userId` has already created a review for the indicated board game, you should send back an error response that contains the message:
```js
"You may only review a board game once, and you have already reviewed this game!"
```
## Delete a Review
Create an end point to allow a user to delete a review.  Because this application does not have a real authentication/authorization setup, a `userId` must be included in the request body.
Path: `DELETE /reviews/:id`
When testing this route, use a request body with the following structure:
```js
{
    "userId": 5
}
```
The end point send a response with the following structure and success message:
```js
{
    "message": "You have successfully deleted your review",
    "review": {
        "id": X
        "userId": 5,
        "content": "This game is amazing",
        "rating": 3,
        "gameId": X
    }
}
```
If the provided `userId` does not match the `userId` of the review, you should send back an error response that contains the message:
```js
"You may only delete reviews that you created"
```
