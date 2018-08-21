Main features:
- list all customers, along with filter and sort. It will filter the list with all criteria inputted by user.
- enable editing notes and customer status in detail page.

Tech Stack mainly used:
    Frontend:
        ReactJS as View engine to structure pages and user interactions
        SCSS for better experience on writing css
        Bourbon-neat for grid system
        NodeJS only for development purpose, which is hosting pages along with hot loader,
               that can detect any changes from scss and js files, and redeploy changes to dev server immediately.

    Backend:
        NodeJS + ExpressJS to build web APIs
        Mongoose as object modeling tool for MongoDB
        MongoDB to store document data
        migrate-mongo as data migration tool for initializing database

    Test for API:
        Mocha as test runner based on NodeJS
        Expect for better experience on assertion
        Supertest for great experience on API level test

Express API:
    can be found in ```routes/customers``` and ```src/controller/customers```
        GET   /customers          retrieve all customers with limited fields
        GET   /customers/:id      retrieve specific customer data
        PATCH /customers/:id      patch update specific customer data
        POST  /customers          create customer

    by the way, all frontend code can be found under ```/client```, which make frontend and backend can be separately deployed for production


Make it run on dev env:
    1. run ```npm install``` under home directory
    2. run ```npm install migrate-mongo -g``` to install migrate-mongo command locally, for prospective testing data insertion
    3. run ```npm run api``` to start node server on post http://localhost:3001
    4. ```cd client``` to open client side directory, and run ```npm install``` to install dependencies
       then run ```npm start``` to execute data migration and start dev server on http://localhost:3000
    5. then the page can be found under ```http://localhost:3000/customers```

Run tests for APIs:
    simply run ```npm run test``` under home directory
    for time constraints, I haven't written any tests for client