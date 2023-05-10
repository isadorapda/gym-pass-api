# App

GymPass app

# Functional Requirements

- [ ] User is able to create an account/ sign in
- [ ] User is able to log in / authenticate
- [ ] User is able to create/access their profile
- [ ] User is able to access information on their gym check-in history/frequency
- [ ] User is able to search for nearby gyms
- [ ] User is able to search for gyms by name
- [ ] User is able to check-in in a gym
- [ ] Validate an user check-in
- [ ] Able to register a new gym

# Business Requirements

- [ ] User cannot sign in/ create an account with a duplicate email
- [ ] User is not allowed to check-in more than once in the same day even in different gyms
- [ ] User is not allowed to check-in if they are more than 100m away from the selected gym
- [ ] Validation should happen up to 20 min after checking-in
- [ ] Validation is processed only by manager staff
- [ ] Only managers can register a new gym

# Non-functional Requirements

- [ ] User's password must be encrypted
- [ ] Data must be persisted in a PostgreSQL database
- [ ] All datasets must be paginated with 20 items per page
- [ ] User must be identified by a jwt