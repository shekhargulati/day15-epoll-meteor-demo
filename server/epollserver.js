Questions = new Meteor.Collection("questions");

Meteor.startup(function () {
    // code to run on server at startup
});

Meteor.methods({
  addQuestion : function(questionText){
    console.log('Adding Question');
    var questionId = Questions.insert({
          'questionText' : questionText,
          'submittedOn': new Date(),
          'submittedBy' : Meteor.userId()
      });
    return questionId;
  },
  incrementYesVotes : function(questionId){
    console.log(questionId);
    Questions.update(questionId,{$inc : {'yes':1}});
  },
  incrementNoVotes : function(questionId){
    console.log(questionId);
    Questions.update(questionId,{$inc : {'no':1}});
  }
});