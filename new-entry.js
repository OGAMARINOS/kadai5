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
  methods: {
    addData: async function() {
      if (!this.ID || isNaN(this.ID)) {
        console.log("IDに数値が入力されていません");
        return;
      }
      const param = {
        ID: this.ID,
        Name: this.Name,
        age: this.age,
        number: this.number,
        adress: this.adress
      };
      const response = await axios.post('https://m3h-ogasawarafunctionapi.azurewebsites.net/api/INSERT', param);
      console.log(response.data);
      window.location.href = 'index.html'; // 保存後に元のページに戻る
    }
  }
});