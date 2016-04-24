/**
 * Created by ceres on 4/4/16.
 */
var q = require("q");

module.exports = function(mongoose, db) {
    var FormSchema = require('./form.schema.server.js')(mongoose);
    var fieldModel = mongoose.model("fieldModel", FormSchema);
    var formModel = mongoose.model("formModel2", FormSchema);

    var api = {
        //operations on fields
        findFieldsByFormId: findFieldsByFormId,
        deleteFieldByFormIdAndFieldId: deleteFieldByFormIdAndFieldId,
        createField: createField,
        updateField: updateField
    };
    return api;

    //operations on fields====================================================================
    function findFieldsByFormId(formId){
        var deferred = q.defer();
        fieldModel.find({_id: formId},{"fields": 1}, function(err, doc){
            if(err){
                deferred.reject(err);
            }else{
                console.log("The result of findFieldsByFormId :" + formId);
                console.log(doc);
                deferred.resolve(doc);
            }
        });
        return deferred.promise;
    }

    function deleteFieldByFormIdAndFieldId(formId, fieldId){
        var deferred = q.defer();
        formModel.findOne(
            {
                _id: formId
            },
            function(err, doc) {
                if (err) {
                    deferred.reject(err);
                }
                else {
                    for (var i = 0; i < doc.fields.length; i++) {
                        if (doc.fields[i]._id == fieldId) {
                            doc.fields.splice(i, 1);
                        }
                    }
                    doc.save();
                    deferred.resolve(doc.fields);
                }
            }
        );
        return deferred.promise;
    }

    function createField(formid, field){
        var deferred = q.defer();
        formModel.update({_id: formid},
            {$push: {fields: field}},
            {upsert: true, new: true},
            function(err, doc){
                if(err){
                    deferred.reject(err);
                }else{
                    deferred.resolve(doc);
                }
            });
        return deferred.promise;
    }

    function updateField(formId, fieldId, field){
        var deferred = q.defer();
        var ObjectId = mongoose.Types.ObjectId;
        formModel.update({_id: formId, 'fields._id': new ObjectId(fieldId)},
            {$set: {'fields.$': field}},
            {new: true},
            function(err, doc){
                if(err){
                    deferred.reject(err);
                }else{
                    console.log('I am in updateField of field.model.server');
                    deferred.resolve(doc);
                }
            });
        return deferred.promise;
    }
};