var GroupSchema = require('./../schemas/group.js')

module.exports.create = function(req, res){
    var data = {
        "name"          : req.body.name,
        "type"         : req.body.type,
        "parent_group_id"      : req.body.parent,
    }

    GroupSchema.create(data, function(err, doc){
        if(err){
            res.status(401).json(err);
        }
        res.status(201).json(doc);
    })
}

module.exports.update = function(req, res){
    var data = {
        "name"          : req.body.name,
        "type"         : req.body.type,
        "parent_group_id"      : req.body.parent,
    }

    var query = {'_id' : req.body._id}

    GroupSchema.update(query, data, function (err, doc){
        if (err) res.status(401).json(err)

        res.status(201).json(doc);
    })
}

module.exports.delete = function(req, res){
    GroupSchema.findOne({'_id' : req.body._id}, function (err, doc){
        if (err) res.status(401).json(err)

        doc.remove(function(err, data){
            if (err) res.status(401).json(err)

            res.status(201).json({ result : 'deleted'})
        })
    })
}

module.exports.get = function(req, res){
    GroupSchema.findOne({'_id' : req.body._id}, function (err, doc){
        if (err) res.status(401).json(err)

        res.status(201).json(doc)
    })
}

module.exports.get_all = function(req, res){
    var data = []

    GroupSchema.find({}, function (err, docs){
        if (err) res.status(401).json(err)

        docs.forEach(function (doc) {
            data.push(doc)
        })

        res.status(201).json(data);
    })
}