export const DS_ENTITY_FOUND = 'DS_ENTITY_FOUND'
export const DS_ENTITY_UPDATE = 'DS_ENTITY_UPDATE'
export const DS_RESULTS_FOUND = 'DS_RESULTS_FOUND'
export const DS_SEARCH_PAGINATED = 'DS_SEARCH_PAGINATED'
export const DS_SEARCH_SUBMITTED = 'DS_SEARCH_SUBMITTED'
export const DS_SEARCH_RESULTS_PAGINATED = 'DS_SEARCH_RESULTS_PAGINATED'

export const DATASPACE_SOURCES = {
  scr_0137950_neuroml_models: {
    label: 'NeuroML Database',
    description: 'Curated relational database that provides for the storage and retrieval of computational neuroscience model.',
    type: 'models',
    columns: {'dc.title': 'Model Name', model_type: 'Model Type', 'dc.creator': 'Authors', 'dc.subject': 'Keywords'},
    aggs: {model_type: 'Model Type', 'dc.creator': 'Authors', 'dc.subject': 'Keywords'}
  },
  scr_002145_neuromorpho_modelimage: {
    label: 'NeuroMorpho',
    description: 'A curated repository of digitally reconstructed neurons.',
    type: 'morphology',
    columns: {'dc.title': 'Model Name', 'dc.subject': 'Subjects', age: 'Age', gender: 'Gender', strain_name: 'Strain'},
    aggs: {species: 'Model Name', strain_name: 'Strain', 'dc.subject': 'Subject'}
  },
  scr_007271_modeldb_models: {
    label: 'ModelDB',
    description: 'Provides high quality computational neuroscience models. ModelDB is tightly coupled with NeuronDB.',
    type: 'models',
    columns: {'dc.title': 'Model Name', model_type: 'Model Type', model_concepts: 'Model Concepts', simulator_software: 'Software'},
    aggs: {model_concepts: 'Model Concepts', simulator_software: 'Software', model_type: 'Model Type'}
  },
  scr_006131_hba_atlas: {
    label: 'Human Brain Atlas',
    description: 'Contains sections stained for cell bodies or nerve fibers, as well as corresponding MRI sections through a living human brain.',
    type: 'anatomy'
  },
  scr_002978_aba_expression: {
    label: 'Allen Brain Atlas Mouse Brain - Expression',
    description: 'A genome_wide database of gene expression in the mouse brain.',
    type: 'expression',
    columns: {'dc.title': 'Gene', organism: 'Organism', species: 'Species'},
    aggs: {gene_name: 'Gene', organism: 'Organism', species: 'Species'}
  },
  scr_002978_aba_celltypeephysdata: {
    label: 'Allen Brain Atlas Mouse Brain - CellType EphysData',
    description: 'Provides a database of neuronal cell types based on multimodal characterization of single cells to enable data_driven approaches to classification. For more details about the experiments, please refer to the technical white paper.',
    type: 'physiology'
  },
  scr_002721_gensat_geneexpression: {
    label: 'GENSAT',
    description: 'Contains gene expression data and maps of the mouse brain and spinal cord.',
    type: 'expression',
    columns: {gene_name: 'Gene', structure_name: 'Structure', stain: 'Stain', age: 'Age'},
    aggs: {gene_name: 'Gene', structure_name: 'Structure', stain: 'Stain'}
  },
  scr_014194_icg_ionchannels: {
    label: 'IonChannelGenealogy',
    description: 'Provides a quantitative assay of publicly available ion channel models.',
    type: 'models'
  },
  scr_003105_neurondb_currents: {
    label: 'NeuronDB',
    description: 'Provides data about neurotransmitter properties for submitted neurons.',
    type: 'physiology',
    columns: {neuron: 'Neuron', current: 'Current', compartment: 'Compartment'},
    aggs: {neuron: 'Neuron', current: 'Current', compartment: 'Compartment'}
  },
  scr_006878_brainmaps_atlas: {
    label: 'BrainMaps',
    description: 'A high_resolution brain atlas of primate and non-primate brains.',
    type: 'anatomy'
  },
  scr_002187_integrated_connectivity: {
    label: 'Integrated',
    description: 'An aggregated dataset of connectivity statements from CoCoMac,Connectome Wiki, the Hippocampal-Parahippocampal Table of Temporal-Lobe.com and Avian Brain Circuitry Database. Connectome Wiki, CoCoMac, and Avian Brain Circuitry Database are no longer in service, so the links may not be functional.',
    type: 'anatomy'
  },
  scr_006274_neuroelectro_ephys: {
    label: 'NeuroElectro',
    description: 'A database of elecrophysiological properties text-mined from the biomedical literature as a function of neuron type.',
    type: 'physiology',
    columns: {'dc.title': 'Title', 'dc.description': 'Description', property_name: 'property_name'},
    aggs: {property_name: 'property_name'}
  },
  scr_003510_cil_images: {
    label: 'Cell Image Library',
    description: 'Provides annotated images, videos and animations of cellular processes.',
    type: 'morphology',
    aggs: {species: 'Species', celltype: 'Cell Type', biologicalprocess: 'Biological Process'},
    columns: {image_url: 'Image', species: 'Species', 'dc.creator': 'Authors', biologicalprcoess: 'Biological Process', celltype: 'Cell Type'}
  },
  scr_002978_aba_celltypemorphodata: {
    label: 'Allen Brain Atlas Mouse Brain - CellType MorphoData',
    description: 'Provides a database of neuronal cell types based on multimodal characterization of single cells to enable data_driven approaches to classification.',
    type: 'morphology'
  }
}
