
var loadTask = function() {
  indexTasks(function (response) {
    var htmlString = response.tasks.map(function(task) {
      var active = task.completed ? 'completed': 'active';

      return "<div class='col-12 mb-3 p-2 border rounded task "+ active + "' data-id='" + task.id + "'> \
      " + task.content + "\
      <div class='options'><button class='circle-btn' id='markTask'> </button><button class='btn delete-btn btn-danger h-100'>Remove</button></div></div>";
    });
    
    
    var category = $('.btn-group').find('.active').attr('id');
    switch (category) {
      case 'completed':
        htmlString = htmlString.filter(function(e) {
          return $(e).hasClass('completed');
        });
        break;
      case 'active':
        htmlString = htmlString.filter(function(e) {
          return $(e).hasClass('active');
        });
        break;
    }

  
    $('#tasks').html(htmlString);
      // addClickEvent('.circle-btn','click');
    $('.circle-btn').each(function(){
      addClickEvent($(this),'click','updateTask');
    });
    // addClickEvent (#deletTask,'click);
    $('.delete-btn').each(function(){
      addClickEvent($(this),'click','deleteTask');
     });
  });

}

var addClickEvent = function(item,e,action) {
  $(item).on(e,function() {
    var id = $(this).parents('.task').data('id');
  
    switch(action) {
      case 'updateTask':
        if ($(this).parents('.task').hasClass('active') ) {
          updateTask(id,'mark_complete',function(response){
            console.log(response.sucess);
            if(response.success) loadTask();
          });
        }

        else {
          updateTask(id,'mark_active',function(response){
            if(response.success) loadTask();
           });
        }
        break;
      case 'deleteTask':
        deleteTask(id, function(response){
           if(response.success) loadTask();
        });
        break;
    }

    loadTask();
  });
}
;
$(document).on("turbolinks:load", function () {
  if ($('.static_pages.index').length > 0) {
       // Even Listener for Posting Task

      
       $("#postTask").on( "keydown", function(event) {
        var content = $("#postTask").val();
        if(event.key === 'Enter' && content.length > 0) {
          postTask(content, function(response) {
            loadTask();
          });
         
          $("#postTask").val('');
        }
      }); 
      
      // Event Listener for categories.
      $('.btn-category').each( function() {
        $(this).on('click', function () {
            if (!$(this).hasClass('active')) {
              
              $('.btn-category').closest('.active').removeClass('active');
              $(this).addClass('active');
              loadTask();
            }
        })
      });



    
    loadTask();

   
    

    
  }

  
  
 
});



