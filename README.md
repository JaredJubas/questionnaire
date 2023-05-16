# Questionnaire App
This is a simple questionnaire app built with React that allows users to answer a series of questions, one at a time, and submit the questionnaire. The app loads the questions from a JSON file, supports mandatory and optional questions, and provides various question types such as dropdowns and checkboxes.

## Features
- Dynamic loading of questions from a JSON file
- Navigation through questions using "Next" and "Back" buttons
- Support for mandatory and optional questions
- Validation of mandatory questions before submission
- Error handling and appropriate error messages
- Unit tests to ensure functionality
- Integration with a GraphQL mock API

## Installation
1. Clone the repository: `git clone https://github.com/JaredJubas/questionnaire.git`
2. Install dependencies: `yarn install`
3. Start the frontend server: `yarn start`. The app will be running at http://localhost:3000
4. Start the backend server (needed to submit the questionnaire): `yarn start-backend`
5. Run tests: `yarn test`

## Usage
1. Launch the app in your web browser at http://localhost:3000.
2. You will be presented with one question at a time. Provide your answer and click "Next" to proceed to the next question. Use the "Back" button to go back to the previous question. All answers are saved as you go.
3. Mandatory questions must be answered before proceeding. Error messages will be displayed if required fields are left blank. Mandatory questions are marked with a red *.
4. Once you have answered all the questions, a summary page will be displayed showing your answers. Review your answers and click "Submit" to submit the questionnaire. A message will appear in the frontend console if the submission is successful. 

## Customization
To customize the questions, modify the questions.json file located in the public directory. Follow the JSON structure provided in the file, adding or modifying the questions as needed.

## Technologies Used
- React
- TypeScript
- Apollo Client
- Material-UI
- Jest
