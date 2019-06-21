const config={
  databaseServer: {
    host: "localhost",
    user: "sbs",
    password: "tryRoot94",
    multipleStatements: true,
    dateStrings: 'date'
  },
  webServer:{
    port:3000
  },
  graphqlServer:{
    port:3001,
    playground: '/playground',
  }
};

module.exports=config;