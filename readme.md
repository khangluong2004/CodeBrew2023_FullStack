# Codebrew 2023 - Team CodeBruh: Frugalicious
## Our project - Frugalicious Website:
### DevPost link: https://devpost.com/software/frugalicious

## Inspiration
We know many people especially uni students are on a budget. We know sometimes we eat unhealthy fast food just to save money.

Thus, we come up with a website with the aim to help people to keep track of their food costs and make frugal homemade meals.

## What it does
Frugalicious! Compile a list of ingredients and their estimated costs and nutrition on demand.

Generate a list of possible cheap and healthy meals from the selected ingredients for you. We also provide recipe options for users with special diet requests.

Provides a platform for like-minded people to share the latest food discounts and good recipes they found (with an AI guarding profanity :D ).

## Folder structure:
1. Backend: CodeBrew2023_BackEnd_NodeJS
    * NodeJS + Express
2. Frontend: codebrew-frontend
    * ReactJS (Vite)

## Running the Website:
1. Install NodeJS (version 18)
2. Download both the front and back end
3. To start the front end: 
``` 
npm install
npm run dev 
```
4. For the backend, due to security & privacy reasons, we can't publish our .env file. You could create your own following this structure (and pre-fill the products table):
```
CROSS_ORIGIN= <origin of the front-end> 
NODE_ENV = "testing"
PERSPECTIVE_API_KEY = "..."
MONGO_URI = "..."
FOOD_CENTRAL_KEY = "..."
SPOON_RECIPE_KEY = "..."
SYS_SECRET_KEY = "..."
```
5. To start the back end: 
``` 
npm install
npm run start 
```



## Further team's info:
## Project's components:
For UI and UX (Diana & Cindy): Figma.

For Front-end (Terry): ReactJS (Vite).

For Backend (Khang): NodeJS with Express, MongoDB Atlas for our database (API details in backend folder).

Hosting (Terry): Vercel (React) + Trying to find VM for the server.

Business Pitching & Presentation (Jonathan).

## Challenges we ran into
We are a group of first-year students and some of our team members don’t have any experience in creating a website.

We need to get the price of ingredients from Woolworths, but we couldn’t get Woolworth’s APIs and had trouble using python beautiful soup to scrape their data.


## What's next for Frugalicious!
Host full-stack website.

Make a mobile app! Users can calculate recipe costs anytime anywhere.

Get APIs for major supermarkets and update data regularly.

Add a comment session to the post area.

Implement an AI chat box to answer users’ questions and generate responses according to users’ diet habits/requests.
