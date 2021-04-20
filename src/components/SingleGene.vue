<template>
    <router-link :to="{ name: 'Gene', params: { id: id } }" class="grid sm:flex shadow hover:shadow-md hover:border hover:border-2 border-primary bg-white mb-4">

        <img :src="image" class="w-full md:w-1/2 md:mr-8 object-contain" min-width="200px" alt="Gene image">
        <div class="py-12 px-8 md:px-2">
            <h1 class="text-2xl mb-2 font-bold text-primary">{{shortName}}</h1>
            <div class="grid justify-between">
                <div>Druggable: <span v-if="features.is_druggable == true">✅</span><span v-else>🚫</span> </div>
                <div>Enzyme: <span v-if="features.is_enzyme == true">✅</span><span v-else>🚫</span></div>

            </div>
        </div>
    </router-link>
</template>

<script>
    export default {
        name: 'Single gene',
        props: {
            id: Number, 
            shortName: String,
            image: String,
            features: Object
        },
        data(){
            return{
                id: this.id,
                shortName: this.shortName,
                image: this.image,
                features: this.features
            }
        }
    }
</script>

<style scoped>

</style>
