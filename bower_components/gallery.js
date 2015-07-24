$(document).ready(function () {

	var upvotes;
	var downvotes;
	var id;
	var imgs = [];
	$(document).ready(function(){        
		$('li .thumbnail').on('click',function(){
			var src = $(this).children('img').attr('src');
			var img = '<img src="' + src + '" class="img-responsive"/>';
			id =$(this).children('img').attr('id');
			upvotes=document.getElementById('upvotes_'+id).value;
			downvotes=document.getElementById('downvotes_'+id).value;
			//start of new code new code
			var index = $(this).parent('li').index();   
			
			var html = '';
			html += img;
			html += "<div class='row' style='text-align : center; padding : 5px' id="+id+">";
			alert(imgs.indexOf(id));
			if(imgs.indexOf(id) >= 0)
			{
				html += "<input style='margin:5px' class='btn-success btn-md disabled' type='submit' value='Upvote || "+ upvotes+"' />" ;
						html +="<input type='submit' class='btn-danger btn-md disabled' value='Downvote || "+downvotes+"'' id="+id+" style='margin:5px' /> </div>";
			}
			else
			{
				html += "<input style='margin:5px' class='btn-success btn-md' type='submit' value='Upvote || "+ upvotes+"' />" ;
				html +="<input type='submit' class='btn-danger btn-md' value='Downvote || "+downvotes+"'' id="+id+" style='margin:5px' /> </div>";
			}
			
			$('#myModal').modal();
			$('#myModal').on('shown.bs.modal', function(){
				$('#myModal .modal-body').html(html);
				//new code
				$('a.controls').trigger('click');
			})
			$('#myModal').on('hidden.bs.modal', function(){
				$('#myModal .modal-body').html('');
			});
			
			
			
			
	   });	
	});

	$(document).on('click','.btn-success',function(){
		alert(id);
		imageId = document.getElementById('ID_'+id).value;
		upvotes=parseInt(upvotes)+1;
		$.ajax({
			url : "/Upvote?id="+imageId+"&upvotes="+upvotes,
			type: "POST",
			success : function(){
				$(".btn-success").attr("value","Upvotes || "+upvotes);
				$(".btn-danger").attr("value","Downvotes || "+downvotes);
				$(".btn-danger").toggleClass('btn-danger btn-md disabled');
				$(".btn-success").toggleClass('btn-success btn-md disabled');
				document.getElementById("upvotes_"+id).value=upvotes;
				
				imgs.push(id);
			}
		});
	});

	$(document).on('click','.btn-danger',function(){
		imageId = document.getElementById('ID_'+id).value;
		downvotes = parseInt(downvotes)+1;
		$.ajax({
			url : "/Downvote?id="+imageId+"&downvotes="+downvotes,
			type: "POST",
			success : function(){
				$(".btn-success").attr("value","Upvotes || "+upvotes);
				$(".btn-danger").attr("value","Downvotes || "+downvotes);
				$(".btn-danger").toggleClass('btn-danger btn-md disabled');
				$(".btn-success").toggleClass('btn-success btn-md disabled');
				document.getElementById('downvotes_'+id).value=downvotes;
				imgs.push(id);
			}
		})
	});
	        
	         
	$(document).on('click', 'a.controls', function(){
		var index = $(this).attr('href');
		var src = $('ul.row li:nth-child('+ index +') img').attr('src');             
		
		$('.modal-body img').attr('src', src);
		
		var newPrevIndex = parseInt(index) - 1; 
		var newNextIndex = parseInt(newPrevIndex) + 2; 
		
		if($(this).hasClass('previous')){               
			$(this).attr('href', newPrevIndex); 
			$('a.next').attr('href', newNextIndex);
		}else{
			$(this).attr('href', newNextIndex); 
			$('a.previous').attr('href', newPrevIndex);
		}
		
		var total = $('ul.row li').length + 1; 
		//hide next button
		if(total === newNextIndex){
			$('a.next').hide();
		}else{
			$('a.next').show()
		}            
		//hide previous button
		if(newPrevIndex === 0){
			$('a.previous').hide();
		}else{
			$('a.previous').show()
		}
		
		
		return false;
	});

    $("[rel='tooltip']").tooltip();

    $('.thumbnail').hover(

    function() {
        $(this).find('.caption').slideDown(250);
    },

    function() {
        $(this).find('.caption').slideUp(250);
    });
});