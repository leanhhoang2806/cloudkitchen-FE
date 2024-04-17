## 1. set sup
1. To format the entire folder: `$npx prettier --write "src/**/*.js"`


## Get project ready for prod deployment
1. for stripe buy button on live data, get it from the folder /prodCredentials. then deploy the application

## How to deploy front end
1. create an s3 bucket with the name of s3\
6. change the backend path to the load balancer path so the app could run on production
2. go to bucket properties to change the bucket to host static website
3. run `npm run build` in local 
4. deploy the build package: `aws s3 sync build/ s3://your-bucket-name`
5. enable public access
```
{
 “Version”:”2012–10–17",
 “Statement”:[{
 “Sid”:”PublicReadGetObject”,
 “Effect”:”Allow”,
 “Principal”: “*”,
 “Action”:[“s3:GetObject”],
 “Resource”:[“arn:aws:s3:::your-bucket-name/*”]
 }]
}
```
6. Change all backend path to `https://app.popo24.com/