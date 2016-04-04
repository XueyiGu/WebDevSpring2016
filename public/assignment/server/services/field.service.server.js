/**
 * Created by ceres on 3/16/16.
 */
module.exports = function(app, fieldModel) {
    app.get('/api/assignment/form/:formId/field', findFieldsByFormId);
    app.get('/api/assignment/form/:formId/field/:fieldId', findFieldByFormIdAndFieldId);
    app.delete('/api/assignment/form/:formId/field/:fieldId', deleteFieldByFormIdAndFieldId);
    app.post('/api/assignment/form/:formId/field', createField);
    app.put('/api/assignment/form/:formId/field/:fieldId', update);

    function findFieldsByFormId(req, res)
    {
        var formId = req.params.formId;
        fieldModel
            .findFieldsByFormId(formId)
            .then(
                function (doc) {
                    res.json(doc);
                },
                function (err) {
                    res.status(400).send(err);
                }
            );
    }

    function findFieldByFormIdAndFieldId(req, res)
    {
        var formId = req.params.formId;
        var fieldId = req.params.fieldId;
        fieldModel
            .findFormByFormIdAndFieldId(formId, fieldId)
            .then(
                function (doc) {
                    res.json(doc);
                },
                function (err) {
                    res.status(400).send(err);
                }
            );
    }

    function deleteFieldByFormIdAndFieldId(req, res)
    {
        var formId = req.params.formId;
        var fieldId = req.params.fieldId;
        fieldModel
            .deleteFieldByFormIdAndFieldId(formId, fieldId)
            .then(
                function (doc) {
                    res.json(doc);
                },
                function (err) {
                    res.status(400).send(err);
                }
            );
    }

    function createField(req, res)
    {
        var formId = req.params.formId;
        var field = req.body;
        fieldModel
            .createField(formId, field)
            .then(
                function (doc) {
                    res.json(doc);
                },
                function (err) {
                    res.status(400).send(err);
                }
            );
    }

    function update(req, res)
    {
        var formId = req.params.formId;
        var fieldId = req.params.fieldId;
        var field = req.body;
        fieldModel
            .updateField(formId, fieldId, field)
            .then(
                function (doc) {
                    res.json(doc);
                },
                function (err) {
                    res.status(400).send(err);
                }
            );
    }
}