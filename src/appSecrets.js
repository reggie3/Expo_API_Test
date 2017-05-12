const appSecrets = {
    auth0:{
        domain: 'reggie3.auth0.com',
        clientID: 'exewwRgiyRaD39xuBb0ENd7agmXNUT1Z',
        connection: 'TouryStory-Users'
    },
    google: {
        clientID: "495388686744-lr79ihd19uff4vgfob3f0jqftu6i1f6q.apps.googleusercontent.com",
        mapsAPIKey: "AIzaSyCo08fvBzBmi2r6oTHzTk940Ak74mSPyck",
        oauth: {
            android: `495388686744-hlb0gthosgban0k3oianjs95r6hhj64b.apps.googleusercontent.com`,
            ios: `495388686744-eadnprujpohc07o4vpfg588hudico00p.apps.googleusercontent.com`
        }
    },
    facebook: {
        clientID: "235931796888727"
    },
    twitter: {
        clientID: "YzdixNvS1QPdsakaywxlKLu84"
    },
   
    aws: {
        userPoolID: "us-east-1_hISaLGx01",
        userPoolARN: "arn:aws:cognito-idp:us-east-1:038258475039:userpool/us-east-1_hISaLGx01",
        identityPoolID: 'us-east-1:9c082f6b-3575-470c-8488-b954d0c7febf',
        identityPoolARN: 'arn:aws:cognito-identity:us-east-1:038258475039:identitypool/us-east-1:9c082f6b-3575-470c-8488-b954d0c7febf',
        region: 'us-east-1',
        appClientID: "4albg8bkhtr42j1l92rmfs1u0n",
        buckets: {
            upload: {
                name: "react-serverless-app-upload",
                region: "US Standard",
                arn: "arn:aws:s3:::react-serverless-app-upload",
            },
            thumbnails: {
                name: "react-serverless-app-thumbnails",
                region: "US Standard",
                arn: "arn:aws:s3:::react-serverless-app-thumbnails",
            },
            processed: {
                name: "react-serverless-app-processed",
                region: "US Standard"
            }
        },
        dynamoDB: {
            picTable: {
                name: 'react-serverless-app-pictureDescriptions',
                arn: 'arn:aws:dynamodb:us-east-1:038258475039:table/react-serverless-app-pictureDescriptions'
            }
        },
        policies: {
            S3: {
                "Id": "Policy1478789026491",
                "Version": "2012-10-17",
                "Statement": [
                    {
                        "Sid": "Stmt1478788957325",
                        "Action": [
                            "s3:ListBucket"
                        ],
                        "Effect": "Allow",
                        "Resource": "arn:aws:s3:::react-serverless-app-upload",
                        "Principal": "*"
                    },
                    {
                        "Sid": "Stmt1478789024444",
                        "Action": [
                            "s3:DeleteObject",
                            "s3:GetObject",
                            "s3:PutObject"
                        ],
                        "Effect": "Allow",
                        "Resource": "arn:aws:s3:::react-serverless-app-upload",
                        "Principal": "*"
                    }
                ]
            }
        }
    }
};

export default appSecrets;