/**
 * Created by ceres on 3/16/16.
 */
module.exports = function(app, formModel) {
    app.get('/api/assignment/form/:formId/field', findFieldsByFormId);
    app.get('/api/assignment/form/:formId/field/:fieldId', findFieldByFormIdAndFieldId);
    app.delete('/api/assignment/form/:formId/field/:fieldId', deleteFieldByFormIdAndFieldId);
    app.post('/api/assignment/form/:formId/field', createField);
    app.put('/api/assignment/form/:formId/field/:fieldId', update);

    function findFieldsByFormId(req, res)
    {
        var formId = req.params.formId;
        var fields = formModel.findFieldsByFormId(formId);
        res.json(fields);
    }

    function findFieldByFormIdAndFieldId(req, res)
    {
        var formId = req.params.formId;
        var fieldId = req.params.fieldId;
        var field = formModel.findFormByFormIdAndFieldId(formId, fieldId);
        res.json(field);
    }

    function deleteFieldByFormIdAndFieldId(req, res)
    {
        var formId = req.params.formId;
        var fieldId = req.params.fieldId;
        var forms = formModel.deleteFieldByFormIdAndFieldId(formId, fieldId);
        res.json(forms);
    }

    function createField(req, res)
    {
        var formId = req.params.formId;
        var field = req.body;
        field = formModel.createField(formId, field);
        res.json(field);
    }

    function update(req, res)
    {
        var formId = req.params.formId;
        var fieldId = req.params.fieldId;
        var field = req.body;
        field = formModel.updateField(formId, fieldId, field);
        res.json(field);
    }
}