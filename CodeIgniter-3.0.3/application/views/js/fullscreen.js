$(document).ready(function () {
    //Toggle fullscreen
    $("#panel-fullscreen").click(function (e) {
        e.preventDefault();
        
        var $this = $(this);
        
        
        
    
        if ($this.children('i').hasClass('glyphicon-resize-full'))
        {
            $this.children('i').removeClass('glyphicon-resize-full');
            $this.children('i').addClass('glyphicon-resize-small');
            
            //document.getElementById("dataspace_panel").innerHTML = "Full panel!";
            document.getElementById("dataspace_panel").setAttribute("style", "min-height: 100%; max-height: 100%");
            var curie = getCookie('curie');
            var pageName = getCookie('pageName');
            var html = httpGet("http://localhost/SciCrunchKS/index.php/viewalldata/view/"+pageName+"/0/0");
        }
        else if ($this.children('i').hasClass('glyphicon-resize-small'))
        {
            $this.children('i').removeClass('glyphicon-resize-small');
            $this.children('i').addClass('glyphicon-resize-full');
            
            //document.getElementById("dataspace_panel").innerHTML = "Minimized panel!";
            document.getElementById("dataspace_panel").setAttribute("style", "min-height: 23%; max-height: 23%;overflow-y: scroll");
            
            loadButtons();
        }
        $(this).closest('.panel').toggleClass('panel-fullscreen');
        
        
        
    });
});

function httpGet(theUrl)
{
    if (window.XMLHttpRequest)
    {// code for IE7+, Firefox, Chrome, Opera, Safari
        xmlhttp=new XMLHttpRequest();
    }
    else
    {// code for IE6, IE5
        xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
    }
    xmlhttp.onreadystatechange=function()
    {
        if (xmlhttp.readyState==4 && xmlhttp.status==200)
        {
            //alert(xmlhttp.responseText);
            //return xmlhttp.responseText;
            
            document.getElementById("dataspace_panel").innerHTML=xmlhttp.responseText;
        }
    }
    xmlhttp.open("GET", theUrl, false );
    xmlhttp.send();    
}




function loadButtons()
{
    var json_str = getCookie('ks_selected_categories');
    json_str=json_str.replace(new RegExp("%2C", 'g'), ",");
    //alert("-----NEW JSON:"+json_str);
    var array = json_str.split(',');
    array.sort();
    var html ="<div class=\"row\">";
    var count = 0;
    
    var Physiology_count = getCookie('Physiology_count');
    var Expression_count = getCookie('Expression_count');
    var Models_count = getCookie('Models_count');
    var Anatomy_count = getCookie('Anatomy_count');
    var Morphology_count = getCookie('Morphology_count');
    
    if((array.indexOf("Physiology") > -1))
    {
     count++;
     html =  html+"\n<div class=\"col-md-4\"><button style=\"height:30px;width:120px\" type=\"button\" class=\"btn btn-info btn-sm\" data-toggle=\"modal\" data-target=\"#myModal\">Physiology ("+Physiology_count+")</button> </div>";   
    }    
        
    if((array.indexOf("Expression") > -1))
    {
     count++;
     html = html+"\n<div class=\"col-md-4\"><button style=\"height:30px;width:120px\" type=\"button\" class=\"btn btn-info btn-sm\" data-toggle=\"modal\" data-target=\"#myModal2\">Expression ("+Expression_count+")</button></div>";    
    }
    if((array.indexOf("Models") > -1))     
    {
        count++;
        html  = html+"\n<div class=\"col-md-4\"><button style=\"height:30px;width:120px\" type=\"button\" class=\"btn btn-info btn-sm\" data-toggle=\"modal\" data-target=\"#myModal5\">Models ("+Models_count+")</button></div> ";
    }
    if((array.indexOf("Anatomy") > -1))     
    {
       if(count == 3)
       {
           html = html+"\n</div><br/><div class=\"row\"> ";
           
       }
       count++;
       html  = html+"\n<div class=\"col-md-4\"><button style=\"height:30px;width:120px\" type=\"button\" class=\"btn btn-info btn-sm\" data-toggle=\"modal\" data-target=\"#myModal3\">Anatomy ("+Anatomy_count+")</button></div>";
       
    }
    if((array.indexOf("Morphology") > -1))     
    {
       if(count == 3)
       {
           html = html+"</div><br/><div class=\"row\"> ";
       }
       count++;
       html  = html+"<div class=\"col-md-4\"><button style=\"height:30px;width:120px\" type=\"button\" class=\"btn btn-info btn-sm\" data-toggle=\"modal\" data-target=\"#myModal4\">Morphology ("+Morphology_count+")</button></div> ";
    }
 
    
    html = html+"</div>";
    document.getElementById("dataspace_panel").innerHTML=html;
    
}

function loadNewPage(sourceID,term,pageID)
{
    //alert("\nSourceID:"+sourceID);
    //alert("\nTerm:"+term);
    //var el = document.getElementById("dataspace_panel");
    //alert("el:"+el);
    //var html = "testing...";
    //document.getElementById("dataspace_panel").innerHTML=html;
     //alert("\npageID:"+pageID);
     var html = httpGet("http://localhost/SciCrunchKS/index.php/viewalldata/view/"+term+"/"+sourceID+"/"+pageID);
 
}