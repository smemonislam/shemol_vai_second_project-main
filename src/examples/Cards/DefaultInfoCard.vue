<template>
  <div class="card">
    <div class="p-3 mx-4 text-center card-header d-flex justify-content-center">
      <div
        :class="
          typeof icon === 'object' ? icon.background : 'bg-gradient-success'
        "
        class="icon icon-shape icon-lg shadow text-center border-radius-lg"
      >
        <i
          class="opacity-10"
          :class="typeof icon === 'string' ? icon : icon.component"
          aria-hidden="true"
        ></i>
      </div>
    </div>
    <div class="p-3 pt-0 text-center card-body">
      <h6 class="mb-0 text-center">{{ title }}</h6>
      <span class="text-xs">Port Count: {{ port_count }}</span><br>
      <span class="text-xs">Olt Modes: {{ olt_modes }}</span><br>
      <span v-if="expeire_at" class="text-xs">Package Expeire Date: <span style="color:red">{{ formatDate(expeire_at) }}</span></span>
      <hr class="my-3 horizontal dark" />
      <h5 class="mb-0">{{ value }}</h5>
    </div>
  </div>
</template>

<script>
export default {
  name: "DefaultInfoCard",
  props: {
    icon: {
      type: [String, Object],
      required: true,
      component: {
        type: String,
      },
      background: {
        type: String,
      },
      default: () => ({
        background: "bg-white",
      }),
    },
    title: {
      type: String,
      required: true,
    },
    port_count: {
      type: String,
      default: "",
    },
    olt_modes: {
      type: String,
      default: "",
    },
    value: {
      type: [String, Number],
      default: "",
    },
    expeire_at: {
      type: [String, Number],
      default: "",
    },
  },
  methods:{
    formatDate(inputDate) {
  const months = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
  ];

  const parts = inputDate.split('-');
  const day = parseInt(parts[2], 10);
  const monthIndex = parseInt(parts[1], 10) - 1;
  const year = parseInt(parts[0], 10);

  return `${day} ${months[monthIndex]} ${year}`;
}
  }
};
</script>