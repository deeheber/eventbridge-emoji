# eventbridge-emoji

Wanted to test to see if I could create an EventBridge rule with only emojis. Turns out it works.

## To run

`npm install && npm run cdk deploy` to deploy the stack (once your AWS credentials are in place) 💻

Put events on the default event bus with either the [CLI](https://awscli.amazonaws.com/v2/documentation/api/latest/reference/events/put-events.html), and AWS SDK, or in the AWS console.

The event pattern is `detailType: ['💩']` and `source: ['🐶']`.

Check the Cloudwatch logs of the target lambda to see the result 👀

Profit 🎉
