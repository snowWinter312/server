module.exports.auth = async function(req, res){
	var _username = req.body.username;
    var _password = req.body.password;

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
			con.query("SELECT * FROM users where user_status = 1 and username='"+_username+"' and password='" + _password + "'", function (err, result, fields) {
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

module.exports.register = async function(req, res){

	var _username = req.body.username;
    var _password = req.body.password;
	var _email = req.body.email;
	var _user_activation_key = req.body.user_activation_key
	
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
			var insertQuery = "insert  into `users`(`username`,`password`,`email`,`user_registered`,`user_activation_key`) values ('"+_username+"','"+_password+"','"+_email+"', now(), '" +_user_activation_key+ "')";
	  
			con.query("SELECT username FROM users where username='"+_username+"'", function (err, result, fields) {
				if(err){
					res.status(401).json(err);
					return;
				} else {
					if (result.length == 0){
						con.query("SELECT email FROM users where email='" + _email + "'", function (err, result, fields) {
							if(err){
								res.status(401).json(err);
							} else {
								if (result.length == 0){
									con.query(insertQuery, function (err, result, fields) {
										if(err){
											res.status(401).json(err);
										} else {
											res.status(201).json(result);
										}
									});
								} else {
									res.status(201).json(result);
								}	
							}
						});
					} else {
						res.status(201).json(result);
					}
				}	
			});
			con.release()
			return
		}
	})	
		
}

module.exports.confirm = async function(req, res){
    var _user_activation_key = req.body.user_activation_key;
		
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
			con.query("update users SET confirm_status=1, user_confirmed = now() WHERE user_activation_key='"+_user_activation_key+"'", function (err, result, fields) {
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

module.exports.password = async function(req, res){
    
	var _email = req.body.email;
	
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
			con.query("SELECT * FROM users where email='" + _email + "'", function (err, result, fields) {
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

module.exports.changing = async function(req, res){
    var _password = req.body.password;
	var _user_activation_key = req.body.user_activation_key;	
		
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
			con.query("update users SET password='" + _password + "' WHERE user_activation_key = '"+_user_activation_key+"'", function (err, result, fields) {
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

module.exports.users = function(req, res){
    
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
			con.query("SELECT *, DATE_FORMAT(user_registered,'%Y-%m-%d') as registered, DATE_FORMAT(user_confirmed, '%Y-%m-%d') as confirmed FROM users ORDER BY ID", function (err, result, fields) {
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

module.exports.search = function(req, res){
    
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
			if (req.body.username){
				query = " username like '%"+req.body.username+"%' "  		
			  } 
			  if (query){
				if (req.body.role) {
					query = query + " and role='"+req.body.role+"' "  
				  }  
			  }else{
				if (req.body.role) {
					query = " role='"+req.body.role+"' "  
				  }   
			  }
			  if (query){
				if (req.body.confirm_status) {
					query = query + " and confirm_status='"+req.body.confirm_status+"' "  
				  }  
			  }else{
				if (req.body.confirm_status) {
					query = " confirm_status='"+req.body.confirm_status+"' "  
				  }   
			  }
			  if (query){
				if (req.body.user_status) {
					query = query + " and user_status='"+req.body.user_status+"' "  
				  }  
			  }else{
				if (req.body.user_status) {
					query = " user_status='"+req.body.user_status+"' "  
				  }   
			  }
			  
			  if (query) {
				query = "SELECT *, DATE_FORMAT(user_registered,'%Y-%m-%d') as registered, DATE_FORMAT(user_confirmed, '%Y-%m-%d') as confirmed FROM users WHERE "+ query + " order by ID ";
			  } else {
				query =  query = "SELECT *, DATE_FORMAT(user_registered,'%Y-%m-%d') as registered, DATE_FORMAT(user_confirmed, '%Y-%m-%d') as confirmed FROM users order by ID ";
			  }
			  
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

module.exports.user = function(req, res){
    var user_id = req.body.ID
	
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
			con.query("SELECT *, DATE_FORMAT(user_registered,'%Y-%m-%d') as registered, DATE_FORMAT(user_confirmed, '%Y-%m-%d') as confirmed FROM users WHERE ID='"+user_id+" ' ORDER BY ID", function (err, result, fields) {
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

module.exports.update = function(req, res){
    
	var query = "update users SET username='" + req.body.username + "', email='" + req.body.email + "', user_registered='" + req.body.user_registered + "', user_confirmed='" + req.body.user_confirmed + "', role='" + req.body.role + "', group_level='" + req.body.group_level + "', confirm_status='" + req.body.confirm_status + "', user_status='" + req.body.user_status + "' WHERE ID = '"+req.body.ID+"'";
		
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

module.exports.create = function(req, res){
    
	var query = "insert  into `users`(`username`, `password`, `email`, `user_registered`,`user_confirmed`,`role`,`group_level`,`confirm_status`,`user_status`) values ('"+req.body.username+"','"+req.body.password+"','"+req.body.email+"',CURRENT_DATE,CURRENT_DATE,'"+req.body.role+"','"+req.body.group_level+"','"+req.body.confirm_status+"','"+req.body.user_status+"' )";
	
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

module.exports.delete_all = function(req, res){
    var query = "Delete From users WHERE ID IN ("+req.body.checked_users+")";
	
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
						query = "SELECT *,DATE_FORMAT(user_registered,'%Y-%m-%d %h:%i:%s') as registered, DATE_FORMAT(user_confirmed, '%Y-%m-%d') as confirmed  FROM users";
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

module.exports.delete_one = function(req, res){
    var query = "Delete From users WHERE ID ="+req.body.ID;
	
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
						query = "SELECT *,DATE_FORMAT(user_registered,'%Y-%m-%d %h:%i:%s') as registered, DATE_FORMAT(user_confirmed, '%Y-%m-%d') as confirmed  FROM users";
						con.query(query, function (err, result, fields) {
						if(err){
							res.status(401).json(err);
						} else {
							res.status(201).json(result);
						}
						return
					  });
					}
				}
			  });
			con.release()
			return
		}
	})	
	
}
