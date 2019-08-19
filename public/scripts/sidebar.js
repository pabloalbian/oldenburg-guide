$("#showbtn").click(function(){
	$(this).removeClass("showbtn-left").addClass("showbtn-right");

	window.setTimeout(function(){
		$("#showbtn").addClass("showbtn-hide");
	}, 500);

	$('#mySidebar').css("width", "250px");
});

$(".closebtn").click(function(){
	$("#showbtn").removeClass("showbtn-hide showbtn-right").addClass("showbtn-left");
	$("#mySidebar").css("width", "0px");
});