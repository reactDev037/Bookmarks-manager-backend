// // server/boot/sample-data.js
// var async = require('async');
// var FOLDERS = [{
//     "name": "parent-folder-1"
// }, {
//     "name": "parent-folder-2"
// }];
// var count = 0;
// module.exports = function(server, done) {
//     console.log('Importing sample data...');
//     var Folders = server.models.Folder;
//     async.each(FOLDERS, function(folder, next) {

//        Folders.create( folder, function(err, created) {
//        	created.childFolders.create( { "name" : "sub-folder"}, function(){
       		
//             next();
//        	})
       	
//        } );
       
//     }, function(err) {
//         if (err) console.error('Cannot import sample data.',
//             err);
//         else console.log('Sample data was imported.');
//         done(err);
//     });
// };