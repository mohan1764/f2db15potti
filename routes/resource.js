var express = require('express');
var router = express.Router();
// Require controller modules.
var api_controller = require('../controllers/api');
var elephant_controller = require('../controllers/elephant');
/// API ROUTE ///
// GET resources base.
router.get('/', api_controller.api);
/// elephant ROUTES ///
// POST request for creating a elephant.
router.post('/elephants', elephant_controller.elephant_create_post);
// DELETE request to delete elephant.
router.delete('/elephants/:id', elephant_controller.elephant_delete);
// PUT request to update elephant.
router.put('/elephants/:id', elephant_controller.elephant_update_put);
// GET request for one elephant.
router.get('/elephants/:id', elephant_controller.elephant_detail);
// GET request for list of all elephant items.
router.get('/elephants', elephant_controller.elephant_list);
module.exports = router;