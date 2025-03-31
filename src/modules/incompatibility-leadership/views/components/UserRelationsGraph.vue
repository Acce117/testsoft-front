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
import { ref } from 'vue'
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

const generateGraph = (users: Array<User>) => {
    nodes = new DataSet()
    edges = new DataSet()


    users.map((user) => {
        nodes.add({
            id: user.user_id,
            label: user.name,
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
            size: 30
        })
        console.log(user.compatibility)
        user.compatibility.map((comp: Compatibility) => {
            edges.add({ from: comp.fk_user_origin, to: comp.fk_user_destination, type: comp.compatible ? "p" : 'n', curvature: 0.1  },)
        })
        user.leadership.map((lead: Leadership) => {
            console.log(lead.user_id)
            edges.add({ from: user.user_id, to: lead.user_id, type: 'l', curvature: -0.1  })
        })

    })
    edges.forEach(edge => {
        const type = edge.type
        edges.update({
            id: edge.id,
            color: relationTypes[type],
            arrows: "to",
            

        })
    })
    const data = { nodes, edges }

    const options = {
        autoResize: true,
        nodes: {
            shapeProperties: {
                useBorderWithImage: true
            },
            size: 20, // Tamaño consistente para todos los nodos
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