# Follow these steps to run the project

# Instructions to set up the .env file
- In the project root directory, you create a new file called **.env**.
- List of environment variables:
    ```typescript
        SERVER_HOST=localhost
        SERVER_PORT=3000
        POSTGRES_HOST=localhost
        POSTGRES_PORT=5432
        POSTGRES_DB=storefronts_dev
        POSTGRES_TEST_DB=storefronts_test
        POSTGRES_USER=postgres
        POSTGRES_PASSWORD=1910123
        ENV=dev
        BCRYPT_PASSWORD=okie
        SALT_ROUNDS=10
        TOKEN_SECRET=anlonnhe123!
    ```
## 1 - Install Dependences 
    npm i
## 2 - Open Postgres Terminal To Create Database
- Command to Create DB: **CREATE DATABASE storefronts_test;** and **CREATE DATABASE storefronts_dev;**
- Type meta-command to exit Postgres Terminal: **\q**
- **Explain:**
    + The **database.ts** file contains configurations for connecting to DB.
    +  The **database.json** file contains  a list of databases that you specify which databases you want to migration on.
## 3 - Run Migrations
- Type the following command into Terminal: **db-migrate up**.
- **Attention:** I added 1 column (called *account*) in **users** table.

## 4 - Run The Project's Tests (Unit Tests)
- Run the following command to see the tests: **npm run test**
- script for **npm run test** in package.json is: 
```typescript
"script": {
    ....
         "test": "ENV=test && npx tsc && db-migrate --env test up && jasmine && db-migrate db:drop test",
}
```

## 5 - Turn On The Server
To start the server you can run either of the following scripts: **npm run start** or **npm run watch**

## 6 - Run Endpoints On Postman
- **Note:** Attach Token to Header
    1. In postman, you select the **Headers** tab next to the **Body** tab.
    2. Choose key as **Authorization** and enter paste the Token in Value col corresponding to that key.
    3. The **Inputs are in JSON** format
## 7 - RESTful Routes
### 7.1 - Routes for Users Table
|Routes| Method|Body is required| Parameters |Function|
|-|-|-|-|-|
|http://localhost:3000/users|**GET**|No|No|Get list of users|
|http://localhost:3000/users/:id|**GET**|No|Yes| Get a user|
|http://localhost:3000/users|**POST**|Yes|No|Add a new user|

Object's **Properties** and **data types** are passed into Body:
```typescript
{
    firstName: string,
    lastName: string,
    account: string,
    password: string
}
```
### 7.2 - Routes for Products Table
|Routes| Method|Body is required| Parameters |Function|
|-|-|-|-|-|
|http://localhost:3000/products|**GET**|No|No|Get list of products|
|http://localhost:3000/products/:id|**GET**|No|Yes|Get a product|
|http://localhost:3000/products|**POST**|Yes|No|Add a new product|

Object's **Properties** and **data types** are passed into Body:
```typescript
{
    name: string,
    price: Number,
    category: Number
}
```
### 7.3 - Routes for Orders Table
|Route| Method|Body is required|Parameters|Function|
|-|-|-|-|-|
|http://localhost:3000/orders/:order_id|**GET**|No|Yes|Get a order|
|http://localhost:3000/orders|**POST**|Yes|No|Add a new order|

Object's **Properties** and **data types** are passed into Body:
```typescript
{
    userId: Number,
    status: Number // 0: active, 1: complete
}
```
### 7.4 - Routes for Order_Products Table
|Route| Method|Body is required|Parameters|Function|
|-|-|-|-|-|
|http://localhost:3000/order-products|**POST**|Yes|No|Add a new products to Order|

Object's **Properties** and **data types** are passed into Body:
```typescript
{
    orderId: Number,
    productId: Number,
    quantity: Number
}
```