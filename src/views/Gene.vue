<template>
  <div class=""> 
    
    <router-link :to="{ name: 'Home' }" class="inline-block py-6 px-4 my-4 mb-2 shadow hover:shadow-md hover:bg-secondary bg-white font-bold text-primary">
      Back to home
    </router-link>  

    <div class="bg-white" v-if="!loading"> 
      <h1 class="block py-4 pt-8 text-center text-4xl font-bold text-primary">{{gene.full_name}}</h1>
      <div class="grid md:grid-cols-2 gap-4 p-4 items-center">
        <div class="w-full flex justify-center"><img :src="gene.image" alt="Gene image"></div>
        <div class="my-8">
          <div><span class="font-bold">ID: </span>{{gene.id}}</div>
          <div><span class="font-bold">Full name: </span>{{gene.full_name}}</div>
          <div><span class="font-bold">Short name: </span>{{gene.short_name}}</div>
          <div><span class="font-bold">Family: </span>{{gene.family}}</div>
          <div><span class="font-bold">Structures: </span>{{gene.num_structures}}</div>
          <div><span class="font-bold">Compounds: </span>{{gene.num_compounds}}</div>
          <apexchart width="100%" type="line" :options="options" :series="series"></apexchart>
        </div>
      </div>
      <div class="max-w-2xl mx-auto px-4 md:px-0 py-4 pb-12 items-center">
        <p class="font-bold ">Description:</p>
        <p>{{gene.description}}</p>
      </div>
    </div>

    <div v-else-if="loading">
      loading...
    </div>

    <router-link :to="{ name: 'Home' }" class="inline-block py-6 px-4 shadow hover:shadow-md hover:bg-secondary bg-white my-4 mb-2 font-bold text-primary">
      Back to home
    </router-link>  
  </div>
</template>

<script>

export default{
  name: 'Gene View',
  data() {
    return {
      id: this.$route.params.id,
      loading: true, //until API is loaded

      //prep for data
      geneData: null,
      gene: null,

      //chart data - filled once Gene is ready.
      publicationYears: null, 
      options: {
        chart: {
          id: 'publicationsChart'
        },
        xaxis: {
          categories: []
        }
      },
      series: [{
        name: 'publications',
        data: []
      }]
    }
  },
  mounted() {
    //calling the API for data 
    fetch('https://evilfer.github.io/frontend-dev-api/data.json')
        .then( stream => stream.json())
        .then( data => this.geneData = data )
        .catch( error => console.error(error))
  },
  watch: {
    //when geneData gets loaded, find the gene 
    geneData(){
      this.gene = this.geneData.find(
        gene => gene.id === this.id
      )

      //update chart data when gene is ready 
      let years = [] //years - x axis
      let nums = [] // num of publications per year
      this.gene.publications.forEach(publication => {
        years.push(publication[0]) 
        nums.push(publication[1])
      })

      this.options = {
        chart: {
          id: 'publicationsChart'
        },
        xaxis: {
          categories: years
        }
      },
      this.series = [{
        name: 'publications',
        data: nums
      }]
      this.loading = false //data is ready to display
    },
  },
}

</script>