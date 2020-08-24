
const AWS = require('aws-sdk');
const docClient = new AWS.DynamoDB.DocumentClient({region: 'us-west-1'});

exports.handler = async function(event, context, callback){
    console.log(event);

    let scanningParameters = {
        TableName: 'Patients',
    };

    await docClient.scan(scanningParameters, function(err,data){
        if(err){
            response = {statusCode: "500", 
                            headers: {"x-custom-header" : "my custom header value"},
                            body: err};
        }else{
            response = {statusCode: "200", 
                            headers: {"x-custom-header" : "my custom header value"},
                            body: JSON.stringify(data)};
        }
    }).promise();

    console.log("Response is", response);
    return response;
}