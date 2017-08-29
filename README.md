## Description
KnowledgeSpace Public Beta is the interface between neuroscience knowledge and data from around the world. KnowledgeSpace (KS) supplies a dynamic semantic framework that comes from existing ontologies (concepts to full ontologies), as well as data and data models. The data in KnowledgeSpace comes from either general or community-specific repositories. Repositories can drag vocabularies from KnowledgeSpace via SciCrunch, as well as push vocabularies back to KnowledgeSpace. Features of KnowledgeSpace that simplify integration and facilitate querying include:

1. Controlled vocabularies and RRIDs
2. Repository APIs
3. Common data models, open formats, and data elements

The interface which is a work in progress currently looks like an encyclopedia; but in time, we plan for the representation to look like a brain (rodent, human, etc…). KnowledgeSpace is a loose confederation of people working together to maintain the framework, data, and data models, and we welcome participation and contributions from members of the global research community (neuroscientists, ontologists, and developers). It has support from a number of projects or organizations such as the International Neuroinformatics Coordinating Facility, the Blue Brain Project, the Human Brain Project, the Neuroscience Information Framework, and others. KnowledgeSpace contains both source and remote content. You are being granted a limited license to copy anything from KnowledgeSpace as well as link to the content of KnowledgeSpace from your tools, resources, or websites. All data indexed and referenced by KnowledgeSpace, unless otherwise stated, are licensed by the respective owners of such data. Use and distribution is subject to the Terms of Use Policy by the original resource.  

## Disclaimer

1. KnowledgeSpace makes no guarantee of validity. KnowledgeSpace is an online open-content collaborative encyclopedia that is the product of a voluntary association of individuals, groups, and organizations working to develop a common resource of scientific knowledge. The governance model of KnowledgeSpace allows anyone to alter or add to its content. KnowledgeSpace cannot guarantee the validity of the information found within. The content of any given entry may have been recently changed, vandalized, or altered by someone whose opinion does not correspond with the current state of knowledge in the relevant fields. Please note that most other encyclopedias and reference works also have disclaimers.

2. No formal peer review. KnowledgeSpace is not uniformly peer reviewed. Users and contributors may correct errors or engage in casual peer review, but they have no legal duty to do so; and thus, all information contained in KnowledgeSpaceis without implied warranty of fitness for any purpose or use whatsoever. None of the contributors, sponsors, administrators, or anyone else connected with KnowledgeSpace in any way whatsoever can be responsible for the appearance of any inaccurate or libelous information or for your use of the information contained in or linked from these webpages.

3. No contract, limited licence. Please ensure that you understand that the information provided here is being provided freely and that no kind of agreement or contract is created between you and the owners and users of this website, the owners of the servers upon which it is housed, the individual KnowledgeSpace contributors, any project administrators, sysops, or anyone else who is connected with KnowledgeSpace subject to your claims against them directly. You are being granted a limited license to copy anything from KnowledgeSpace as well as link to the content of KnowledgeSpace from your tools, resources, or websites; this does not create or imply any contractual or extracontractual liability on the part of KnowledgeSpace or any of its agents, members, or organizers, or other users.There is no agreement or understanding between you and KnowledgeSpace regarding your use or modification of this information beyond the Creative Commons Attrinution-Sharealike 3.0 Unported License (CC-BY-SA) and the GNU Free Documentation License (GFDL). No one at KnowledgeSpace is responsible should someone change, edit, modify, or remove information that you posts on KnowledgeSpace.

4. Trademarks. Any of the trademark, service marks, collective marks, design rights, or similar rights mentioned used or cited in the entries of KnowledgeSpace are the property of their respective owners. Their use in KnowledgeSpace does not imply that you may use them for any purpose other than for the same or similar informational ise as contemplated by the original authors of these KnowledgeSpace entries under CC-BY-SA and GFDL licensing schemes. Unless otherwise stated, KnowledgeSpace is neither endorsed by nor affiliated with any of the holders of any such rights; and as such, KnowledgeSpace cannot grant any rights to use any otherwise protected materials. Your use of any such or similar incorporeal property is at your own risk.

5. Jurisdiction and legality of content. Publication of materials found in KnowledgeSpace may be in violation of the laws of the country or jurisdiction from where you are viewing information. The databases providing content to KnowledgeSpace are located around the world and are protected by their respective local and national laws. Laws in your country or jurisdiction may not protect or allow the same kinds of speech or distribution. KnowledgeSpace does not encourage the violation of any laws and cannot be responsible for any violation of such laws should you link to this domain or use, reproduce, or republish the content contained herein.

## Terms of Use
As a condition of your use of KnowledgeSpace, you agree NOT to:

1. upload, post, email, transmit or otherwise make available any information, materials or other content that is illegal, harmful, threatening, abusive, harassing, defamatory, obscene, pornographic, or offensive; or that infringes another's rights, including any intellectual property rights;
2. impersonate any person or entity or falsely state or otherwise misrepresent your affiliation with a person or entity; or obtain, collect, store or modify personal information about other users;
3. upload, post, email, transmit or otherwise make available any unsolicited or unauthorized advertising, promotional materials, "junk mail," "spam," "chain letters," "pyramid schemes," or any other form of solicitation;
4. modify, adapt or hack KnowledgeSpace or falsely imply that some other site or service is associated with KnowledgeSpace; or
5. use KnowledgeSpace for any illegal or unauthorized purpose. You must not, in the use of KnowledgeSpace, violate any laws in your jurisdiction (including but not limited to copyright laws).

Violation of Terms of Use: KnowledgeSpace reserves the right to investigate and prosecute violations of any of these Terms of Use to the fullest extent of the law. KnowledgeSpace may involve and cooperate with law enforcement authorities in prosecuting users who violate the Terms of Use. You acknowledge that KnowledgeSpace has no obligation to pre-screen or monitor your access to or use of KnowledgeSpace or any information, materials or other content provided or made available through KnowledgeSpace, but has the right to do so. You hereby agree that KnowledgeSpace may, in the exercise of KnowledgeSpace's sole discretion, remove or delete any entries, information, materials or other content that violates these Terms of Use or that is otherwise objectionable

## Contributing
If you would like to contribute to KnowledgeSpace, please fork the repository and submit pull requests or contact us: Mathew@incf.org with subject KnowledgeSpace Contribution

## Requirements
1. PHP version: PHP 5.4.40+
2. Web server: Apache web server

## Technical details
The KS utilizes the CodeIgniter-3.0.3 to the maintain the Model View Controller(MVC) structure. For example, the URL such as
/NeuroKS/index.php/pages/view/UBERON:0001950 will first access the controllers/Pages.php and then the view function in the class. The Pages class extends CI_Controller, which is the controller in the MVC structure. 

The PHP file at /controllers/ServiceUtil.php contains all utility functions for accessing the data through the REST API.


## Installation
1. Check out the latest source code
2. Copy or move KnowledgeSpace/* to your $apache_document_root (For example, /var/www/html)

## Configuration
1. Edit $apache_document_root/NeuroKS/application/config/config.json.
  1. enable_caching - Enable caching webpages for the faster runtime.
  2. cache_folder - The folder for storing the cached data.
  3. sources - Append additional source items to the "sources" array for the dataspace.
2. Change the background image: Edit parallax-slider.css

## License
Creative Commons Attribution-Sharealike 3.0 Unported License (CC-BY-SA) and the GNU Free Documentation License (GFDL)
