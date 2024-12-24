<script setup lang="ts">
import { Background } from "@vue-flow/background";
import { VueFlow, useVueFlow } from "@vue-flow/core";
import { nextTick, ref } from "vue";
import { nodeList, wires } from "./gates";
import { useLayout } from "./useLayout";

const nodes = ref(nodeList);

const edges = ref(wires);

const { layout } = useLayout();

const { onInit, fitView } = useVueFlow();

onInit((vueFlowInstance) => {
  vueFlowInstance.fitView();
});

async function layoutGraph() {
  nodes.value = layout(nodes.value, edges.value, "TB");

  nextTick(() => {
    fitView();
  });
}
</script>

<template>
  <VueFlow
    style="width: 100vw; height: 100vh"
    :nodes="nodes"
    :edges="edges"
    @nodes-initialized="layoutGraph()"
  >
    <Background pattern-color="#aaa" :gap="16" />
  </VueFlow>
</template>

<style>
@import "@vue-flow/core/dist/style.css";
@import "@vue-flow/core/dist/theme-default.css";
</style>
