'use strict';
 
app.value('sessionService', {
  token : '',
  save: function(session) {
    this.token = session;
  },
  
//delete Item and other cart operations function goes here...
});