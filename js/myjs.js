var catid;
			
			function linksadd(xa) {
				catid = xa;
				document.getElementById("linkname1").value  = "";
				document.getElementById("link1").value  = "";
				document.getElementById("linkname2").value  = "";
				document.getElementById("link2").value  = "";
				document.getElementById("linkname3").value  = "";
				document.getElementById("link3").value  = "";
				
				document.getElementById("linkname1").required = false;
				document.getElementById("link1").required = false;
				document.getElementById("linkname2").required = false;
				document.getElementById("link2").required = false;
				document.getElementById("linkname3").required = false;
				document.getElementById("link3").required = false;
				$("#linksModal").modal('show');
				return false;
			}
		
			function refreshcat(){
				$.ajax({
						url:"fetch_category.php",
						method:"POST",  
						success:function(fs)
						{
							$("#profile").html(fs);
						}
				});
			}
			
			function addcategory(){
				var cna=$("#cname").val();
				var method = "addcategory";
				$.ajax({
					type:'post',
					url:'phpmethod.php',
					data:{
					method:method,
					cname:cna
					},
					success:function(response) {
						
					  if(response=="Not Allowed")
					  {
						$("#categoryModal").modal('hide');
						alert("You are not Allowed to add more category");
					  }
					  else if(response=="success")
					  {
						$("#categoryModal").modal('hide');
						refreshcat();
					  }
					  else
					  {
						alert("Error");
					  }
					}
				});
						  
				return false;
			}
			
			function link_validation(num){
				if(num == 1){
					document.getElementById("linkname1").required = true;
					document.getElementById("link1").required = true;
				}
				else if(num == 2){
					document.getElementById("linkname2").required = true;
					document.getElementById("link2").required = true;
				}
				else if(num == 3){
					document.getElementById("linkname3").required = true;
					document.getElementById("link3").required = true;
				}
				return false;
			}
			
			function addlinks(){
				var name1=$("#linkname1").val();
				var link1=$("#link1").val();
				var name2=$("#linkname2").val();
				var link2=$("#link2").val();
				var name3=$("#linkname3").val();
				var link3=$("#link3").val();
				var method = "addlink";
				
				$.ajax({
					type:'post',
					url:'phpmethod.php',
					data:{
					method:method,catid:catid,
					name1:name1,link1:link1,
					name2:name2,link2:link2,
					name3:name3,link3:link3
					},
					success:function(response) {
					  if(response=="success")
					  {
						$("#linksModal").modal('hide');
						refreshcat();
					  }
					  else
					  {
						alert("Error");
					  }
					}
				});
						  
				return false;
			}
			
			
function link_delete(lid){
	var method = "deletelink";
	
	$.ajax({
		type:'post',
		url:'phpmethod.php',
		data:{
			method:method,
			linksid:lid
		},
		success:function(response) {
			if(response == "success"){
				refreshcat();
			}
			else{
				alert("error");
			}
		}
	});
	
	return false;
					
}

function personal_modal(processtype){
	var method = "getdetail";
	
	$.ajax({
		url:"phpmethod.php",
		method:"POST", 
		data:{
			method:method,
			processtype:processtype
		},
		success:function(fs)
		{
			if(fs){
				if(processtype == "email"){
					$('#modaltitle').text(processtype.charAt(0).toUpperCase() + processtype.slice(1));
					$('#personal_button').closest("form").attr('onsubmit', 'return submitclick("'+processtype+'");');
				}
				else if(processtype == "phone"){
					$('#modaltitle').text(processtype.charAt(0).toUpperCase() + processtype.slice(1));
					$('#personal_button').closest("form").attr('onsubmit', 'return submitclick("'+processtype+'");');
				}
				else if(processtype == "facebook"){
					$('#modaltitle').text(processtype.charAt(0).toUpperCase() + processtype.slice(1));
					$('#personal_button').closest("form").attr('onsubmit', 'return submitclick("'+processtype+'");');
				}
				else if(processtype == "instagram"){
					$('#modaltitle').text(processtype.charAt(0).toUpperCase() + processtype.slice(1));
					$('#personal_button').closest("form").attr('onsubmit', 'return submitclick("'+processtype+'");');
				}
				else if(processtype == "youtube"){
					$('#modaltitle').text(processtype.charAt(0).toUpperCase() + processtype.slice(1));
					$('#personal_button').closest("form").attr('onsubmit', 'return submitclick("'+processtype+'");');
				}
				else if(processtype == "twitter"){
					$('#modaltitle').text(processtype.charAt(0).toUpperCase() + processtype.slice(1));
					$('#personal_button').closest("form").attr('onsubmit', 'return submitclick("'+processtype+'");');
				}
				
			
			document.getElementById("personalinput").value = fs;
			$("#personalModal").modal('show');	
			}
			else{
				alert('error');
			}
		}
	});
	
	
	return false;
}

function submitclick(ptype){
	var method = "updatedetail";
	var personalinput=$("#personalinput").val(); 
	
	$.ajax({
		type:'post',
		url:'phpmethod.php',
		data:{
			method:method,
			ptype:ptype,
			personalinput:personalinput
		},
		success:function(response) {
			if(response == "success"){
				$("#personalModal").modal('hide');
				refreshcat();
			}
			else{
				alert("error");
			}
		}
	});
	
	return false;
}

function updatemodal(lid){
	var method = "getlinkById";
	
	 
	$.ajax({
		url:"phpmethod.php",
		type:"POST",
		data:{
			method:method,
			lid:lid
		},							
		success:function(fs)
		{
			$("#editlink").html(fs);
			$("#editLinkModal").modal('show');
		}
	});
			
	return false;
}

function updatelink(){
	
	var method = "updatelink";
	var lid = $("#linkid").val();
	var linkname = $("#editlink_name").val();
	var linkurl = $("#editlink_link").val();
	
	$.ajax({
		type:'post',
		url:'phpmethod.php',
		data:{
			method:method,
			lid:lid,
			linkname:linkname,
			linkurl:linkurl
		},
		success:function(response) {
			if(response == "success"){
				$("#editLinkModal").modal('hide');
				refreshcat();
			}
			else{
				alert("error");
			}
		}
	});
	
	return false;
	
}

function deletemodal(lid){
	document.getElementById("deletelinkid").value = lid;
	$("#deleteLinkModal").modal('show');
	return false;
}

function deletelink(){
	var lid = $("#deletelinkid").val();
	var method = "deletelink";
	$.ajax({
		type:'post',
		url:'phpmethod.php',
		data:{
			method:method,
			lid:lid
		},
		success:function(response) {
			if(response == "success"){
				$("#deleteLinkModal").modal('hide');
				refreshcat();
			}
			else{
				alert("error");
			}
		}
	});
	
	return false;
}

function loadFile(theForm) {
		// var uploadval = event.target.files[0];
		// var imgcontrol = document.getElementById('imgupload').value;
		// var ext = imgcontrol.substring(imgcontrol.lastIndexOf('.') + 1).toLowerCase();
		// var img_tmpname = event.target.files[0];
		 var image = document.getElementById('output');
		// image.src = URL.createObjectURL(event.target.files[0]);

		var formData = new FormData(theForm);

		var method = "profileupdate";
		$.ajax({
				type: 'post',
				url: 'phpmethod.php',
				data: formData,
				contentType: false,      
				cache: false,          
				processData:false,  
				success:function(response) {
					if(response == "fail"){
						alert("Error in Image Update");
					}
					else{
						image.src = response;
					}
				}
		});
			
			return false;
		  }

function name_update(){

	var uname = $("#user_name").val();
	var method = "nameupdate";

	$.ajax({
		type:'post',
		url:'phpmethod.php',
		data:{
			method:method,
			uname:uname
		},
		success:function(response) {
			if(response == "success"){
				
				document.getElementById('name_dis').innerText = uname;
				document.getElementById('user_name').value = uname;
				document.getElementById('name_update').style.display = 'none';
				document.getElementById('name_dis').style.display = 'block';
			}
			else{
				alert("error");
			}
		}
	});
	
	return false;


}