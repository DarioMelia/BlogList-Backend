const User = require("./models/user")
const Blog = require("./models/blog")


exports.getAll = async(collection)=>{
    const Item = require(`./models/${collection}`)
    let opts = {}
    let toPopulate
    switch(collection){
        case "blog":
            toPopulate = "user"
            opts={username:1,name:1}
            break
        case "user":
            toPopulate = "blogs"
            opts={url:1,title:1,author:1}
            break
    }

    return await Item.find({}).populate(toPopulate,opts)
}

exports.getSingle = async(id,collection)=>{
    const Item = require(`./models/${collection}`)
    return await Item.findById(id)
}

exports.addBlog =async({title,author,url,likes},user)=>{
    const userID = user.id
    const newBlog =new Blog({
        title,author,url,likes,
        user:userID
    })
    
    const savedBlog = await newBlog.save()
    user.blogs = user.blogs.concat(savedBlog._id.toString())
    
    await user.save()
    return savedBlog
}
exports.addUser =async({username,name,passwordHash})=>{
    
    const newUser =new User({
        username,name,passwordHash
    })
    return await newUser.save()
}

exports.deleteItem = async(id,collection)=>{
    const Item = require(`./models/${collection}`)
   return await Item.findByIdAndDelete(id)
}

exports.updateItem = async(id,itemToUpdate,collection)=>{
    const Item = require(`./models/${collection}`)
    const opts={
        new:true,
        runValidators:true
    }
    return await Item.findByIdAndUpdate(id,itemToUpdate,opts)
}


// %%%% HELPERS %%%%%

exports.findOne = async(params,collection)=>{
    const Item = require(`./models/${collection}`)
    return await Item.findOne(params)
}




