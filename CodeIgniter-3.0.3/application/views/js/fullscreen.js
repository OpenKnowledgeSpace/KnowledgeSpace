
$(document).ready(function () 
{
    
            //Toggle fullscreen
    $("#panel-fullscreen0").click(function (e) {
        e.preventDefault();
        
        var $this = $(this);

            
            /*document.getElementById("summaryOutter0").className="collapse";
            document.getElementById("dataspaceOutter").className="col-md-6";
            document.getElementById("summaryOutter").className = "col-md-6";
            document.getElementById("literature-outter").className = "panel panel-default";*/
            document.getElementById("summaryOutter0").className="collapse";
            document.getElementById("summaryOutter1").className="collapse";
            document.getElementById("summaryOutter2").className="collapse";
            document.getElementById("dataspaceOutter").className="col-md-6";
            document.getElementById("summaryOutter").className = "col-md-6";
            document.getElementById("innerLiterature").className = "col-md-6";
            document.getElementById("innerRelation").className="col-md-6";
        
        
        
            document.getElementById("dataspace_panel0").innerHTML ="";
            loadButtons();
            history.pushState('', document.title, window.location.pathname);
            setCookie('screen_state','',365);
        
    });
    
    
    $("#panel-fullscreen1").click(function (e) {
        e.preventDefault();
        
        var $this = $(this);

            
            /*document.getElementById("summaryOutter0").className="collapse";
            document.getElementById("summaryOutter1").className="collapse";
            document.getElementById("summaryOutter2").className="collapse";
            document.getElementById("dataspaceOutter").className="col-md-6";
            document.getElementById("summaryOutter").className = "col-md-6";
            document.getElementById("innerLiterature").className = "col-md-6";*/
            
            document.getElementById("summaryOutter0").className="collapse";
            document.getElementById("summaryOutter1").className="collapse";
            document.getElementById("summaryOutter2").className="collapse";
            document.getElementById("dataspaceOutter").className="col-md-6";
            document.getElementById("summaryOutter").className = "col-md-6";
            document.getElementById("innerLiterature").className = "col-md-6";
            document.getElementById("innerRelation").className="col-md-6";

            document.getElementById("dataspace_panel0").innerHTML ="";
            loadButtons();
            history.pushState('', document.title, window.location.pathname);
            setCookie('screen_state','',365);
        
    });
    
    
    $("#panel-fullscreen2").click(function (e) {
        e.preventDefault();
        
        var $this = $(this);

            document.getElementById("innerRelation").className="col-md-6";
            document.getElementById("summaryOutter0").className="collapse";
            document.getElementById("summaryOutter1").className="collapse";
            document.getElementById("summaryOutter2").className="collapse";
            document.getElementById("dataspaceOutter").className="col-md-6";
            document.getElementById("summaryOutter").className = "col-md-6";
            document.getElementById("innerLiterature").className = "col-md-6";
            //document.getElementById("literature-outter").className = "panel panel-default";
            document.getElementById("dataspace_panel0").innerHTML ="";
            loadButtons();
            expandTree=false;
            document.getElementById("relation-panel-1").innerHTML =document.getElementById("relation-panel").innerHTML;
            document.getElementById("relation-panel").innerHTML ="";
             $('.tree li').addClass('parent_li').find(' > span').attr('title', 'Collapse this branch');
            $('.tree li.parent_li > span').on('click', function (e) { 
                var treeIds = e.target.id.split(',');
                var treeURL = "/SciCrunchKS/index.php/Tree_with_tabs/view/"+treeIds[0]+"/false/"+treeIds[1]+"/"+treeTabID; 
                loadTree(treeURL);
    
            });
            
            
            history.pushState('', document.title, window.location.pathname);
            setCookie('screen_state','',365);
        
    });
    
    
    /*$("#literature-fullscreen").click(function (e) {
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
        
        
        
    });*/
    $("#literature-fullscreen").click(function (e) {
        e.preventDefault();
        
        var $this = $(this);
        
        
            document.getElementById("summaryOutter0").className="collapse";
            document.getElementById("summaryOutter1").className="col-md-12";
            document.getElementById("summaryOutter2").className="collapse";
            document.getElementById("dataspaceOutter").className="col-md-6";
            document.getElementById("summaryOutter").className = "col-md-6";
            document.getElementById("innerLiterature").className = "collapse";
            document.getElementById("innerRelation").className="col-md-6";
        
        //document.getElementById("literature-outter").className = "collapse";
        /*document.getElementById("innerLiterature").className = "collapse";
        document.getElementById("summaryOutter0").className = "collapse";
        document.getElementById("summaryOutter1").className = "col-md-12";
        document.getElementById("dataspaceOutter").className = "col-md-6";*/
        
       //var title = getCookie('title');
        //alert(title);
        document.getElementById("panel_title2").innerHTML= "<h3>Literature - "+title+"</h3>";
        document.getElementById("dataspace_panel0").innerHTML = document.getElementById("literature-panel").innerHTML;
                //" <div id=\"container2\" style=\"min-width: 40%; height: 400px; margin: 0 auto\"></div> ";
         
        //alert(document.getElementById("literature-panel").innerHTML);
        
        
        document.getElementById("dataspace_panel0").setAttribute("style", "min-height:100%; max-height:100%;overflow-y: scroll"); 
        
        //var curie = getCookie('curie');
        //var pageName = getCookie('pageName'); 
        //var html = httpGet("/SciCrunchKS/index.php/Literature/view/"+pageName);
                
        window.location.hash = '#literature';
        setCookie('screen_state','literature',365); 
        $('html,body').scrollTop(0);
        
    });
    
    
    
    
    $("#relation-fullscreen").click(function (e) {
        e.preventDefault();
        
        var $this = $(this);
        
        //
        /*document.getElementById("summaryOutter0").className = "collapse";
        document.getElementById("summaryOutter1").className = "collapse";
        document.getElementById("summaryOutter2").className =  "col-md-12";
        document.getElementById("innerRelation").className ="collapse";
        document.getElementById("dataspaceOutter").className = "col-md-6";*/
            document.getElementById("summaryOutter0").className="collapse";
            document.getElementById("summaryOutter1").className="collapse";
            document.getElementById("summaryOutter2").className="col-md-12";
            document.getElementById("dataspaceOutter").className="col-md-6";
            document.getElementById("summaryOutter").className = "col-md-6";
            document.getElementById("innerLiterature").className = "col-md-6";
            document.getElementById("innerRelation").className="collapse";
        
        
        
        //var title = getCookie('title');
        document.getElementById("panel_title3").innerHTML= "<h3>Relations - "+title+"</h3>";
        document.getElementById("relation-panel").innerHTML = document.getElementById("relation-panel-1").innerHTML;
        document.getElementById("relation-panel-1").innerHTML="";

        /* $('.tree li').addClass('parent_li').find(' > span').attr('title', 'Collapse this branch');
            $('.tree li.parent_li > span').on('click', function (e) { 
                var treeIds = e.target.id.split(',');
                var treeURL="/SciCrunchKS/index.php/Tree/view/"+treeIds[0]+"/false/"+treeIds[1];
                //alert(treeURL);
                loadTree(treeURL);
    
            });*/
        expandTree=true;
        $('.tree li').addClass('parent_li').find(' > span').attr('title', 'Collapse this branch');
            $('.tree li.parent_li > span').on('click', function (e) { 
                var treeIds = e.target.id.split(',');
                var treeURL = "/SciCrunchKS/index.php/Tree_with_tabs/view/"+treeIds[0]+"/false/"+treeIds[1]+"/"+treeTabID; 
                loadTree(treeURL);
    
            });


        window.location.hash = '#relations';
        setCookie('screen_state','relations',365); 
        $('html,body').scrollTop(0);
        
        
    });
    
    /* $("#relation-fullscreen").click(function (e) {
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
        
        
        
    }); */
    
    /*
    $("#summary-fullscreen").click(function (e) {
        e.preventDefault();
        
        var $this = $(this);
    
        if ($this.children('i').hasClass('glyphicon-resize-full'))
        {
            $this.children('i').removeClass('glyphicon-resize-full');
            $this.children('i').addClass('glyphicon-resize-small');
            document.getElementById("summary-panel").setAttribute("style", "min-height: 100%; max-height: 100%");
            window.location.hash = '#definition';
            setCookie('screen_state','definition',365);
        }
        else if ($this.children('i').hasClass('glyphicon-resize-small'))
        {
            $this.children('i').removeClass('glyphicon-resize-small');
            $this.children('i').addClass('glyphicon-resize-full');
            document.getElementById("summary-panel").setAttribute("style", "min-height: 50%; max-height: 50%;overflow-y: scroll");
            history.pushState('', document.title, window.location.pathname);
            setCookie('screen_state','',365);
            
        }
        $(this).closest('.panel').toggleClass('panel-fullscreen');
        
        
        
    }); */
    $("#summary-fullscreen").click(function (e) {
        e.preventDefault();
        
        var $this = $(this);
        
        /*document.getElementById("summaryOutter").className = "collapse";
        document.getElementById("summaryOutter0").className = "col-md-12";      
        document.getElementById("dataspaceOutter").className = "col-md-6";*/
            document.getElementById("summaryOutter0").className="col-md-12";
            document.getElementById("summaryOutter1").className="collapse";
            document.getElementById("summaryOutter2").className="collapse";
            document.getElementById("dataspaceOutter").className="col-md-6";
            document.getElementById("summaryOutter").className = "collapse";
            document.getElementById("innerLiterature").className = "col-md-6";
            document.getElementById("innerRelation").className="col-md-6";
        
        
        
        
        //var title = getCookie('title');
        //var title = getCookie(window.location.href+'-title');
        
        
        document.getElementById("panel_title").innerHTML= "<h3>"+title+"</h3>";
        document.getElementById("dataspace_panel0").innerHTML = 
                document.getElementById("summary-panel").innerHTML;
        
        document.getElementById("dataspace_panel0").setAttribute("style", "min-height:100%; max-height:100%;overflow-y: scroll"); 
        
        //var curie = getCookie('curie');
        //var pageName = getCookie('pageName');
            
            
        window.location.hash = '#summary';
        setCookie('screen_state','summary',365);
        
    });
    
    

    
    //Toggle fullscreen
    $("#panel-fullscreen").click(function (e) {
        e.preventDefault();
        
        var $this = $(this);
        
        
        
    
        if ($this.children('i').hasClass('glyphicon-resize-full'))
        {
            //$this.children('i').removeClass('glyphicon-resize-full');
            //$this.children('i').addClass('glyphicon-resize-small');
            

             //document.getElementById("summaryOutter0").className = "col-md-12";
             //document.getElementById("dataspaceOutter").className = "collapse";
             
            document.getElementById("summaryOutter0").className="col-md-12";
            document.getElementById("summaryOutter1").className="collapse";
            document.getElementById("summaryOutter2").className="collapse";
            document.getElementById("dataspaceOutter").className="collapse";
            document.getElementById("summaryOutter").className = "col-md-6";
            document.getElementById("innerLiterature").className = "col-md-6";
            document.getElementById("innerRelation").className="col-md-6";
             
             

             //document.getElementById("dataspace_panel0").innerHTML = document.getElementById("dataspace_panel").innerHTML;
             //var summaryOutter = document.getElementById("summaryOutter").innerHTML;
             //var dataspaceOutter = document.getElementById("dataspaceOutter").innerHTML;
             //document.getElementById("summaryOutter").innerHTML = dataspaceOutter;
             //document.getElementById("dataspaceOutter").innerHTML = summaryOutter;

            //document.getElementById("dataspace_panel0").setAttribute("style", "min-height: 400%; max-height: 400%;overflow-y: scroll");
            // var title = getCookie('title');
            document.getElementById("panel_title").innerHTML="Data space - "+title;
            //var curie = getCookie('curie');
            //var pageName = getCookie('pageName');
            
            
            
            var html = httpGet("/SciCrunchKS/index.php/ViewAllData/view/"+pageName+"/0/0");
            window.location.hash = '#dataspace';
            setCookie('screen_state','dataspace',365);
        }
        /* else if ($this.children('i').hasClass('glyphicon-resize-small'))
        {
            
            alert("--------Minimize--------");
            //$this.children('i').removeClass('glyphicon-resize-small');
            //$this.children('i').addClass('glyphicon-resize-full');
            

            document.getElementById("summaryOutter0").className = "collapse";
            document.getElementById("dataspaceOutter").className = "col-md-12";
            document.getElementById("summaryOutter0").innerHTML = ""; 
            
            //var summaryOutter = document.getElementById("summaryOutter").innerHTML;
            // var dataspaceOutter = document.getElementById("dataspaceOutter").innerHTML;
            // document.getElementById("summaryOutter").innerHTML = summaryOutter;
            // document.getElementById("dataspaceOutter").innerHTML = dataspaceOutter;
             
            document.getElementById("dataspace_panel").setAttribute("style", "min-height: 23%; max-height: 23%;overflow-y: scroll");
            
            loadButtons();
            history.pushState('', document.title, window.location.pathname);
            setCookie('screen_state','',365);
            
        }*/
        //$(this).closest('.panel').toggleClass('panel-fullscreen');
        
        
        
    });
});

function openModal() {
    
        document.body.style.cursor='wait';
        document.getElementById('loadingModal').style.display = 'block';
        document.getElementById('loadingFade').style.display = 'block';
}

function closeModal() 
{
    document.body.style.cursor='default';
    document.getElementById('loadingModal').style.display = 'none';
    document.getElementById('loadingFade').style.display = 'none';
}
function httpGet(theUrl)
{
     openModal();
            /*var target = document.getElementById('spinner');
            var spinner = new Spinner(opts).spin(target);
            spinner.spin(); 
            alert(spinner);*/
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
            //spinner.stop();
            closeModal();
            //setTimeout(closeModal,5000);

            document.getElementById("dataspace_panel0").innerHTML=xmlhttp.responseText;
            
            var ks_selected_sources = getCookie('ks_selected_sources');
            ks_selected_sources = ks_selected_sources.replace(new RegExp("%2C", 'g'), ",");
            var sourceArray = ks_selected_sources.split(',');
            /*for(var i=0;i<sourceArray.length;i++)
            {
            
            var height = Math.max(document.getElementById("menu"+i).clientHeight,
            document.getElementById("menu"+i).scrollHeight,
            document.getElementById("menu"+i).offsetHeight);
            alert("height #"+i+":----- "+height);
            }
            document.getElementById("dataspace_panel0").setAttribute("style", "min-height: "+height+"; max-height: "+height+";overflow-y: scroll"); */
            var height = 5000;
            document.getElementById("dataspace_panel0").setAttribute("style", "min-height: "+height+"; max-height: "+height+";overflow-y: scroll"); 

        }
    }
    xmlhttp.open("GET", theUrl, true );
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
        eventFire(document.getElementById('panel-fullscreen0'), 'click');
        history.pushState('', document.title, window.location.pathname);
    }
    else if(screenState == 'definition' && window.location.hash == '')
    {
        setCookie('screen_state','',365);
        //alert("hash---"+window.location.hash);
        eventFire(document.getElementById('summaryOutter0'), 'click');
        history.pushState('', document.title, window.location.pathname);
    }
    else if(screenState == 'relations' && window.location.hash == '')
    {
        setCookie('screen_state','',365);
        //alert("hash---"+window.location.hash);
        eventFire(document.getElementById('panel-fullscreen2'), 'click');
        history.pushState('', document.title, window.location.pathname);
    }
    else if(screenState == 'literature' && window.location.hash == '')
    {
        setCookie('screen_state','',365);
        //alert("hash---"+window.location.hash);
        eventFire(document.getElementById('panel-fullscreen1'), 'click');
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
