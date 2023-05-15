# App

GymPass app

# Functional Requirements

- [x] User is able to create an account/ sign in
- [x] User is able to log in / authenticate
- [x] User is able to create/access their profile
- [x] User is able to access information on their gym check-in history/frequency
- [x] User is able to search for nearby gyms (within 10km)
- [x] User is able to search for gyms by name
- [x] User is able to check-in in a gym
- [x] Validate an user check-in
- [x] Able to register a new gym

# Business Requirements

- [x] User cannot sign in/ create an account with a duplicate email
- [x] User is not allowed to check-in more than once in the same day even in different gyms
- [x] User is not allowed to check-in if they are more than 100m away from the selected gym
- [x] Validation should happen up to 20 min after checking-in
- [x] Validation is processed only by manager staff
- [x] Only managers can register a new gym

# Non-functional Requirements

- [x] User's password must be encrypted
- [x] Data must be persisted in a PostgreSQL database
- [x] All datasets must be paginated with 20 items per page
- [x] User must be identified by a jwt
