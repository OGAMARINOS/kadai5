new Vue({
  el: '#app',
  vuetify: new Vuetify(),
  data: {
    ID: '',
    Name: '',
    age: '',
    number: '',
    adress: ''
  },
  created() {
    // URLパラメータからIDを取得
    const urlParams = new URLSearchParams(window.location.search);
    const idFromUrl = urlParams.get('ID');
    console.log('ID from URL:', idFromUrl); // デバッグ用
    if (idFromUrl) {
      this.ID = idFromUrl;
      this.fetchData(this.ID);
    }
  },
  methods: {
    fetchData: async function(id) {
      try {
        const response = await axios.get(`https://m3h-ogasawarafunctionapi.azurewebsites.net/api/SELECT/${id}`);
        const data = response.data;
        console.log('Fetched data:', data); // デバッグ用
        this.ID = data.ID;
        this.Name = data.Name;
        this.age = data.age;
        this.number = data.number;
        this.adress = data.adress;
      } catch (error) {
        console.error('Error fetching data:', error.response ? error.response.data : error.message);
      }
    },
    updateData: async function(event) {
      console.log('Event:', event); // デバッグ用
      // {isTrusted: true} が渡された場合にIDを上書き
      if (event && event.isTrusted) {
        const urlParams = new URLSearchParams(window.location.search);
        const idFromUrl = urlParams.get('ID');
        console.log('ID from URL in updateData:', idFromUrl); // デバッグ用
        if (idFromUrl) {
          this.ID = idFromUrl;
        }
      }

      const param = {
        ID: this.ID,
        Name: this.Name,
        age: this.age,
        number: this.number,
        adress: this.adress
      };
      try {
        const response = await axios.put('https://m3h-ogasawarafunctionapi.azurewebsites.net/api/UPDATE', param);
        console.log(response.data);
        window.location.href = 'index.html'; // 更新後に元のページに戻る
      } catch (error) {
        console.error('Error updating data:', error.response ? error.response.data : error.message);
      }
    }
  }
});