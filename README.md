Apply Interview – Nov 2025

This API was built for a challenge to apply for the Senior Backend Developer position at Apply Digital Solution. The challenge requirements were the following:

Every hour, the server must automatically make a request to the Contentful API to fetch data for Product entries. This scheduled task ensures that the server retrieves the latest Product data from Contentful at regular one-hour intervals. It should insert the data from this API into a database and also define a REST API that the client (e.g., Postman) can use to retrieve the data.

The service should provide a public module that returns paginated results with a maximum of 5 items per page and should support filtering by product attributes (e.g., name, category, price range). The service should also allow users to remove items, and these items should not reappear when the app is restarted.

The service should also provide a private reports module where you can obtain the following information:

Percentage of deleted products.

Percentage of non-deleted products with the following parameters:
a. With or without price.
b. With a custom date range.

A report of my choice.

To access the endpoints in the private module, a JWT authorization header must be provided. Please note that there should be both public and private modules.

STACK

Node.js version: LTS

NestJS version: LTS

Database: PostgreSQL

ORM: TypeORM

API Docs: Swagger

Dockerized

Test coverage required: 30%

Test coverage achieved: 48.58%

The project includes an env.example with all environment variables required to run it. While I was working on the project, the CDN credentials provided to me expired. I notified HR, and they told me I could mock the data. I had already mapped the format that comes from the external API, so if you want to test it using functional credentials, you can remove the mock in the products.cronjob service and uncomment the call to the CDN.

The project is fully dockerized, so you only need to run docker compose up if you have Docker installed on your machine. This project uses migrations, so you will need to run the command npm run migration:run. The Swagger documentation is available at /api/docs, as requested in the challenge. You will find the auth module and the product module there.

Choices and Assumptions

Since the challenge only mentioned that JWT should be used, I assumed the purpose was simply to demonstrate the ability to work with authorization. Therefore, I didn’t create a full user module — only what was necessary to generate a token that simulates a logged-in user.

For the custom report, I chose to create one that returns the total number of products by category.

I used PostgreSQL instead of MongoDB for simplicity and because the schema was already well-defined.

The pagination I implemented is one that I created some time ago, which is why it includes extensive text and documentation — I understand it might look AI-generated because of how detailed it is, haha.

I believe that should be everything you need to know. If you need more information, please don’t hesitate to contact me at:
fermerinonew@gmail.com


commands:

docker compose up 
npm run migration:run



Developed by Fernando Arteaga
