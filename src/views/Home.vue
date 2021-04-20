<template>
    <div class="py-6">
        <div class="grid sm:flex pb-4 gap-4 items-center">
          <p>Showing:</p>
          <button @click="toggleEnzymes" :class="{'opacity-50': hideEnzymes}" class="md:mx-4 py-4 px-4 shadow hover:shadow-md font-bold bg-primary text-white ">Enzymes</button>
          <button @click="toggleDruggable" :class="{'opacity-50': hideDruggable}" class="py-4 px-4 shadow hover:shadow-md font-bold bg-primary text-white">Druggable Genes</button>
        </div>
        <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <SingleGene 
              v-for = "gene in genes"
              :key = "gene.id" 
              :id = "gene.id" 
              :shortName = "gene.short_name"
              :image = "gene.image"
              :features = "gene.features"
          />
        </div>
        <p class="flex py-6 px-4 shadow bg-white mb-4 text-2xl mb-2 font-bold text-primary" v-if="genesCount === 0 ">No Genes to display</p>
    </div>
</template>

<script>

import SingleGene from '../components/SingleGene.vue'

export default {
    
  name: 'Home View',
  components: { SingleGene },
  data(){
    return{
        //prep for data
        geneData: null,
        genesCount: 0,

        //filters
        hideEnzymes: false,
        hideDruggable: false,
      
    }
  },
  
  mounted() {
    // calling the API for data 
    fetch('https://evilfer.github.io/frontend-dev-api/data.json')
        .then( stream => stream.json())
        .then( data => this.geneData = data )
        .catch( error => console.error(error))
  },
  computed: {
    genes(){
      if(this.geneData){//make sure API is loaded
        //check if filter variables are true, then filter genes.
        if( this.hideEnzymes && this.hideDruggable){
          let genes = this.geneData.filter(gene=>gene.features.is_enzyme != true)
          genes = genes.filter(gene=>gene.features.is_druggable != true)
          this.genesCount = genes.length
          return genes
        }
        else if(this.hideEnzymes){
          let genes = this.geneData.filter(gene=>gene.features.is_enzyme != true)
          this.genesCount = genes.length
          return genes
        }else if(this.hideDruggable){
          let genes = this.geneData.filter(gene=>gene.features.is_druggable != true)
          this.genesCount = genes.length
          return genes 
        }else{
          this.genesCount = this.geneData.length
          return this.geneData
        }
      }
    },
  },
  methods: {
    //on / off filters
    toggleEnzymes(){
      if(this.hideEnzymes == true){
        this.hideEnzymes = false
      }else{
        this.hideEnzymes = true
      }
    },
    toggleDruggable(){
      if(this.hideDruggable == true){
        this.hideDruggable = false
      }else{
        this.hideDruggable = true
      }
    }
  }
}

</script>