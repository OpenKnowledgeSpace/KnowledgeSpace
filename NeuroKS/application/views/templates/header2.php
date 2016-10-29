<html>
<head>
	<title>KnowledgeSpace - <?php echo $page_title; ?></title>

	<!-- Meta -->
	<meta charset="utf-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<meta name="description" content="">
	<meta name="author" content="">

	<!-- Favicon -->
	<!-- <link rel="shortcut icon" href="favicon.ico"> -->
        <link rel="icon" type="image/png" href="/img/favicon-32x32.png" sizes="32x32" />
	<!-- Web Fonts -->
	<link rel='stylesheet' type='text/css' href='//fonts.googleapis.com/css?family=Open+Sans:400,300,600&amp;subset=cyrillic,latin'>

	<!-- CSS Global Compulsory -->
	<link rel="stylesheet" href="/assets/plugins/bootstrap/css/bootstrap.min.css">
	<link rel="stylesheet" href="/assets/css/style.css">

	<!-- CSS Header and Footer -->
	<link rel="stylesheet" href="/assets/css/headers/header-default.css">
	<link rel="stylesheet" href="/assets/css/footers/footer-v1.css">

	<!-- CSS Implementing Plugins -->
	<link rel="stylesheet" href="/assets/plugins/animate.css">
	<link rel="stylesheet" href="/assets/plugins/line-icons/line-icons.css">
	<link rel="stylesheet" href="/assets/plugins/font-awesome/css/font-awesome.min.css">
	<link rel="stylesheet" href="/assets/plugins/parallax-slider/css/parallax-slider.css">
	<link rel="stylesheet" href="/assets/plugins/owl-carousel/owl-carousel/owl.carousel.css">

	<!-- CSS Theme -->
	<link rel="stylesheet" href="/assets/css/theme-colors/default.css" id="style_color">
	<link rel="stylesheet" href="/assets/css/theme-skins/dark.css">

	<!-- CSS Customization -->
	<link rel="stylesheet" href="/assets/css/custom.css">
        <link href="/static/css/custom.d4ef5c8a635d.css" rel="stylesheet">
          <link rel="stylesheet" type="text/css" href="/resources/sckb.css">
          <link rel="stylesheet" type="text/css" href="/resources/waiting.css"> 
          <link rel="stylesheet" href="/js/sortable/css/sortable-theme-bootstrap.css" /> 
           <link rel="stylesheet" href="/js/sortable/css/sortable-theme-finder.css" />
   <!-- <link href="/resources/Knowledge_Space_files/bootstrap.min.78e7f91c0c4c.css" rel="stylesheet"> -->
    <link href="/resources/Knowledge_Space_files/landing-page.c750721445d1.css" rel="stylesheet">
    <link href="/resources/Knowledge_Space_files/custom.d4ef5c8a635d.css" rel="stylesheet">
   
          
          	<!-- JS Global Compulsory -->
	<script type="text/javascript" src="/assets/plugins/jquery/jquery.min.js"></script>
	<script type="text/javascript" src="/assets/plugins/jquery/jquery-migrate.min.js"></script>
	<script type="text/javascript" src="/assets/plugins/bootstrap/js/bootstrap.min.js"></script>
	
        <!-- ICON --->
        <link rel="stylesheet" href="/assets/plugins/line-icons-pro/styles.css">
	<link rel="stylesheet" href="/assets/plugins/line-icons/line-icons.css">

        
        
        <!-- JS Implementing Plugins -->
	<script type="text/javascript" src="/assets/plugins/back-to-top.js"></script>
	<script type="text/javascript" src="/assets/plugins/smoothScroll.js"></script>
	<script type="text/javascript" src="/assets/plugins/parallax-slider/js/modernizr.js"></script>
	<script type="text/javascript" src="/assets/plugins/parallax-slider/js/jquery.cslider.js"></script>
	<script type="text/javascript" src="/assets/plugins/owl-carousel/owl-carousel/owl.carousel.js"></script>
	<!-- JS Customization -->
	<script type="text/javascript" src="/assets/js/custom.js"></script>
	<!-- JS Page Level -->
	<script type="text/javascript" src="/assets/js/app.js"></script>
	<script type="text/javascript" src="/assets/js/plugins/owl-carousel.js"></script>
	<script type="text/javascript" src="/assets/js/plugins/style-switcher.js"></script>
	<script type="text/javascript" src="/assets/js/plugins/parallax-slider.js"></script>
        <!-- Custom js -->
        <!-- <script src="/application/views/js/fullscreen.js"></script> -->
        <script src="/js/fullscreen_layout.js?<?php echo time(); ?>"></script>
        <script src="/js/sortable/js/sortable.min.js"></script>
        
        <!-- Adding hypothesis javascript -->
        <script async defer src="https://hypothes.is/embed.js"></script>
    <script>
        (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
        (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
        m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
        })(window,document,'script','https://www.google-analytics.com/analytics.js','ga');

        ga('create', 'UA-76646751-1', 'auto');
        ga('send', 'pageview');

    </script>

</head>
<script type="text/javascript">
   // var ks_sources= ['nlx_151885-1','nif-0000-00006-1','nif-0000-00130-1','nif-0000-00054-1','nif-0000-37639-1','scr_013705-1','nif-0000-00004-1','nlx_152590-1'];
   // var ks_categories= ['Physiology','Expression','Models','Anatomy','Morphology'];
    
    var treeTabID=1;
    var expandTree = false;
    var dataspace_selected_tab = 0;
    
    function updateLitTab(lid)
    {
        //alert(lid);
        if(lid == 1)
        {
            document.getElementById("lit3").className = "active";
            document.getElementById("lit4").className = "";
            
            document.getElementById("litContent3").className = "tab-pane fade in active";
            document.getElementById("litContent4").className = "tab-pane";
        }
        else if(lid == 2)
        {
            document.getElementById("lit4").className = "active";
            document.getElementById("lit3").className = "";
            
            document.getElementById("litContent4").className = "tab-pane fade in active";
            document.getElementById("litContent3").className = "tab-pane";
        }
        else if(lid == 3)
        {
            
            document.getElementById("litTab1").className = "active";
            document.getElementById("litTab2").className = "";
            
            
            document.getElementById("litContent1").className = "tab-pane fade in active";
            document.getElementById("litContent2").className = "tab-pane";
            
            //alert(document.getElementById("litTab1").className);
            //alert(document.getElementById("litContent1").className);
        }
        else if(lid == 4)
        {
            document.getElementById("litTab2").className = "active";
            document.getElementById("litTab1").className = "";
            
            document.getElementById("litContent2").className = "tab-pane fade in active";
            document.getElementById("litContent1").className = "tab-pane";
        }
            
        
    }
    
    function updateTreeTabID(tid)
    {
        treeTabID=tid;
        //alert(treeTabID);
    }
    
    function updateConfig()
    {
       // alert("updateConfig()");
       // var categoryCheckboxes = "";
        var json_str2 = getCookie('ks_selected_categories');
        json_str2=json_str2.replace(new RegExp("%2C", 'g'), ",");
        var array2 = json_str2.split(',');
        for(var i=0;i<array2.length;i++)
        {
            document.getElementById(array2[i]).checked = true;
        }
        
        json_str2 = getCookie('ks_selected_sources');
        json_str2=json_str2.replace(new RegExp("%2C", 'g'), ",");
        var array2 = json_str2.split(',');
        for(var i=0;i<array2.length;i++)
        {
            document.getElementById(array2[i]).checked = true;
        }
        
        /*for(var i=0;i<ks_categories.length;i++)
        {
            
            if((array.indexOf(ks_categories[i]) == -1))
                categoryCheckboxes = categoryCheckboxes+"\n<tr><td><input type=\"checkbox\" id=\"" +ks_categories[i]+"\" onclick=\"updateCategoryStatus(this.id);\">"+ks_categories[i]+
                "</input></tr></td>";
            else
                categoryCheckboxes = categoryCheckboxes+"\n<tr><td><input type=\"checkbox\" id=\"" +ks_categories[i]+"\" onclick=\"updateCategoryStatus(this.id);\" checked>"+ks_categories[i]+
                "</input></tr></td>";
        }*/
        //alert(categoryCheckboxes);
        //document.getElementById("categoryConfig").innerHTML=categoryCheckboxes;
    }
    
    
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
//if(document.cookie.indexOf("ks_selected_sources") < 0)
   setCookie('ks_selected_sources','nlx_151885-1,nif-0000-00006-1,nif-0000-00130-1,nif-0000-00054-1,nif-0000-37639-1,scr_013705-1,nif-0000-00004-1,nlx_152590-1,nif-0000-00088-1,nif-0000-00339-1,nif-0000-00508-5,nif-0000-00508-4,nlx_154697-8,SCR_014306-1',365);
   




//if(document.cookie.indexOf("ks_selected_categories") < 0)
    setCookie('ks_selected_categories','Physiology,Expression,Models,Anatomy,Morphology',365);

}



window.onpaint = prepareCookies();


</script>

<!---Counting runtime--->
<script type="text/javascript">
<?php
    if(isset($startTime))
        echo "var timerStart = ".$startTime.";";
    else
        echo "var timerStart = Date.now();";
?> 
</script>

</head>
<body>
  <script type="text/javascript">
      
      

      
      
function loadTree(theUrl)
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
            //alert("Load tree"+xmlhttp.responseText);
           //alert("---relation--Panel:"+document.getElementById("relation-panel"));
           if(!expandTree)
            document.getElementById("relation-panel-1").innerHTML=xmlhttp.responseText;
           else
            document.getElementById("relation-panel").innerHTML=xmlhttp.responseText;
            //document.getElementById("treeWell").innerHTML=xmlhttp.responseText;
            //document.getElementById("treeWell2").innerHTML=xmlhttp.responseText;
            
            $('.tree li').addClass('parent_li').find(' > span').attr('title', 'Collapse this branch');
            $('.tree li.parent_li > span').on('click', function (e) { 
                //loadTree("/index.php/Tree/view/"+e.target.id+"/false");
                //alert(e.target.id);
                var treeIds = e.target.id.split(',');

        /*var treeURL = "/index.php/Tree/view/"+treeIds[0]+"/false/"+treeIds[1]; 
        loadTree(treeURL);
        
        
        var treeURL = "/index.php/Has_proper_part/view/"+treeIds[0]+"/false/"+treeIds[1]; 
        loadTree(treeURL);*/
        var treeURL = "/index.php/Tree_with_tabs2/view/"+treeIds[0]+"/false/"+treeIds[1]+"/"+treeTabID; 
        //alert("LoadTree:"+treeURL);
        loadTree(treeURL);
            });
        
        }
    }
    xmlhttp.open("GET", theUrl, true );
    xmlhttp.send();    
}
      
      
      
      
      
$(function () {
    //$('.tree li:has(ul)').addClass('parent_li').find(' > span').attr('title', 'Collapse this branch');
    $('.tree li').addClass('parent_li').find(' > span').attr('title', 'Collapse this branch');

    $('.tree li.parent_li > span').on('click', function (e) {
        
        
        //alert(e.target.id);
        var treeIds = e.target.id.split(',');

        var treeURL = "/index.php/Tree_with_tabs2/view/"+treeIds[0]+"/false/"+treeIds[1]+"/"+treeTabID; 
        //alert(treeURL);
        loadTree(treeURL);

    });
});
    </script>

<body data-spy="scroll" data-target=".navbar" data-offset="50">
	<div class="wrapper">
		<!--=== Header ===-->
		<div class="header">
			<div class="container">
				<!-- Logo -->
				<a class="logo" href="/index.html">
					<img src="/img/ks7.png" alt="Logo">
                                        <span style="color:gray;text-decoration: none;background-color: none;font-size:18px;" href="/index.html">KnowledgeSpace</span>
				</a>
                                
				<!-- End Logo -->


				<!-- Toggle get grouped for better mobile display -->
				<button type="button" class="navbar-toggle" data-toggle="collapse" data-target=".navbar-responsive-collapse">
					<span class="sr-only">Toggle navigation</span>
					<span class="fa fa-bars"></span>
				</button>
				<!-- End Toggle -->
			</div><!--/end container-->

			<!-- Collect the nav links, forms, and other content for toggling -->
			<div class="collapse navbar-collapse mega-menu navbar-responsive-collapse">
				<div class="container">
                    <?php
                        if(!isset($disableTopSearchBar))
                        {
                            
                    ?>
                    <center>			
                    <!-- <form action="/index.php/Search" method="post"> -->
                    <form action="/Search" method="post">
		    <input id="header_search" name="keywords" type="text" size="50" placeholder="Search">
                        
			<button class="btn-u btn-u-sm btn-u-blue" type="submit" onclick="return ksTrackEvent('Button', 'Search from the header', document.getElementById('header_search').value);">Go</button>
                       
									
							
                    </form></center>	
                    <?php
                        }
                        ?>
		      
					<ul class="nav navbar-nav">
		
                    <!-- Search Block -->
                    <?php
                        //if(!isset($disableTopSearchBar))
                        //{
                            
                    ?>
                    <!-- <li><center>			
                    <form action="/index.php/Search" method="post">
		    <input name="keywords" type="text" size="50" placeholder="Search">
                        
			<button class="btn-u btn-u-sm btn-u-blue" type="submit" >Go</button>
                       
									
							
                    </form></center>			
		     </li>  -->
                     <?php
                       // }
                        ?>
                            
			<!-- End Search Block -->
                    <!-- <li>
                        &nbsp;&nbsp;&nbsp;&nbsp;
                    </li> -->
                    <li>
                        <a href="/About">About</a>
                    </li>
                    <li>
                        <a href="/Data_sources">Data Sources</a>
                    </li>
                    <li>
                        <!-- <a href="/index.php/Categories">Categories</a> -->
                         <a href="/category/organism">Categories</a> 
                    </li>
                    <!-- <li>
                        <a href="/#examples">Examples</a>
                    </li> -->
	            <!-- <li class="dropdown">
                        <a href="javascript:void(0);" class="dropdown-toggle" data-toggle="dropdown">
								Demo
							</a>

                      <ul class="dropdown-menu">
                      <li><a href="/index.php/pages/view/Neocortical_pyramidal_cell">View demo</a></li>
                      <li><a href="#" data-toggle="modal" data-target="#demoModal">Configurations</a></li>
                      </ul>
                    </li> -->
		    <li>
			<!-- <a href="/documentation.php">Documentation</a> -->
                        <a href="/Documentation">Documentation</a>
		    </li>
                    <!-- <li>
                        <img width="85px" height="auto"  src="/Knowledge_Space_files/human-brain-project.8f47bd2d109f.jpg">
                    </li> -->
                    <?php if($enable_config){?>
                    <!-- <li>
                        <a href="#" data-toggle="modal" data-target="#demoModal" onclick="updateConfig()">Configurations</a>
		    </li> -->
                    <?php } ?>

						<!-- Search Block -->
						<!-- <li>
							<i class="search fa fa-search search-btn"></i>
							<div class="search-open">
                                                            <form action="/index.php/Search" method="post">
								<div class="input-group animated fadeInDown">
									<input name="keywords" type="text" class="form-control" placeholder="Search">
									<span class="input-group-btn">
										<button class="btn-u btn-u-blue" type="submit">Go</button>
									</span>
								</div>
                                                            </form>
							</div>
						</li> -->
						<!-- End Search Block -->
					</ul>
				</div><!--/end container-->
			</div><!--/navbar-collapse-->
		</div>

                
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
                      <tbody id="categoryConfig">
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
                        
                        $ks_selected_categories = explode(",", $categories_string);
                        
                        foreach ($categories as $category) 
                        {
                            
                            //if(in_array($category[0], $ks_selected_categories))
                            //    echo "<tr><td><input type=\"checkbox\" id=\"" .$category[0]."\" onclick=\"updateCategoryStatus(this.id);\" checked>";
                            //else 
                                echo "<tr><td><input type=\"checkbox\" id=\"" .$category[0]."\" onclick=\"updateCategoryStatus(this.id);\">";
                                
                            echo $category[0];
                            echo "</input></tr></td>";
                        }  

?>
                      </tbody>
                        
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
                            
                            //if(in_array($source[1], $ks_selected_sources ))
                            //    echo "<tr><td><input type=\"checkbox\" id=\"".$source[1]."\" onclick=\"updateSourceStatus(this.id);\" checked>";
                            //else 
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
  
  
  
  
  
  <script type="text/javascript">
		jQuery(document).ready(function() {
			App.init();
			OwlCarousel.initOwlCarousel();
			StyleSwitcher.initStyleSwitcher();
			
		});
</script>
