<?php

class Data_sources  extends CI_Controller 
{ 
   public function index()
   {
        $data['page_title'] = "Contributors";
        $data['enable_config'] = true;
        $this->load->view('templates/header2', $data);
        $this->load->view('pages/displayDataSources', $data);
        $this->load->view('templates/footer2', $data);
   }
}

?>
