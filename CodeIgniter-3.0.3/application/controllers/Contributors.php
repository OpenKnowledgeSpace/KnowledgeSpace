<?php

class Contributors  extends CI_Controller 
{ 
   public function index()
   {
        $data['page_title'] = "Contributors";
        $data['enable_config'] = true;
        $this->load->view('templates/header2', $data);
        $this->load->view('pages/displayContributors', $data);
        $this->load->view('templates/footer', $data);
   }
}

?>
