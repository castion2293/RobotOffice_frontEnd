<template>
    <v-app>
        <v-container
                fluid
                style="min-height: 0;"
                grid-list-lg
        >
            <v-data-table
                    v-bind:headers="headers"
                    v-bind:items="items"
                    item-key="id"
                    class="elevation-1"
                    :rows-per-page-items="row_per_page"
            >
                <template slot="headerCell" slot-scope="props">
                    <v-tooltip bottom>
                            <span slot="activator">
                              {{ props.header.text }}
                            </span>
                        <span>
                              {{ props.header.text }}
                            </span>
                    </v-tooltip>
                </template>

                <template slot="items" slot-scope="props">
                    <td class="text-xs-left">{{ props.item.date }}</td>
                    <td class="text-xs-left">{{ props.item.reason }}</td>
                    <td class="text-xs-left">{{ props.item.begin.substring(0, 5) }}</td>
                    <td class="text-xs-left">{{ props.item.end.substring(0, 5) }}</td>
                    <td class="text-xs-left">{{ props.item.hours }}hr</td>
                </template>
            </v-data-table>
        </v-container>
    </v-app>
</template>

<script>
    export default {
        name: "restList",
        data () {
            return {
                items: [],
                headers: [
                    {
                        text: '日期',
                        align: 'left',
                        sortable: false,

                    },
                    { text: '事由', sortable: false },
                    { text: '開始', sortable: false },
                    { text: '結束', sortable: false },
                    { text: '時數', sortable: false },
                ],
                row_per_page: [10, 25, 50, { text: "All", value: -1 }],
            }
        },
        mounted () {
            Event.listen('restData', data => {
                this.items = data
            })
        }
    }
</script>

<style scoped>

</style>