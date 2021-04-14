// Main Routers
var express = require('express')
var router = express.Router()

// Router Controllers
var _auth = require('./auth_router')
var _room = require('./room_router')
var _conversation = require('./conversation_router')
var _email = require('./email_router')

// Routers - User
router.post('/auth', _auth.auth)
router.post('/register', _auth.register)
router.post('/confirm', _auth.confirm)
router.post('/password', _auth.password)
router.post('/changing', _auth.changing)
router.post('/users', _auth.users)
router.post('/user', _auth.user)
router.post('/search', _auth.search)
router.post('/update', _auth.update)
router.post('/create', _auth.create)
router.post('/delete_all', _auth.delete_all)
router.post('/delete_one', _auth.delete_one)

// Routers - Email
router.post('/register_email', _email.register_email)
router.post('/forgot_email', _email.forgot_email)
router.post('/pin_email', _email.pin_email)

// Routers - Room
router.post('/rooms', _room.rooms)
router.post('/room_search', _room.room_search)
router.post('/room', _room.room)
router.post('/room_update', _room.room_update)
router.post('/room_create', _room.room_create)
router.post('/room_delete', _room.room_delete)
router.post('/room_delete_one', _room.room_delete_one)

// Routers - conversation
router.post('/conversations', _conversation.conversations)
router.post('/weeks', _conversation.weeks)
router.post('/days', _conversation.days) 
router.post('/comments', _conversation.comments) 
router.post('/post_all', _conversation.post_all) 
router.post('/post_search', _conversation.post_search) 
router.post('/post', _conversation.post) 
router.post('/post_update', _conversation.post_update) 
router.post('/post_create', _conversation.post_create)  
router.post('/post_delete', _conversation.post_delete) 
router.post('/post_delete_one', _conversation.post_delete_one)  
router.post('/comment_add', _conversation.comment_add) 
router.post('/reply_add', _conversation.reply_add) 
router.post('/comment_all', _conversation.comment_all) 
router.post('/comment_search', _conversation.comment_search) 
router.post('/comment', _conversation.comment) 
router.post('/comment_update', _conversation.comment_update) 
router.post('/comment_create', _conversation.comment_create) 
router.post('/comment_delete', _conversation.comment_delete)
router.post('/comment_delete_one', _conversation.comment_delete_one)
router.post('/comment_delete_front', _conversation.comment_delete_front)


module.exports = router
