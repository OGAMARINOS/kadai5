const app = new Vue({
  el: '#app', // Vueが管理する一番外側のDOM要素
  vuetify: new Vuetify(),
  data: {
    // Vue内部で使いたい変数は全てこの中に定義する
    ID: '', //パラメーター「ID」格納変数
    Name: '', //パラメーター「Name」格納変数
    age: '', //パラメーター「age」格納変数
    number: '', //パラメーター「number」格納変数
    adress: '', //パラメーター「adress」格納変数
    dataList: [], // データ表示用配列
    headers: [
      { text: 'ID', value: 'ID' },
      { text: '名前', value: 'Name' },
      { text: '年齢', value: 'age' },
      { text: '郵便番号', value: 'number' },
      { text: 'アドレス', value: 'adress' },
      { text: 'アクション', value: 'actions', sortable: false }
    ],
    loading: false,
    error: null
  },
  methods: {
    // DBにデータを追加する関数
    addData: async function() {
      //IDの入力チェック（空白か数字以外なら終了）
      if (!this.ID || isNaN(this.ID)) {
        console.log("IDに数値が入力されていません");
        return;
      }
      //POSTメソッドで送るパラメーターを作成
      const param = {
        ID: this.ID,
        Name: this.Name,
        age: this.age,
        number: this.number,
        adress: this.adress
      };
      try {
        this.loading = true;
        //INSERT用のAPIを呼び出し
        const response = await axios.post('https://m3h-ogasawarafunctionapi.azurewebsites.net/api/INSERT', param);
        //結果をコンソールに出力
        console.log(response.data);
        this.readData();
      } catch (error) {
        this.error = error;
        console.error(error);
      } finally {
        this.loading = false;
      }
    },
    // データベースからデータを取得する関数
    readData: async function() {
      try {
        this.loading = true;
        //SELECT用のAPIを呼び出し      
        const response = await axios.get('https://m3h-ogasawarafunctionapi.azurewebsites.net/api/SELECT');
        //結果をコンソールに出力
        console.log(response.data);
        //結果リストを表示用配列に代入
        this.dataList = response.data.List;
      } catch (error) {
        this.error = error;
        console.error(error);
      } finally {
        this.loading = false;
      }
    },
    deleteData: async function(id) {
      try {
        this.loading = true;
        // DELETE用のAPIを呼び出し
        const response = await axios.delete(`https://m3h-ogasawarafunctionapi.azurewebsites.net/api/DELETE`, { data: { ID: id } });
        // 結果をコンソールに出力
        console.log(response.data);
        // データリストを更新
        this.readData();
      } catch (error) {
        this.error = error;
        console.error(error);
      } finally {
        this.loading = false;
      }
    },
    updateData: async function(id) {
      // 更新用のパラメーターを作成
      const param = {
        ID: id,
        Name: this.Name,
        age: this.age,
        number: this.number,
        adress: this.adress
      };
      try {
        this.loading = true;
        // UPDATE用のAPIを呼び出し
        const response = await axios.put('https://m3h-ogasawarafunctionapi.azurewebsites.net/api/UPDATE', param);
        // 結果をコンソールに出力
        console.log(response.data);
        // データリストを更新
        this.readData();
      } catch (error) {
        this.error = error;
        console.error(error);
      } finally {
        this.loading = false;
      }
    },
    navigateToNewEntry: function() {
      window.location.href = 'new-entry.html'; // 新規入力ページへの遷移
    },
    navigateToUpdateEntry: function() {
      window.location.href = 'update-entry.html'; // 更新ページへの遷移
    }
  }
});