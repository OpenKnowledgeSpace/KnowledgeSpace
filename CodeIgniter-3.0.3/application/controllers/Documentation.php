<?php



class Documentation  extends CI_Controller 
{ 
   public function index()
   {
        $data['page_title'] = "Documentation";
        $data['enable_config'] = true;
        $this->load->view('templates/header2', $data);
        $this->load->view('pages/displayDocumentation', $data);
        $this->load->view('templates/footer', $data);
   }
}

?>