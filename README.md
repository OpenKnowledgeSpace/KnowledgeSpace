##Description
KnowledgeSpace (KS) is a community encyclopaedia that links brain research concepts with data, models and literature from around the world. It is an open project and welcomes participation and contributions from members of the global research community. 

##Requirements
Requirement: PHP 5
Framework: CodeIgniter-3.0.3
Web server: Apache web server

##Technical details
The KS utilizes the CodeIgniter to the maintain the Model View Controller(MVC) structure. For example, the URL such as
/SciCrunchKS/index.php/pages/view/pyramidal_cell will first access the controllers/Pages.php and then the view function in the class. The Pages class extends CI_Controller, which is the controller in the MVC structure. 

The PHP file at /controllers/ServiceUtil.php contains all utility functions for accessing the data through the REST API.


##Installation
1. Check out the latest source code
2. Copy or move KnowledgeSpace/* to your $apache_document_root (For example, /var/www/html)

##Configuration
1. Edit $apache_document_root/NeuroKS/application/config/config.json
..* enable_caching - Enable caching webpages for faster runtime.
..2. cache_folder - The folder for storing the cached data.
..3. sources - Add additional sources for the dataspace.
2. Change the background image: Edit parallax-slider.css
