#MoneyMinder

![MoneyMinder__1_-removebg-preview](https://github.com/Michee27/MoneyMinder/assets/140012117/2cdf002d-57c4-4736-af32-898c4ba648fa)


## Description
The MoneyMinder API is a powerful spending tracking tool designed to help individuals and businesses manage their finances effectively. It offers a variety of features and functionalities that make it easy to track expenses, budgets and cash flow.

## Functionalities

- Register user
- Login
- Detail Logged User Profile
- Edit Logged User Profile
- List categories
- List transactions
- Detail transaction
- Register transaction
- Edit transaction
- Remove transaction
- Get transaction statement
- Filter transactions by category
 API
## Project status
This project is currently in active development. We are constantly working on it to make it even better. The entire BackEnd scope was developed, the FrontEnd part is currently being developed to communicate with the Back.

## Source code
![image](https://github.com/Michee27/MoneyMinder/assets/140012117/b6da8c1b-4055-4a4f-966d-5433063c358a)

`index.js`: The Express server entry point.

`routes.js`: Defines the API routes and their controllers.

`controllers`: Process client requests, interact with `db` and return an appropriate response to the client.

`intermediarios.js`: Processes and manipulates HTTP requests to verify data.

`db`: Stores database data and database-related functionalities.

`config`: Connects to my database and stores my secret key

## Technologies used

### JavaScript:
High-level programming language widely used for web development. It is known for being a scripting language, which means you can write JavaScript code directly on web pages to make them interactive and dynamic.

### Node.js:
Open source runtime environment based on Google Chrome's V8 engine. It allows developers to use JavaScript to create server-side applications, which is a departure from the traditional use of client-side JavaScript, which runs in browsers.

## Dependencies:

### axis:
The Axios dependency is a JavaScript library commonly used to make HTTP requests from a web browser or Node.js environment. Axios simplifies communication with web servers and provides an easy-to-use interface for sending requests and receiving responses. Can be installed with the command `npm install axios`

### bcrypt:
Widely used tool for encryption and password protection in applications and systems. It is used to create secure hashes from passwords and is especially effective for storing passwords securely in databases. Can be installed with the command `npm install bcrypt`

### express.js:
The "Express.js" web framework, used to create web applications and APIs in Node.js. It is widely used to create web servers and simplify web development in Node.js. Open the terminal or command prompt, navigate to your project directory and run the following command: `npm install express`

### jsonwebtoken:
widely used tool for authentication and authorization in web applications and web services. It allows you to create and verify JWT tokens, which are used to authenticate users and ensure the security of communications between the client and the server. JWT tokens contain information about the user and a digital signature mechanism to verify the authenticity of the token. Can be installed with the command `npm install jsonwebtoken`

### pgs:
Library for Node.js that allows connection to PostgreSQL databases. PostgreSQL is a powerful and widely used relational database management system. can be installed with the command `npm install pg`

### nodemon:
A development tool that monitors changes to files in your project directory and automatically restarts the server whenever there is a change. It is often used for Node.js development to save time on server restarts during development. Dependencies are libraries or packages required for your application to function, while devDependencies are packages used only during development, as in the case of nodemon, which helps keep the server updated during development. Open the terminal or command prompt, navigate to your project directory and run the following command: `npm install -D nodemon`.
After cloning this repository, you can install all dependencies and devDependencies using the command: npm install

## Installation
To use this project, follow these steps:

1. Clone the repository to your local machine using the following command:

- [ ] Fork this repository to your GitHub
- [ ] Clone the project on your machine
- [ ] Once cloned on your machine, install the dependencies mentioned above and start the server using:
```javascript
npm run dev
```
- [ ] Use insomnia to test functions

## Register user
Register an account by accessing your endpoint: `/usuario`. Accessing insomnia with `http://localhost:3000/usuario` you must enter the name, email, and password fields to register the user.

![image](https://github.com/Michee27/MoneyMinder/assets/140012117/2c0eadf5-2944-4289-bf22-47e9bfb631ff)

## User login
This end point must be accessed through the URL: `http://localhost:3000/login` which will allow the registered user to log in to the system, providing their email and valid password. If the data entered is validated, the user will be returned their access token for the next steps in the API

![image](https://github.com/Michee27/MoneyMinder/assets/140012117/afcc80d9-1eb2-423c-a262-f5bfce2a4820)


