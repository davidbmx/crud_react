var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

/* login users  */
router.get('/login', function(req, res, next) {
  res.status(200).json({login: 'ok'})
});

// /* GET users listing. */
// router.get('/', function(req, res, next) {
//   res.send('respond with a resource');
// });

// /* POST users listing. */
// router.post('/', function(req, res, next) {
//   res.send('respond with a resource');
// });

// /* GET users listing. */
// router.put('/', function(req, res, next) {
//   res.send('respond with a resource');
// });

// /* GET users listing. */
// router.delete('/', function(req, res, next) {
//   res.send('respond with a resource');
// });

module.exports = router;
