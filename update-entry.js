new Vue({
  el: '#app',
  vuetify: new Vuetify(),
  data: {
    ID: '',
    Name: '',
    age: '',
    number: '',
    adress: '',
    error: null
  },
  methods: {
    updateData: async function() {
      if (!this.ID) {
        this.error = "IDを入力してください";
        return;
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
        if (response.data.success) {
          window.location.href = 'index.html'; // 更新後に元のページに戻る
        } else {
          this.error = "更新に失敗しました。IDが存在しない可能性があります。";
        }
      } catch (error) {
        this.error = "エラーが発生しました。もう一度お試しください。";
        console.error(error);
      }
    }
  }
});