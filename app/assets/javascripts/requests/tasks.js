
$.ajaxSetup({
    headers: {
      'X-CSRF-Token': $('meta[name="csrf-token"]').attr('content')
    }
  });
var indexTasks = function (successCB,errorCB) {
    var request = {
      type: 'GET',
      url: 'api/tasks?api_key=1',
      success: successCB,
      error: errorCB
    }
    $.ajax(request);
  };


  var postTask = function (content,successCB,errorCB) {
   
    var request = {
      type: 'POST',
      url: 'api/tasks?api_key=1',
      data: {
        task: {
          content: content
        }
      },
      success: successCB,
      error: errorCB
    }
    $.ajax(request);
  };

  var updateTask = function(id,completed,successCB,errorCB) {
    var url = 'api/tasks/'+id+'/'+completed +'?api_key=1';
    var request = {
      type: 'PUT',
      url: url,
      data: {
        task: {
         
        }
      },
      success: successCB,
      error: errorCB
    }
    $.ajax(request);
  }


  var deleteTask = function(id,successCB,errorCB) {
    var url = 'api/tasks/'+ id +'?api_key=1'
    var request = {
      type: 'DELETE',
      url: url,
      data: {
        task: {
         
        }
      },
      success: successCB,
      error: errorCB
    }
    $.ajax(request);
  }
