const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require("./api-test-helper")
const app = require('../app')

const api = supertest(app)
describe("Request type",()=>{
   
    test("get to '/api/blogs' returns all well formatted", async()=>{
       const response= await api.get("/api/blogs")
                 .expect(200)
                 .expect("Content-Type",/application\/json/)
        
       expect(response.body).toHaveLength(helper.initialBlogs.length)
    })
    test("post to '/api/blogs' saves the new blog", async()=>{
        const token = await helper.testUserToken(api)
        const response= await api.post("/api/blogs")
                .send(helper.testBlog)
                .set({Authorization: token})
                .expect(201)
                .expect("Content-Type",/application\/json/)
        expect(response.body.title).toBe(helper.testBlog.title)
        expect(await helper.blogsInDB()).toHaveLength(helper.initialBlogs.length + 1)
    })
    test("delete to '/api/blogs/:id' deletes the specified blog, only the creator", async()=>{
        const token = await helper.testUserToken(api)
        const newNoteResult = await api
          .post("/api/blogs")
          .send(helper.testBlog)
          .set({ Authorization: token })
        const noteToDelete = newNoteResult.body

        const notesAtStart = await helper.blogsInDB()
        
        await api.delete(`/api/blogs/${noteToDelete.id}`)
                 .set({Authorization: token})
                 .expect(204)
        
        const notesAtEnd = await helper.blogsInDB()
        expect(notesAtEnd).not.toContain(noteToDelete)
        expect(notesAtEnd).toHaveLength(notesAtStart.length -1)
    })
    test("put to '/api/blogs/:id' succesfully updates the entry", async()=>{
        const {_id,...blogToUpdate} = {...helper.initialBlogs[0],likes:12}
        const response= await api.put(`/api/blogs/${_id}`)
                .send(blogToUpdate)
                .expect(200)
                .expect("Content-Type",/application\/json/)
        const notesAtEnd = await helper.blogsInDB()
        expect(notesAtEnd).toContainEqual(response.body)
        expect(response.body.likes).toBe(blogToUpdate.likes)

    })
    
})
describe("When a new Blog is added and ", ()=>{
    test("likes is missing, likes defaults to 0",async()=>{
        const token = await helper.testUserToken(api)
        const {likes,...noLikesBlog} = helper.testBlog
        const response= await api.post("/api/blogs")
                .send(noLikesBlog)
                .set({Authorization: token})
                .expect(201)
                .expect("Content-Type",/application\/json/)
       
        expect(response.body).toEqual({...response.body,likes:0})
    })
    test("title and url are missing, status 400",async()=>{
        const token = await helper.testUserToken(api)
        const {url, title, ...noUrlOrTitle} = helper.testBlog
        await api.post("/api/blogs")
                .send(noUrlOrTitle)
                .set({Authorization: token})
                .expect(400)
        expect(await helper.blogsInDB()).toHaveLength(helper.initialBlogs.length)
    })
    test("token is missing, status 401",async()=>{
        await api.post("/api/blogs")
            .send(helper.testBlog)
            .expect(401)
    })
    test("token is invalid, status 401",async()=>{
        await api.post("/api/blogs")
            .send(helper.testBlog)
            .set({Authorization: "lasdnd89a3b978ag938adgvb978g79a897sdf"})
            .expect(401)
    })
})
describe("Validation:",()=>{
    test("Id property is send instead of _id", async()=>{
        const response= await api.get("/api/blogs")
        expect(response.body[0].id).toBeDefined()
    })


})
beforeEach(()=>helper.resetDB("blog"))
afterAll(() => {
    mongoose.connection.close()
  })