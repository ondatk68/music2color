<template>
    <div style="margin: 50px">
      {{ rowData }}
    </div>
</template>

  <script>

  import data from '@/assets/top20_japan.csv';

  export default{
    data: ()=>({
      csvData: [],
    }),
    mounted: function() {
      //console.log(data);
      data.forEach((value,index) => {
        this.csvData = data;
      });
    },
    computed: {
      rowData() {
        // idに対応するデータを返す

        return this.csvData.find((row, index) => index == this.$route.params.id);

      },
    }
  }
</script>