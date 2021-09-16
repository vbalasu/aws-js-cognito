AWS.config.region = 'us-east-1'; // Region
AWS.config.credentials = new AWS.CognitoIdentityCredentials({
    IdentityPoolId: 'us-east-1:bca7d5a3-1886-4529-975a-eba315dd5793',
});

dynamodb = new AWS.DynamoDB();
params = {
  Statement: 'SELECT * FROM location;'
}
function afterRead(err, data) {
  if (err) console.log(err, err.stack); // an error occurred
  else     console.log(data);           // successful response  
}

const watchId = navigator.geolocation.watchPosition(position => {
  coords = position.coords;
  sql = `INSERT INTO location value {
    'user': '${document.querySelector('#user').value}', 
    'timestamp': '${new Date().toISOString()}', 
    'latitude': '${coords.latitude}', 
    'longitude': '${coords.longitude}', 
    'altitude': '${coords.altitude}'}`;
  console.log(sql);
  document.querySelector('#viewer').innerHTML += sql+'<br>';
  dynamodb.executeStatement({Statement: sql}, afterInsert);
});

function afterInsert(err, data) {
  if (err) console.log(err, err.stack); // an error occurred
  else     console.log(data);           // successful response  
}
