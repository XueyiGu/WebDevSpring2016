/**
 * Created by ceres on 3/16/16.
 */
var mock = require("./form.mock.json");
module.exports = function() {
    var api = {
        createForm: createForm,
        findFormByUserId: findFormByUserId,
        findFormByFormId: findFormByFormId,
        findFormByTitle: findFormByTitle,
        update: update,
        deleteFormByFormId: deleteFormByFormId,


        //operations on fields
        findFieldsByFormId: findFieldsByFormId,
        findFieldByFormIdAndFieldId: findFieldByFormIdAndFieldId,
        deleteFieldByFormIdAndFieldId: deleteFieldByFormIdAndFieldId,
        createField: createField,
        updateField: updateField
    };
    return api;

    function createForm(userId, form){
        form._id = "ID_" + (new Date()).getTime();
        form.userId = userId;
        mock.push(form);
        return form;
    }

    function findFormByUserId(userId){
        var forms = [];
        for (var u in mock) {
            if(mock[u].userId == userId)
            {
                forms.push(mock[u]);
            }
        }
        return forms;
    }

    function findFormByFormId(formId){
        for(var u in mock){
            if(mock[u]._id == formId){
                return mock[u];
            }
        }
        return null;
    }

    function findFormByTitle(title){
        for(var u in mock){
            if(mock[u].title == title){
                return mock[u];
            }
        }
        return null;
    }

    function update(formId, form){
        for(var u in mock){
            if(mock[u]._id == formId){
                mock[u] = form;
            }
        }
        return form;
    }

    function deleteFormByFormId(index){
        var userId = mock[index].userId;
        mock.splice(index, 1);
        var forms = findFormByUserId(userId);
        return forms;
    }

    //operations on fields
    function findFieldsByFormId(formId){
        var fields = [];
        for(var u in mock){
            if(mock[u]._id == formId){
                fields = mock[u].fields;
            }
        }
        return fields;
    }

    function findFieldByFormIdAndFieldId(formId, fieldId){
        for(var u in mock){
            if(mock[u]._id == formId){
                var fields = mock[u].fields;
                for(var v in fields){
                    if(fields[v]._id == fieldId){
                        return fields[v];
                    }
                }
            }
        }
        return null;
    }

    function deleteFieldByFormIdAndFieldId(formId, fieldId){
        for(var u in mock){
            if(mock[u]._id == formId){
                var fields = mock[u].fields;
                var index = 0;
                for(var v in fields){
                    if(fields[v]._id == fieldId){
                        fields.splice(index, 1);
                        return fields;
                    }
                    else{
                        index++;
                    }
                }
            }
        }
        return null;
    }

    function createField(formid, field){
        field._id = "ID_" + (new Date()).getTime();
        for(var u in mock){
            if(mock[u]._id == formid){
                mock[u].fields.push(field);
                return field;
            }
        }
        return null;
    }

    function updateField(formId, fieldId, field){
        for(var u in mock){
            if(mock[u]._id == formId){
                var fields = mock[u].fields;
                for(var v in fields){
                    if(fields[v]._id == fieldId){
                        fields[v] = field;
                        break;
                    }
                }
            }
        }
        return field;
    }
};