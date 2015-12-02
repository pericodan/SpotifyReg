// index.js



var express = require('express');
var bodyParser = require('body-parser');
var connect = require('connect');
//app.use(bodyParser.urlencoded({ extended: false }))

var songs = require('./server/songs');
var app = express();
var session = require('express-session');
var multer = require('multer');
var upload = multer({ dest: './music/'});

//var username;
//var password;
//var is_admin=false;

//app.use(bodyParser.json());


//app.use(bodyParser.urlencoded({ extended: false }))
//app.use(bodyParser.json());
app.use(bodyParser.json({ type: 'application/x-www-form-urlencoded' }))
//app.use(require('connect').bodyParser());
app.set('views', __dirname + '/public');
app.engine('html', require('ejs').renderFile);
app.use(session({secret: 'ssshhhhh',saveUninitialized: true,resave: true}));

var sess;

app.get('/',function(req,res){
	sess=req.session;
	if(sess.username)
	{
		res.redirect('/home');
	}
	else{
	res.render('login.html');
	
	}
});

app.post('/login/:username/:password/:is_admin',function(req,res){
	sess=req.session;
	console.log(req.params.username);	
	sess.username=req.params.username;
	sess.password=req.params.password;
	if(req.params.is_admin==='true'){
		sess.is_admin=true;
	}
	else{
		sess.is_admin=false;
	}
	//username=req.params.username;
	//password=req.params.password;
	//res.redirect('/home');
	res.end('done');
});

app.get('/home',function(req,res){
	sess=req.session;
	if(sess.username&&sess.is_admin===false){
		res.render('index.html');
	}
	else if(sess.username&&sess.is_admin){
		res.redirect('/admin');
	}
	else{
		res.redirect('/');
	}

});

app.get('/admin',function(req,res){
	sess=req.session;
	if(sess.username&&sess.is_admin){
		res.render('admin.html');
	}
	else if(sess.username){
		res.redirect('home');
	}
	else{
		res.redirect('/');
	}

});

app.get('/logout',function(req,res){
	
	req.session.destroy(function(err){
		if(err){
			console.log(err);
		}
		else
		{
			res.redirect('/');
		}
	});

});


app.get('/getuserinfo', function(req,res){
	
	//sess=req.session;
	if(sess.username){
		res.redirect('/users/'+sess.username)	
	}
	
});

app.get('/getPlaylist', function(req,res){
	
	if(sess.username){
		res.redirect('/playlist/'+sess.username)	
	}
	
});

app.get('/notRecommended', function(req,res){
	
	if(sess.username){
		res.redirect('/notRecommended/'+sess.username)	
	}
	
});

app.get('/addRecommended/:songnumber', function(req,res){
	
	if(sess.username){
		res.redirect('/recommend/'+sess.username+'/'+req.params.songnumber)	
	}
	
});

app.post('/addPlaylist/:title/:genre', function(req,res){
	
	if(sess.username){
		res.redirect('/playlist/'+req.params.title+'/'+sess.username+'/'+req.params.genre)	
	}
	
});

app.put('/approveuser/:username', function(req,res){
	
	if(sess.username){
		res.redirect('/approveduser/'+sess.username+'/'+req.params.username)	
	}
	
});


app.use('/', express.static(__dirname));


app.post('/upload',function(req,res){
	upload(req,res,function( err) {
		if(err) {
			return res.end("Error uploading file.");
		}
		//console.log(req.file);
		console.log(req.files.userPhoto.originalname);
		res.send("hello");
	});
});


//app.get('/products', products.findAll);
//app.get('/home/:id', songs.findById);
app.get('/songs', songs.findAllSongs);
app.get('/artists', songs.findAllArtists);
app.get('/albums', songs.findAllAlbums);
app.get('/album/:title', songs.findAlbum);
app.get('/albumSongs/:number', songs.getAlbumSongs);
app.get('/users/:username/:password', songs.getUser);
app.get('/users/:username', songs.getUser2);
app.get('/admin/:username/:password', songs.getAdmin);
app.get('/songs/:title', songs.searchSong);
app.get('/artists/:name', songs.searchArtist);
app.get('/artistSongs/:number', songs.getArtistSongs);
app.post('/songs/:title/:artist/:genre/:album', songs.addSong);
app.post('/includes/:title/:artist/:album', songs.addSongToIncludes);
app.post('/pending/:username/:password/:name/:email', songs.addPending);
app.get('/playlist/:title/:username/:genre', songs.addPlaylist);
app.get('/uniqueusername/:username', songs.checkUsername);
app.get('/approveduser', songs.getApprovedUsers);
app.get('/updatetimesplayed/:number', songs.updateTimesPlayed);

app.get('/playlist/:username', songs.getPlaylist);
app.get('/playlistSongs/:number', songs.getPlaylistSongs);
app.get('/notinplaylistSongs/:number', songs.getNotInPlaylistSongs);
app.delete('/playlistSongs/:songnumber/:playlistnumber', songs.deletePlaylistSongs);
app.post('/addplaylistSongs/:songnumber/:artistnumber/:albumnumber/:playlistnumber', songs.addSongsToPlaylist);

app.get('/notRecommended/:username', songs.getNotRecommended)
app.get('/recommend/:username/:songnumber', songs.recommendSong)

app.get('/pendingusers', songs.findPendingUsers);
app.put('/approveduser/:adminusername/:username', songs.approvePendingUsers);
app.delete('/disapproveuser/:username', songs.disapprovePendingUsers);

//app.post('/songs', songs.create);
app.set('port', process.env.PORT || 8000);
app.listen(app.get('port'), function () {
    console.log('Express server listening on port ' + app.get('port'));
});

