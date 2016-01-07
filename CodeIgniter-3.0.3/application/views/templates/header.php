 <html lang="en">
<head>
  <title>Scicrunch Knowledge Base</title>
 <meta charset="UTF-8">
<meta http-equiv="Content-type" content="text/html; charset=UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <link rel="stylesheet" href="http://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/css/bootstrap.min.css">
  <link rel="stylesheet" type="text/css" href="/SciCrunchKS/resources/sckb.css"> 
  
      <link rel="icon" type="image/png" href="./img/favicon-32x32.png" sizes="32x32" />
    <link rel="shortcut icon" type="image/png" href="./img/favicon-16x16.png"/>
  
  <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.3/jquery.min.js"></script>
  <script src="http://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/js/bootstrap.min.js"></script>
  
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
                    <div class="col-md-3">
                        <img width="50" height="50" src="/SciCrunchKS/resources/img/ks6.png"/>
                    </div>
                    <div class="col-md-9">
                        <a class="navbar-brand" href="/SciCrunchKS/resources/index.html">Knowledge Space</a>
                    </div>
                </div>
            </div>
            <!-- Collect the nav links, forms, and other content for toggling -->
            <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
                <ul class="nav navbar-nav navbar-right">
                    <li>
                        <!-- <a href="http://knowledge-space.org/#about">About</a> -->
                        <a href="./#about">About</a>
                    </li>
                    <li>
                        <!-- <a href="http://knowledge-space.org/#examples">Examples</a> -->
                        <a href="./#examples">Examples</a>
                    </li>
                    
                    <li>
                        <!-- <a href="http://knowledge-space.org/#examples">Examples</a> -->
                        <a href="./KnowledgeSpace.jsp">Demo</a>
                    </li>
                    
                </ul>
            </div>
            <!-- /.navbar-collapse -->
        </div>
        <!-- /.container -->
    </nav>      


