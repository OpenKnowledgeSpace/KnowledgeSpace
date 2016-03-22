<?php

class About  extends CI_Controller 
{ 
   public function index()
   {
        $data['page_title'] = "About us";
        $data['enable_config'] = true;
        $this->load->view('templates/header2', $data);
        $this->load->view('pages/displayAbout', $data);
        $this->load->view('templates/footer', $data);
   }
}

?>
