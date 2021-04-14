module.exports.rooms = async function(req, res){
    //console.log("1111111111111");
	var _role = req.body.role;
	var _id = req.body.ID;

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
			switch(_role) { 
				case 3 : { 
					con.query("SELECT *,DATE_FORMAT(room_created,'%Y-%m-%d %h:%i:%s') as room_created FROM rooms where doctor_id='"+_id+"' or therapist_id='" + _id+"'", function (err, result, fields) {
					  if(err){
						  res.status(401).json(err);
					  } else {
						  res.status(201).json(result);
					  }
					});
				  break; 
				} 
				case 4: { 
					con.query("SELECT *,DATE_FORMAT(room_created,'%Y-%m-%d %h:%i:%s') as room_created  FROM rooms where parent_id='"+_id+"'", function (err, result, fields) {
					  if(err){
						  res.status(401).json(err);
					  } else {
						  res.status(201).json(result);
					  }
					});
				  break; 
				} 
				default: { 
					con.query("SELECT *,DATE_FORMAT(room_created,'%Y-%m-%d %h:%i:%s') as room_created  FROM rooms", function (err, result, fields) {
					  if(err){
						  res.status(401).json(err);
					  } else {
						  res.status(201).json(result);
					  }
					});
				  break; 
				} 		      
			}			
			con.release()
			return
		}
	})

}

module.exports.room_search = function(req, res){
    
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
			  if (req.body.ID){
				query = " ID = '"+req.body.ID+"' "  		
			  } 
			  if (query){
				if (req.body.room_name) {
					query = query + " and room_name like '%"+req.body.room_name+"%' "  
				  }  
			  }else{
				if (req.body.room_name) {
					query = " room_name like '%"+req.body.room_name+"%' "  
				  }   
			  }
			  if (query){
				if (req.body.room_status) {
					query = query + " and room_status='"+req.body.room_status+"' "  
				  }  
			  }else{
				if (req.body.room_status) {
					query = " room_status='"+req.body.room_status+"' "  
				  }   
			  }
			  if (query){
				if (req.body.parent_id) {
					query = query + " and parent_id='"+req.body.parent_id+"' "  
				  }  
			  }else{
				if (req.body.parent_id) {
					query = " parent_id='"+req.body.parent_id+"' "  
				  }   
			  }
			  if (query){
				if (req.body.doctor_id) {
					query = query + " and doctor_id='"+req.body.doctor_id+"' "  
				  }  
			  }else{
				if (req.body.doctor_id) {
					query = " doctor_id='"+req.body.doctor_id+"' "  
				  }   
			  }
			  if (query){
				if (req.body.therapist_id) {
					query = query + " and therapist_id='"+req.body.therapist_id+"' "  
				  }  
			  }else{
				if (req.body.therapist_id) {
					query = " therapist_id='"+req.body.therapist_id+"' "  
				  }   
			  }
			  
			  if (query) {
				query = "SELECT *, DATE_FORMAT(room_created,'%Y-%m-%d %h:%i:%s') as room_created FROM rooms WHERE "+ query + " order by ID ";
			  } else {
				query = "SELECT *, DATE_FORMAT(room_created,'%Y-%m-%d %h:%i:%s') as room_created FROM rooms order by ID ";
			  }
			  con.query(query, function (err, result, fields) {
				if(err){
					console.log(err);
					res.status(401).json(err);
				} else {
					res.status(201).json(result);
				}
				return
			  });
		}
	})	
}


module.exports.room = function(req, res){
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
			con.query("SELECT *, DATE_FORMAT(room_created,'%Y-%m-%d') as room_created FROM rooms WHERE ID='"+req.body.ID+" ' ORDER BY ID", function (err, result, fields) {
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

module.exports.room_update = function(req, res){
    var query = "update rooms SET room_name='" + req.body.room_name + "', room_created='" + req.body.room_created + "', room_status='" + req.body.room_status + "', parent_id='" + req.body.parent_id + "', doctor_id='" + req.body.doctor_id + "', therapist_id='" + req.body.therapist_id + "' WHERE ID = '"+req.body.ID+"'";
	  	
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

module.exports.room_create = function(req, res){
	var query = "insert  into `rooms`(`room_name`,`room_created`,`room_updated`,`room_status`,`parent_id`,`doctor_id`,`therapist_id`) values ('"+req.body.room_name+"',CURRENT_DATE,CURRENT_DATE,'"+req.body.room_status+"','"+req.body.parent_id+"','"+req.body.doctor_id+"','"+req.body.therapist_id+"' )";
    
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

module.exports.room_delete = function(req, res){
    var query = "Delete From rooms WHERE ID IN ("+req.body.checked_rooms+")";
	
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
						query = "SELECT *,DATE_FORMAT(room_created,'%Y-%m-%d %h:%i:%s') as room_created  FROM rooms";
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

module.exports.room_delete_one = function(req, res){
    var query = "Delete From rooms WHERE ID ="+req.body.ID;
	
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
						query = "SELECT *,DATE_FORMAT(room_created,'%Y-%m-%d %h:%i:%s') as room_created  FROM rooms";
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
