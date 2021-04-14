module.exports.conversations = function(req, res){
	
    var room_id = req.body.room_id;
	var sub_room_id = req.body.sub_id;
	var _id = req.body.user_id;
	var role = req.body.role;
	var query = ""
	
	globalPool.getConnection((err, con) => {
		if (err) {
			if (err.code === 'PROTOCOL_CONNECTION_LOST') {
				console.error('Database connection was closed.')
			}
			if (err.code === 'ER_CON_COUNT_ERROR') {
				console.error('Database has too many connections.')
			}
			if (err.code === 'ECONNREFUSED') {
				console.error('Database connection was refused.')
			}
		} else if (con) {
			switch(role) { 
				case 3: { 
					query = "select p.*,week( MAKEDATE(year(now()),1)) as first_week, week(p.post_date,1) as week, DAYOFWEEK(p.post_date) as day_of_week from posts as p Where p.room_id = '"+room_id+"' and sub_room_id ='"+sub_room_id+"' and p.room_id in (select rooms.id  from rooms where rooms.doctor_id='"+_id+"' or rooms.therapist_id='" + _id + "')  order by p.post_date asc"
					con.query(query, function (err, result, fields) {
					  if(err){
						  res.status(401).json(err);
					  } else {
						  res.status(201).json(result);
					  }
					});
				  break;
				} 
				case 4: { 
					query = "select p.*,week( MAKEDATE(year(now()),1)) as first_week, week(p.post_date,1) as week, DAYOFWEEK(p.post_date) as day_of_week from posts as p Where p.room_id = '"+room_id+"' and sub_room_id ='"+sub_room_id+"' and p.room_id in (select rooms.id  from rooms where rooms.parent_id='"+_id+"')  order by p.post_date asc"
					 con.query(query, function (err, result, fields) {
					  if(err){
						  res.status(401).json(err);
					  } else {					
						  res.status(201).json(result);
					  }
					});
				  break; 
				} 
				case 1:case 2: { 
					query = "select p.*,week( MAKEDATE(year(now()),1)) as first_week, week(p.post_date,1) as week, DAYOFWEEK(p.post_date) as day_of_week from posts as p Where p.room_id = '"+room_id+"' and sub_room_id ='"+sub_room_id+"' order by p.post_date asc"
					con.query(query, function (err, result, fields) {
					  if(err){
						  res.status(401).json(err);
					  } else {
						  res.status(201).json(result);
					  }
					});
				  break; 
				} 
				default : {
					res.status(201).json(role);
				}
			}
			con.release()
			return
		}
	})	

}

module.exports.days = function(req, res){
	
    var room_id = req.body.room_id;
	var sub_room_id = req.body.sub_id;
	var _id = req.body.user_id;
	var role = req.body.role;
	var query = ""
	
	globalPool.getConnection((err, con) => {
		if (err) {
			if (err.code === 'PROTOCOL_CONNECTION_LOST') {
				console.error('Database connection was closed.')
			}
			if (err.code === 'ER_CON_COUNT_ERROR') {
				console.error('Database has too many connections.')
			}
			if (err.code === 'ECONNREFUSED') {
				console.error('Database connection was refused.')
			}
		} else if (con) {
			switch(role) { 
				case 3: { 
					query = "select week(p.post_date,1) as week, DAYOFWEEK(p.post_date) as day_of_week, count(DAYOFWEEK(p.post_date)) as number_of_day, DAYOFWEEK(p.post_date) as temp from posts as p Where p.room_id = '"+room_id+"' and sub_room_id ='"+sub_room_id+"' and p.room_id in (select rooms.id  from users, rooms where rooms.doctor_id='"+_id+"' or rooms.therapist_id='" + _id + "') group by week(p.post_date,1),DAYOFWEEK(p.post_date) order by week(p.post_date,1),DAYOFWEEK(p.post_date)"
					con.query(query, function (err, result, fields) {
					  if(err){
						  res.status(401).json(err);
					  } else {
						  res.status(201).json(result);
					  }
					});
				  break;
				} 
				case 4: { 
					query = "select week(p.post_date,1) as week, DAYOFWEEK(p.post_date) as day_of_week, count(DAYOFWEEK(p.post_date)) as number_of_day, DAYOFWEEK(p.post_date) as temp from posts as p Where p.room_id = '"+room_id+"' and sub_room_id ='"+sub_room_id+"' and p.room_id in (select rooms.id  from users, rooms where rooms.parent_id='"+_id+"')  group by week(p.post_date,1),DAYOFWEEK(p.post_date) order by week(p.post_date,1),DAYOFWEEK(p.post_date)"
					 con.query(query, function (err, result, fields) {
					  if(err){
						  res.status(401).json(err);
					  } else {
						  res.status(201).json(result);
					  }
					});
				  break; 
				} 
				case 1: case 2: { 
					query = "select week(p.post_date,1) as week, DAYOFWEEK(p.post_date) as day_of_week, count(DAYOFWEEK(p.post_date)) as number_of_day, DAYOFWEEK(p.post_date) as temp  from posts as p Where p.room_id = '"+room_id+"' and sub_room_id ='"+sub_room_id+"' group by week(p.post_date,1),DAYOFWEEK(p.post_date) order by week(p.post_date,1),DAYOFWEEK(p.post_date)"
					con.query(query, function (err, result, fields) {
					  if(err){
						  res.status(401).json(err);
					  } else {
						  res.status(201).json(result);
					  }
					});
				  break; 
				}
				default : {
					res.status(201).json(role);
				}				
			}
			con.release()
			return
		}
	})	

}

module.exports.weeks = function(req, res){
	
    var room_id = req.body.room_id;
	var sub_room_id = req.body.sub_id;
	var _id = req.body.user_id;
	var role = req.body.role;
	var query = ""
	
	globalPool.getConnection((err, con) => {
		if (err) {
			if (err.code === 'PROTOCOL_CONNECTION_LOST') {
				console.error('Database connection was closed.')
			}
			if (err.code === 'ER_CON_COUNT_ERROR') {
				console.error('Database has too many connections.')
			}
			if (err.code === 'ECONNREFUSED') {
				console.error('Database connection was refused.')
			}
		} else if (con) {
			switch(role) { 
				case 3: { 
					query = "select week(p.post_date,1) as week, count(post_date) as number_of_week, week(p.post_date,1) as temp from posts as p Where p.room_id = '"+room_id+"' and sub_room_id ='"+sub_room_id+"' and p.room_id in (select rooms.id  from users, rooms where rooms.doctor_id='"+_id+"' or rooms.therapist_id='" + _id + "') group by week(p.post_date,1) order by week(p.post_date,1)"
					con.query(query, function (err, result, fields) {
					  if(err){
						  res.status(401).json(err);
					  } else {
						  res.status(201).json(result);
					  }
					});
				  break;
				} 
				case 4: { 
					query = "select week(p.post_date,1) as week, count(post_date) as number_of_week, week(p.post_date,1) as temp from posts as p Where p.room_id = '"+room_id+"' and sub_room_id ='"+sub_room_id+"' and p.room_id in (select rooms.id  from users, rooms where rooms.parent_id='"+_id+"')  group by week(p.post_date,1) order by week(p.post_date,1)"
					 con.query(query, function (err, result, fields) {
					  if(err){
						  res.status(401).json(err);
					  } else {
						  res.status(201).json(result);
					  }
					});
				  break; 
				} 
				case 1: case 2:{ 
					query = "select week(p.post_date,1) as week, count(post_date) as number_of_week, week(p.post_date,1) as temp from posts as p Where p.room_id = '"+room_id+"' and sub_room_id ='"+sub_room_id+"' group by week(p.post_date,1) order by week(p.post_date,1)"
					con.query(query, function (err, result, fields) {
					  if(err){
						  res.status(401).json(err);
					  } else {
						  res.status(201).json(result);
					  }
					});
				  break; 
				} 
				default : {
					res.status(201).json(role);
				}				
			}
			con.release()
			return
		}
	})		

}

module.exports.comments = function(req, res){
	
    var post_id = req.body.post_id;
	var query = ""
	
	globalPool.getConnection((err, con) => {
		if (err) {
			if (err.code === 'PROTOCOL_CONNECTION_LOST') {
				console.error('Database connection was closed.')
			}
			if (err.code === 'ER_CON_COUNT_ERROR') {
				console.error('Database has too many connections.')
			}
			if (err.code === 'ECONNREFUSED') {
				console.error('Database connection was refused.')
			}
		} else if (con) {
			query = "select c.* from comments as c where c.comment_post_ID in ("+post_id+") order by comment_date asc"
			con.query(query, function (err, result, fields) {
				if(err){
					res.status(401).json(err);
				} else {
					res.status(201).json(result);
				}
			});
			con.release()
			return
		}
	})	
	
}

module.exports.post_all = function(req, res){
	
    var query = "select *, DATE_FORMAT(post_date,'%Y-%m-%d %h:%i:%s') as post_date from posts order by post_date asc";
	
	globalPool.getConnection((err, con) => {
		if (err) {
			if (err.code === 'PROTOCOL_CONNECTION_LOST') {
				console.error('Database connection was closed.')
			}
			if (err.code === 'ER_CON_COUNT_ERROR') {
				console.error('Database has too many connections.')
			}
			if (err.code === 'ECONNREFUSED') {
				console.error('Database connection was refused.')
			}
		} else if (con) {
			con.query(query, function (err, result, fields) {
				if(err){
					res.status(401).json(err);
				} else {
					res.status(201).json(result);
				}
			  });
			con.release()
			return
		}
	})	
	
}

module.exports.post_search = function(req, res){
	var query = ""	
	  if (req.body.ID){
		query = " ID = '"+req.body.ID+"' "  		
	  } 
	  if (query){
		if (req.body.post_content) {
			query = query + " and post_content like '%"+req.body.post_content+"%' "  
		  }  
	  }else{
		if (req.body.post_content) {
			query = " post_content like '%"+req.body.post_content+"%' "  
		  }   
	  }
	  if (query){
		if (req.body.room_id) {
			query = query + " and room_id='"+req.body.room_id+"' "  
		  }  
	  }else{
		if (req.body.room_id) {
			query = " room_id='"+req.body.room_id+"' "  
		  }   
	  }
	  if (query){
		if (req.body.sub_room_id) {
			query = query + " and sub_room_id='"+req.body.sub_room_id+"' "  
		  }  
	  }else{
		if (req.body.sub_room_id) {
			query = " sub_room_id='"+req.body.sub_room_id+"' "  
		  }   
	  }
	  if (query){
		if (req.body.post_author) {
			query = query + " and post_author='"+req.body.post_author+"' "  
		  }  
	  }else{
		if (req.body.post_author) {
			query = " post_author='"+req.body.post_author+"' "  
		  }   
	  }
	  if (query){
		if (req.body.post_status) {
			query = query + " and post_status='"+req.body.post_status+"' "  
		  }  
	  }else{
		if (req.body.post_status) {
			query = " post_status='"+req.body.post_status+"' "  
		  }   
	  }
	  
	  if (query) {
		query = "SELECT *, DATE_FORMAT(post_date,'%Y-%m-%d %h:%i:%s') as post_date FROM posts WHERE "+ query + " order by ID ";
	  } else {
		query = "SELECT *, DATE_FORMAT(post_date,'%Y-%m-%d %h:%i:%s') as post_date FROM posts order by ID ";
	  }

    globalPool.getConnection((err, con) => {
		if (err) {
			if (err.code === 'PROTOCOL_CONNECTION_LOST') {
				console.error('Database connection was closed.')
			}
			if (err.code === 'ER_CON_COUNT_ERROR') {
				console.error('Database has too many connections.')
			}
			if (err.code === 'ECONNREFUSED') {
				console.error('Database connection was refused.')
			}
		} else if (con) {
			con.query(query, function (err, result, fields) {
				if(err){
					console.log(err);
					res.status(401).json(err);
				} else {
					res.status(201).json(result);
				}
			  });
			con.release()
			return
		}
	})		
		
}

module.exports.post = function(req, res){
    globalPool.getConnection((err, con) => {
		if (err) {
			if (err.code === 'PROTOCOL_CONNECTION_LOST') {
				console.error('Database connection was closed.')
			}
			if (err.code === 'ER_CON_COUNT_ERROR') {
				console.error('Database has too many connections.')
			}
			if (err.code === 'ECONNREFUSED') {
				console.error('Database connection was refused.')
			}
		} else if (con) {
			con.query("SELECT *, DATE_FORMAT(post_date,'%Y-%m-%d') as post_date FROM posts WHERE ID='"+req.body.ID+" ' ORDER BY ID", function (err, result, fields) {
				if(err){
					res.status(401).json(err);
				} else {
					res.status(201).json(result);
				}
			  });
			con.release()
			return
		}
	})	
	
}

module.exports.post_update = function(req, res){
    var query = "update posts SET room_id='" + req.body.room_id + "', sub_room_id='" + req.body.sub_room_id + "', tab_id='" + req.body.tab_id + "', post_author='" + req.body.post_author + "', post_date='" + req.body.post_date + "', post_content='" + req.body.post_content + "', post_status='" + req.body.post_status + "' WHERE ID = '"+req.body.ID+"'";
	  	
	globalPool.getConnection((err, con) => {
		if (err) {
			if (err.code === 'PROTOCOL_CONNECTION_LOST') {
				console.error('Database connection was closed.')
			}
			if (err.code === 'ER_CON_COUNT_ERROR') {
				console.error('Database has too many connections.')
			}
			if (err.code === 'ECONNREFUSED') {
				console.error('Database connection was refused.')
			}
		} else if (con) {
			con.query(query, function (err, result, fields) {
				if(err){
					res.status(401).json(err);
				} else {
					res.status(201).json(result);
				}
			  });
			con.release()
			return
		}
	})	
	
}

module.exports.post_create = function(req, res){
    var query = "insert  into `posts`(`room_id`, `sub_room_id`, `tab_id`, `post_author`, `post_date`, `post_content`,`post_status`) values ('"+req.body.room_id+"','"+req.body.sub_room_id+"','"+req.body.tab_id+"','"+req.body.post_author+"',now(),'"+req.body.post_content+"','"+req.body.post_status+"' )";
	  	
	globalPool.getConnection((err, con) => {
		if (err) {
			if (err.code === 'PROTOCOL_CONNECTION_LOST') {
				console.error('Database connection was closed.')
			}
			if (err.code === 'ER_CON_COUNT_ERROR') {
				console.error('Database has too many connections.')
			}
			if (err.code === 'ECONNREFUSED') {
				console.error('Database connection was refused.')
			}
		} else if (con) {
			con.query(query, function (err, result, fields) {
				if(err){
					res.status(401).json(err);
				} else {
					res.status(201).json(result);
				}
			  });
			con.release()
			return
		}
	})		
	
}

module.exports.post_delete = function(req, res){
    var query = "Delete From posts WHERE ID IN ("+req.body.checked_posts+")";
	
	globalPool.getConnection((err, con) => {
		if (err) {
			if (err.code === 'PROTOCOL_CONNECTION_LOST') {
				console.error('Database connection was closed.')
			}
			if (err.code === 'ER_CON_COUNT_ERROR') {
				console.error('Database has too many connections.')
			}
			if (err.code === 'ECONNREFUSED') {
				console.error('Database connection was refused.')
			}
		} else if (con) {
			con.query(query, function (err, result, fields) {
				if(err){
					res.status(401).json(err);
				} else {
					if (result.affectedRows != 0){
						query = "SELECT *,DATE_FORMAT(post_date,'%Y-%m-%d %h:%i:%s') as post_date  FROM posts";
						con.query(query, function (err, result, fields) {
						if(err){
							res.status(401).json(err);
						} else {
							res.status(201).json(result);
						}
					  });
					}
				}
			  });
			con.release()
			return
		}
	})
}

module.exports.post_delete_one = function(req, res){
    var query = "Delete From posts WHERE ID ="+req.body.ID;
	
	globalPool.getConnection((err, con) => {
		if (err) {
			if (err.code === 'PROTOCOL_CONNECTION_LOST') {
				console.error('Database connection was closed.')
			}
			if (err.code === 'ER_CON_COUNT_ERROR') {
				console.error('Database has too many connections.')
			}
			if (err.code === 'ECONNREFUSED') {
				console.error('Database connection was refused.')
			}
		} else if (con) {
			con.query(query, function (err, result, fields) {
				if(err){
					res.status(401).json(err);
				} else {
					if (result.affectedRows != 0){
						query = "SELECT *,DATE_FORMAT(post_date,'%Y-%m-%d %h:%i:%s') as post_date  FROM posts";
						con.query(query, function (err, result, fields) {
						if(err){
							res.status(401).json(err);
						} else {
							res.status(201).json(result);
						}
					  });
					}
				}
			  });
			con.release()
			return
		}
	})	
	
}

module.exports.comment_add = function(req, res){
	
    var comment_post_ID = req.body.comment_post_ID;
	var comment = req.body.comment
	var user_id = req.body.user_id
	var query = ""
	
	globalPool.getConnection((err, con) => {
		if (err) {
			if (err.code === 'PROTOCOL_CONNECTION_LOST') {
				console.error('Database connection was closed.')
			}
			if (err.code === 'ER_CON_COUNT_ERROR') {
				console.error('Database has too many connections.')
			}
			if (err.code === 'ECONNREFUSED') {
				console.error('Database connection was refused.')
			}
		} else if (con) {
			query = "insert  into `comments`(`comment_post_ID`,`comment_author_ID`,`comment_date`,`comment_content`,`comment_approved`) values ('"+comment_post_ID+"','"+user_id+"', now(), '"+comment+"', 1)"
			con.query(query, function (err, result, fields) {
				if(err){
					res.status(401).json(err);
				} else {
					res.status(201).json(result);
				}
			});
			con.release()
			return
		}
	})	

}

module.exports.reply_add = function(req, res){
	
    var comment_post_ID = req.body.comment_post_ID;
	var comment_parent = req.body.comment_parent;
	var reply = req.body.reply
	var user_id = req.body.user_id
	var query = ""
	
	globalPool.getConnection((err, con) => {
		if (err) {
			if (err.code === 'PROTOCOL_CONNECTION_LOST') {
				console.error('Database connection was closed.')
			}
			if (err.code === 'ER_CON_COUNT_ERROR') {
				console.error('Database has too many connections.')
			}
			if (err.code === 'ECONNREFUSED') {
				console.error('Database connection was refused.')
			}
		} else if (con) {
			query = "insert  into `comments`(`comment_post_ID`,`comment_author_ID`,`comment_date`,`comment_content`,`comment_approved`,`comment_type`,`comment_parent`) values ('"+comment_post_ID+"','"+user_id+"', now(), '"+reply+"',1,1,'"+comment_parent+"')"
			con.query(query, function (err, result, fields) {
				if(err){
					res.status(401).json(err);
				} else {
					res.status(201).json(result);
				}
			});
			con.release()
			return
		}
	})	

}

module.exports.comment_all = function(req, res){
	
    var query = "select *, DATE_FORMAT(comment_date,'%Y-%m-%d %h:%i:%s') as comment_date from comments order by comment_date asc";
	
	globalPool.getConnection((err, con) => {
		if (err) {
			if (err.code === 'PROTOCOL_CONNECTION_LOST') {
				console.error('Database connection was closed.')
			}
			if (err.code === 'ER_CON_COUNT_ERROR') {
				console.error('Database has too many connections.')
			}
			if (err.code === 'ECONNREFUSED') {
				console.error('Database connection was refused.')
			}
		} else if (con) {
			con.query(query, function (err, result, fields) {
				if(err){
					res.status(401).json(err);
				} else {
					res.status(201).json(result);
				}
			  });
			con.release()
			return
		}
	})	

}

module.exports.comment_search = function(req, res){
	
    var query = ""	
	
	  if (req.body.comment_post_ID){
		query = " comment_post_ID = '"+req.body.comment_post_ID+"' "  		
	  } 
	  if (query){
		if (req.body.comment_content) {
			query = query + " and comment_content like '%"+req.body.comment_content+"%' "  
		  }  
	  }else{
		if (req.body.comment_content) {
			query = " comment_content like '%"+req.body.comment_content+"%' "  
		  }   
	  }
	  if (query){
		if (req.body.comment_type) {
			query = query + " and comment_type='"+req.body.comment_type+"' "  
		  }  
	  }else{
		if (req.body.comment_type) {
			query = " comment_type='"+req.body.comment_type+"' "  
		  }   
	  }
	  if (query){
		if (req.body.comment_approved) {
			query = query + " and comment_approved='"+req.body.comment_approved+"' "  
		  }  
	  }else{
		if (req.body.comment_approved) {
			query = " comment_approved='"+req.body.comment_approved+"' "  
		  }   
	  }
	  
	  if (query) {
		query = "SELECT *, DATE_FORMAT(comment_date,'%Y-%m-%d %h:%i:%s') as comment_date FROM comments WHERE "+ query + " order by ID ";
	  } else {
		query = "SELECT *, DATE_FORMAT(comment_date,'%Y-%m-%d %h:%i:%s') as comment_date FROM comments order by ID ";
	  }

	globalPool.getConnection((err, con) => {
		if (err) {
			if (err.code === 'PROTOCOL_CONNECTION_LOST') {
				console.error('Database connection was closed.')
			}
			if (err.code === 'ER_CON_COUNT_ERROR') {
				console.error('Database has too many connections.')
			}
			if (err.code === 'ECONNREFUSED') {
				console.error('Database connection was refused.')
			}
		} else if (con) {
			con.query(query, function (err, result, fields) {
				if(err){
					console.log(err);
					res.status(401).json(err);
				} else {
					res.status(201).json(result);
				}
			  });
			con.release()
			return
		}
	})	
}

module.exports.comment = function(req, res){
    globalPool.getConnection((err, con) => {
		if (err) {
			if (err.code === 'PROTOCOL_CONNECTION_LOST') {
				console.error('Database connection was closed.')
			}
			if (err.code === 'ER_CON_COUNT_ERROR') {
				console.error('Database has too many connections.')
			}
			if (err.code === 'ECONNREFUSED') {
				console.error('Database connection was refused.')
			}
		} else if (con) {
			con.query("SELECT *, DATE_FORMAT(comment_date,'%Y-%m-%d') as comment_date FROM comments WHERE ID='"+req.body.ID+" ' ORDER BY ID", function (err, result, fields) {
				if(err){
					res.status(401).json(err);
				} else {
					res.status(201).json(result);
				}
			  });
			con.release()
			return
		}
	})	

}

module.exports.comment_update = function(req, res){
    var query = "update comments SET comment_post_ID='" + req.body.comment_post_ID + "', comment_author_ID='" + req.body.comment_author_ID + "', comment_date='" + req.body.comment_date + "', comment_content='" + req.body.comment_content + "', comment_approved='" + req.body.comment_approved + "', comment_type='" + req.body.comment_type + "', comment_parent='" + req.body.comment_parent + "' WHERE ID = '"+req.body.ID+"'";
	  	
	globalPool.getConnection((err, con) => {
		if (err) {
			if (err.code === 'PROTOCOL_CONNECTION_LOST') {
				console.error('Database connection was closed.')
			}
			if (err.code === 'ER_CON_COUNT_ERROR') {
				console.error('Database has too many connections.')
			}
			if (err.code === 'ECONNREFUSED') {
				console.error('Database connection was refused.')
			}
		} else if (con) {
			con.query(query, function (err, result, fields) {
				if(err){
					res.status(401).json(err);
				} else {
					res.status(201).json(result);
				}
			  });
			con.release()
			return
		}
	})		
	
}

module.exports.comment_create = function(req, res){
    var query = "insert  into `comments`(`comment_post_ID`, `comment_author_ID`, `comment_content`, `comment_approved`, `comment_date`, `comment_type`,`comment_parent`) values ('"+req.body.comment_post_ID+"','"+req.body.comment_author_ID+"','"+req.body.comment_content+"','"+req.body.comment_approved+"',now(),'"+req.body.comment_type+"','"+req.body.comment_parent+"' )";
	
	globalPool.getConnection((err, con) => {
		if (err) {
			if (err.code === 'PROTOCOL_CONNECTION_LOST') {
				console.error('Database connection was closed.')
			}
			if (err.code === 'ER_CON_COUNT_ERROR') {
				console.error('Database has too many connections.')
			}
			if (err.code === 'ECONNREFUSED') {
				console.error('Database connection was refused.')
			}
		} else if (con) {
			con.query(query, function (err, result, fields) {
				if(err){
					res.status(401).json(err);
				} else {
					res.status(201).json(result);
				}
			  });
			con.release()
			return
		}
	})	
		
}

module.exports.comment_delete = function(req, res){
    var query = "Delete From comments WHERE ID IN ("+req.body.checked_comments+") or comment_parent IN (" + req.body.checked_comments+")";
	
	globalPool.getConnection((err, con) => {
		if (err) {
			if (err.code === 'PROTOCOL_CONNECTION_LOST') {
				console.error('Database connection was closed.')
			}
			if (err.code === 'ER_CON_COUNT_ERROR') {
				console.error('Database has too many connections.')
			}
			if (err.code === 'ECONNREFUSED') {
				console.error('Database connection was refused.')
			}
		} else if (con) {
			con.query(query, function (err, result, fields) {
				if(err){
					res.status(401).json(err);
				} else {
					if (result.affectedRows != 0){
						query = "SELECT *,DATE_FORMAT(comment_date,'%Y-%m-%d %h:%i:%s') as comment_date  FROM comments";
						con.query(query, function (err, result, fields) {
						if(err){
							res.status(401).json(err);
						} else {
							res.status(201).json(result);
						}
					  });
					}
				}
			  });
			con.release()
			return
		}
	})
}

module.exports.comment_delete_one = function(req, res){
    var query = "Delete From comments WHERE ID ="+req.body.ID +" or comment_parent =" + req.body.ID;
	
	globalPool.getConnection((err, con) => {
		if (err) {
			if (err.code === 'PROTOCOL_CONNECTION_LOST') {
				console.error('Database connection was closed.')
			}
			if (err.code === 'ER_CON_COUNT_ERROR') {
				console.error('Database has too many connections.')
			}
			if (err.code === 'ECONNREFUSED') {
				console.error('Database connection was refused.')
			}
		} else if (con) {
			con.query(query, function (err, result, fields) {
				if(err){
					res.status(401).json(err);
				} else {
					if (result.affectedRows != 0){
						query = "SELECT *,DATE_FORMAT(comment_date,'%Y-%m-%d %h:%i:%s') as comment_date  FROM comments";
						con.query(query, function (err, result, fields) {
						if(err){
							res.status(401).json(err);
						} else {
							res.status(201).json(result);
						}
					  });
					}
				}
			});
			con.release()
			return
		}
	})
}

module.exports.comment_delete_front = function(req, res){
    var query = "Delete From comments WHERE ID ="+req.body.ID +" or comment_parent =" + req.body.ID;
	
	globalPool.getConnection((err, con) => {
		if (err) {
			if (err.code === 'PROTOCOL_CONNECTION_LOST') {
				console.error('Database connection was closed.')
			}
			if (err.code === 'ER_CON_COUNT_ERROR') {
				console.error('Database has too many connections.')
			}
			if (err.code === 'ECONNREFUSED') {
				console.error('Database connection was refused.')
			}
		} else if (con) {
			con.query(query, function (err, result, fields) {
				if(err){
					res.status(401).json(err);
				} else {
					res.status(201).json(result);
				}
			  });
			con.release()
			return
		}
	})	
	
}