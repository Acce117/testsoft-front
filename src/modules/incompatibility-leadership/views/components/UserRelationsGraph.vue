<template>
    <div class="graph-container">
        <div class="export-buttons flex w-full items-end justify-end">
            <Button icon="pi pi-file-export" label="Exportar PNG" @click="exportPNG"/>
        </div>
        <div ref="networkContainer" class="network-container"></div>

        <!-- Leyenda -->
        <div class="legend">
            <div class="legend-item" v-for="(item, index) in legendItems" :key="index">
                <div class="legend-color" :style="{ backgroundColor: item.color }"></div>
                <span>{{ item.label }}</span>
            </div>
        </div>
        

    </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { Network } from 'vis-network'
import { DataSet } from 'vis-data'
import { Button } from 'primevue'

const networkContainer = ref(null)
const network = ref(null)

// const getRandomColor = () => {
//     const hue = Math.floor(Math.random() * 360)
//     return `hsl(${hue}, 70%, 75%)`
// }

// Datos de ejemplo
const users = [
    { id: 1, name: "Ana García" },
    { id: 2, name: "Carlos Rodríguez" },
    { id: 3, name: "Beatriz González" },
    { id: 4, name: "David Fernández" },
    { id: 5, name: "Evelyn López" },
    { id: 6, name: "Fernando Martínez" },
    { id: 7, name: "Gabriela Pérez" },
    { id: 8, name: "Héctor Gómez" },
    { id: 9, name: "Isabel Sánchez" },
    { id: 10, name: "Javier Díaz" },
    { id: 11, name: "Karen Hernández" },
    { id: 12, name: "Luis Moreno" },
    { id: 13, name: "María Álvarez" },
    { id: 14, name: "Nicolás Romero" },
    { id: 15, name: "Olga Navarro" },
    { id: 16, name: "Pablo Torres" },
    { id: 17, name: "Quintín Domínguez" },
    { id: 18, name: "Rosa Vázquez" },
    { id: 19, name: "Sergio Ramos" },
    { id: 20, name: "Tania Gil" },
    { id: 21, name: "Ulises Serrano" },
    { id: 22, name: "Valeria Blanco" },
    { id: 23, name: "Walter Suárez" },
    { id: 24, name: "Ximena Molina" },
    { id: 25, name: "Yolanda Morales" },
    { id: 26, name: "Zacarías Ortega" },
    { id: 27, name: "Ana Delgado" },
    { id: 28, name: "Carlos Castro" },
    { id: 29, name: "Beatriz Ortiz" },
    { id: 30, name: "David Rubio" }
];

// Preparar nodos con iniciales y colores
const nodes = new DataSet(
    users.map(user => ({
        id: user.id,
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
    }))
)

// Tipos de relaciones con estilos
const relationTypes = {
    positive: { color: "#4CAF50", width: 3 },
    negative: { color: "#F44336", width: 3 },
    leadership: { color: "rgb(100, 100, 253)", width: 3 },

}

// Leyenda
const legendItems = [
    { label: "Considera líder a", color: relationTypes.leadership.color },
    { label: "No elige a", color: relationTypes.negative.color },
    { label: "Elige a", color: relationTypes.positive.color },

]

// Relaciones de ejemplo
const edges = new DataSet([
    { from: 1, to: 2, type: "positive" },
    { from: 1, to: 3, type: "negative" },
    { from: 2, to: 4, type: "leadership", weight: 2 },
    { from: 3, to: 5, type: "negative" },
    { from: 4, to: 6, type: "positive" },
    { from: 5, to: 7, type: "negative" },
    { from: 6, to: 8, type: "positive" },
    { from: 7, to: 9, type: "positive" },
    { from: 8, to: 10, type: "negative" },
    { from: 9, to: 11, type: "leadership", weight: 1 },
    { from: 10, to: 12, type: "negative" },
    { from: 11, to: 13, type: "positive" },
    { from: 12, to: 14, type: "negative" },
    { from: 13, to: 15, type: "positive" },
    { from: 14, to: 16, type: "negative" },
    { from: 15, to: 17, type: "leadership", weight: 3 },
    { from: 16, to: 18, type: "positive" },
    { from: 17, to: 19, type: "negative" },
    { from: 18, to: 20, type: "positive" },
    { from: 19, to: 21, type: "negative" },
    { from: 20, to: 22, type: "leadership", weight: 2 },
    { from: 21, to: 23, type: "negative" },
    { from: 22, to: 24, type: "positive" },
    { from: 23, to: 25, type: "negative" },
    { from: 24, to: 26, type: "positive" },
    { from: 25, to: 27, type: "leadership", weight: 1 },
    { from: 26, to: 28, type: "positive" },
    { from: 27, to: 29, type: "negative" },
    { from: 28, to: 30, type: "positive" },
    { from: 29, to: 1, type: "negative" },
    { from: 30, to: 2, type: "leadership", weight: 2 },
    { from: 3, to: 7, type: "positive" },
    { from: 5, to: 9, type: "negative" },
    { from: 7, to: 11, type: "leadership", weight: 1 },
    { from: 9, to: 13, type: "positive" },
    { from: 11, to: 15, type: "negative" },
    { from: 13, to: 17, type: "positive" },
    { from: 15, to: 19, type: "negative" },
    { from: 17, to: 21, type: "leadership", weight: 3 },
    { from: 19, to: 23, type: "positive" },
    { from: 22, to: 6, type: "positive" },
    { from: 21, to: 25, type: "negative" },
    { from: 23, to: 27, type: "positive" },
    { from: 25, to: 29, type: "negative" },
    { from: 27, to: 2, type: "leadership", weight: 2 },
    { from: 29, to: 4, type: "negative" }
]);

// Aplicar estilos a las aristas
edges.forEach(edge => {
    const type = edge.type
    edges.update({
        id: edge.id,
        color: relationTypes[type],
        arrows: "to",
        smooth: { type: "continuous" },
        selectionWidth: 2,

    })
})
const exportPNG = () => {
    const canvas = document.querySelector('.network-container canvas');

    const dataURL = canvas.toDataURL('image/png');

    const link = document.createElement('a');
    link.href = dataURL;
    link.download = 'grafo.png';
    link.click();
};




onMounted(() => {
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

    network.value.

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
})
</script>

<style scoped>
.graph-container {
    display: flex;
    flex-direction: column;
    height: 100%;
}

.network-container {
    width: 100%;
    height: 600px;
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