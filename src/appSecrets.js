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
        apiURL: 'https://4fu0bl5046.execute-api.us-east-1.amazonaws.com/production'
        
    }
};

export default appSecrets;