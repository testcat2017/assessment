(function(){
    'use strict';

    const userNameInput     = document.getElementById('user-name');
    const assessmentButton  = document.getElementById('assessment');
    const resultDivided     = document.getElementById('result-area');
    const tweetDivided      = document.getElementById('tweet-area');

    /**
     * 指定した要素の子を全て削除する
     * @param {HTMLElement} element HTMLの要素 
     */
    function removeAllChildren(element) {
        let child;
        while (child = element.firstChild) {
            element.removeChild(child);
        }
    }

    // "診断する"クリック時
    assessmentButton.onclick = () => {
        const userName = userNameInput.value;
        if (userName.length === 0) {
            return;
        }
        //console.log(userName);
        
        // 診断結果表示エリアの作成
        removeAllChildren(resultDivided);

        const header = document.createElement('h3');
        header.innerText = '診断結果';
        resultDivided.appendChild(header);

        const paragraph = document.createElement('p');
        const result = assessment(userName);
        paragraph.innerText = result;
        resultDivided.appendChild(paragraph);
    
        // Tweetエリアの作成
        removeAllChildren(tweetDivided);
        // 動的にaタグを作成
        const anchor = document.createElement('a');
        // textパラメータに診断結果を設定
        const hrefValue = 'https://twitter.com/intent/tweet?button_hashtag=%E3%83%86%E3%82%B9%E3%83%88&text='
                            + encodeURIComponent(result);
        anchor.setAttribute('href', hrefValue);
        anchor.className = 'twitter-hashtag-button';
        anchor.innerText = 'Tweet #%E3%83%86%E3%82%B9%E3%83%88';
        tweetDivided.appendChild(anchor);
        // リンクアイコン生成
        twttr.widgets.load();
    };

    // user-nameでEnter入力時
    userNameInput.onkeydown = (event) => {
        if (event.keyCode === 13) {
            assessmentButton.onclick(); 
        }
    };
    
    
    const answers = [
        '{userName}のいいところは声です。{userName}の特徴的な声はみなを惹きつけ、心に残ります。',
        '{userName}のいいところはまなざしです。{userName}に見つめられた人は、気になって仕方がないでしょう。',
        '{userName}のいいところは情熱です。{userName}の情熱に周りの人は感化されます。',
        '{userName}のいいところは厳しさです。{userName}の厳しさがものごとをいつも成功に導きます。',
        '{userName}のいいところは知識です。博識な{userName}を多くの人が頼りにしています。',
        '{userName}のいいところはユニークさです。{userName}だけのその特徴が皆を楽しくさせます。',
        '{userName}のいいところは用心深さです。{userName}の洞察に、多くの人が助けられます。',
        '{userName}のいいところは見た目です。内側から溢れ出る{userName}の良さに皆が気を惹かれます。',
        '{userName}のいいところは決断力です。{userName}がする決断にいつも助けられる人がいます。',
        '{userName}のいいところは思いやりです。{userName}に気をかけてもらった多くの人が感謝しています。',
        '{userName}のいいところは感受性です。{userName}が感じたことに皆が共感し、わかりあうことができます。',
        '{userName}のいいところは節度です。強引すぎない{userName}の考えに皆が感謝しています。',
        '{userName}のいいところは好奇心です。新しいことに向かっていく{userName}の心構えが多くの人に魅力的に映ります。',
        '{userName}のいいところは気配りです。{userName}の配慮が多くの人を救っています。',
        '{userName}のいいところはその全てです。ありのままの{userName}自身がいいところなのです。',
        '{userName}のいいところは自制心です。やばいと思ったときにしっかりと衝動を抑えられる{userName}が皆から評価されています。'
    ];

    /**
     * 名前の文字列を渡すと診断結果を返す関数
     * @param {string} userName ユーザー名
     * @return {string} 診断結果
     */
    function assessment(userName) {
        let sumOfcharCode = 0;
        for (let i = 0; i < userName.length; i++) {
            sumOfcharCode += userName.charCodeAt(i);
        }
        
        const index = sumOfcharCode % answers.length;
        let result = answers[index].replace(/\{userName\}/g, userName);
        
        return result;
    }

    console.assert(
        assessment('太郎') === '太郎のいいところは決断力です。太郎がする決断にいつも助けられる人がいます。',
        'テスト失敗'
    );
    let testName = 'テスト太郎';
    console.assert(
        assessment(testName) === assessment(testName),
        '結果が一致しません'
    );

})();
