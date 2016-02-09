$(document).ready(function () 
{
    $("#literature-fullscreen").click(function (e) {
        e.preventDefault();
        
        var $this = $(this);
        
        
        
    
        if ($this.children('i').hasClass('glyphicon-resize-full'))
        {
            $this.children('i').removeClass('glyphicon-resize-full');
            $this.children('i').addClass('glyphicon-resize-small');
            
            //document.getElementById("dataspace_panel").innerHTML = "Full panel!";
            document.getElementById("literature-panel").setAttribute("style", "min-height: 100%; max-height: 100%");
            window.location.hash = '#literature';
            setCookie('screen_state','literature',365);
        }
        else if ($this.children('i').hasClass('glyphicon-resize-small'))
        {
            $this.children('i').removeClass('glyphicon-resize-small');
            $this.children('i').addClass('glyphicon-resize-full');
            
            //document.getElementById("dataspace_panel").innerHTML = "Minimized panel!";
            document.getElementById("literature-panel").setAttribute("style", "min-height: 70%; max-height: 70%;overflow-y: scroll");
            history.pushState('', document.title, window.location.pathname);
            setCookie('screen_state','',365);
            
        }
        $(this).closest('.panel').toggleClass('panel-fullscreen');
        
        
        
    });
    
    $("#relation-fullscreen").click(function (e) {
        e.preventDefault();
        
        var $this = $(this);
        
        
        
    
        if ($this.children('i').hasClass('glyphicon-resize-full'))
        {
            $this.children('i').removeClass('glyphicon-resize-full');
            $this.children('i').addClass('glyphicon-resize-small');
            
            //document.getElementById("dataspace_panel").innerHTML = "Full panel!";
            document.getElementById("relation-panel").setAttribute("style", "min-height: 100%; max-height: 100%");
            window.location.hash = '#relations';
            setCookie('screen_state','relations',365);
        }
        else if ($this.children('i').hasClass('glyphicon-resize-small'))
        {
            $this.children('i').removeClass('glyphicon-resize-small');
            $this.children('i').addClass('glyphicon-resize-full');
            
            //document.getElementById("dataspace_panel").innerHTML = "Minimized panel!";
            document.getElementById("relation-panel").setAttribute("style", "min-height: 35%; max-height: 35%;overflow-y: scroll");
            history.pushState('', document.title, window.location.pathname);
            setCookie('screen_state','',365);
            
        }
        $(this).closest('.panel').toggleClass('panel-fullscreen');
        
        
        
    });
    
    
    $("#summary-fullscreen").click(function (e) {
        e.preventDefault();
        
        var $this = $(this);
        
        
        
    
        if ($this.children('i').hasClass('glyphicon-resize-full'))
        {
            $this.children('i').removeClass('glyphicon-resize-full');
            $this.children('i').addClass('glyphicon-resize-small');
            
            //document.getElementById("dataspace_panel").innerHTML = "Full panel!";
            document.getElementById("summary-panel").setAttribute("style", "min-height: 100%; max-height: 100%");
            window.location.hash = '#definition';
            setCookie('screen_state','definition',365);
        }
        else if ($this.children('i').hasClass('glyphicon-resize-small'))
        {
            $this.children('i').removeClass('glyphicon-resize-small');
            $this.children('i').addClass('glyphicon-resize-full');
            
            //document.getElementById("dataspace_panel").innerHTML = "Minimized panel!";
            document.getElementById("summary-panel").setAttribute("style", "min-height: 50%; max-height: 50%;overflow-y: scroll");
            history.pushState('', document.title, window.location.pathname);
            setCookie('screen_state','',365);
            
        }
        $(this).closest('.panel').toggleClass('panel-fullscreen');
        
        
        
    });
    
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
            var html = httpGet("/SciCrunchKS/index.php/ViewAllData/view/"+pageName+"/0/0");
            window.location.hash = '#dataspace';
            setCookie('screen_state','dataspace',365);
        }
        else if ($this.children('i').hasClass('glyphicon-resize-small'))
        {
            $this.children('i').removeClass('glyphicon-resize-small');
            $this.children('i').addClass('glyphicon-resize-full');
            
            //document.getElementById("dataspace_panel").innerHTML = "Minimized panel!";
            document.getElementById("dataspace_panel").setAttribute("style", "min-height: 23%; max-height: 23%;overflow-y: scroll");
            
            loadButtons();
            history.pushState('', document.title, window.location.pathname);
            setCookie('screen_state','',365);
            
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
 
    var ks_selected_sources = getCookie('ks_selected_sources');
    ks_selected_sources = ks_selected_sources.replace(new RegExp("%2C", 'g'), ",");
    var sourceArray = ks_selected_sources.split(',');
    
    
    var html ="<div class=\"row\">";
    var count = 0;
    
    var Physiology_count = getCookie('Physiology_count');
    var Expression_count = getCookie('Expression_count');
    var Models_count = getCookie('Models_count');
    var Anatomy_count = getCookie('Anatomy_count');
    var Morphology_count = getCookie('Morphology_count');
    
    if((array.indexOf("Physiology") > -1))
    {
     if(sourceArray.indexOf("nlx_151885-1") > -1)
     {
     count++;
     if(Physiology_count != null && Physiology_count > 0)
        html =  html+"\n<div class=\"col-md-4\"><button style=\"height:30px;width:120px\" type=\"button\" class=\"btn btn-info btn-sm\" data-toggle=\"modal\" data-target=\"#myModal\">Physiology ("+Physiology_count+")</button> </div>";   
     else 
        html =  html+"\n<div class=\"col-md-4\"><button style=\"height:30px;width:120px\" type=\"button\" class=\"btn btn-info btn-sm\" data-toggle=\"modal\" data-target=\"#myModal\" disabled>Physiology ("+Physiology_count+")</button> </div>";   

      }
    }    
        
    if((array.indexOf("Expression") > -1))
    {
        if(sourceArray.indexOf("nif-0000-00130-1") > -1)
        {
            count++;
            if(Expression_count != null && Expression_count > 0)
                html = html+"\n<div class=\"col-md-4\"><button style=\"height:30px;width:120px\" type=\"button\" class=\"btn btn-info btn-sm\" data-toggle=\"modal\" data-target=\"#myModal2\">Expression ("+Expression_count+")</button></div>";    
            else 
                html = html+"\n<div class=\"col-md-4\"><button style=\"height:30px;width:120px\" type=\"button\" class=\"btn btn-info btn-sm\" data-toggle=\"modal\" data-target=\"#myModal2\" disabled>Expression ("+Expression_count+")</button></div>";    
        }
    }
    if((array.indexOf("Models") > -1))     
    {
        if(
                sourceArray.indexOf("scr_013705-1") > -1 ||
                sourceArray.indexOf("nif-0000-00004-1") > -1  ||
                sourceArray.indexOf("nlx_152590-1") > -1 
           )
        {
        count++;
        if(Models_count != null && Models_count > 0)
            html  = html+"\n<div class=\"col-md-4\"><button style=\"height:30px;width:120px\" type=\"button\" class=\"btn btn-info btn-sm\" data-toggle=\"modal\" data-target=\"#myModal5\">Models ("+Models_count+")</button></div> ";
        else 
            html  = html+"\n<div class=\"col-md-4\"><button style=\"height:30px;width:120px\" type=\"button\" class=\"btn btn-info btn-sm\" data-toggle=\"modal\" data-target=\"#myModal5\" disabled>Models ("+Models_count+")</button></div> ";
        }
    }
    if((array.indexOf("Anatomy") > -1))     
    {
       if(sourceArray.indexOf("nif-0000-00054-1") > -1)
       {
            if(count == 3)
            {
                html = html+"\n</div><br/><div class=\"row\"> ";

            }
            count++;
            if(Anatomy_count != null && Anatomy_count > 0)
             html  = html+"\n<div class=\"col-md-4\"><button style=\"height:30px;width:120px\" type=\"button\" class=\"btn btn-info btn-sm\" data-toggle=\"modal\" data-target=\"#myModal3\">Anatomy ("+Anatomy_count+")</button></div>";
            else 
             html  = html+"\n<div class=\"col-md-4\"><button style=\"height:30px;width:120px\" type=\"button\" class=\"btn btn-info btn-sm\" data-toggle=\"modal\" data-target=\"#myModal3\" disabled>Anatomy ("+Anatomy_count+")</button></div>";
        }
    }
    if((array.indexOf("Morphology") > -1))     
    {
       if(sourceArray.indexOf("nif-0000-00006-1") > -1)
       {
            if(count == 3)
            {
                html = html+"</div><br/><div class=\"row\"> ";
            }
            count++;
            if(Morphology_count != null && Morphology_count > 0)
             html  = html+"<div class=\"col-md-4\"><button style=\"height:30px;width:120px\" type=\"button\" class=\"btn btn-info btn-sm\" data-toggle=\"modal\" data-target=\"#myModal4\">Morphology ("+Morphology_count+")</button></div> ";
            else 
             html  = html+"<div class=\"col-md-4\"><button style=\"height:30px;width:120px\" type=\"button\" class=\"btn btn-info btn-sm\" data-toggle=\"modal\" data-target=\"#myModal4\" disabled>Morphology ("+Morphology_count+")</button></div> ";
    
        }
    }
 
    
    html = html+"</div>";
    document.getElementById("dataspace_panel").innerHTML=html;
    
}

function loadNewPage(sourceID,term,pageID)
{
    setCookie('loadNewPage','true',365);
    //alert("\nSourceID:"+sourceID);
    //alert("\nTerm:"+term);
    //var el = document.getElementById("dataspace_panel");
    //alert("el:"+el);
    //var html = "testing...";
    //document.getElementById("dataspace_panel").innerHTML=html;
     //alert("\npageID:"+pageID);
     //var html = httpGet("http://localhost/SciCrunchKS/index.php/viewalldata/view/"+term+"/"+sourceID+"/"+pageID);
     var html = httpGet("/SciCrunchKS/index.php/ViewAllData/view/"+term+"/"+sourceID+"/"+pageID);
}

function eventFire(el, etype){
  if (el.fireEvent) {
    el.fireEvent('on' + etype);
  } else {
    var evObj = document.createEvent('Events');
    evObj.initEvent(etype, true, false);
    el.dispatchEvent(evObj);
  }
}

window.onhashchange = function() 
{
    var screenState = getCookie('screen_state');
    var loadNewPage = getCookie('loadNewPage');
    if(loadNewPage != null && loadNewPage == 'true')
    {
        setCookie('loadNewPage','false',365);
        window.location.hash = '#dataspace';
        return;
    }
    //if(window.location.hash == '')
    if(screenState == 'dataspace' && window.location.hash == '')
    {
        setCookie('screen_state','',365);
        //alert("hash---"+window.location.hash);
        eventFire(document.getElementById('panel-fullscreen'), 'click');
        history.pushState('', document.title, window.location.pathname);
    }
    else if(screenState == 'definition' && window.location.hash == '')
    {
        setCookie('screen_state','',365);
        //alert("hash---"+window.location.hash);
        eventFire(document.getElementById('summary-fullscreen'), 'click');
        history.pushState('', document.title, window.location.pathname);
    }
    else if(screenState == 'relations' && window.location.hash == '')
    {
        setCookie('screen_state','',365);
        //alert("hash---"+window.location.hash);
        eventFire(document.getElementById('relation-fullscreen'), 'click');
        history.pushState('', document.title, window.location.pathname);
    }
    else if(screenState == 'literature' && window.location.hash == '')
    {
        setCookie('screen_state','',365);
        //alert("hash---"+window.location.hash);
        eventFire(document.getElementById('literature-fullscreen'), 'click');
        history.pushState('', document.title, window.location.pathname);
    }
    
   
   
   
    
    //alert(window.location.hash);
    //document.getElementById("panel-fullscreen").innerHTML="<i class=\"glyphicon glyphicon-resize-full\"></i>";
 //blah blah blah
    //alert(window.location.hash);
    //alert();
    //
    //
    //document.getElementById("panel-fullscreen").children('i').removeClass('glyphicon-resize-small');
    //document.getElementById("panel-fullscreen").addClass('glyphicon-resize-full');
    //document.getElementById("dataspace_panel").setAttribute("style", "min-height: 23%; max-height: 23%;overflow-y: scroll");
}
