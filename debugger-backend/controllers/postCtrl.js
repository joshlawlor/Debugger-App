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
    let postId = req.params.id;
    console.log(postId)
    Post.findOne({ id: postId }, (err, post) => {
        if(err) {
            res.status(400).json(err)
            return
        }else {
            return res.json([post])
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
    Post.findOneAndDelete({id: req.params.id }, (err, post) => {
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