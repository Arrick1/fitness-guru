const express = require('express');
const router = express.Router();
const fetch = require('node-fetch')

/* GET home page. */
router.get('/', async (req, res) => {
  try {
    const exercise = await fetch('https://wger.de/api/v2/exercise/?limit=100&status=2&language=2&format=json')
    if(!exercise.ok){
      throw Error(exercise.response.statusText)
    }
    const exerciseJson = await exercise.json()
    res.json({
      data: exerciseJson,
      success:true
    })
    
  } catch (err) {
    console.log(err, 'err in the catch block')
    return err
  }
});

router.post('/', (req, res) => {
  console.log(req.body)
  return res.json({
    data: req.body
  });
});

router.put('/', (req, res) => {
  return res.json({data: 'Received a GET HTTP method'});
});

router.delete('/', (req, res) => {
  return res.json({data: 'Received a GET HTTP method'});
});


module.exports = router;
