const express = require('express');
const router = express.Router();
const User = require('../models/user');

// GET
router.get('/', async (req, res) => {
    try{
        const users = await User.find();
        res.json(users);
    }catch(err){
        res.json({message: err});
    }
});

// GET BY ID
router.get('/:userId', async (req, res) => {
    try{
        const userById = await User.findById(req.params.userId);
        res.json(userById);
    }
    catch (err) {
        res.json({message: err});
    }
});

// POST
router.post('/', async (req, res) => {
    const post = new User({
        _id: req.body.id,
        name: req.body.name,
        last_name: req.body.last_name,
        age: req.body.age,
        email: req.body.email,
        active: req.body.active
    });
    try{
        const savedUser = await post.save();
        res.json(savedUser);
    
    } catch (err){
        res.json({message: err});
    }
});

// UPDATE 
router.patch('/:userId', async (req, res) => {
    try{
        const updatedById = await User.updateOne(
            {_id: req.params.userId},
            { 
                $set: {
                    name: req.body.name,
                    last_name: req.body.last_name,
                    age: req.body.age,
                    email: req.body.email,
                    active: req.body.active
                }
            }
            );
        res.json(updatedById);
    }
    catch (err) {
        res.json({message: err});
    }
});


// DELETE
router.delete('/:userId', async (req, res) => {
    try{
        const removedById = await User.remove({_id: req.params.userId});
        res.json(removedById);
    }
    catch (err) {
        res.json({message: err});
    }
});

module.exports = router;