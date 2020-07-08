# CAREER SAUCE - Open-source Job Application Tracking System

## Deployed Application: [Career Sauce](https://careersauce.herokuapp.com/#/)

<img src="public\assets\CareerSauceDemo.gif" alt="CareerSauce"
	title="Career Sauce" width="1000" />

## Project Setup

```
npm install
```

### Compiles and hot-reloads for development

```
npm run serve
```

### Compiles and minifies for production

```
npm run build
```

### Lints and fixes files

```
npm run lint
```

### Dev Server

```
npm run test
```

## Database Setup

1. Download [postgreSQL](https://www.enterprisedb.com/downloads/postgres-postgresql-downloads)
   ​
2. Download [PG ADMIN](https://www.pgadmin.org/download/)
   ​
3. Create _localhost_ server or use existing servers
   ​
4. Under Databases, right click to create database - _jobtracker_

## Customize Configuration

See [Configuration Reference](https://cli.vuejs.org/config/).

### How to Use Application:

1. **Register** as a new user with the following parameters
   - First Name
   - Last Name
   - Email
   - Password
     - Requirements:
       1. It must contain ONLY the following characters: lower case, upper case, numerics.
       2. It must be at least 8 characters in length and not greater than 32 characters in length.
2. **Login** to Career Sauce using your email

3. **Add Job** by filling out the Job Tracking Card

   - Position/Title
   - Company
   - Job Location
   - Application Source
   - Job Description
   - Current Status of the Application

4. **Update** the application status as you progress in the application/interview process
   - Update status drop down menu located in **More Info**
     1. Grocery List - Jobs that you want to apply to
     2. In The Oven - Job applications sent
     3. Taste Test - Jobs where you have/had an interview
     4. Well Done - Jobs with offers!
     5. Burnt - Job applications that didn't turn out so well...

## Notes

This is a [Vue.js](https://vuejs.org/) based open-source application and we would appreciate your input.

To collaborate on this project, clone the repository and help us add features to make this app great!

### **Suggested additional features**:

- New category for "stale" applications that haven't been updated in over 2 weeks
- Add a counter next to each status
- Create a [toast](https://bootstrap-vue.org/docs/components/toast) to show user their card has been updated
- Ability to update job card info
