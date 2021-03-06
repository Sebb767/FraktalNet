FS.debug = true;
var imageStore = new FS.Store.GridFS("images");

Images = new FS.Collection("Images", {
    stores: [imageStore],
    filter: {
        allow: {
            contentTypes: ['image/*']
        },
        onInvalid: function(message) {
            if (Meteor.isClient)
                toastr["error"]("Error: "+message, "Image upload failed.");
        }
    }
});


// Allow rules
Images.allow({
    insert: function() { return true; },
    update: function() { return true; },
    download: function() { return true; }
});

if(Meteor.isClient)
{
    Meteor.subscribe("Images", 5);

    Template.dropzone.events({
        'dropped #dropzone': function(e) {
            FS.Utility.eachFile(e, function(file) {
                var newFile = new FS.File(file);

                Images.insert(newFile, function (error, fileObj) {
                    if (error) {
                        toastr["error"](error + "", "Image upload failed :/");
                    } else {
                        toastr["success"]("Image upload succeeded!");
                    }
                });
            });
        }
    });

    Template.home.helpers({
        'images': function() {
            return Images.find();
        }
    });
}



