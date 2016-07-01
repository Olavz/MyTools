if($("#mytoolscontainer").length == 0) {

	// Append field to banner
	var banner = $("div[role='banner']");
	banner.append("<div id='mytoolscontainer' style='display: none; background: #2f3542; padding: 10px;'><div id='mytoolsbox' style='margin-left: auto; margin-right: auto; width: 80%;'>Hello World</div></div>");
	 
	// Duplicate home_icon button.
	var dd = $("div[data-click='home_icon']");
	var newSource = $(dd.html());
	newSource.text("My tools");
	dd.append(newSource);
	 
	// Toggle mytoolscontainer.
	newSource.click(function(e) {
	    $("#mytoolscontainer").toggle();
	    e.preventDefault();
	});

	$.ajax({
	    dataType: "text",
	    url: "https://evry.facebook.com/notes/reader/?note_id=116791885400718&dpr=1&__user=100012097206441&__a=1",
	    success: function(data) {
	        data = data.substr(9, data.lenght);
	        jdata = JSON.parse(data);
	        var htmlData = jdata.jsmods.markup[0][1].__html;
	        var matches = htmlData.match(/<div[^]+>[\S\s]*?<\/div>/gi);
	        matches = matches[0].replace(/(<\/?[^>]+>)/gi, '');
	        var key = htmlDecode(matches);
	        loadMyToolsMenyByKey(key);
	    }
	});

}

function loadMyToolsMenyByKey(key) {
	$.ajax({
	    dataType: "text",
	    url: "https://evry-olavz-com.secure.domeneshop.no/?key=" + key,
	    success: function(data) {
	        jo = JSON.parse(data);
	       
	        var menuBuilderOutput = "<ul>";
	        var menuList = jo.mytools;
	        for(var i=0; i<menuList.length; i++) {
	            menuBuilderOutput += "<li><a href='"+menuList[i].url+"' target='_blank'>"+menuList[i].name+"</a></li>";
	        }
	        menuBuilderOutput += "</ul>";
	        $("#mytoolsbox").html('<style>'+
	        	'.corp-mytools-wrapper { overflow-y: auto; max-height: 400px; } '+
	        	'#corp-mytools-panel ul { list-style: none; margin: 0 20px; overflow: hidden; padding: 0; position: relative; } '+
	        	'#corp-mytools-panel ul li { float: left; margin-bottom: 10px; width: 33.3333%; }'+
	        	'#corp-mytools-panel ul li a { color: #fff; font-family: Arial,sans-serif; font-size: 12px; font-weight: normal; text-decoration: none; }'+
	        	'#corp-mytools-panel ul li a:hover { color: #fff; text-decoration: underline; }'+
	        	'</style>'+
	        	'<div id="corp-mytools-panel">'+
	        	'<div class="corp-mytools-wrapper">'+menuBuilderOutput+' </div>'+
	        	'</div>');
	    }
	});
}

function htmlDecode(input){
	var e = document.createElement('div');
	e.innerHTML = input;
	return e.childNodes.length === 0 ? "" : e.childNodes[0].nodeValue;
}