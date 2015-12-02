//var db = require('./pghelper');
var pg = require('pg');
var connectionString = process.env.DATABASE_URL || 'postgres://test:test1234@localhost:/test';

var client = new pg.Client(connectionString);
client.connect();

//var db = "postgres://ccoenraets@localhost/belgianbeers";



exports.findAllSongs = function (req, res, next) {
    var results = [];

    // Get a Postgres client from the connection pool
    pg.connect(connectionString, function(err, client, done) {
        // Handle connection errors
        if(err) {
          done();
          console.log(err);
          return res.status(500).json({ success: false, data: err});
        }

        // SQL Query > Select Data
        var query = client.query("select * from song, artist, album, includes where artist.artist_number=includes.artist_number and album.album_number=includes.album_number and song.song_number=includes.song_number order by song.song_number;");

        // Stream results back one row at a time
        query.on('row', function(row) {
            results.push(row);
        });
        
        

        // After all data is returned, close connection and return results
        query.on('end', function() {
            done();
            return res.json(results);
        });

    });
};

exports.mostRecommended = function (req, res, next) {
    var results = [];

    // Get a Postgres client from the connection pool
    pg.connect(connectionString, function(err, client, done) {
        // Handle connection errors
        if(err) {
          done();
          console.log(err);
          return res.status(500).json({ success: false, data: err});
        }

        // SQL Query > Select Data
        var query = client.query("select * from song, artist, album, includes where artist.artist_number=includes.artist_number and album.album_number=includes.album_number and song.song_number=includes.song_number and song.song_number in (select song_number from recommendations group by song_number order by count(username) desc) limit 10;");

        // Stream results back one row at a time
        query.on('row', function(row) {
            results.push(row);
        });
        
        

        // After all data is returned, close connection and return results
        query.on('end', function() {
            done();
            return res.json(results);
        });

    });
};

exports.mostPlayed = function (req, res, next) {
    var results = [];

    // Get a Postgres client from the connection pool
    pg.connect(connectionString, function(err, client, done) {
        // Handle connection errors
        if(err) {
          done();
          console.log(err);
          return res.status(500).json({ success: false, data: err});
        }

        // SQL Query > Select Data
        var query = client.query("select * from song, artist, album, includes where artist.artist_number=includes.artist_number and album.album_number=includes.album_number and song.song_number=includes.song_number order by times_played desc limit 10;");

        // Stream results back one row at a time
        query.on('row', function(row) {
            results.push(row);
        });
        
        

        // After all data is returned, close connection and return results
        query.on('end', function() {
            done();
            return res.json(results);
        });

    });
};

exports.searchSong = function (req, res, next) {
    var results = [];

    // Get a Postgres client from the connection pool
    pg.connect(connectionString, function(err, client, done) {
        // Handle connection errors
        if(err) {
          done();
          console.log(err);
          return res.status(500).json({ success: false, data: err});
        }

        // SQL Query > Select Data
        var query = client.query("select * from song, artist, album, includes where artist.artist_number=includes.artist_number and album.album_number=includes.album_number and song.song_number=includes.song_number and lower(song.song_title) like '%"+req.params.title+"%';");

        // Stream results back one row at a time
        query.on('row', function(row) {
            results.push(row);
        });
        
        

        // After all data is returned, close connection and return results
        query.on('end', function() {
            done();
            return res.json(results);
        });

    });
};
exports.searchArtist = function (req, res, next) {
    var results = [];

    // Get a Postgres client from the connection pool
    pg.connect(connectionString, function(err, client, done) {
        // Handle connection errors
        if(err) {
          done();
          console.log(err);
          return res.status(500).json({ success: false, data: err});
        }

        // SQL Query > Select Data
        var query = client.query("select * from artist where lower(artist_name) like '%"+req.params.name+"%';");

        // Stream results back one row at a time
        query.on('row', function(row) {
            results.push(row);
        });
        
        

        // After all data is returned, close connection and return results
        query.on('end', function() {
            done();
            return res.json(results);
        });

    });
};

exports.getArtistSongs = function (req, res, next) {
    var results = [];

    // Get a Postgres client from the connection pool
    pg.connect(connectionString, function(err, client, done) {
        if(err) {
          done();
          console.log(err);
          return res.status(500).json({ success: false, data: err});
        }

        var query = client.query("select * from song, artist, album, includes where artist.artist_number=includes.artist_number and album.album_number=includes.album_number and song.song_number=includes.song_number and artist.artist_number="+req.params.number+";");

        query.on('row', function(row) {
            results.push(row);
        });
        
        

        // After all data is returned, close connection and return results
        query.on('end', function() {
            done();
            return res.json(results);
        });

    });
};

exports.findAllArtists = function (req, res, next) {
    var results = [];

    // Get a Postgres client from the connection pool
    pg.connect(connectionString, function(err, client, done) {
        // Handle connection errors
        if(err) {
          done();
          console.log(err);
          return res.status(500).json({ success: false, data: err});
        }

        // SQL Query > Select Data
        var query = client.query("SELECT * FROM artist ORDER BY artist_number ASC;");

        // Stream results back one row at a time
        query.on('row', function(row) {
            results.push(row);
        });
        
        

        // After all data is returned, close connection and return results
        query.on('end', function() {
            done();
            return res.json(results);
        });

    });
};

exports.findAllAlbums = function (req, res, next) {
    var results = [];

    // Get a Postgres client from the connection pool
    pg.connect(connectionString, function(err, client, done) {
        // Handle connection errors
        if(err) {
          done();
          console.log(err);
          return res.status(500).json({ success: false, data: err});
        }

        // SQL Query > Select Data
        var query = client.query("SELECT * FROM album ORDER BY album_number ASC;");

        // Stream results back one row at a time
        query.on('row', function(row) {
            results.push(row);
        });
        
        

        // After all data is returned, close connection and return results
        query.on('end', function() {
            done();
            return res.json(results);
        });

    });
};

exports.findAlbum = function (req, res, next) {
    var results = [];

    // Get a Postgres client from the connection pool
    pg.connect(connectionString, function(err, client, done) {
        // Handle connection errors
        if(err) {
          done();
          console.log(err);
          return res.status(500).json({ success: false, data: err});
        }

        // SQL Query > Select Data
        var query = client.query("SELECT * FROM album where lower(album_title) like lower('%"+req.params.title+"%') ORDER BY album_number ASC;");

        // Stream results back one row at a time
        query.on('row', function(row) {
            results.push(row);
        });
        
        

        // After all data is returned, close connection and return results
        query.on('end', function() {
            done();
            return res.json(results);
        });

    });
};

exports.getAlbumSongs = function (req, res, next) {
    var results = [];

    // Get a Postgres client from the connection pool
    pg.connect(connectionString, function(err, client, done) {
        // Handle connection errors
        if(err) {
          done();
          console.log(err);
          return res.status(500).json({ success: false, data: err});
        }

        // SQL Query > Select Data
        var query = client.query("select * from song, artist, album, includes where artist.artist_number=includes.artist_number and album.album_number=includes.album_number and song.song_number=includes.song_number and album.album_number="+req.params.number+";");

        // Stream results back one row at a time
        query.on('row', function(row) {
            results.push(row);
        });
        
        

        // After all data is returned, close connection and return results
        query.on('end', function() {
            done();
            return res.json(results);
        });

    });
};

exports.getUser = function (req, res, next) {
    var results = [];
    
    
    // Get a Postgres client from the connection pool
    pg.connect(connectionString, function(err, client, done) {
        // Handle connection errors
        if(err) {
          done();
          console.log(err);
          return res.status(500).json({ success: false, data: err});
        }
        

        // SQL Query > Select Data
       var query = client.query("select * from user_profile, non_admin where non_admin.username='"+req.params.username+"' and user_profile.user_password='"+req.params.password+"' and non_admin.username=user_profile.username and non_admin.admin_id is not null;");
       
       //var query = client.query("select * from user_profile, non_admin where non_admin.username='perico' and user_profile.user_password='dan' and non_admin.username=user_profile.username;");

        // Stream results back one row at a time
        query.on('row', function(row) {
            
            results.push(row);
        });
        
        

        // After all data is returned, close connection and return results
        query.on('end', function() {
            done();
            return res.json(results);
        });

    });
};

exports.checkUsername = function (req, res, next) {
    var results = [];
    
    
    // Get a Postgres client from the connection pool
    pg.connect(connectionString, function(err, client, done) {
        // Handle connection errors
        if(err) {
          done();
          console.log(err);
          return res.status(500).json({ success: false, data: err});
        }
        

        // SQL Query > Select Data
       var query = client.query("select * from user_profile where username='"+req.params.username+"';");
       

       //var query = client.query("select * from user_profile, non_admin where non_admin.username='perico' and user_profile.user_password='dan' and non_admin.username=user_profile.username;");

        // Stream results back one row at a time
        query.on('row', function(row) {
            
            results.push(row);
        });
        
        

        // After all data is returned, close connection and return results
        query.on('end', function() {
            done();
            return res.json(results);
        });

    });
};

exports.getUser2 = function (req, res, next) {
    var results = [];
    
    
    // Get a Postgres client from the connection pool
    pg.connect(connectionString, function(err, client, done) {
        // Handle connection errors
        if(err) {
          done();
          console.log(err);
          return res.status(500).json({ success: false, data: err});
        }

        // SQL Query > Select Data
       var query = client.query("select * from user_profile where username='"+req.params.username+"';");
       
       //var query = client.query("select * from user_profile, non_admin where non_admin.username='perico' and user_profile.user_password='dan' and non_admin.username=user_profile.username;");

        // Stream results back one row at a time
        query.on('row', function(row) {
            
            results.push(row);
        });
        
        

        // After all data is returned, close connection and return results
        query.on('end', function() {
            done();
            return res.json(results);
        });

    });
};

exports.getApprovedUsers = function (req, res, next) {
    var results = [];
    
    
    // Get a Postgres client from the connection pool
    pg.connect(connectionString, function(err, client, done) {
        // Handle connection errors
        if(err) {
          done();
          console.log(err);
          return res.status(500).json({ success: false, data: err});
        }

        // SQL Query > Select Data
       var query = client.query("select * from user_profile, non_admin where user_profile.username=non_admin.username and non_admin.admin_id is not null order by approved_date desc;");
       
       //var query = client.query("select * from user_profile, non_admin where non_admin.username='perico' and user_profile.user_password='dan' and non_admin.username=user_profile.username;");

        // Stream results back one row at a time
        query.on('row', function(row) {
            
            results.push(row);
        });
        
        

        // After all data is returned, close connection and return results
        query.on('end', function() {
            done();
            return res.json(results);
        });

    });
};

exports.findPendingUsers = function (req, res, next) {
    var results = [];
    
   
    // Get a Postgres client from the connection pool
    pg.connect(connectionString, function(err, client, done) {
        // Handle connection errors
        if(err) {
          done();
          console.log(err);
          return res.status(500).json({ success: false, data: err});
        }

        // SQL Query > Select Data
       var query = client.query("select * from user_profile, non_admin where non_admin.username=user_profile.username and non_admin.admin_id is null;");
       
       //var query = client.query("select * from user_profile, non_admin where non_admin.username='perico' and user_profile.user_password='dan' and non_admin.username=user_profile.username;");

        // Stream results back one row at a time
        query.on('row', function(row) {
            
            results.push(row);
        });
        
        

        // After all data is returned, close connection and return results
        query.on('end', function() {
            done();
            return res.json(results);
        });

    });
};

exports.approvePendingUsers = function (req, res, next) {
    var results = [];
    
    
    // Get a Postgres client from the connection pool
    pg.connect(connectionString, function(err, client, done) {
        // Handle connection errors
        if(err) {
          done();
          console.log(err);
          return res.status(500).json({ success: false, data: err});
        }

        // SQL Query > Select Data
       var query = client.query("update non_admin set admin_id=(select admin_id from (select * from admin) as k where username='"+req.params.adminusername+"'), approved_date=now()::date where username='"+req.params.username+"';");
       
       //var query = client.query("select * from user_profile, non_admin where non_admin.username='perico' and user_profile.user_password='dan' and non_admin.username=user_profile.username;");

        // Stream results back one row at a time
        query.on('row', function(row) {
            
            results.push(row);
        });
        
        

        // After all data is returned, close connection and return results
        query.on('end', function() {
            done();
            return res.json(results);
        });

    });
};

exports.updateTimesPlayed = function (req, res, next) {
    var results = [];
    
    
    // Get a Postgres client from the connection pool
    pg.connect(connectionString, function(err, client, done) {
        // Handle connection errors
        if(err) {
          done();
          console.log(err);
          return res.status(500).json({ success: false, data: err});
        }
        console.log('hi');
        // SQL Query > Select Data
       var query = client.query("update song set times_played=times_played+1 where song_number="+req.params.number+";");
       
       //var query = client.query("select * from user_profile, non_admin where non_admin.username='perico' and user_profile.user_password='dan' and non_admin.username=user_profile.username;");

        // Stream results back one row at a time
        query.on('row', function(row) {
            
            results.push(row);
        });
        
        

        // After all data is returned, close connection and return results
        query.on('end', function() {
            done();
            return res.json(results);
        });

    });
};

exports.disapprovePendingUsers = function (req, res, next) {
    var results = [];
    
    
    // Get a Postgres client from the connection pool
    pg.connect(connectionString, function(err, client, done) {
        // Handle connection errors
        if(err) {
          done();
          console.log(err);
          return res.status(500).json({ success: false, data: err});
        }

        // SQL Query > Select Data
       var query = client.query("delete from user_profile where username='"+req.params.username+"';");
       
       //var query = client.query("select * from user_profile, non_admin where non_admin.username='perico' and user_profile.user_password='dan' and non_admin.username=user_profile.username;");

        // Stream results back one row at a time
        query.on('row', function(row) {
            
            results.push(row);
        });
        
        

        // After all data is returned, close connection and return results
        query.on('end', function() {
            done();
            return res.json(results);
        });

    });
};

exports.getAdmin = function (req, res, next) {
    var results = [];
    
    
    pg.connect(connectionString, function(err, client, done) {
        // Handle connection errors
        if(err) {
          done();
          console.log(err);
          return res.status(500).json({ success: false, data: err});
        }

        // SQL Query > Select Data
       var query = client.query("select * from user_profile, admin where admin.username='"+req.params.username+"' and user_profile.user_password='"+req.params.password+"' and admin.username=user_profile.username;");
       
       //var query = client.query("select * from user_profile, non_admin where non_admin.username='perico' and user_profile.user_password='dan' and non_admin.username=user_profile.username;");

        // Stream results back one row at a time
        query.on('row', function(row) {
            
            results.push(row);
        });
        
        

        // After all data is returned, close connection and return results
        query.on('end', function() {
            done();
            return res.json(results);
        });

    });
};
exports.addPending = function (req, res, next) {
    var results = [];
    
    
    pg.connect(connectionString, function(err, client, done) {
        // Handle connection errors
        if(err) {
          done();
          console.log(err);
          return res.status(500).json({ success: false, data: err});
        }

        // SQL Query > Select Data
       var query = client.query("insert into user_profile(username, user_password, name, email) values('"+req.params.username+"', '"+req.params.password+"', '"+req.params.name+"', '"+req.params.email+"');");
       
        // After all data is returned, close connection and return results
        query.on('end', function() {
            done();
            var query = client.query("insert into non_admin(username) values('"+req.params.username+"');");
             query.on('end', function() {
                done();
                return res.json(results);
                });
        });

    });
};

exports.addPlaylist = function (req, res, next) {
    var results = [];
    var a = req.params.genre.split(",");
    
    pg.connect(connectionString, function(err, client, done) {
        // Handle connection errors
        if(err) {
          done();
          console.log(err);
          return res.status(500).json({ success: false, data: err});
        }

        // SQL Query > Select Data
       var query = client.query("insert into playlist(playlist_title, user_name) values('"+req.params.title+"', '"+req.params.username+"');");
       
        // After all data is returned, close connection and return results
        query.on('end', function() {
            done();
        });
        
        for(i=0; i<a.length; i++){
         var query = client.query("insert into playlist_genre(playlist_number, playlist_genre) values((select playlist_number from playlist order by playlist_number desc limit 1), '"+a[i]+"');");
         query.on('end', function() {
            done();
         });
         
        }
        
        return res.json(results);

    });
};

exports.addSong = function (req, res, next) {
    var results = [];
    var results1 = [];
    var results2 = [];
    var a = req.params.genre.split(",");
    //console.log(a[0]);

    // Get a Postgres client from the connection pool
    pg.connect(connectionString, function(err, client, done) {
        // Handle connection errors
        if(err) {
          done();
          console.log(err);
          return res.status(500).json({ success: false, data: err});
        }

        // SQL Query > Select Data
        var query = client.query("insert into song(song_title) values('"+req.params.title+"');");
        query.on('end', function() {
            done();
        });
    
    var query = client.query("select * from artist where lower(artist_name)=lower('"+req.params.artist+"');");

        // Stream results back one row at a time
        query.on('row', function(row) {
            results1.push(row);
        });
        
        
        query.on('end', function() {
            done();
            console.log(results1.length);
            if (results1.length==0){
            console.log("yey!");
                var query = client.query("insert into artist(artist_name) values('"+req.params.artist+"');");
                query.on('end', function() {
                done();
            });
            }
        });
           
        
        
        var i=0;
        for(i=0; i<a.length; i++){
            var query = client.query("insert into song_genre(song_number, genre) values ((select song_number from song where song_title='"+req.params.title+"' order by song_number desc limit 1), '"+a[i]+"' );");
            query.on('end', function() {
                done();
            });
        }
        
        
        var query = client.query("select * from album where lower(album_title)=lower('"+req.params.album+"');");

        // Stream results back one row at a time
        query.on('row', function(row) {
            results2.push(row);
        });
        
        query.on('end', function() {
                done();
                if (results2.length==0){
                var query = client.query("insert into album(album_title) values('"+req.params.album+"');");
                query.on('end', function() {
                    done();
                    return res.json(results);
                });
                }else{
                    return res.json(results);
                }
                
        }); 
            
                
        
       

      

    });
    
};

exports.addSongToIncludes = function (req, res, next) {
    var results = [];
    var results1 = [];
    var results2 = [];
    
    
        
        var query = client.query("insert into includes(song_number, artist_number, album_number) values((select song_number from song where lower(song_title)=lower('"+req.params.title+"') order by song_number desc limit 1), (select artist_number from artist where lower(artist_name)=lower('"+req.params.artist+"') order by artist_number desc limit 1), (select album_number from album where lower(album_title)=lower('"+req.params.album+"') order by album_number desc limit 1));");
        
        query.on('end', function() {
            //done();
            
        });
        
        var query = client.query("select * from song, artist, album, includes where artist.artist_number=includes.artist_number and album.album_number=includes.album_number and song.song_number=includes.song_number;");

        // Stream results back one row at a time
        query.on('row', function(row) {
            results.push(row);
        });
        
        

        // After all data is returned, close connection and return results
        query.on('end', function() {
            //done();
            return res.json(results);
        });

      

   
    
};

exports.getPlaylist = function (req, res, next) {
    var results = [];

    // Get a Postgres client from the connection pool
    pg.connect(connectionString, function(err, client, done) {
        // Handle connection errors
        if(err) {
          done();
          console.log(err);
          return res.status(500).json({ success: false, data: err});
        }

        // SQL Query > Select Data
        var query = client.query("SELECT * FROM playlist where user_name='"+req.params.username+"';");

        // Stream results back one row at a time
        query.on('row', function(row) {
            results.push(row);
        });
        
        

        // After all data is returned, close connection and return results
        query.on('end', function() {
            done();
            return res.json(results);
        });

    });
};
exports.getPlaylistSongs = function (req, res, next) {
    var results = [];
    var temp = []

    // Get a Postgres client from the connection pool
    pg.connect(connectionString, function(err, client, done) {
        // Handle connection errors
        if(err) {
          done();
          console.log(err);
          return res.status(500).json({ success: false, data: err});
        }

        
    var query = client.query("select * from song, artist, album, includes where artist.artist_number=includes.artist_number and album.album_number=includes.album_number and song.song_number=includes.song_number and song.song_number in (SELECT song_number FROM belongs_in1 where playlist_number='"+req.params.number+"');");
        // Stream results back one row at a time
        query.on('row', function(row) {
            results.push(row);
            
        });
     
        
    query.on('end', function() {
        done();
        return res.json(results);
    });
    

    });
};

exports.getNotInPlaylistSongs = function (req, res, next) {
    var results = [];
    var temp = []

    // Get a Postgres client from the connection pool
    pg.connect(connectionString, function(err, client, done) {
        // Handle connection errors
        if(err) {
          done();
          console.log(err);
          return res.status(500).json({ success: false, data: err});
        }

        
    var query = client.query("select * from song, artist, album, includes where artist.artist_number=includes.artist_number and album.album_number=includes.album_number and song.song_number=includes.song_number and song.song_number not in (SELECT song_number FROM belongs_in1 where playlist_number='"+req.params.number+"');");
        // Stream results back one row at a time
        query.on('row', function(row) {
            results.push(row);
            
        });
     
        
    query.on('end', function() {
        done();
        return res.json(results);
    });
    

    });
};

exports.deletePlaylistSongs = function (req, res, next) {
    var results = [];
    var temp = []

    // Get a Postgres client from the connection pool
    pg.connect(connectionString, function(err, client, done) {
        // Handle connection errors
        if(err) {
          done();
          console.log(err);
          return res.status(500).json({ success: false, data: err});
        }

        
    var query = client.query("delete from belongs_in1 where playlist_number='"+req.params.playlistnumber+"' and song_number='"+req.params.songnumber+"';");
        // Stream results back one row at a time
        query.on('row', function(row) {
            results.push(row);
            console.log("hiiii"+temp.length);
        });
     
        
    query.on('end', function() {
        done();
        return res.json(results);
    });
    

    });
};

exports.deletePlaylist = function (req, res, next) {
    var results = [];

    // Get a Postgres client from the connection pool
    pg.connect(connectionString, function(err, client, done) {
        // Handle connection errors
        if(err) {
          done();
          console.log(err);
          return res.status(500).json({ success: false, data: err});
        }

        
    var query = client.query("delete from playlist where playlist_number="+req.params.playlistnumber+";");
        // Stream results back one row at a time
        query.on('row', function(row) {
            results.push(row);
            
        });
     
        
    query.on('end', function() {
        done();
        return res.json(results);
    });
    

    });
};

exports.addSongsToPlaylist = function (req, res, next) {
    var results = [];
    var temp = []

    // Get a Postgres client from the connection pool
    pg.connect(connectionString, function(err, client, done) {
        // Handle connection errors
        if(err) {
          done();
          console.log(err);
          return res.status(500).json({ success: false, data: err});
        }

        
    var query = client.query("insert into belongs_in1 values("+req.params.artistnumber+","+req.params.songnumber+","+req.params.playlistnumber+");");
        // Stream results back one row at a time
        query.on('row', function(row) {
            results.push(row);
            console.log("hiiii"+temp.length);
        });
     
        
    query.on('end', function() {
        done();
        return res.json(results);
    });
    

    });
};

exports.recommendSong = function (req, res, next) {
    var results = [];
    

    // Get a Postgres client from the connection pool
    pg.connect(connectionString, function(err, client, done) {
        // Handle connection errors
        if(err) {
          done();
          console.log(err);
          return res.status(500).json({ success: false, data: err});
        }

        
    var query = client.query("insert into recommendations values("+req.params.songnumber+",'"+req.params.username+"');");
        // Stream results back one row at a time
        query.on('row', function(row) {
            results.push(row);
            
        });
     
        
    query.on('end', function() {
        done();
        return res.json(results);
    });
    

    });
};

exports.getNotRecommended = function (req, res, next) {
    var results = [];
    

    // Get a Postgres client from the connection pool
    pg.connect(connectionString, function(err, client, done) {
        // Handle connection errors
        if(err) {
          done();
          console.log(err);
          return res.status(500).json({ success: false, data: err});
        }

        
    var query = client.query("select * from song, artist, album, includes where artist.artist_number=includes.artist_number and album.album_number=includes.album_number and song.song_number=includes.song_number and song.song_number not in (SELECT song_number FROM recommendations where username='"+req.params.username+"');");
        // Stream results back one row at a time
        query.on('row', function(row) {
            results.push(row);
            
        });
     
        
    query.on('end', function() {
        done();
        return res.json(results);
    });
    

    });
};

