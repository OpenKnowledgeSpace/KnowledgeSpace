##Description
KnowledgeSpace (KS) is a community neuroscience encyclopaedia that links brain research concepts and terminology with data, models and literature from around the world. It is an open project and welcomes participation and contributions from members of the global research community. It has support from a number of projects or organizations such as the International Neuroinformatics Coordinating Facility, the Blue Brain Project, the Human Brain project, the Neuroscience Information Framework and others.  

##Requirements
1. PHP version: PHP 5.4.40+
2. Web server: Apache web server

##Technical details
The KS utilizes the CodeIgniter-3.0.3 to the maintain the Model View Controller(MVC) structure. For example, the URL such as
/NeuroKS/index.php/pages/view/UBERON:0001950 will first access the controllers/Pages.php and then the view function in the class. The Pages class extends CI_Controller, which is the controller in the MVC structure. 

The PHP file at /controllers/ServiceUtil.php contains all utility functions for accessing the data through the REST API.


##Installation
1. Check out the latest source code
2. Copy or move KnowledgeSpace/* to your $apache_document_root (For example, /var/www/html)

##Configuration
1. Edit $apache_document_root/NeuroKS/application/config/config.json.
  1. enable_caching - Enable caching webpages for the faster runtime.
  2. cache_folder - The folder for storing the cached data.
  3. sources - Append additional source items to the "sources" array for the dataspace.
2. Change the background image: Edit parallax-slider.css
