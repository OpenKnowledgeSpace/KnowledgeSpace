##Description
KnowledgeSpace (KS) is the interface between neuroscience knowledge and data from around the world. KnowledgeSpace supplies a dynamic semantic framework that comes from existing ontologies (concepts to full ontologies), as well as data and data models. The data in KnowledgeSpace comes from either general or community-specific repositories. Repositories can drag vocabularies from KnowledgeSpace via SciCrunch, as well as push vocabularies back to KnowledgeSpace. Features of KnowledgeSpace that simplify integration and facilitate querying include:
1. Controlled vocabularies and RRIDs
2. Repository APIs
3. Common data models, open formats, and data elements
The interface which is a work in progress currently looks like an encyclopedia; but in time, we plan for the representation to look like a brain (rodent, human, etc…). KnowledgeSpace is a loose confederation of people working together to maintain the framework, data, and data models, and we welcome participation and contributions from members of the global research community (neuroscientists, ontologists, and developers). It has support from a number of projects or organizations such as the International Neuroinformatics Coordinating Facility, the Blue Brain Project, the Human Brain Project, the Neuroscience Information Framework, and others. KnowledgeSpace contains both source and remote content. You are being granted a limited license to copy anything from KnowledgeSpace as well as link to the content of KnowledgeSpace from your tools, resources, or websites. All data indexed and referenced by KnowledgeSpace, unless otherwise stated, are licensed by the respective owners of such data. Use and distribution is subject to the Terms of Use Policy by the original resource.  

##Terms of Use
As a condition of your use of KnowledgeSpace, you agree NOT to:
1. upload, post, email, transmit or otherwise make available any information, materials or other content that is illegal, harmful, threatening, abusive, harassing, defamatory, obscene, pornographic, or offensive; or that infringes another's rights, including any intellectual property rights;
2. impersonate any person or entity or falsely state or otherwise misrepresent your affiliation with a person or entity; or obtain, collect, store or modify personal information about other users;
3. upload, post, email, transmit or otherwise make available any unsolicited or unauthorized advertising, promotional materials, "junk mail," "spam," "chain letters," "pyramid schemes," or any other form of solicitation;
4. modify, adapt or hack KnowledgeSpace or falsely imply that some other site or service is associated with KnowledgeSpace; or
5. use the SciCrunch Sites/Services for any illegal or unauthorized purpose. You must not, in the use of SciCrunch Sites/Services, violate any laws in your jurisdiction (including but not limited to copyright laws).

Violation of Terms of Use: KnowledgeSpace reserves the right to investigate and prosecute violations of any of these Terms of Use to the fullest extent of the law. KnowledgeSpace may involve and cooperate with law enforcement authorities in prosecuting users who violate the Terms of Use. You acknowledge that KnowledgeSpace has no obligation to pre-screen or monitor your access to or use of KnowledgeSpace or any information, materials or other content provided or made available through KnowledgeSpace, but has the right to do so. You hereby agree that KnowledgeSpace may, in the exercise of KnowledgeSpace's sole discretion, remove or delete any entries, information, materials or other content that violates these Terms of Use or that is otherwise objectionable

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

##License
Creative Commons Attrinution-Sharealike 3.0 Unported License (CC-BY-SA) and the GNU Free Documentation License (GFDL)
