/**
 * Created by ceres on 2/17/16.
 */
"use strict";
var app = angular.module("FormBuilderApp");
app.controller("SidebarController", SidebarController);

function SidebarController($scope, $routeParams, $location, UserServices)
{
    var users = UserServices.findAllUsers(ValidUser);
}


