exports.setupdynamodbTest = function(app){

//DynamoDB STUFF
var AWS = require('aws-sdk'); 
AWS.config.update({region: 'us-east-1', "AWS_ACCESS_KEY_ID":process.env.AWS_ACCESS_KEY_ID, "AWS_SECRET_ACCESS_KEY":process.env.AWS_SECRET_ACCESS_KEY, room_id:1});

var dynamodb = new AWS.DynamoDB();

var params = {
    TableName: 'room',
    Item: { // a map of attribute name to AttributeValue
        room_id: {N:'1'}
        // more attributes...
    },
    Expected: { // optional (map of attribute name to ExpectedAttributeValue)
    
        room_id: {
            Exists: true, // optional (if false, Value must be null)
            Value: { N: '1' },
        },
        // more attributes...
    },
    ReturnValues: 'NONE', // optional (NONE | ALL_OLD)
    ReturnConsumedCapacity: 'NONE', // optional (NONE | TOTAL | INDEXES)
    ReturnItemCollectionMetrics: 'NONE', // optional (NONE | SIZE)
};
dynamodb.putItem(params, function(err, data) {
    if (err) console.log(err); // an error occurred
    else console.log(data); // successful response
});
/*
var params = {
    TableName: 'room',
    Key: { // a map of attribute name to AttributeValue for all primary key attributes
    
        room_id: 1
        // more attributes...

    },
    AttributesToGet: [ // optional (list of specific attribute names to return)
        'room_id',
        // ... more attribute names ...
    ],
    ConsistentRead: false, // optional (true | false)
    ReturnConsumedCapacity: 'NONE', // optional (NONE | TOTAL | INDEXES)
};
dynamodb.getItem(params, function(err, data) {
    if (err) console.log(err); // an error occurred
    else console.log(data); // successful response
});
*/
}
