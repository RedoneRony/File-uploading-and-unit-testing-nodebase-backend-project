# Meld CX Project

Write Three apis.
1. post api.
2. get api.
3. delete api.

Configure AWS for storing files in the S3 bucket.

Complete three apis for storing, geeting and deleteing data from bucket.

Write proper unit test for three apis.

Sotring files in the local folder as well.





### Project setup
```
npm install
```

### Run Project
```
npm start

```
### Run Tests
```
npm test
```


I didn't get enough time to complete these works.

3. The API Server should implement configurable daily download and upload limits for the
network traffic from the same IP address
4. The API Server should have an internal job to cleanup uploaded files after configurable
period of inactivity

But i can do this work. For first one i will add a field for tracking the IP address when uploading the files to S3 bucket. Also track data of download file track of this ip address. So that i can a set a initial threshold point of uploading and downloading the files. If the threshold wil cross i can easily restrict them.


For second point i can run a cron job where i will maintain another database for download track. After a certain time i will run a cron job and check the inactive files so that i can delete it easily. I just i can connect the db. Can't do the further work due to time constraint.

For integration test, i can do it using mocha. 

So from overall findings everything is possible from myend.     

