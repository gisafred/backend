const express=require('express')
const router=express.Router()
const authorizations=require('../../middleware/tokenVerification')
const {Book, validate}=require('../../models/book')

router.post("/", async (req, res) => {
  try {
       const { error } = validate(req.body);
       if (error)
            return res.status(400).send({ message: _.get(error, "details[0].message", "Validation error") });

       await new Book(req.body).save();
       res.status(201).send({ message: "Book created successfully" });
  } catch (error) {
       res.status(500).send({ message: "Internal Server Error" });
  }
});

router.get('/',authorizations, async (req,res)=>{
    const books=await Book.find()
    res.status(200).send(books)
  })
  
  router.get('/:id',authorizations,async (req,res)=>{
    const books=await Book.findById(req.params.id)
    res.send(books)
  })
  
  router.put('/:id',authorizations, async (req, res) => {
    try {
      const books = await Book.findByIdAndUpdate(req.params.id, req.body, { new: true });
      if (books) {
        res.json(books);
      } else {
        res.status(404).json({ message: 'Book not found' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error while updating a Book' });
    }
  });
  
  router.delete('/:id',authorizations, async (req, res) => {
    try {
      const books = await Book.findByIdAndDelete(req.params.id);
      if (books) {
        res.json({message:'book deleted'});
      } else {
        res.status(404).json({ message: 'book not found' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error deleting a Book' });
    }
  });
  
  module.exports=router