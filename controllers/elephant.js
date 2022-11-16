var elephant = require('../models/elephant');
// List of all elephants
// List of all elephant
exports.elephant_list = async function(req, res) {
    try{
    theelephants = await elephant.find();
    res.send(theelephants);
    }
    catch(err){
    res.status(500);
    res.send(`{"error": ${err}}`);
    }
    };
// for a specific elephant.
exports.elephant_detail = function(req, res) {
res.send('NOT IMPLEMENTED: elephant detail: ' + req.params.id);
};
// Handle elephant create on POST.
exports.elephant_create_post = function(req, res) {
res.send('NOT IMPLEMENTED: elephant create POST');
};
// Handle elephant delete form on DELETE.
exports.elephant_delete = function(req, res) {
res.send('NOT IMPLEMENTED: elephant delete DELETE ' + req.params.id);
};
// Handle elephant update form on PUT.
exports.elephant_update_put = function(req, res) {
res.send('NOT IMPLEMENTED: elephant update PUT' + req.params.id);
};
// VIEWS
// Handle a show all view
exports.elephant_view_all_Page = async function(req, res) {
    try{
    theelephants = await elephant.find();
    res.render('elephant', { title: 'elephant Search Results', results: theelephants });
    }
    catch(err){
    res.status(500);
    res.send(`{"error": ${err}}`);
    }
    };
    // Handle elephant create on POST.
exports.elephant_create_post = async function(req, res) {
    console.log(req.body)
    let document = new elephant();
    // We are looking for a body, since POST does not have query parameters.
    // Even though bodies can be in many different formats, we will be picky
    // and require that it be a json object
    // {"elephant_type":"goat", "cost":12, "size":"large"}
    document.elephant_color = req.body.elephant_color;
    document.elephant_breed = req.body.elephant_breed;
    document.elephant_price = req.body.elephant_price;
    try{
    let result = await document.save();
    res.send(result);
    }
    catch(err){
    res.status(500);
    res.send(`{"error": ${err}}`);
    }
    };
    // for a specific elephant.
exports.elephant_detail = async function(req, res) {
    console.log("detail" + req.params.id)
    try {
    result = await elephant.findById( req.params.id)
    res.send(result)
    } catch (error) {
    res.status(500)
    res.send(`{"error": document for id ${req.params.id} not found`);
    }
    };
    exports.elephant_update_put = async function(req, res) {
        console.log(`update on id ${req.params.id} with body
        ${JSON.stringify(req.body)}`)
        try {
        let toUpdate = await elephant.findById( req.params.id)
        // Do updates of properties
        if(req.body.elephant_color)
        toUpdate.elephant_color = req.body.elephant_color;
        if(req.body.elephant_breed) toUpdate.elephant_breed = req.body.elephant_breed;
        if(req.body.elephant_price) toUpdate.size = req.body.elephant_price;
        let result = await toUpdate.save();
        console.log("Sucess " + result)
        res.send(result)
        } catch (err) {
        res.status(500)
        res.send(`{"error": ${err}: Update for id ${req.params.id}
        failed`);
        }
        };
        exports.elephant_delete = async function(req, res) {
            console.log("delete " + req.params.id)
            try {
            result = await elephant.findByIdAndDelete( req.params.id)
            console.log("Removed " + result)
            res.send(result)
            } catch (err) {
            res.status(500)
            res.send(`{"error": Error deleting ${err}}`);
            }
        };
        exports.elephant_view_one_Page = async function(req, res) {
            console.log("single view for id " + req.query.id)
            try{
            result = await elephant.findById( req.query.id)
            res.render('elephantdetail',
            { title: 'elephant Detail', toShow: result });
            }
            catch(err){
            res.status(500)
            res.send(`{'error': '${err}'}`);
            }
            };
            exports.elephant_create_Page = function(req, res) {
                console.log("create view")
                try{
                res.render('elephantcreate', { title: 'elephant Create'});
                }
                catch(err){
                res.status(500)
                res.send(`{'error': '${err}'}`);
                }
                };
                exports.elephant_update_Page = async function(req, res) {
                    console.log("update view for item "+req.query.id)
                    try{
                    let result = await elephant.findById(req.query.id)
                    res.render('elephantupdate', { title: 'elephant Update', toShow: result });
                    }
                    catch(err){
                    res.status(500)
                    res.send(`{'error': '${err}'}`);
                    }
                    }
                    exports.elephant_delete_Page = async function(req, res) {
                        console.log("Delete view for id " + req.query.id)
                        try{
                        result = await elephant.findById(req.query.id)
                        res.render('elephantdelete', { title: 'elephant Delete', toShow:
                        result });
                        }
                        catch(err){
                        res.status(500)
                        res.send(`{'error': '${err}'}`);
                        }
                        };
        