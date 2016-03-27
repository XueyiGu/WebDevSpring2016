/**
 * Created by ceres on 3/16/16.
 */
module.exports = function(app, formModel) {
    app.get('/api/assignment/user/:userId/form', findFormByUserId);
    app.get('/api/assignment/form/:formId', findFormByFormId);
    app.delete('/api/assignment/form/:formId', deleteFormByFormId);
    app.post('/api/assignment/user/:userId/form', createForm);
    app.put('/api/assignment/form/:formId', update);

    function findFormByUserId(req, res)
    {
        var userId = req.params.userId;
        var forms = formModel.findFormByUserId(userId);
        res.json(forms);
    }

    function findFormByFormId(req, res)
    {
        var formId = req.params.formId;
        var form = formModel.findFormByFormId(formId);
        res.json(form);
    }

    function deleteFormByFormId(req, res)
    {
        var formId = req.params.formId;
        var forms = formModel.deleteFormByFormId(formId);
        res.json(forms);
    }

    function createForm(req, res)
    {
        var userId = req.params.userId;
        var form = req.body;
        form = formModel.createForm(userId, form);
        res.json(form);
    }

    function update(req, res)
    {
        var formId = req.params.formId;
        var form = req.body;
        form = formModel.update(formId, form);
        res.json(form);
    }
}