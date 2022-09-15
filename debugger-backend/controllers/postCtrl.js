const Post = require('../models/postModel')
const User = require('../models/userModel')
const showAll = (req,res) => {
    Post.find({}, (err, posts) => {
        if(err) {
            res.status(400).json(err)
            return 
        }
        res.json(posts)
    })
}

const showOne = (req,res) => {
    let postId = req.params.id;
    console.log('Post ID:',postId)
    Post.findById({ _id: postId }, (err, post) => {
        if(err) {
            res.status(400).json(err)
            return
        }else {
            console.log([post]) //Currently coming back undefined. Need to tweak the create post code so it assigns a user
            return res.json([post])

        }
    })

}

const create = (req, res) => {
    console.log('Create function ran')
    console.log(req.user)
    const post = new Post(req.body)
    post.author.push(req.user.username)
    console.log(post.authors)
    post.save()

    res.json(post)
    //Need to add a function that will grab the user and add post to that users posts[]
    // User.findOne({ email: req.user.email }, (err,user) => {
    //     console.log('USER FUNCTION:',user)
    //     if(err){
    //         res.status(400).json(err)
    //     }
    //     const post = new Post(req.body)
    //     user.posts.push(post)
    //     console.log(user.posts)
    //     post.authors.push(user)
    //     console.log(post.authors)
    //     post.save()

    // })
    // res.json(post)
}

const deletePost = (req, res) => {
    Post.findByIdAndDelete({_id: req.params.id }, (err, post) => {
        if(err) {
            res.status(400).json(err)
        }
        res.json({msg: 'Post Deleted'})
    })
}

module.exports = {
    showAll,
    showOne,
    create,
    deletePost
}