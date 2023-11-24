# Feedback Hub API Project

1. Open the terminal, run following command
    ```sh
    yarn dev
    ```
2. The output should appear as below. If it failed, then check your [`logchimp.config.json`](../../logchimp.config.json) file for configurations.
    ```sh
    [nodemon] starting `node index.js`
    info: LogChimp is running in development... {"timestamp":"2023-11-24 22:32:31 +05:30"}
    info: Listening on port: 3000 {"timestamp":"2023-11-24 22:32:31 +05:30"}
    info: Ctrl+C to shut down {"timestamp":"2023-11-24 22:32:31 +05:30"}
    info: LogChimp boot 0.798s {"timestamp":"2023-11-24 22:32:31 +05:30"}
    info: Database migration complete {"timestamp":"2023-11-24 22:32:31 +05:30"}```
3. Open the API docs in the browser by navigating to `http://localhost:3000/api-docs` to view the swagger docs
4. Signup or Login using the Authorization APIs if you do not have an active account.
5. Use the `authToken` in login response to Authorize the Swagger
6. Explore the APIs and enjoy!
