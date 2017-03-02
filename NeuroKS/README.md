# Repository Structure

CodeIgniter
CodeIgniter Rest API

/NeuroKS/ This is currently the apache root.
  application/
    config/
	  routes.php This is where wiki is mapped to pages/views more can be added
	  config.json Parameters here can be used to configure the behavior of individual panels. The panel is not specified, the contoller code (eg inner*.php) will need to specify which key is used. (It might help a new dev if we can provide a mapping from the panel to the config file). 
	controllers/
	  API.php (modify it, not consistent, not using the code igniter rest api) need to change how we subclass the controller.
	  Pages.php (every page extends CI_Controller)
	  	`public function view` this directs us to a page, pages/view/{} sometimes multiple params, most importantly is UBERON:0000955 (for example), at the end we will load the header, the page (layout4.php), and the footer
	  Data_sources.php Example of a 'static' page. It will route directly because its controller has the same name as the page we link to in the header.
	views/
	  pages/
	    layout4.php we have a layout on top of bootstrap which will probably change, this is where we deserialize all the objects after fetching and transformation from the services controller, here we also load inner php for the panels (eg innerLexicon.php). *This is where you can enable or disable panels.* There is also javascript for panels, use the js to make an ajax call (for tree in this case). Here is also where js is bound to panel php code (eg innerLierature is bound to js/highcharts.js).
        innerRelations.php Renders data from controller Tree*.php
	  js/ Sometimes you need to put js files here if there are import problems. Otherwise put them in /NeuroKS/js/

	models/ (if needed, not used, the json object is our model) Database interaction should go here, but web services calls do not.
	  CustomTree.php This is a container class the stores all the parameters for the tree it is imported by the controller Tree*.php.

  assets/  This is all the boostrap layout stuff that has an external source. DO NOT MODIFY.
  css/  Default bostrap css
  files/  Static files.
  img/  Static homepage content.
  js/ Main location for javascript files.
    highcharts.js Example of panel specific javascript.
	fullscreen_layout.js This is where pretty much everything happens. We should probably break it up. Need to use consistent identifers in the div tags so we dont have collisions.
  nbproject/  DELETE
  resources/  Custom css goes here. CLEANUP and reoranize files from here.
    ABA/ ?? images from allen because we can't pull them
    source_description/ We query files here for source descriptions. Referenced by a view.
	panel.css Custom css for fullscreen view of panels.
	images/ ??
	img/ KS logo goes here 
  static/ ?? Not sure what this is. CLEANUP
  system/ codeigniter
  userguide/ codeigniter
  Knowledge_Space_files/ static, but need to do some cleanup here

