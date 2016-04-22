/**
 * Created by ceres on 3/16/16.
 */
var q = require("q");
module.exports = function(mongoose, db) {
    var FormSchema = require('./form.schema.server.js')(mongoose);
    var formModel = mongoose.model("formModel", FormSchema);

    var api = {
        createForm: createForm,
        findFormByUserId: findFormByUserId,
        findFormByFormId: findFormByFormId,
        findFormByTitle: findFormByTitle,
        update: update,
        deleteFormByFormId: deleteFormByFormId,

    };
    return api;

    function createForm(userId, form){
        var deferred = q.defer();
        formModel.create(form, function(err, user){
            if(err){
                deferred.reject(err);
            }
            else{
                formModel.find({userId: userId}, function(err, forms){
                    if(err){
                        deferred.reject(err);
                    }else {
                        deferred.resolve(forms);
                    }
                });
            }
        });
        return deferred.promise;
    }

    function findFormByUserId(userId){
        var deferred = q.defer();
        formModel.find({userId: userId}, function(err, forms){
            if(err){
                deferred.reject(err);
                console.error(err);
            }else{
                console.log('return the result of findFormByUserId:' + userId);
                console.log(forms);
                deferred.resolve(forms);
            }
        });
        return deferred.promise;
    }


    function findFormByFormId(formId){

        var deferred = q.defer();
        formModel.find({_id: formId}, function(err, doc){
            if(err){
                console.error('failed in findFormByFormId');
                console.error(err);
                deferred.reject(err);
            } else{
                console.log('return the result of findFormByFormId:')
                console.log(doc);
                deferred.resolve(doc);
            }
        });
        return deferred.promise;
    }

    function findFormByTitle(title){
        var deferred = q.defer();
        formModel.find({title: title}, function(err, doc){
            if(err){
                console.error('failed in findFormByTitle');
                console.error(err);
                deferred.reject(err);
            } else{
                console.log('return the result of findFormByTitle:')
                console.log(doc);
                deferred.resolve(doc);
            }
        });
        return deferred.promise;
    }

    function update(formId, form){
        var deferred = q.defer();
        formModel.update(
            {_id: formId}, {$set: form},
            function(err, doc) {
            if(err){
                deferred.reject(err);
            } else{
                deferred.resolve(doc);
            }
        });

        return deferred.promise;
    }

    function deleteFormByFormId(formId){
        var deferred = q.defer();
        formModel.remove(
            {_id: formId},
            function (err, stats) {
                if (!err) {
                    deferred.resolve(stats);
                } else {
                    deferred.reject(err);
                }
            }
        );
        return deferred.promise;
    }
};