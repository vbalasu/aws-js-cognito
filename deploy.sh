export AWS_PROFILE=vbalasu_admin
aws s3 cp --acl public-read index.html s3://static.cloudmatica.com/location/index.html
aws s3 cp --acl public-read index.js s3://static.cloudmatica.com/location/index.js
