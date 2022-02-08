const mongoose = requrie("mongoose")

const blogSchema = new mongoose.Shema({
     title:{
         type:String,
         required:[true,"Title is required"]
     },
     author:{
         type:String,
         required:[true,"Author is required"]
     },
     url:{
         type:String,
         minLength:[5,"You introduced an invalid link"]
     },
     likes: Number
})

blogSchema.set('toJSON', {
    transform: (document, returnedObject) => {
      returnedObject.id = returnedObject._id.toString()
      delete returnedObject._id
      delete returnedObject.__v
    }
  })

module.exports = new mongoose.model("Blog",blogSchema)

