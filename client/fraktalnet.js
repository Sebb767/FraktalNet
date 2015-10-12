if (Meteor.isClient) {
    Meteor.subscribe("Images", 5);


    Template.home.helpers({
    'images': function() {
      return Images.files.find();
    }
  });

}

