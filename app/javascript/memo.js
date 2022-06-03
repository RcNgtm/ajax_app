const buildHTML = (XHR) =>{
  const item = XHR.response.post;
  const html = `
    <div class="post">
      <div class="post-date">
        投稿日時：${item.created_at}
      </div>
      <div class="post-content">
        ${item.content}
      </div>
    </div>`;
  return html;
};


function post (){
  const submit = document.getElementById("submit");
    // ①submitでデータ保存のイベント発火
  submit.addEventListener("click", (e) =>{
    // ②規定のイベントを無効化
    e.preventDefault(); 
    const form = document.getElementById("form");
    // ③formidを探し定数formに代入
    const formData = new FormData(form);
    // ④new FormDataでformに入力された値を取得し定数formDataに代入
    const XHR = new XMLHttpRequest();
    // ⑤Ajaxによるリクエストを行う際に使用する、XMLHttpRequestオブジェクトを生成
    XHR.open("POST","/posts",true);
    // ⑥openメソッドでリクエストの内容を指定
    XHR.responseType = "json";
    // ⑦データ形式を指定
    XHR.send(formData);
    // ⑧リクエストを送信
    // ⑨通信が成功した場合の処理
    XHR.onload = () => {
      if (XHR.status != 200){
        alert(`Error ${XHR.status}: ${XHR.statusText}`);
        return null;
      };
      const list = document.getElementById("list");
      const formText = document.getElementById("content");
      list.insertAdjacentHTML("afterend", buildHTML(XHR));
      formText.value = "";
    };
  });
};

window.addEventListener('load',post);