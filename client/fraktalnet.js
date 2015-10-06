if (Meteor.isClient) {
    Meteor.subscribe("Images");


    Template.home.helpers({
    'images': function() {
      return Images.find();
    }
  });

}

