new Vue({
  el: '#app',
  vuetify: new Vuetify(),
  data: {
    Name: '',
    age: '',
    number: '',
    adress: '',
    error: null
  },
methods: {
  // データベースを更新する関数
  updateData: async function() {
    // IDフィールドの値を取得
    const ID = this.$refs.idField.$el.querySelector('input').value;
    console.log("IDフィールドの値:", ID); // デバッグ用にIDフィールドの値を出力
    if (!ID) {
      this.error = "IDを入力してください";
      return;
    }
    // 更新用のパラメーターを作成
    const param = {
      ID: ID,
      Name: this.Name,
      age: this.age,
      number: this.number,
      adress: this.adress
    };
    try {
      // UPDATE用のAPIを呼び出し
      const response = await axios.put('https://m3h-ogasawarafunctionapi.azurewebsites.net/api/UPDATE', param);
      console.log("API Response:", response); // 追加のログ
      console.log("API Response Data:", response.data); // 追加のログ
      console.log("API Response Status:", response.status); // 追加のログ
      if (response.status === 200) {
        window.location.href = 'index.html'; // 更新後に元のページに戻る
      } else {
        this.error = "更新に失敗しました。IDが存在しない可能性があります。";
      }
    } catch (error) {
      if (error.response) {
        // サーバーがステータスコードを返した場合
        this.error = `エラーが発生しました: ${error.response.status} - ${error.response.data}`;
      } else if (error.request) {
        // リクエストが送信されたが応答がない場合
        this.error = "サーバーからの応答がありません。";
      } else {
        // その他のエラー
        this.error = `エラーが発生しました: ${error.message}`;
      }
      console.error(error);
    }
  }
}
});