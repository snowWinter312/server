var ChannelSchema = require('./../schemas/channel.js')

module.exports.create = function(req, res){
    var data = {
        "name"          : req.body.name,
        "group_id"         : req.body.group_id,
    }

    ChannelSchema.create(data, function(err, doc){
        if(err){
            res.status(401).json(err);
        }
        res.status(201).json(doc);
    })
}

module.exports.update = function(req, res){
    var data = {
        "name"          : req.body.name,
        "group_id"         : req.body.group_id,
    }

    var query = {'_id' : req.body._id}

    ChannelSchema.update(query, data, function (err, doc){
        if (err) res.status(401).json(err)

        res.status(201).json(doc);
    })
}

module.exports.delete = function(req, res){
    ChannelSchema.findOne({'_id' : req.body._id}, function (err, doc){
        if (err) res.status(401).json(err)

        doc.remove(function(err, data){
            if (err) res.status(401).json(err)

            res.status(201).json({ result : 'deleted'})
        })
    })
}

module.exports.get = function(req, res){
    ChannelSchema.findOne({'_id' : req.body._id}, function (err, doc){
        if (err) res.status(401).json(err)

        res.status(201).json(doc)
    })
}

module.exports.get_all_by_groupID = function(req, res){
    console.log(req.body)
    var data = []
    ChannelSchema.find({}, function (err, docs){
        docs.forEach(function(doc){
            if(doc.group_id == req.body.group_id) {
                data.push(doc)
            }else{
                data.push({ddd:'ddd'})
            }
        })
        res.status(201).json(data)
    })
}

module.exports.get_all = function(req, res){
    var data = []

    ChannelSchema.find({}, function (err, docs){
        if (err) res.status(401).json(err)

        docs.forEach(function (doc) {
            data.push(doc)
        })

        res.status(201).json(data);
    })
}

module.exports.getGroupByID = function(req, res){
    var data = []

    ChannelSchema.find({}, function (err, docs){
        if (err) res.status(401).json(err)

        docs.forEach(function (doc) {
            if (doc.group_id === req.body.group_id) data.push(doc)
        })

        res.status(201).json(data);
    })


}