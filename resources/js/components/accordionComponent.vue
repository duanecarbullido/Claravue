<template>
	<v-expansion-panels accordion focusable>
      <v-expansion-panel v-for="(record, index) in records" :key="index">
        <v-expansion-panel-header>{{ record.title }}</v-expansion-panel-header>
        <v-expansion-panel-content class='px-3 pt-3'>
			<div v-html='record.text'></div>
	    </v-expansion-panel-content>
      </v-expansion-panel>
	</v-expansion-panels>
</template>

<script>
	export default {
		name      : "accordion-component",
		props     : [
			'records'
		],
		components: {},
		created()   {},
		data()      { return {} },
		computed  : {},
		methods   : {},
		watch     : {}
	};
</script>

<style scoped></style>
