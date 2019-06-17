

// This package will handle GraphQL server requests and responses
const {graphqlExpress} = require('apollo-server-express');

const {execute, subscribe} = require('graphql');
const {SubscriptionServer} = require('subscriptions-transport-ws');

const graphqlHTTP = require('express-graphql');
const initialSchema = require('./initial');
const configuredSchema = require('./configured');

const buildDataloaders = require('./dataloaders');
const formatError = require('./formatError');

const cors = require("cors");

module.exports = async function(app, orientDb){
    const configHelpers = require("./dal/config")(orientDb);
  
    // Check on startup if this server has been configured in the past
    let server_settings = await configHelpers.server.getSettings();
    console.log(server_settings)
    let state = app.state || "boot";
    if(server_settings.map(ss => ss.state).indexOf("configured") > -1){
        state = "configured";
    } else if(server_settings.map(ss => ss.state)[0].indexOf("initial") > -1){
        state = "configured";
    } else {
        state = "initial";
        await configHelpers.server.createSettings({state});
    }
    app.state = state;
    let buildOptions;

    switch (state) {

        case "configured":

            buildOptions = async (req, res) => {
                return {
                    // This context object is passed to all resolvers.
                    context: {
                        orientDb,
                        app,
                        request: req
                    },
                    formatError,
                    schema: configuredSchema,
                    graphiql: true
                };
            };

            app.use('/api', cors(), graphqlHTTP(buildOptions));
        case "initial":

             buildOptions = async (req, res) => {
                return {
                    // This context object is passed to all resolvers.
                    context: {
                        orientDb,
                        app
                    },
                    formatError,
                    schema: initialSchema,
                    graphiql: true
                };
            };

            app.use('/configuration', cors(), graphqlHTTP(buildOptions));
            break;
    
        default:
            break;
    }

    app.get("/state", cors(), function(request, response, next){
        response.send(app.state);
    })

}