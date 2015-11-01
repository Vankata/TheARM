/*
 * Copyright Accedia 2015
 */
var express = require("express");
var parser = require("body-parser");
var userController = require("Controllers/users-controller.js");
var companiesController = require("Controllers/companies-controller.js");
var eventsController = require("Controllers/events-controller.js");
var resourcesController = require("Controllers/resources-controller.js");

var app = express();

app.use(parser.urlencoded(
{
    extended : true
}));

app.use(parser.json());

app.post('/api/login', function (request, response) {
    var username = request.body.username;
    var password = request.body.password;
    var token = request.body.token;

    console.log("Login atempt from user: " + username);

    var userControllerInstance = userController.loginUser(username, password, token);

    userControllerInstance.then(function (loginResult) {
        response.end(loginResult);
    });
});

app.post('/api/register', function (request, response) {
    var username = request.body.username;
    var password = request.body.password;
    var token = request.body.token;
    var email = request.body.email;
    var os = request.body.os;

    console.log("Registration attempt from user " + username);

    var userControllerInstance = userController.registerUser(username, password, token, email, os);

    userControllerInstance.then(function (registerData) {
        response.end(registerData);
    });
});

app.get('/api/ping', function (request, response)
{
    response.end("Alive");
});

app.get('/api/companies', function (request, response)
{
    console.log("--- in GET/api/companies");

    companiesController.getAll()
        .then(function (companies) {
            response.end(JSON.stringify(companies));
        }, function (error) {
            response.end(JSON.stringify(new Error("Error getting companies", error)));
        });
});

app.get('/api/:companyId/resources', function (request, response)
{
    var companyId = request.params.companyId;
    console.log("--- in GET/api/:companyId/resources - " + companyId);

    companiesController.getResourcesByCompany(companyId)
        .then(function (resources) {
            response.end(JSON.stringify(resources));
        }, function (error) {
            response.end(JSON.stringify(new Error("Error getting company resources", error)));
        });
});

app.get('/api/:companyId/resources/:resourceId', function (request, response)
{
    var companyId = request.params.companyId;
    var resourceId = request.params.resourceId;
    console.log("--- in GET/api/:companyId/resources/:resourceId - " + companyId + ", " + resourceId);

    companiesController.getResourceDataByCompany(companyId, resourceId)
        .then(function (resources) {
            response.end(JSON.stringify(resources));
        }, function (error) {
            response.end(JSON.stringify(new Error("Error getting resource data for company", error)));
        });
});

app.get('/api/:companyId/events', function (request, response)
{

});

app.get('/api/:companyId/events/:eventid', function (request, response)
{

});

app.post('/api/:companyId/events', function (request, response)
{

});

app.post('/api/:companyId/events/join', function (request, response)
{

});

app.post('/api/:companyId/events/leave', function (request, response)
{

});

app.delete('/api/:companyId/events/delete/:eventid/:userid', function (request, response)
{

});

app.listen(8080, function () {
    console.log("Service running...");
});