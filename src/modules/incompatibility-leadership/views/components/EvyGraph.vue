<template>
    <section class="flex flex-col h-full">

        <div class="flex h-4rem w-full items-center gap-4">
            <slot name="header"></slot>
            <div class="export-buttons flex w-full gap-2 items-end justify-end">
                <Button icon="pi pi-file-export" label="Exportar PNG" @click="exportPNG" />
                <Button icon="pi pi-question-circle" severity="secondary" label="Información" />
            </div>
        </div>

        <div ref="networkContainer" class="network-container"></div>

        <div class="legend">
            <div class="legend-item" v-for="(item, index) in legendItems" :key="index">
                <div class="legend-color" :style="{ backgroundColor: item.color }"></div>
                <span>{{ item.label }}</span>
            </div>
        </div>
    </section>



</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { Network } from 'vis-network'
import { DataSet } from 'vis-data'
import { Button } from 'primevue'
import type { Compatibility } from '../../models/compatibility.model'
import type { Leadership } from '../../models/leadership.model'
import type { User } from '@/modules/management/users/models/user.model'


const networkContainer = ref(null)
const network = ref(null)

// const getRandomColor = () => {
//     const hue = Math.floor(Math.random() * 360)
//     return `hsl(${hue}, 70%, 75%)`
// }

let nodes = new DataSet()
let edges = new DataSet()

const relationTypes = {
    p: { color: "#4CAF50", width: 3 },
    n: { color: "#F44336", width: 3 },
    l: { color: "rgb(100, 100, 253)", width: 3 },

}

const categories ={
    rapero:20,
    jazzistas:4,
    rockeros:8
}

const generateGraph = () => {
    nodes = new DataSet()
    edges = new DataSet()


    Object.entries(categories).map((user, index) => {
        console.log(user)
        nodes.add({
            id: index,
            label: user[0],
            user: user,
            color: {
                background: 'rgb(186, 230, 253)',
                border: "white",
                highlight: {
                    background: 'rgb(186, 230, 253)',
                    border: "rgb(3, 105, 161)",
                }
            },
            shape: "circle",
            font: { size: 18, color: "rgb(3, 105, 161)" },
            borderWidth: 1,
            size: user[1]
        })
        

    })
    
    const data = { nodes, edges }

    const options = {
        autoResize: true,
        nodes: {
            shapeProperties: {
                useBorderWithImage: true
            },
             // Tamaño consistente para todos los nodos
            margin: 10
        },
        edges: {
            font: {
                size: 12,
                strokeWidth: 0, // Fondo transparente para el texto
                align: "middle"
            },
            labelHighlightBold: false,
            selectionWidth: 1.5,
            

        },
        physics: {
            solver: "forceAtlas2Based",
            forceAtlas2Based: {
                gravitationalConstant: -100, // Más negativo = más repulsión
                avoidOverlap: 0.9 // Intensidad de anti-solapamiento
            }

        },

        interaction: {

            tooltipDelay: 200,


        }
    }

    network.value = new Network(networkContainer.value, data, options)


    network.value.on("hoverNode", (params) => {

        const userNode = nodes.get(params.node)
        nodes.update({
            id: params.node,
            label: userNode.user.name,
        })
    })
    network.value.on("blurNode", ({ node }) => {
        const userNode = nodes.get(node)
        nodes.update({
            id: node,
            label: userNode.user.name.charAt(0)
        })
    })
}

// Tipos de relaciones con estilos


// Leyenda
const legendItems = [
    { label: "Considera líder a", color: relationTypes.l.color },
    { label: "No elige a", color: relationTypes.n.color },
    { label: "Elige a", color: relationTypes.p.color },

]

// Relaciones de ejemplo

// Aplicar estilos a las aristas

const exportPNG = () => {
    const canvas = document.querySelector('.network-container canvas');

    const dataURL = canvas.toDataURL('image/png');

    const link = document.createElement('a');
    link.href = dataURL;
    link.download = 'grafo.png';
    link.click();
};


defineExpose({ generateGraph })
onMounted(()=>{
    generateGraph()

})
</script>

<style scoped>
.network-container {
    display: flex;
    flex: 1;
    min-height: 0;
    border: 1px solid #eee;
    border-radius: 8px;
    background-color: #f9f9f9;
}

.legend {
    display: flex;
    justify-content: center;
    margin-top: 15px;
    gap: 20px;
    flex-wrap: wrap;
}

.legend-item {
    display: flex;
    align-items: center;
    margin: 5px;
    font-size: 14px;
}

.legend-color {
    width: 20px;
    height: 20px;
    border-radius: 3px;
    margin-right: 8px;
    border: 1px solid #ddd;
}
</style>