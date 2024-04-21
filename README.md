## 1. set sup
1. To format the entire folder: `$npx prettier --write "src/**/*.js"`


## Get project ready for prod deployment
1. for stripe buy button on live data, get it from the folder /prodCredentials. then deploy the application

## How to deploy front end
0. `npm run build`
1. run this command `aws s3 sync build s3://popo24.com` from the same directory as `package.json`
2. Wait for the cloudfront cache to update (usually 24 hours), if not invaldate the cache in cloud front, cost money, but update will be immediately
