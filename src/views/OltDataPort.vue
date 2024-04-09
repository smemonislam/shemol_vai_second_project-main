<template>
  <div class="py-4 container-fluid">
    <div class="row">
      <div class="col-12">
        <div class="card">
          <!-- Card header -->
          <div class="pb-0 card-header">
    <div class="d-lg-flex justify-content-between mx-3">
        <div>
            <h5> Olt Data Port List <span class="badge">{{filteredData.length}}</span></h5>

        </div>
        <div class="d-flex gap-3">
        <div class="flex mx-1 justify-content-around">
                <div class="d-flex grid grid-cols-2 gap-3">
                    <select @change="handleOltData(selected_olt)" v-model="selected_olt" class="form-control" name="filter" id="filter">
                        <option   value="" selected disabled hidden>OLT</option>
                        <option   value="">All</option>
                        <option v-for="item in filter_port_olt"  :key="item.OLT_NAME" :value="item.OLT_NAME">{{item.OLT_NAME}}</option>
                    </select>
                    <select @change="handlePortData(selected_port)" v-model="selected_port" v-if="port_olt[0]" class="form-control" name="filter" id="filter">
                        <option value="" selected disabled hidden>PORT</option>
                        <option value="">All</option>
                        <option v-for="item in port_olt[0]?.PORT" :key="item" :value="item">{{ item }}</option>
                    </select>
                </div>
        </div>
        <div class="flex-grow-1">
            <input type="text" v-model="searchQuery" class="form-control" placeholder="Search...">
        </div>
    </div>
  </div>
</div>

            
          <div class="px-0 pb-0 card-body">
            <div class="table-responsive">
              <table id="users-list" class="table table-striped table-bordered">
                <thead class="thead-light">
                  <tr>
                    <th @click="sort('olt_connect')" :class="{ 'asc': sortKey === 'olt_connect' && sortOrder === 'asc', 'desc': sortKey === 'olt_connect' && sortOrder === 'desc' }">OLT<span class="sort-icon"> </span></th>
                    <th @click="sort('port_number')" :class="{ 'asc': sortKey === 'port_number' && sortOrder === 'asc', 'desc': sortKey === 'port_number' && sortOrder === 'desc' }">PON NO. <span class="sort-icon"> </span></th>
                    <th @click="sort('PPPOE_ID')" :class="{ 'asc': sortKey === 'PPPOE_ID' && sortOrder === 'asc', 'desc': sortKey === 'PPPOE_ID' && sortOrder === 'desc' }">DESCRIPTION <span class="sort-icon"> </span></th>   
                    <th @click="sort('status')" :class="{ 'asc': sortKey === 'status' && sortOrder === 'asc', 'desc': sortKey === 'status' && sortOrder === 'desc' }">STATUS <span class="sort-icon"> </span></th>
                    <th @click="sort('description')" :class="{ 'asc': sortKey === 'description' && sortOrder === 'asc', 'desc': sortKey === 'description' && sortOrder === 'desc' }">RX POWER <span class="sort-icon"> </span></th>
                    <th >ONU INFO <span class="sort-icon"> </span></th>
                     <!-- <th @click="sort('id')" :class="{ 'asc': sortKey === 'id' && sortOrder === 'asc', 'desc': sortKey === 'id' && sortOrder === 'desc' }">ID <span class="sort-icon"> </span></th> -->
                    <!-- <th @click="sort('vlan_id')" :class="{ 'asc': sortKey === 'vlan_id' && sortOrder === 'asc', 'desc': sortKey === 'vlan_id' && sortOrder === 'desc' }">VLAN ID <span class="sort-icon"> </span></th> -->
                    <!-- <th @click="sort('mac_address')" :class="{ 'asc': sortKey === 'mac_address' && sortOrder === 'asc', 'desc': sortKey === 'mac_address' && sortOrder === 'desc' }">MAC ADDRESS <span class="sort-icon"> </span></th> -->                 
                    <!-- <th @click="sort('show')" :class="{ 'asc': sortKey === 'show' && sortOrder === 'asc', 'desc': sortKey === 'show' && sortOrder === 'desc' }">SHOW <span class="sort-icon"> </span></th> -->
                    <!-- <th @click="sort('distance')" :class="{ 'asc': sortKey === 'distance' && sortOrder === 'asc', 'desc': sortKey === 'distance' && sortOrder === 'desc' }">DISTANCE <span class="sort-icon"> </span></th> -->
                    <!-- <th @click="sort('last_dereg_reason')" :class="{ 'asc': sortKey === 'last_dereg_reason' && sortOrder === 'asc', 'desc': sortKey === 'last_dereg_reason' && sortOrder === 'desc' }">LAST DEREG REASPN <span class="sort-icon"> </span></th> -->
                    <!-- <th @click="sort('alive_time')" :class="{ 'asc': sortKey === 'alive_time' && sortOrder === 'asc', 'desc': sortKey === 'alive_time' && sortOrder === 'desc' }">ALIVE TIME <span class="sort-icon"> </span></th> -->
                    <!-- <th @click="sort('last_update')" :class="{ 'asc': sortKey === 'last_update' && sortOrder === 'asc', 'desc': sortKey === 'last_update' && sortOrder === 'desc' }">LAST UPDATE <span class="sort-icon"> </span></th> -->
                    <!-- <th @click="sort('next_update_time')" :class="{ 'asc': sortKey === 'next_update_time' && sortOrder === 'asc', 'desc': sortKey === 'next_update_time' && sortOrder === 'desc' }">NEXT UPDATE TIME <span class="sort-icon"> </span></th> -->
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody class="text-sm">
                  <!-- Use paginatedData instead of filteredData -->
                  <tr v-for="(item,index) in paginatedData" :key="index">                    
                    <td>{{ item.olt_connect }}</td>
                    <td>{{ item.port_number }}</td>
                    <td>Pppoe Users: <br>
                         <span v-for="(item_str,index) in formatdata( item.PPPOE_ID)?? []" :key="index" class="mx-3s">&nbsp;&nbsp;&nbsp;&nbsp; *{{item_str }} <br></span> </td>                 
                    <td>{{ item.status }}</td>
                    <td>{{ item.description }}</td>
                    <td><ul>
                      <li>Onu Id: {{item.port_number}}</li>
                      <li>Mac: {{item.mac_address}}</li>
                      <li>Last Dereg Time: </li>
                      <li>Last Dereg Reason: {{item.last_dereg_reason}}</li>
                      </ul></td>
                    <!-- <td>{{ item.id }}</td> -->   
                    <!-- <td>{{ item.vlan_id }}</td> -->
                    <!-- <td>{{ item.mac_address }}</td> -->
                    <!-- <td>{{ item.show }}</td> -->
                    <!-- <td>{{ item.distance }}</td> -->
                    <!-- <td>{{ item.last_dereg_reason }}</td> -->
                    <!-- <td>{{ item.alive_time }}</td> -->
                    <!-- <td>{{ item.last_update }}</td> -->
                    <!-- <td>{{ item.next_update_time }}</td> -->
                    <td>
                      <a @click="editUser(item)" class="actionButton cursor-pointer me-3" data-bs-toggle="tooltip" title="Edit User">
                        <i class="fas fa-edit text-secondary"></i>
                      </a>
                      <a @click="deleteUser(item)" class="actionButton deleteButton cursor-pointer" data-bs-toggle="tooltip" title="Delete User">
                        <i class="fas fa-trash text-secondary"></i>
                      </a>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div class="pagination-container">
                  <button class="btn btn-sm btn-success mx-3 mt-3" @click="previousPage" :disabled="currentPage === 1">Previous</button>
                  <span class="mx-2">Page {{ currentPage }} of {{ totalPages }}</span>
                  <button class="btn btn-sm btn-success mx-3 mt-3" @click="nextPage" :disabled="currentPage === totalPages">Next</button>
              </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import oltDataPortList from "../services/oltDataPortList.service";

export default {
  name: "Users",
  data() {
    return {
      splitData: [],
      sortKey: '',
      sortOrder: 'asc', 
      data: [],
      filteredData: [],
      filter_port_olt: [],
      port_olt: [],
      selected_olt:'',
      selected_port:'',
      searchQuery: "",
      currentPage: 1,
      itemsPerPage: 20
    };
  },
  async mounted() {
    await this.getData();
  },
  methods: {
    
    formatdata(data){
      return this.splitData = data.split(",");
    },

    handleOltData(olt) {
      this.filteredData = this.data.filter(item => {
        for (let key in item) {
          if (String(item[key]).toLowerCase().includes(olt.toLowerCase())) {
            return true;
          }
        }
        return false;
      });
      this.currentPage = 1;

      this.port_olt = this.filter_port_olt.filter(item => item.OLT_NAME === olt);
    },
    handlePortData(port) {
      this.filteredData = this.data.filter(item => {
        for (let key in item) {
          if (String(item[key]).toLowerCase().includes(port.toLowerCase())) {
            return true;
          }
        }
        return false;
      });
      this.currentPage = 1;
    },
    async getData() {
      const response = await oltDataPortList.getOltDataPort();

      this.data = response.olt_all_data;
      this.filter_port_olt = response.filter_port_olt;
      this.filteredData = response.olt_all_data;
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
    background-color: #40C133; /* or any other color you prefer */
    color: #fff; /* text color */
}

</style>
