Questions = new Meteor.Collection("questions");

if (Meteor.isClient) {
  
  Template.addquestion.events({
    'click input.add-question' : function(event){
        event.preventDefault();
        var questionText = document.getElementById("questionText").value;
        Meteor.call("addQuestion",questionText,function(error , questionId){
          console.log('added question with Id .. '+questionId);
        });
        document.getElementById("questionText").value = "";

    }
  });

  Template.question.events({
    'click': function () {
      Session.set("selected_question", this._id);
    },

    'click a.yes' : function (event) {
      event.preventDefault();
      if(Meteor.userId()){
        var questionId = Session.get('selected_question');
        console.log('updating yes count for questionId '+questionId);
        Meteor.call("incrementYesVotes",questionId);
        
      }
      
    },
    'click a.no': function(){
      event.preventDefault();
      if(Meteor.userId()){
        var questionId = Session.get('selected_question');
        console.log('updating no count for questionId '+questionId);
        Meteor.call("incrementNoVotes",questionId);
      }
    }
  });

  Template.questions.items = function(){
    return Questions.find({},{sort:{'submittedOn':-1}});
  };
}

if (Meteor.isServer) {
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
}
