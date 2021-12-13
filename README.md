# trueaccord-challenge
A simple node.js API server to show debts associated with a payment plan

## Setup
Install node.js dependencies
```sh
npm i
```

## Running the application
Run in dev environment
```sh
npm run dev
```

## Running tests
```sh
npm run test
```

## Things I would have done if I had more time
- Refactor the controller by using helpers (helps for testing also)
- Add more unit tests case and have better test coverage
- Create a base class for model to remove repeated code
- Better organization of different modules to improve the performance
- Handling error scenarios in API request
- Database connection for the json data
- memoization for looped data (I have added few loops which can be avoided with memoization)
- Relational mapping structure with class models (1:1 and 1:many)