# moviefy
A node.js website, where you can register or login, to get access to a dashboard of all movies.
This project was a university project for learning node.js and his components. 

## Getting Started
This guide will help you get the project up and running on your local machine for development and testing purposes.

## Prerequisites
Ensure you have the following tools and libraries installed on your computer:

- [Node.js](https://nodejs.org/en/download/) - The runtime environment for running JavaScript outside the browser, which includes npm (Node Package Manager) for managing project dependencies.
- [Git](https://git-scm.com/) - Version control system for tracking changes in source code during software development.
- [MySQL](https://www.mysql.com/downloads/): Ensure MySQL is installed and running on your machine. This project uses MySQL for data storage.
- [MySQL Workbench](https://www.mysql.com/products/workbench/): (Optional) Useful for visually managing your MySQL databases.

After installing Node.js and Git, you can verify their installations by running the following commands in your terminal:

```bash
git --version
node --version
npm --version
```
## Instalation
Follow this steps to setup the project on your local machine:

### Clone the repository
Create a new directory on your computer and navigate to it using the terminal. Then, clone the repository to your local machine using the following command:

mkdir moviefy_project
cd moviefy_project
git clone https://github.com/tihiswasavailable/moviefy.git

### Create a MySQL database
Create a new database in MySQL using MySQL Workbench:
- Open MySQL Workbench and connect to your local MySQL server.
- Create a new database called moviefy.
- Create a new schema called moviefy-login:
```sql
CREATE SCHEMA `moviefy-login` ;
```
- Create a new table called users:
```sql
CREATE TABLE `moviefy-login`.`users` (
  `userId` INT NOT NULL AUTO_INCREMENT,
  `userName` VARCHAR(45) NOT NULL,
  `userEmail` VARCHAR(45) NOT NULL,
  `userPassword` VARCHAR(60) NOT NULL,
  PRIMARY KEY (`userId`));
```

## TMDB API Integration
This project uses the TMDB API to fetch movie data. To use the TMDB API, you need to create an account on the TMDB website and obtain an API key.

### Create a TMDB account
- Navigate to the [TMDB website](https://www.themoviedb.org/) and create a new account.
- After creating an account, navigate to the [API section](https://www.themoviedb.org/settings/api) and request an API key.
- Once you have obtained an API key, you can use it to fetch movie data in the project.
- Chnage in the file /public/js-scripts/dashboard.js the API key to your own key.

```javascript
const API_KEY = 'your_api_key';
```
### Fetch movie data with the TMDB API and function getMovies(url)
The function getMovies(url) fetches movie data from the TMDB API and displays it on the dashboard. The function takes a URL as an argument and fetches movie data from the TMDB API using the fetch() method.

```javascript
function getMovies(url) {
    fetch(url)
    .then(res => res.json())
    .then(data => {
        //console.log(data.results)
        if(data.results.length !== 0){
          showMovies(data.results);
        } else {
          main.innerHTML = `<h1 class="no-results"> No Results Found</h1>`
      }
    })
}
```

## Configure the project
After cloning the repository and creating the database and API_KEY, you need to configure the project to connect to your MySQL database.

### Create a .env file
In the project directory, create a new file called .env and add the following environment variables:

```env
DATABASE_HOST=127.0.0.1
DATABASE_USER=moviefy_user
DATABASE_PASSWORD=your_password
DATABASE=moviefy-login
JWT_SECRET=supersecretkey12345
JWT_EXPIRES_IN=7d
```

### Install project dependencies
Navigate to the project directory and install the required dependencies using the following commands:

npm install

### Start the server
After installing the project dependencies, you can start the server using the following command:

npm start

The server will start on port 5501 by default. You can access the website by navigating to http://127.0.0.1:5501/login in your web browser.