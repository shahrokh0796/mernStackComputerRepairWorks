const User = require('../models/User');
const Note = require('../models/Note');
const asyncHandler = require('express-async-handler');

// @desc Get all notes
// @route GET /notes
// @access Private
const getAllNotes = asyncHandler(async (req, res) => {
    const notes = await Note.find().lean();
    // If there is no notes
    if (!notes?.length) {
        return res.status(400).json({ message: "No notes found"});
    } 

    // Add username to each note before sending the response 
    // You could also do this with a for...of loop

    const notesWithUser = await Promise.all(notes.map(async (note) => {
        const user = await User.findById(note.user).lean().exec();
        return { ...note, username: user.username };
    }));

    res.json(notesWithUser);
});


const createNewNote = asyncHandler(async (req, res) => {
    const { user, title, text } = req.body;

    // Confirm Note
    if (!user || !title || !text) {
        return res.status(400).json({ message: "All fields are required"});
    }
    //  check for duplicate title
    const duplicate = await Note.findOne({ title }).collation({ locale: 'en', strength: 2}).lean().exec();
    
    if(duplicate) {
        return res.status(409).json({ message: 'Duplicate note title' });
    }


    // Create and store new note
    const note = await Note.create({ user, title, text });

    if (note )  { //Created 
        return res.status(201).json({ message: `New note created `});
    } else {
        return res.status(400).json({ message: 'Invalid user data received '});
    }
});

const updateNote = asyncHandler(async (req, res) => {
    const {id, user, title, text, completed } = req.body;

    // Confirm data
    if (!id || !user || !title || !text || typeof completed !== 'boolean') {
        return res.status(400).json({ message: "All fields are required"});
    }

    // Confirm note exists to update
    const note = await Note.findById(id).exec();

    if(!note) {
        return res.status(400).json({ message: 'Note not found '});
    }

    //  check for duplicate title
    const duplicate = await Note.findOne({ title }).collation({ locale: 'en', strength: 2}).lean().exec();
    // Allow renaming of the original note
    if(duplicate && duplicate?._id.toString() !== id) {
        return res.status(409).json({ message: 'Duplicate note title'});
    }

    note.user = user;
    note.title = title;
    note.text = text;
    note.completed = completed;

    const updatedNote = await note.save();

    res.json(` '${updatedNote.title}' updated`);
});

const deleteNote = asyncHandler(async (req, res) => {
    const { id } = req.body;

    // Confirm data
    if(!id) {
        return res.status(400).json({ message: 'Note ID Required'});
    }

    // confirm note exists to delete
    const note = await Note.findById(id).exec();
    
    if(!note) {
        return res.status(400).json({ message: 'Note not found'});
    }
    
    const result = await note.deleteOne();

    const reply = `Note '${result.title}' with ID ${result._id} deleted`
    
    res.json(reply);
});


module.exports = {
    getAllNotes,
    createNewNote,
    updateNote,
    deleteNote 
}