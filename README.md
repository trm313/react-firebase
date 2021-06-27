> Note: This README is a work in progress

# Getting Started

Clone project: `git clone [https://github.com/trm313/react-firebase.git](https://github.com/trm313/shopify-firebase.git) foldername`

## React Client

- From project root, run `npm run install:client`
- Run `npm run start:client` to launch the front-end on [localhost:3000](http://localhost:3000)
  - Note: At this stage, it is not connecting any Firebase project, but you can still run the front-end

## Firebase Functions

- From project root, run `npm run install:functions`
- Run `npm run start:functions` to

Install dependencies:

- run `npm install` in client and functions folder
  - Or use `npm run install:client` and `npm run install:functions` from root
- (optional) run npm install in scripts folder

Create Firebase project

- Create project name, eg. ProjectName
- (optional) Enable Google Analytics for this project

Add Firebase Authentication service:

- Authentication → Sign-in providers → Google → Edit → Enable

Add Firestore Database service:

- Start in production mode (recommended)
- Select Firestore location (this can't be changed later)
- Update Firestore Rules
  - Copy contents from firestore.rules and go to Firestore → Rules → paste contents → Publish

Add Firebase Functions service

- Upgrade to Blaze (Pay as you go)
  - Note: There is still a free tier with Blaze, and you're only charged if you go above it
  - (Recommended) Set a budget alert
    - Tip: Set an alert of like $5 at first, it'll email you basically as soon as something is jumping up your usage
- Set up Functions service
  - Set up Functions → You don't need to run these commands unless you want to install services other than Database, Authentication, Functions, and Hosting
    - Why? This boilerplate includes all of the files you'd be adding here for those services, with some basic configuration already (that help show examples or give a good starting point)
  - If you aren't going to install anything else, just click through this 2-step wizard and click Done and it'll bring you to your Functions page

Add Firebase Hosting service:

- Project Overview > Add App > Web
- Register app
  - Specify nickname (eg. Web App or Admin)
  - Leave "Also set up Firebase Hosting" checkbox empty (we already have our hosting configured as we want it in the firebase.json file)
- Use the firebaseConfig shown in the Add Firebase SDK step to perform the next step

Update your application details in the following locations:

- .github/workflows/main.yml —> Update projectId

```jsx
name: Deploy Project
...
jobs:
  build_and_preview:
		...
      - uses: FirebaseExtended/action-hosting-deploy@v0
        with:
					...
					projectId: exampleprojectid
```

- firebase.json —> update [hosting.site](http://hosting.site) to "yourprojectid"
- .firebasesrc —> projects.default: "yourprojectid"

  - NOTE: This file is normally created by the firebase init hosting I think, so need to include this file, or a .example verseion of it so that you dont have to do that
  - If it doesnt exist, create in root directory, called `.firebaserc`:

  ```jsx
  {
    "projects": {
      "default": "yourprojectid"
    }
  }
  ```

- client\src\index.js —> update dbConfig (projectId, authDomain, apiKey)
  - Note: None of these configuration parameters are sensitive at all. Google's intention is that these are leveraged client-side to initialize the firebase scripts. These can be exposed directly, and do not need to be stored in protected environment variables
- Create file functions\.runtimeconfig.json
  - Copy contents from functions\.runtimeconfig.example.json into it
  - Update app.api_url to "[http://localhost:5001/yourprojectid/us-central1/app/api](http://localhost:5001/firebaseprojectname/us-central1/app/api)"

### Run development environment locally:

- Run `npm run start:functions` from root
  - Functions API endpoint available at [http://localhost:5001/firebaseprojectname/us-central1/app/api](http://localhost:5001/firebaseprojectname/us-central1/app/api)
    - This url responds with Hello World: [`http://localhost:5001/hubbubapps/us-central1/app/api/test`](http://localhost:5001/hubbubapps/us-central1/app/api/test)
- Run `npm run start:client` from root
  - Client available at [http://localhost:3000/](http://localhost:3000/)

### Deploy Application to Firebase

- Run `npm run deploy:functions` from root
  - Confirm deployment: Firebase Console > Functions > Dashboard should now show two running functions: app and helloWorld
- run `npm run deploy:client` from root

_The rest can sort of be done in any order_

### Enable deployment pipeline through Github

- Create or update a Github secret called FIREBASE*SERVICE_ACCOUNT*<APPNAME>
  - Go to Firebase console > Project Settings > Service Accounts > Node.js > Generate new private key > Download file
  - Go to Github repo > Settings > Secrets > New Repository Secret
    - Name it FIREBASE*SERVICE_ACCOUNT*<APPNAME>
    - Paste the entire contents of the service account .json file into the value field
- Add the normally not committed .github folder into your git repo:
  - `git add .github`
  -
- Any push into main branch will now trigger the pipeline defined in `.github\workflows\main.yml` which will have Github install all dependencies, build the client, and deploy to hosting (only)
- For now, to deploy functions, trigger `npm run deploy:functions` from local
  - TODO: Look into `w9jds/firebase-action@master` here - [https://medium.com/mainlycoding-com/automate-firebase-functions-deployment-with-github-actions-ci-a0eb10fa308d](https://medium.com/mainlycoding-com/automate-firebase-functions-deployment-with-github-actions-ci-a0eb10fa308d)
  -

### Set any additional Environment variables

- Copy/rename functions/.runtimeconfig.example.json to .runtimeconfig.json
- Update it to store local variables for your dev environment
- Use CLI to update environment variables in Firebase:

## Scripts Folder

### (Optional) Set up Scripts functionality

- Run npm install in scripts folder (if you haven't already)
- Project settings > Service accounts
- Generate new private key (Note: This file DOES need to be protected)
- Download file, and place in scripts folder
- Rename to serviceAccountKey.json

  - **Note: If you use a different file name than serviceAccountKey.json, make sure to add the new name to the .gitignore file at the project root**
  - To populate posts:

    - Update scripts/populators/add-fake-posts.js to require the serviceAccountKey file

    ```jsx
    const serviceAccount = require("./serviceAccountKey.json");
    ```

    - Add a script to package.json file "populator:posts" : "node ./populators/add-fake-posts.js"
    - NOTE: The add-fake-posts.js file needed updating on its reqiure stateemnets to match the folder structure

# Appendix

This create-release action is nifty: [https://github.com/actions/create-release](https://github.com/actions/create-release)

### (Optional) Expose your local development environment to the web for easier mobile testing (directly on your device)

- Run `npm run ngrok:client` from project root
- Copy the https variant Forwarding list item (eg. [https://b15aae9a2cd1.ngrok.io](https://b15aae9a2cd1.ngrok.io/))
- Update the Authorized Domains Lists for this domain:
  - Firebase > Authentication > Sign-in Methods > (scroll past the Sign-in Providers) > Authorized Domains > Add domain (eg. [b15aae9a2cd1.ngrok.io](http://b15aae9a2cd1.ngrok.io/))
  - TinyMCE > Login to [tiny.cloud](http://tiny.cloud) > Approved Domains > paste domain (eg. [b15aae9a2cd1.ngrok.io](http://b15aae9a2cd1.ngrok.io/))
  - (maybe) Shopify App

# ORIGINAL README - Keeping in case anything's useful

# Setup

## Installation

**Repo setup**

1. Clone repository
1. Run `npm install` in the root, `client`, `functions`, and (optionally) `scripts` directories

**Firebase setup**

1. Create your Firebase project. Resources we will be using:

- Authentication (Google provider)
- Cloud Firestore
- Hosting
- Functions (will require upgrade to Blaze pay-as-you-go plan - it has good free quotas and billing alerts, so no surprises)

1. Copy/rename `functions\.runtimeconfig.example.json` to `functions\.runtimeconfig.json` and populate with environment variables for your local development environment
1. Copy/rename `client\.env.example` to `client\.env` and populate with environment variables to be leveraged by the React client (TODO: Figure out how to deploy these to Firebase hosting)

## Development Environment

1. TODO

1. TODO

## Production Environment

1. Set environment variables for Firebase functions using `functions ... :set ...`
   ...

# Deploying Application

## Deploy Frontend

Files must build to a deployment directory (default is "public", changed to "client/build")
Deploy files to hosting via `firebase deploy --only hosting:shopify-firebase-boilerplate`

## Environment variables

Environment variables for consumption by Firebase Functions:

`firebase functions:config:get`

`firebase functions:config:set private.env="dev" stripe.key="[stripe_key]" stripe.secret="[stripe_secret]"`

`firebase functions:config:set private.key="YOUR API KEY" project.id="YOUR CLIENT ID" client.email="YOUR CLIENT EMAIL"`

# How It Works

## Architecture Overview

- React front-end, built via create-react-app
  - Firebase Web - Internal app authentication & CRUD operations
    - Authentication - Firebase auth listener that triggers userReducer actions managed in `client\src\App.js`
  - [Chakra UI](https://chakra-ui.com/docs/features/style-props) - Very flexible UI framework
    - [Style Props](https://chakra-ui.com/docs/features/style-props) - Tailwindcss-like utility inline styling
    - Theming extended from `client\src\Styles\theme.js`
    - Create custom Components like `client\src\Styles\Components\NavLink.js`
  - [React-Router-Dom]() - Defined in `client\src\Routes`
  - [Redux-Toolkit](https://redux-toolkit.js.org/) - Authentication managed through Redux store
    - Reducers: `client\src\Reducers`
    - Initalized: `client\src\index.js`
- Firebase Functions

  - [What can I do with Cloud Functions?](https://firebase.google.com/docs/functions/use-cases?authuser=0)
  - Trigger background functions (eg. `Firebase.auth.user().onCreate((user) => {...})`)
  - Call functions directly from Web

    ```
    // 1. `client\src\index.js` - Initialize Cloud Functions through Firebase
    firebase.initializeApp({ ... });
    var functions = firebase.functions();

    // 2. `client\src\Components\TextComponent` - Load Firebase and call directly
    import Firebase from "firebase/app";
    var addMessage = Firebase.functions().httpsCallable('addMessage');

    addMessage({ text: messageText })
    .then((result) => {
      // Read result of the Cloud Function.
    var sanitizedMessage = result.data.text;
    }).catch (error => {
      const { code, message, details } = error;
    })

    ```

  - Call functions via HTTP requests

    ```
    // https://firebase.google.com/docs/functions/http-events?authuser=0

    ```

  - Host API routes (Currently eg. `/api/test`)
    - Note: Accessing cloud functions should generally be done through calling Firebase Functions client-side, but shows some flexibility

- Firebase Firestore
  - Document store
- Integrations
  - Shopify - This boilerplate can serve as a grab-and-go Shopify Public App

# Integrations

Coming Soon
