// 画面の読み込みが完了してから実行する
document.addEventListener('DOMContentLoaded', () => {
    
    // --- よくある質問（アコーディオン機能） ---
    // 1. すべての質問ボタンを取得
    const faqQuestions = document.querySelectorAll('.faq-question');

    // 2. 各ボタンにクリックイベントを設定
    faqQuestions.forEach(question => {
        question.addEventListener('click', () => {
            
            // クリックされたボタンに対応する「答え」の要素を取得
            const answer = question.nextElementSibling;
            
            // ボタンに「is-open」クラスがついてるかチェック
            const isOpen = question.classList.contains('is-open');
            
            // 一度すべてのアコーディオンを閉じる（他の質問を閉じたい場合のみ。残したい場合はこのブロックを消す）
            faqQuestions.forEach(q => {
                q.classList.remove('is-open');
                q.nextElementSibling.style.maxHeight = null;
            });

            // 閉じていた場合は開く、開いていた場合は閉じる
            if (!isOpen) {
                question.classList.add('is-open');
                // scrollHeight は中身の実際の高さ（ピクセル数）を取得します
                answer.style.maxHeight = answer.scrollHeight + "px";
            } else {
                question.classList.remove('is-open');
                answer.style.maxHeight = null;
            }
        });
    });
//値をグラフに表示させる
Chart.plugins.register({
    afterDatasetsDraw: function (chart, easing) {
        var ctx = chart.ctx;

        chart.data.datasets.forEach(function (dataset, i) {
            var meta = chart.getDatasetMeta(i);
            if (!meta.hidden) {
                meta.data.forEach(function (element, index) {
                    // 値の表示
                    ctx.fillStyle = 'rgb(0, 0, 0,0.8)';//文字の色
                    var fontSize = 12;//フォントサイズ
                    var fontStyle = 'normal';//フォントスタイル
                    var fontFamily = 'Arial';//フォントファミリー
                    ctx.font = Chart.helpers.fontString(fontSize, fontStyle, fontFamily);

                    var dataString = dataset.data[index].toString();
					
                    // 値の位置
                    ctx.textAlign = 'center';//テキストを中央寄せ
                    ctx.textBaseline = 'middle';//テキストベースラインの位置を中央揃え

                    var padding = 5;//余白
                    var position = element.tooltipPosition();
                    ctx.fillText(dataString, position.x, position.y - (fontSize / 2) - padding);
		
                });
            }
        });
    }
});

//=========== 画面に入るたびに円グラフを動かす ============//
$('.pie').on('inview', function(event, isInView) {
    if (isInView) {
        // 💡 画面に入った時：クラスを付けてアニメーションを開始！
        $(this).addClass('is-animated');
    } else {
        // 💡 画面から消えた時：クラスを外して、次回のために「0%」の状態にリセット！
        $(this).removeClass('is-animated');
    }
});



});
