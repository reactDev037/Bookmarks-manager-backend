module.exports = function(Folder) {
  Folder.tree = function(cb) {
    var response;
    Folder.find({
    	include : [ "childFolders", "parentFolders","bookmarks"]
    },
      function(err,data) {
      	// async.each( data, function(){
      	// });
        //deleting the non-parent items for tree nested structure 
      	for ( var index in data ){
      		 if ( data[index]['parentId'] ){
             delete data[index];
           }
      	}
     	cb( null, data.filter(function(e){return e}) );
      });
  }
  Folder.remoteMethod("tree",{
  	returns : {
  		arg : "folders",
  		type : "folders"
  	},
  	http: {
      path: '/tree',
      verb: 'get'
    }

  })
};