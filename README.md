Anywhere Fitness API Endpoints
Base API URL

https://fitness-anywhere-3.herokuapp.com/

/api/auth

[POST] /auth/register - Creates a new user.

The object must have:

    username
    password

[POST] /auth/login - Logs the given user in.

The username must exist and the password must match. Logging in will create a token.
/api/users

[GET] /api/users - Retrieves all current users.

[GET] /api/users/:id - Retrieves the user of the given ID.

[PUT] /api/users/:id - Updates user, body must be at least one updated value.

[DELETE] /api/users/:id - Deletes a user of the given ID.
/api/classes

[GET] /api/classes - Retrieves all current classes.

[GET] /api/classes/:id - Retrieves the class of the given ID.

[POST] /api/classes - Creates a new class.

The object must have:

    name - what the class is called
    type - type of activity
    start_time - when the class begins
    duration - how long the class lasts
    intensity_level - how hard of a workout (scale of 1-10)
    location - where the class takes place
    registered_attendees - number of people acurrently registered to attend
    max_size - the maximum amount of people the class can have

[PUT] /api/classes/:id - Updates class, body must be at least one updated value.

[DELETE] /api/classes/:id - Deletes a class of the given ID.
