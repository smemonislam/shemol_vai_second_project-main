<template>
    <div class="py-4 container-fluid">
        <div class="row">
            <div class="col-12">
                <div class="card">
                    <!-- Card header -->
                    <div class="pb-0 card-header">
                        <div class="d-lg-flex justify-content-between mx-3">
                            <div>
                                <h5> Olt List <span class="badge">{{filteredData.length}}</span></h5>

                            </div>
                            <div class="d-flex gap-3">
                                <div class="flex-grow-1">
                                    <router-link :to="{ name: 'AddOlt' }">
                                        <button class="btn btn-success">Add New</button>
                                    </router-link>
                                </div>
                                <div class="flex-grow-1">
                                    
                                    <input type="text" v-model="searchQuery" class="form-control"
                                        placeholder="Search...">
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="px-0 pb-0 card-body">
                        <div class="table-responsive">
                            <div class="card mb-4">
                                <div class="card-body px-0 pt-0 pb-2">
                                    <div class="table-responsive p-0">
                                        <table class="table align-items-center mb-0">
                                            <thead>
                                                <tr>
                                                    <th @click="sort('id')" :class="{ 'asc': sortKey === 'id' && sortOrder === 'asc', 'desc': sortKey === 'id' && sortOrder === 'desc' }" 
                                                        class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                                                        ID
                                                    <span class="sort-icon"> </span></th>
                                                    <th @click="sort('Mikrotik_ip')" :class="{ 'asc': sortKey === 'Mikrotik_ip' && sortOrder === 'asc', 'desc': sortKey === 'Mikrotik_ip' && sortOrder === 'desc' }"
                                                        class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                                                        Mikrotik IP
                                                    <span class="sort-icon"> </span></th>
                                                    <th @click="sort('m_username')" :class="{ 'asc': sortKey === 'm_username' && sortOrder === 'asc', 'desc': sortKey === 'm_username' && sortOrder === 'desc' }"
                                                        class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                                                        M User Name
                                                    <span class="sort-icon"> </span></th>
                                                    <th @click="sort('m_password')" :class="{ 'asc': sortKey === 'm_password' && sortOrder === 'asc', 'desc': sortKey === 'm_password' && sortOrder === 'desc' }"
                                                        class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                                                        M User Password
                                                    <span class="sort-icon"> </span></th>
                                                    <th @click="sort('m_port')" :class="{ 'asc': sortKey === 'm_port' && sortOrder === 'asc', 'desc': sortKey === 'm_port' && sortOrder === 'desc' }"
                                                        class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                                                        M Port
                                                    <span class="sort-icon"> </span></th>
                                                    <th @click="sort('olt_ip')" :class="{ 'asc': sortKey === 'olt_ip' && sortOrder === 'asc', 'desc': sortKey === 'olt_ip' && sortOrder === 'desc' }"
                                                        class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                                                        OLT IP
                                                    <span class="sort-icon"> </span></th>
                                                    <th @click="sort('olt_username')" :class="{ 'asc': sortKey === 'olt_username' && sortOrder === 'asc', 'desc': sortKey === 'olt_username' && sortOrder === 'desc' }"
                                                        class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                                                        OLT User Name
                                                    <span class="sort-icon"> </span></th>
                                                    <th @click="sort('olt_password')" :class="{ 'asc': sortKey === 'olt_password' && sortOrder === 'asc', 'desc': sortKey === 'olt_password' && sortOrder === 'desc' }"
                                                        class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                                                        OLT Password
                                                    <span class="sort-icon"> </span></th>
                                                    <th @click="sort('olt_port')" :class="{ 'asc': sortKey === 'olt_port' && sortOrder === 'asc', 'desc': sortKey === 'olt_port' && sortOrder === 'desc' }"
                                                        class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                                                        OLT Port
                                                    <span class="sort-icon"> </span></th>
                                                    <th @click="sort('description')" :class="{ 'asc': sortKey === 'description' && sortOrder === 'asc', 'desc': sortKey === 'description' && sortOrder === 'desc' }"
                                                        class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2">
                                                        Description
                                                    <span class="sort-icon"> </span></th>
                                                    <th @click="sort('olt_name')" :class="{ 'asc': sortKey === 'olt_name' && sortOrder === 'asc', 'desc': sortKey === 'olt_name' && sortOrder === 'desc' }"
                                                        class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2">
                                                        Olt Name
                                                    <span class="sort-icon"> </span></th>
                                                    <th @click="sort('next_update_time')" :class="{ 'asc': sortKey === 'next_update_time' && sortOrder === 'asc', 'desc': sortKey === 'next_update_time' && sortOrder === 'desc' }"
                                                        class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2">
                                                        Next Update Time
                                                    <span class="sort-icon"> </span></th>
                                                    <th @click="sort('output_cpu')" :class="{ 'asc': sortKey === 'output_cpu' && sortOrder === 'asc', 'desc': sortKey === 'output_cpu' && sortOrder === 'desc' }"
                                                        class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2">
                                                        Output Cpu
                                                    <span class="sort-icon"> </span></th>
                                                    <th @click="sort('output_mem')" :class="{ 'asc': sortKey === 'output_mem' && sortOrder === 'asc', 'desc': sortKey === 'output_mem' && sortOrder === 'desc' }"
                                                        class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2">
                                                        Output Mem
                                                    <span class="sort-icon"> </span></th>
                                                    <th @click="sort('system_name')" :class="{ 'asc': sortKey === 'system_name' && sortOrder === 'asc', 'desc': sortKey === 'system_name' && sortOrder === 'desc' }"
                                                        class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2">
                                                        System Name
                                                    <span class="sort-icon"> </span></th>
                                                    <th @click="sort('uptime')" :class="{ 'asc': sortKey === 'uptime' && sortOrder === 'asc', 'desc': sortKey === 'uptime' && sortOrder === 'desc' }"
                                                        class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2">
                                                        Uptime
                                                    <span class="sort-icon"> </span></th>
                                                    <th @click="sort('another_mem')" :class="{ 'asc': sortKey === 'another_mem' && sortOrder === 'asc', 'desc': sortKey === 'another_mem' && sortOrder === 'desc' }"
                                                        class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2">
                                                        Another Mem
                                                    <span class="sort-icon"> </span></th>
                                                    <th @click="sort('olt_billing')" :class="{ 'asc': sortKey === 'olt_billing' && sortOrder === 'asc', 'desc': sortKey === 'olt_billing' && sortOrder === 'desc' }"
                                                        class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2">
                                                        Olt Billing
                                                    <span class="sort-icon"> </span></th>
                                                    <th @click="sort('olt_modes')" :class="{ 'asc': sortKey === 'olt_modes' && sortOrder === 'asc', 'desc': sortKey === 'olt_modes' && sortOrder === 'desc' }"
                                                        class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2">
                                                        Olt Modes
                                                    <span class="sort-icon"> </span></th>
                                                    <th @click="sort('olt_brands')" :class="{ 'asc': sortKey === 'olt_brands' && sortOrder === 'asc', 'desc': sortKey === 'olt_brands' && sortOrder === 'desc' }"
                                                        class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                                                        Olt Brands
                                                    <span class="sort-icon"> </span></th>                                                    
                                                    <th @click="sort('show')" :class="{ 'asc': sortKey === 'show' && sortOrder === 'asc', 'desc': sortKey === 'show' && sortOrder === 'desc' }"
                                                        class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                                                        Show
                                                    <span class="sort-icon"> </span></th>
                                                    <th class="text-secondary opacity-7"></th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr v-for="(data,index) in filteredData" :key="index">
                                                    <td>
                                                        <div class="d-flex px-2 py-1">
                                                            {{data.id}}
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <p class="text-secondary text-xs font-weight-bold">{{data.Mikrotik_ip}}</p>
                                                    </td>
                                                    <td class="align-middle text-center text-sm">                                                        
                                                        <p class="text-xs font-weight-bold mb-0">{{data.m_username}}</p>
                                                    </td>
                                                    <td class="align-middle text-center">
                                                        <span
                                                            class="text-secondary text-xs font-weight-bold">{{data.m_password}}</span>
                                                    </td>
                                                    <td class="align-middle text-center">
                                                        <span
                                                            class="text-secondary text-xs font-weight-bold">{{data.m_port}}</span>
                                                    </td>
                                                    <td class="align-middle text-center">
                                                        <span
                                                            class="text-secondary text-xs font-weight-bold">{{data.olt_ip}}</span>
                                                    </td>
                                                    <td class="align-middle text-center">
                                                        <span
                                                            class="text-xs font-weight-bold mb-0">{{data.olt_username}}</span>
                                                    </td>
                                                    <td class="align-middle text-center">
                                                        <span
                                                            class="text-secondary text-xs font-weight-bold">{{data.olt_password}}</span>
                                                    </td>
                                                    <td class="align-middle text-center">
                                                        <span
                                                            class="text-secondary text-xs font-weight-bold">{{data.olt_port}}</span>
                                                    </td>
                                                    <td class="align-middle text-center">
                                                        <span
                                                            class="text-secondary text-xs font-weight-bold">{{data.description}}</span>
                                                    </td>
                                                    <td class="align-middle text-center">
                                                        <span
                                                            class="text-secondary text-xs font-weight-bold">{{data.olt_name}}</span>
                                                    </td>
                                                    <td class="align-middle text-center">
                                                        <span
                                                            class="text-secondary text-xs font-weight-bold">{{data.next_update_time}}</span>
                                                    </td>
                                                    <td class="align-middle text-center">
                                                        <span
                                                            class="text-secondary text-xs font-weight-bold">{{data.output_cpu}}</span>
                                                    </td>
                                                    <td class="align-middle text-center">
                                                        <span
                                                            class="text-secondary text-xs font-weight-bold">{{data.output_mem}}</span>
                                                    </td>
                                                    <td class="align-middle text-center">
                                                        <span
                                                            class="text-secondary text-xs font-weight-bold">{{data.system_name}}</span>
                                                    </td>
                                                    <td class="align-middle text-center">
                                                        <span
                                                            class="text-secondary text-xs font-weight-bold">{{data.uptime}}</span>
                                                    </td>
                                                    <td class="align-middle text-center">
                                                        <span
                                                            class="text-secondary text-xs font-weight-bold">{{data.another_mem}}</span>
                                                    </td>
                                                    <td class="align-middle text-center">
                                                        <span
                                                            class="text-secondary text-xs font-weight-bold">{{data.olt_billing}}</span>
                                                    </td>
                                                    <td class="align-middle text-center">
                                                        <span
                                                            class="text-secondary text-xs font-weight-bold">{{data.olt_modes}}</span>
                                                    </td>
                                                    <td class="align-middle text-center">
                                                        <span
                                                            class="text-secondary text-xs font-weight-bold">{{data.olt_brands}}</span>
                                                    </td>
                                                    <td class="align-middle text-center">
                                                        <soft-badge color="success" variant="gradient" size="sm">{{data.show}}
                                                        </soft-badge>
                                                    </td>
                                                    <td class="align-middle">
                                                        <router-link :to="{name:'EditOlt', params: { 'edit_id': data.id }}"
                                                            class="text-secondary font-weight-bold text-xs"
                                                            data-toggle="tooltip"
                                                            data-original-title="Edit user">Edit</router-link>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                    <div class="pagination-container">
                            <button class="btn btn-sm btn-success mx-3 mt-3" @click="previousPage"
                                :disabled="currentPage === 1">Previous</button>
                            <span class="mx-2">Page {{ currentPage }} of {{ totalPages }}</span>
                            <button class="btn btn-sm btn-success mx-3 mt-3" @click="nextPage"
                                :disabled="currentPage === totalPages">Next</button>
                        </div>
                                </div>
                            </div>
                        </div>
                        
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import dataList from "../services/data_list.service";

    export default {
        name: "Users",
        data() {
            return {
                sortKey: '',
                sortOrder: 'asc',
                data: [],
                filteredData: [],
                searchQuery: "",
                currentPage: 1,
                itemsPerPage: 20
            };
        },
        async mounted() {
            await this.getData();
        },
        methods: {
            async getData() {
                const response = await dataList.getDataList();
                this.data = response;
                this.filteredData = response;
            },
            sort(key) {
                if (this.sortKey === key) {
                    // If already sorted by the same key, reverse the sort order
                    this.sortOrder = this.sortOrder === 'asc' ? 'desc' : 'asc';
                } else {
                    // If sorting by a new key, set the sort key and reset the sort order to ascending
                    this.sortKey = key;
                    this.sortOrder = 'asc';
                }

                this.filteredData.sort((a, b) => {
                    const valueA = a[key] ? a[key].toString().toLowerCase() : '';
                    const valueB = b[key] ? b[key].toString().toLowerCase() : '';
                    const comparison = valueA.localeCompare(valueB);

                    // Apply sort order based on the current state
                    return this.sortOrder === 'asc' ? comparison : -comparison;
                });
            },
            previousPage() {
                if (this.currentPage > 1) {
                    this.currentPage--;
                }
            },
            nextPage() {
                if (this.currentPage < this.totalPages) {
                    this.currentPage++;
                }
            }
        },
        computed: {
            totalPages() {
                return Math.ceil(this.filteredData.length / this.itemsPerPage);
            },
            paginatedData() {
                const startIndex = (this.currentPage - 1) * this.itemsPerPage;
                return this.filteredData.slice(startIndex, startIndex + this.itemsPerPage);
            }
        },
        watch: {
            searchQuery(newValue) {
                this.filteredData = this.data.filter(item => {
                    for (let key in item) {
                        if (String(item[key]).toLowerCase().includes(newValue.toLowerCase())) {
                            return true;
                        }
                    }
                    return false;
                });
                // Reset currentPage when searchQuery changes
                this.currentPage = 1;
            }
        }
    };
</script>

<style>
    td {
        padding: 12px 24px !important;
    }

    .sort-icon {
        margin-left: 5px;
    }

    .asc::after {
        content: "▲";
    }

    .desc::after {
        content: "▼";
    }


    .badge {
        display: inline-block;
        padding: 0.25em 0.4em;
        font-size: 75%;
        font-weight: bold;
        line-height: 1;
        text-align: center;
        white-space: nowrap;
        vertical-align: baseline;
        border-radius: 50%;
        background-color: #40C133;
        /* or any other color you prefer */
        color: #fff;
        /* text color */
    }
</style>