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
        formModel
            .findFormByUserId(userId)
            .then(
                function (doc) {
                    res.json(doc);
                },
                function (err) {
                    res.status(400).send(err);
                }
            );
    }

    function findFormByFormId(req, res)
    {
        var formId = req.params.formId;
        formModel
            .findFormByFormId(formId)
            .then(
                function (doc) {
                    res.json(doc);
                },
                function (err) {
                    res.status(400).send(err);
                }
            );
    }

    function deleteFormByFormId(req, res)
    {
        var formId = req.params.formId;
        formModel
            .deleteFormByFormId(formId)
            .then(
                function (doc) {
                    res.json(doc);
                },
                function (err) {
                    res.status(400).send(err);
                }
            );
    }

    function createForm(req, res)
    {
        var userId = req.params.userId;
        var form = req.body;
        formModel
            .createForm(userId, form)
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
        var form = req.body;
        formModel
            .update(formId, form)
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