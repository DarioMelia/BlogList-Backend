const {dummy,totalLikes, favBlog, mostBlogs, mostLikes} = require("../utils/list_helper"),
    blogs = require("./test-blogs")

test("Dummy returns one",()=>{
    const result = dummy([])
    expect(result).toBe(1)
})

describe("Total likes",()=>{
    test("of empty list is zero",()=>{
        const result = totalLikes([])
        expect(result).toBe(0)
    })
    test("when list has only one blog, equals the likes of that",()=>{
        const oneItemArray = [blogs[0]]
        const result = totalLikes(oneItemArray)
        expect(result).toBe(7)
    })
    test("works with bigger lists",()=>{
        const result = totalLikes(blogs)
        expect(result).toBe(36)
    })
    
})

describe("Favorite blog",()=>{
    test("is correctly found",()=>{
        const result = favBlog(blogs)
        expect(result).toEqual( {
            title: "Canonical string reduction",
            author: "Edsger W. Dijkstra",
            likes: 12
          }) 
    })
})

describe("Author with ",()=>{
    test("most blogs found",()=>{
        const result = mostBlogs(blogs)
        expect(result).toEqual({
            author: "Robert C. Martin",
            blogs: 3
          })

    })

    test("most likes found",()=>{
        const result=mostLikes(blogs)
        expect(result).toEqual({
            author: "Edsger W. Dijkstra",
            likes: 17
          })
    })
})
