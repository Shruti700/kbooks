const BookCollection = require('../models/book');
const mongoose = require('mongoose');


async function getBook(req, res) {
    try {
        const id = req.params.id;
        const book = await BookCollection.findById(id);
        if (!book) {
            
            return res.redirect('/')     
          }
        return res.render('desc.ejs', { Book: book });
    } catch (error) {
        console.error("Error fetching book:", error);
        return res.status(500).json({ error: "Internal server error" });
    }
}

async function getAllBook(req, res) {
    try {
        const books = await BookCollection.find({});
        return res.render('home.ejs', { Allbook: books });
    } catch (error) {
        console.error("Error fetching all books:", error);
        return res.status(500).json({ error: "Internal server error" });
    }
}

async function createBooks(req, res) {
    try {
        const booksData = Array.isArray(req.body) ? req.body : [req.body];
        await Promise.all(booksData.map(async (bookData) => {
            const { booktitle, author, genre, publication_year, ratings, ISBN, imageURL,description } = bookData;
            await BookCollection.create({ booktitle, author, genre, publication_year, ratings, ISBN, imageURL, description });
        }));
        return res.redirect('/');
    } catch (error) {
        console.error("Error creating books:", error);
        return res.status(500).json({ error: "Internal server error" });
    }
}

async function handleEdit(req, res) {
    try {
        const id = req.params.id;
        await BookCollection.findByIdAndUpdate(id, req.body);
        const result= await BookCollection.findById(id);
        return  res.render('desc.ejs',{Book: result});
    } catch (error) {
        console.error("Error editing book:", error);
        return res.status(500).json({ error: "Internal server error" });
    }
}
async function handleFormEdit(req, res){
    const editDetails= await BookCollection.findById(req.params.id);
    return res.render('editform.ejs',{
        book: editDetails
    })
}
async function handleDelete(req, res) {
    try {
        const id = req.params.id;
        await BookCollection.findByIdAndDelete(id);
        
        return res.redirect('/');
    } catch (error) {
        console.error("Error deleting book:", error);
        return res.status(500).json({ error: "Internal server error" });
    }
}

async function handleDeleteAll(req, res) {
    try {
        await BookCollection.deleteMany();
        return res.status(200).json({ message: "All books deleted" });
    } catch (error) {
        console.error("Error deleting all books:", error);
        return res.status(500).json({ error: "Internal server error" });
    }
}

async function searchFunction(query) {
    try {
        // Ensure the index is created for text search
        await BookCollection.createIndexes();
        // Perform text search on relevant fields
        const searchedResult = await BookCollection.find({ $text: { $search: query } });

        return searchedResult;
    } catch (error) {
        console.error("Error searching:", error);
        throw error;
    }
}

async function filterFunction(query) {
    try {
        const filteredResult = await BookCollection.find({ genre:  { $regex: new RegExp(query, 'i') } });
        return filteredResult;
    } catch (error) {
        console.error("Error filtering:", error);
        throw error;
    }
}

module.exports = { getBook, getAllBook, handleEdit, handleFormEdit, createBooks, handleDelete, handleDeleteAll, searchFunction, filterFunction };
