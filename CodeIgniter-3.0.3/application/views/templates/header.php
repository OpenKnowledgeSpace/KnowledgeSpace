<html>
<head>
  <title>Scicrunch Knowledge Base</title>
 <meta charset="UTF-8">
<meta http-equiv="Content-type" content="text/html; charset=UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
<!--  <link rel="stylesheet" href="http://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/css/bootstrap.min.css">
   -->	
  <!-- <link rel="stylesheet" href="/SciCrunchKS/css/bootstrap.min.css"> -->
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css"> 
<!--  <link rel="stylesheet" href="/SciCrunchKS/application/views/css/bootstrap.min.css">
-->
  <link rel="stylesheet" type="text/css" href="/SciCrunchKS/resources/sckb.css"> 
  <link rel="stylesheet" type="text/css" href="/SciCrunchKS/resources/panel.css"> 
      <link rel="icon" type="image/png" href="./img/favicon-32x32.png" sizes="32x32" />
    <link rel="shortcut icon" type="image/png" href="./img/favicon-16x16.png"/>
 <!-- 
  <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.3/jquery.min.js"></script>
  <script src="http://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/js/bootstrap.min.js"></script>
 -->

  <script src="/SciCrunchKS/application/views/js/jquery.min.js"></script>
  <script src="/SciCrunchKS/application/views/js/bootstrap.min.js"></script>

  <script src="/SciCrunchKS/application/views/js/fullscreen.js"></script>

<script src="/SciCrunchKS/js/sortable/js/sortable.min.js"></script>
<link rel="stylesheet" href="/SciCrunchKS/js/sortable/css/sortable-theme-bootstrap.css" />

 
    <!-- <script src="myGraph.js"></script> -->
    
        <title>Knowledge Space | App</title>

    <!-- Bootstrap Core CSS -->
    <link href="/SciCrunchKS/resources/Knowledge_Space_files/bootstrap.min.78e7f91c0c4c.css" rel="stylesheet">

    <!-- Custom CSS -->
    <link href="/SciCrunchKS/resources/Knowledge_Space_files/landing-page.c750721445d1.css" rel="stylesheet">
    <link href="/SciCrunchKS/resources/Knowledge_Space_files/custom.d4ef5c8a635d.css" rel="stylesheet">
    

    <!-- Custom Fonts -->
    <link href="/SciCrunchKS/resources/Knowledge_Space_files/font-awesome.min.feda974a77ea.css" rel="stylesheet" type="text/css">
    <link href="/SciCrunchKS/resources/Knowledge_Space_files/css" rel="stylesheet" type="text/css">
    

    
    <script type="text/javascript">
    function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for(var i=0; i<ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1);
        if (c.indexOf(name) == 0) return c.substring(name.length,c.length);
    }
    return "";
}
function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    var expires = "expires="+d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";path=/; " + expires;
}

function updateCategoryStatus(id)
{
    var json_str = getCookie('ks_selected_categories');
    json_str=json_str.replace(new RegExp("%2C", 'g'), ",");
    //alert("-----NEW JSON:"+json_str);
    var array = json_str.split(',');
    
    var found = false;
    var i = 0;
    for(i=0;i<array.length;i++)
    {
        //alert("Array ITEM====="+array[i]);
        var item = array[i];
        if(item == id)
        {
            found = true;
            break;
        }
    }

    if (document.getElementById(id).checked) 
    {
            if(!found)
            {
                array.push(id);
            }
    } 
    else 
    {
            if(found)
            {
                array.splice(i,1);
            }
            
    }
    var str = array.join(",");
    setCookie('ks_selected_categories',str,365);
    loadButtons();
}

function updateSourceStatus(id)
{

    
    var json_str = getCookie('ks_selected_sources');
    //alert(json_str);
    //json_str=json_str.replace("%2C",",");
    json_str=json_str.replace(new RegExp("%2C", 'g'), ",");
    //alert("-----NEW JSON"+json_str);
    var array = json_str.split(',');
    
    var found = false;
    var i = 0;
    for(i=0;i<array.length;i++)
    {
        //alert("Array ITEM====="+array[i]);
        var item = array[i];
        if(item == id)
        {
            found = true;
            break;
        }
    }
    //alert("test:"+found);
    if (document.getElementById(id).checked) 
    {
            //alert(id+"--checked");
            if(!found)
            {
                array.push(id);
                //alert("pushed:"+id);
            }
    } 
    else 
    {
            //alert(id+"--NOT checked");
            if(found)
            {
                array.splice(i,1);
                //alert("splice index:"+i);
            }
            
    }
    var str = array.join(",");
    //alert("final string:"+str);
    setCookie('ks_selected_sources',str,365);
    loadButtons();
}


function prepareCookies()
{
if(document.cookie.indexOf("ks_selected_sources") < 0)
{
    //alert("Cookie is NOT set");
   setCookie('ks_selected_sources','nlx_151885-1,nif-0000-00006-1,nif-0000-00130-1,nif-0000-00054-1,nif-0000-37639-1,scr_013705-1,nif-0000-00004-1,nlx_152590-1',365);
   //alert("Cookie now:"+getCookie('ks_selected_sources'));
}
//else
    //alert("Cookie is set");

if(document.cookie.indexOf("ks_selected_categories") < 0)
    setCookie('ks_selected_categories','Physiology,Expression,Models,Anatomy,Morphology',365);

}

window.onpaint = prepareCookies();


</script>

</head>
<body>
  <script type="text/javascript">
        $(function () {
    $('.tree li:has(ul)').addClass('parent_li').find(' > span').attr('title', 'Collapse this branch');
    $('.tree li.parent_li > span').on('click', function (e) {
        var children = $(this).parent('li.parent_li').find(' > ul > li');
        if (children.is(":visible")) {
            children.hide('fast');
            $(this).attr('title', 'Expand this branch').find(' > i').addClass('icon-plus-sign').removeClass('icon-minus-sign');
        } else {
            children.show('fast');
            $(this).attr('title', 'Collapse this branch').find(' > i').addClass('icon-minus-sign').removeClass('icon-plus-sign');
        }
        e.stopPropagation();
    });
});
    </script>





<!-- Navigation -->
    <nav class="navbar navbar-default navbar-fixed-top" role="navigation">
        <div class="container">
            <!-- Brand and toggle get grouped for better mobile display -->
            <div class="navbar-header">
                <button type="button" class="navbar-toggle" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1">
                    <span class="sr-only">Toggle navigation</span>
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                </button>
                <div class="row">
                        <img width="50" height="50" src="/SciCrunchKS/resources/img/ks6.png"/>
                        <a style="color:gray;text-decoration: none;background-color: none;font-size:18px;" href="/index.html">Knowledge Space</a>
                </div>
            </div>
            <!-- Collect the nav links, forms, and other content for toggling -->
            <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
                <ul class="nav navbar-nav navbar-right">
                    <li>
                        <a href="/#about">About</a>
                    </li>
                    <li>
                        <a href="/#examples">Examples</a>
                    </li>
                    
                    <!--
                    <li>
                        <a href="/SciCrunchKS/index.php/pages/view/Neocortical_pyramidal_cell">Demos</a>
                    </li>  -->
                    <li class="dropdown">
                    <a class="dropdown-toggle" data-toggle="dropdown" href="#">Demos
                    <span class="caret"></span></a>
                    <ul class="dropdown-menu">
                      <li><a href="/SciCrunchKS/index.php/pages/view/Neocortical_pyramidal_cell">View demo</a></li>
                      <li><a href="#" data-toggle="modal" data-target="#demoModal">Configurations</a></li>
                      
                    </ul>
                  </li>
                    
                    
                    
		    <li>
			<a href="/SciCrunchKS/documentation.php">Documentation</a>
                    </li>
                </ul>
            </div>
            <!-- /.navbar-collapse -->
        </div>
        <!-- /.container -->
    </nav>      


  <!-- Modal -->
  <div class="modal fade" id="demoModal" role="dialog">
    <div class="modal-dialog modal-lg">
      <div class="modal-content">
        <div class="modal-header">
          <button id="closeBtn" type="button" class="close" data-dismiss="modal" onclick="loadButtons()">&times;</button>
          <h4 class="modal-title">Configurations</h4>
        </div>
        <div class="modal-body">
          
            <div class="row">
                <div class="col-md-6" >
                    <table class="table" border="0">
                        <thead>
                        <tr>
                          <th>Category</th>
                        </tr>
                      </thead>
<?php

                        $categories_string = "";
                        if(isset($_COOKIE['ks_selected_categories']))
                            $categories_string=$_COOKIE['ks_selected_categories'];
                        else
                        {
                            if(isset($ks_selected_categories))
                            {
                                $categories_string=$ks_selected_categories;
                            }
                        }
                        //echo "category string-----".$categories_string;
                        $ks_selected_categories = explode(",", $categories_string);
                        //var_dump($ks_selected_categories);
                        foreach ($categories as $category) 
                        {
                            //if(strcmp($category[1],"true")==0)
                            if(in_array($category[0], $ks_selected_categories))
                                echo "<tr><td><input type=\"checkbox\" id=\"" .$category[0]."\" onclick=\"updateCategoryStatus(this.id);\" checked>";
                            else 
                                echo "<tr><td><input type=\"checkbox\" id=\"" .$category[0]."\" onclick=\"updateCategoryStatus(this.id);\">";
                                
                            echo $category[0];
                            echo "</input></tr></td>";
                        }  

?>
                        
                        
                    </table>
                    
                </div>
 
                <div class="col-md-6" >
                    <table class="table" border="0">
                        <thead>
                        <tr>
                          <th>Sources</th>
                        </tr>
                      </thead>
                      
<?php                   
                        $ks_selected_json = "";
                        if(isset($_COOKIE['ks_selected_sources']))
                        {
                            $ks_selected_json = $_COOKIE['ks_selected_sources'];
                        }
                        else
                        {
                            if(isset($ks_selected_sources))
                            {
                                $ks_selected_json = $ks_selected_sources;
                            }
                        }
                        //echo "\n\njson----------".$ks_selected_json."------------";
                        //echo "----------JSON----\n\n";
                        $ks_selected_sources = explode(",", $ks_selected_json);
                        ////json_decode($ks_selected_json);
                        //var_dump($ks_selected_sources);
                        //echo "----------END JSON----\n\n";
                        
                        foreach ($ks_sources as $source) 
                        {
                            //if(strcmp($source[2],"true")==0)
                            if(in_array($source[1], $ks_selected_sources ))
                                echo "<tr><td><input type=\"checkbox\" id=\"".$source[1]."\" onclick=\"updateSourceStatus(this.id);\" checked>";
                            else 
                                echo "<tr><td><input type=\"checkbox\" id=\"".$source[1]."\" onclick=\"updateSourceStatus(this.id);\">";
                                
                            echo $source[0];
                            echo "</input></tr></td>";
                        }   
                       
?>                       
                        
                    </table>
                    
                </div>
                
                
                
            </div>
            
            
        </div>
        <div class="modal-footer">
            <!-- <button type="button" class="btn btn-default"  onclick="javascript:window.location='http://google.com'">Save</button> -->
            <!-- <button type="button" class="btn btn-default"  onclick="window.location.reload()">Save</button> -->
            <button  type="button" class="btn btn-default" data-dismiss="modal" onclick="loadButtons()">Done</button>
            
            <!-- data-dismiss="modal" -->
        </div>
      </div>
    </div>
  </div>