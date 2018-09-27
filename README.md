# issues-tracker
Issues tracker is a simple tool for tracking issues. Issues are displayed with title, description, status and the following actions:
  - For Open issue: Start and Close
  - For Pending issue: Close

### Installation
Angular CLI is required. To install all the dependencies use the following command
```sh
$ npm install
```
Note: This may take up to several minutes.

### Running the application
To run the application use the following command
```sh
$ npm start
```
Navigate to `http://localhost:4200/` to see the application.

### Running unit tests
To run unit tests use the following command. Tests are run via [Karma](https://karma-runner.github.io). Chrome browser is required.
```sh
$ npm run test
```

### Running end-to-end UI component tests
Application contains e2e component tests, based on [Protractor](http://www.protractortest.org/) enviroment. Chrome browser is required. To run them use following command:
```sh
$ npm run e2e
```
### Changing initial data
Data is stored in JSON file located in:
`src/assets/issues.json`
This file can be modified, however items need to be in the following format:
```
{   
    title: string,
    description: string,
    status: 'Open' | 'Closed' | 'Pending'
}
```
Changed items will be fetched after page reload.

### Todos
 - Adjust website for mobile devices
 - Compatibility with Microsoft Edge browser
 - Refactor e2e test framework    

License
----
MIT
