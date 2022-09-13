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
    let postId = req.params.id.toString();
    console.log(postId)
    Post.findById({ _id: postId }, (err, post) => {
        if(err) {
            res.status(400).json(err)
            return
        }else {
            console.log(post.author) //Currently coming back undefined. Need to tweak the create post code so it assigns a user
            return res.json(post)

        }
    })

}

const create = (req, res) => {
    console.log('Create function ran')
    console.log(req.body)
    const post = new Post(req.body)
    post.save()
    //Need to add a function that will grab the user and add post to that users posts[]
    User.findById({ })
    res.json(post)
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