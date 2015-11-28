'use strict';

(function(){

angular.module("spotify", [])

.controller('mainController', function($rootScope, $scope, $http) {
    //$rootScope.user={};
    //var user;
    $scope.formData = {};
    $scope.songsData = {};
    $scope.artistData = {};
    $scope.albumData = {};
    $scope.userData = {};
    $scope.searchSongs = {};
    $scope.searchArtists = {};
    $scope.playlists = {};
    $scope.playlistsSongs = {};
    $scope.songsNotInPlaylist = {};
    $scope.a = {};
    var a;
    
    $http.get('/getPlaylist')
        .success(function(data) {
            $scope.playlists = data;
        })
        .error(function(error) {
            console.log('Error: ' + error);
    });
    
    $scope.addPlaylist = function() {
        if(($scope.playlist.addtitle!="")&&($scope.playlist.addgenre!="")){
            $http.post('/addPlaylist/'+$scope.playlist.addtitle+'/'+$scope.playlist.addgenre)
            .success(function(data) {
            
                $http.get('/getPlaylist')
                .success(function(data) {
                    $scope.playlists = data;
                })
                .error(function(error) {
                    console.log('Error: ' + error);
                });

            })
            
            .error(function(error) {
                console.log('Error: ' + error);
            });
        }else{

            alert('All fields are required');
        }
    
    }

    $scope.getPlaylistSongs = function(playlist) {
    
    		$http.get('/playlistSongs/'+playlist.playlist_number)
        	.success(function(data) {
           	 
            	 $scope.playlistsSongs = data;
       		})
       		
        	.error(function(error) {
            	console.log('Error: ' + error);
    		});
    
    }

    
    
    $scope.getSongsNotInPlaylist = function(playlist) {
    
            $http.get('/notinplaylistSongs/'+playlist.playlist_number)
            .success(function(data) {
             
                 $scope.songsNotInPlaylist = data;
            })
            
            .error(function(error) {
                console.log('Error: ' + error);
            });
    
    }

    $scope.addToPlaylist = function(song, playlist) {
        console.log("add");
        console.log(playlist.playlist_number);
            $http.post('/addplaylistSongs/'+song.song_number+'/'+song.artist_number+'/'+song.album_number+'/'+playlist.playlist_number)
            .success(function(data) {
             
                 $http.get('/notinplaylistSongs/'+playlist.playlist_number)
                .success(function(data) {
                 
                     $scope.songsNotInPlaylist = data;

                        $http.get('/playlistSongs/'+playlist.playlist_number)
                        .success(function(data) {
                         
                             $scope.playlistsSongs = data;
                        })
                        
                        .error(function(error) {
                            console.log('Error: ' + error);
                        });
                })
                
                .error(function(error) {
                    console.log('Error: ' + error);
                });
            })
            
            .error(function(error) {
                console.log('Error: ' + error);
            });
    
    }

    $scope.removeFromPlaylist = function(song, playlist) {
        console.log('delete');
            $http.delete('/playlistSongs/'+song.song_number+'/'+playlist.playlist_number)
            .success(function(data) {
             
                 $http.get('/playlistSongs/'+playlist.playlist_number)
                .success(function(data) {
                 
                     $scope.playlistsSongs = data;
                })
                
                .error(function(error) {
                    console.log('Error: ' + error);
                });
            })
            
            .error(function(error) {
                console.log('Error: ' + error);
            });
    
    }
    
    $http.get('/getuserinfo')
        .success(function(data) {
            //console.log(data);
            $scope.userData = data;
           
        })
        .error(function(error) {
            console.log('Error: ' + error);
    });
    $http.get('/songs')
        .success(function(data) {
            //console.log(data);
            $scope.songsData = data;
           
        })
        .error(function(error) {
            console.log('Error: ' + error);
    });
    
    $http.get('/artists')
        .success(function(data) {
            //console.log(data);
            $scope.artistData = data;
           
        })
        .error(function(error) {
            console.log('Error: ' + error);
    });
    
    $http.get('/albums')
        .success(function(data) {
            //console.log(data);
            $scope.albumData = data;
           
        })
        .error(function(error) {
            console.log('Error: ' + error);
    });
    $scope.searchsongs = function() {
    	$http.get('/songs/'+$scope.song.title)
        .success(function(data) {
            //console.log(data);
            $scope.searchSongs = data;
           
        })
        .error(function(error) {
            console.log('Error: ' + error);
            });
        $http.get('/artists/'+$scope.song.title)
        .success(function(data) {
            //console.log(data);
            $scope.searchArtists = data;
           
        })
        .error(function(error) {
            console.log('Error: ' + error);
    });
    }
    $scope.addSong = function() {
    
    if(($scope.song.addtitle!="")&&($scope.song.addartist!="")&&($scope.song.addgenre!="")&&($scope.song.addalbum!="")){
    
    	$http.post('/songs/'+$scope.song.addtitle+'/'+$scope.song.addartist+'/'+$scope.song.addgenre+'/'+$scope.song.addalbum)
        .success(function(data) {
            
            $http.post('/includes/'+$scope.song.addtitle+'/'+$scope.song.addartist+'/'+$scope.song.addalbum)
            .success(function(data) {
                $scope.songsData = data;
                $scope.song.addtitle = "";
                $scope.song.addartist = "";
                $scope.song.addgenre = "";
                $scope.song.addalbum = "";
            })
            .error(function(error) {
                console.log('Error: ' + error);
            });
           
        })
        .error(function(error) {
            console.log('Error: ' + error);
        });
      }
      else {
      console.log('error in adding');
      	alert('All fields are required!');
      }  
    
    }
    $scope.signUp = function() {
    	$http.post('/pending/'+$scope.signup.username+'/'+$scope.signup.password+'/'+$scope.signup.name+'/'+$scope.signup.email)
        .success(function(data) {
            alert('Pending User Request');
           
           
        })
        .error(function(error) {
            console.log('Error: ' + error);
            });
        
    
    }
    /*
    $scope.createSong = function() {
	    $http.post('/songs', $scope.formData)
	       .success(function(data) {
	      	//$scope.songsData.push({'id':fornData.id, 'test':formData.text});
	       	console.log($scope.songsData);
		$scope.formData = {};
		$scope.songsData = data;
		console.log(data);
	    	})
	    	.error(function(error) {
	    	    console.log('Error: ' + error);
	    	});
	    
	}*/
	
	 $scope.authenticateUser = function() {
		//console.log($scope.user);
		var username=$scope.user.username;
		var password= $scope.user.password;
	    $http.get('/users/'+$scope.user.username+'/'+$scope.user.password)
	    //$http.get('/users', ["username":"perico", "password":"dan"])
	       .success(function(data) {
	       		//console.log("hello");	
	      		//console.log(data);	
		      	if(data.length==1){
		      	$rootScope.user=data;
		      	//{'username':username,'password':password}
		      	
		      	$http.post('/login/'+data[0].username+'/'+data[0].user_password+'/false')
		      		.success(function(data){
		      		if(data==='done')			
				{
					//window.location.href="/admin";
			
		      			
					window.location.href = 'http://localhost:8000/home';
					//window.location.reload();
				}
			});
		      	
		       	//console.log($scope.songsData);
			$scope.user = {};
			//$scope.songsData = data;
			//console.log(data);
			}
			else{
				alert("User not found");
			}
	    	})
	    	
	    	
	    	.error(function(error) {
	    	    console.log('Error: ' + error);
	    	});
	    
	    
	}
	
	$scope.adminlogin = function() {
		//console.log($scope.user);
		var username=$scope.admin.username;
		var password= $scope.admin.password;
	    $http.get('/admin/'+$scope.admin.username+'/'+$scope.admin.password)
	    //$http.get('/users', ["username":"perico", "password":"dan"])
	       .success(function(data) {
	       		//console.log("hello");	
	      		//console.log(data);	
		      	if(data.length==1){
		      	$rootScope.user=data;
		      	//{'username':username,'password':password}
		      	
		      	$http.post('/login/'+data[0].username+'/'+data[0].user_password+'/true')
		      		.success(function(data){
		      		if(data==='done')			
				{
					//window.location.href="/admin";
			
		      			
					window.location.href = 'http://localhost:8000/admin';
					//window.location.reload();
				}
			});
		      	
		       	console.log($scope.songsData);
			$scope.user = {};
			//$scope.songsData = data;
			console.log(data);
			}
			else{
				alert("User not found");
			}
	    	})
	    	
	    	
	    	.error(function(error) {
	    	    console.log('Error: ' + error);
	    	});
	    
	    
	}
	
	$scope.logout = function() {
		//console.log("111119999999");
		
	    window.location.href = 'http://localhost:8000/logout';
	    
	    
	}
})
})();