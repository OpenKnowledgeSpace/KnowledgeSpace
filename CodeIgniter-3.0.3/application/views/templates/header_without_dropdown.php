<html>
<head>
	<title>Knowledge Space - Home</title>

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
          <link rel="stylesheet" type="text/css" href="/SciCrunchKS/resources/sckb.css">
          <link rel="stylesheet" type="text/css" href="/SciCrunchKS/resources/waiting.css"> 
          <link rel="stylesheet" href="/SciCrunchKS/js/sortable/css/sortable-theme-bootstrap.css" /> 
   <!-- <link href="/SciCrunchKS/resources/Knowledge_Space_files/bootstrap.min.78e7f91c0c4c.css" rel="stylesheet"> -->
    <link href="/SciCrunchKS/resources/Knowledge_Space_files/landing-page.c750721445d1.css" rel="stylesheet">
    <link href="/SciCrunchKS/resources/Knowledge_Space_files/custom.d4ef5c8a635d.css" rel="stylesheet">
   
          
          	<!-- JS Global Compulsory -->
	<script type="text/javascript" src="/assets/plugins/jquery/jquery.min.js"></script>
	<script type="text/javascript" src="/assets/plugins/jquery/jquery-migrate.min.js"></script>
	<script type="text/javascript" src="/assets/plugins/bootstrap/js/bootstrap.min.js"></script>
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
        <script src="/SciCrunchKS/application/views/js/fullscreen.js"></script>
        <script src="/SciCrunchKS/js/sortable/js/sortable.min.js"></script>

</head>
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
            //alert(document.getElementById("treeWell").innerHTML);

            document.getElementById("treeWell").innerHTML=xmlhttp.responseText;
            document.getElementById("treeWell2").innerHTML=xmlhttp.responseText;
            
            $('.tree li').addClass('parent_li').find(' > span').attr('title', 'Collapse this branch');
            $('.tree li.parent_li > span').on('click', function (e) { 
                //loadTree("/SciCrunchKS/index.php/Tree/view/"+e.target.id+"/false");
                var treeIds = e.target.id.split(',');
        //alert(treeIds[0]);
        //alert(treeIds[1]);
        
       loadTree("/SciCrunchKS/index.php/Tree/view/"+treeIds[0]+"/false/"+treeIds[1]);
    
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
        //alert(treeIds[0]);
        //alert(treeIds[1]);
        //loadTree("/SciCrunchKS/index.php/Tree/view/"+e.target.id+"/false");
       loadTree("/SciCrunchKS/index.php/Tree/view/"+treeIds[0]+"/false/"+treeIds[1]);
        
        /* var children = $(this).parent('li.parent_li').find(' > ul > li');
        if (children.is(":visible")) {
            children.hide('fast');
            $(this).attr('title', 'Expand this branch').find(' > i').addClass('icon-plus-sign').removeClass('icon-minus-sign');
        } else {
            children.show('fast');
            $(this).attr('title', 'Collapse this branch').find(' > i').addClass('icon-minus-sign').removeClass('icon-plus-sign');
        }
        e.stopPropagation(); */
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
					<img src="/img/ks6.png" alt="Logo">
                                        <span style="color:gray;text-decoration: none;background-color: none;font-size:18px;" href="/index.html">Knowledge Space</span>
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
					<ul class="nav navbar-nav">
						
                                                                <li>
                        <a href="/#about">About</a>
                    </li>
                    <li>
                        <a href="/#examples">Examples</a>
                    </li>
                    <li>
			<a href="/SciCrunchKS/index.php/pages/view/Neocortical_pyramidal_cell">Demos</a>
		    </li>
	            
		    <li>
			<a href="/SciCrunchKS/documentation.php">Documentation</a>
		    </li>
						


						<!-- Search Block -->
						<li>
							<i class="search fa fa-search search-btn"></i>
							<div class="search-open">
                                                            <form action="/SciCrunchKS/index.php/Search" method="post">
								<div class="input-group animated fadeInDown">
									<input name="keywords" type="text" class="form-control" placeholder="Search">
									<span class="input-group-btn">
										<button class="btn-u" type="submit">Go</button>
									</span>
								</div>
                                                            </form>
							</div>
						</li>
						<!-- End Search Block -->
					</ul>
				</div><!--/end container-->
			</div><!--/navbar-collapse-->
		</div>

                
 
  
  
  
  
  
  <script type="text/javascript">
		jQuery(document).ready(function() {
			App.init();
			OwlCarousel.initOwlCarousel();
			StyleSwitcher.initStyleSwitcher();
			
		});
</script>