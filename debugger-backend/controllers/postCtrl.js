const Post = require('../models/postModel')

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
            return res.json(post)
        }
    })

}

const create = (req, res) => {
    console.log('Create function ran')
    const post = new Post(req.body)
    post.save()
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