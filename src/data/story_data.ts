import { StageStoryData } from '../types';

export const stageStories: StageStoryData[] = [
    // ━━━━━━━━━━━━ STAGE 1 ━━━━━━━━━━━━
    {
        stageId: 1,
        title: 'マニラ空港',
        isBossStage: false,
        startStory: [
            { speaker: 'ナレーション', text: '湿った空気が、肺にまとわりつく。' },
            { speaker: 'ナレーション', text: '空港のドアが開く。遠くから声がする。' },
            { speaker: '空港の男', text: 'Kuya! Taxi? Taxi?' },
            { speaker: 'ナレーション', text: '男が笑顔で近づいてくる。' },
            { speaker: '主人公（心の声）', text: 'まだ何も分からない。この国の言葉も、この国のルールも。' },
            { speaker: '空港の男', text: 'Saan ka pupunta?' },
            { speaker: '主人公', text: '……今、なんて言った？' },
        ],
        endStory: [
            { speaker: 'ナレーション', text: 'タクシーの窓の外。クラクション。排気ガス。人混み。' },
            { speaker: '主人公', text: '……何も分からない。' },
            { speaker: 'ナレーション', text: 'スマートフォンが震える。新しいメッセージ。' },
            { speaker: 'メッセージ', text: '「生き残りたければ、言葉を覚えろ。」' },
        ],
    },

    // ━━━━━━━━━━━━ STAGE 2 ━━━━━━━━━━━━
    {
        stageId: 2,
        title: '渋滞地獄',
        isBossStage: false,
        startStory: [
            { speaker: 'ナレーション', text: '車は動かない。5分。10分。20分。' },
            { speaker: 'ナレーション', text: '運転手は笑っている。' },
            { speaker: '運転手', text: 'Traffic lang。' },
            { speaker: '主人公', text: 'これが……日常？' },
            { speaker: 'ナレーション', text: '遠くで子供たちが車を叩く。' },
            { speaker: '子供たち', text: 'Kuya, barya...' },
        ],
        endStory: [
            { speaker: 'ナレーション', text: '主人公は初めて、言葉を理解する。' },
            { speaker: '主人公', text: 'Salamat' },
            { speaker: 'ナレーション', text: '運転手が笑う。' },
            { speaker: '運転手', text: 'Magaling。' },
            { speaker: '主人公（心の声）', text: '少しだけ、この世界が見えた気がした。' },
        ],
    },

    // ━━━━━━━━━━━━ STAGE 3（ボスあり）━━━━━━━━━━━━
    {
        stageId: 3,
        title: '最初の夜',
        isBossStage: true,
        startStory: [
            { speaker: 'ナレーション', text: 'アパートの扉を開ける。暗い。' },
            { speaker: 'ナレーション', text: 'カサカサ。' },
            { speaker: '主人公', text: '……' },
            { speaker: 'ナレーション', text: '巨大なゴキブリが動いた。' },
            { speaker: '主人公', text: '……はは。' },
            { speaker: '主人公（心の声）', text: '逃げるか、戦うか。' },
        ],
        endStory: [
            { speaker: 'ナレーション', text: '主人公は立っている。まだ恐怖は消えない。' },
            { speaker: 'ナレーション', text: 'しかし、理解できる言葉が増えている。' },
            { speaker: '主人公', text: '……生きていける。バイゴンとともに' },
        ],
        bossStartStory: [
            { speaker: 'ナレーション', text: '黒い影が現れる。' },
            { speaker: '影：「言葉の壁」', text: 'Hindi ka nabibilang dito.（お前はここに属さない。）' },
            { speaker: '主人公', text: '……違う。' },
            { speaker: '主人公', text: '理解する。' },
            { speaker: 'ナレーション', text: '戦いが始まる。' },
        ],
        bossEndStory: [
            { speaker: 'ナレーション', text: '影が揺らぎ、霧散する。' },
            { speaker: '主人公（心の声）', text: '言葉は、壁ではない。' },
            { speaker: 'ナレーション', text: '次の扉が開く。' },
        ],
    },

    // ━━━━━━━━━━━━ STAGE 4 ━━━━━━━━━━━━
    {
        stageId: 4,
        title: '職場',
        isBossStage: false,
        startStory: [
            { speaker: 'ナレーション', text: 'オフィス。誰も働いていない。笑っている。' },
            { speaker: '同僚', text: 'Later na lang。' },
            { speaker: '主人公（心の声）', text: 'これが……この国の時間感覚か。' },
            { speaker: 'ナレーション', text: '午後になっても、状況は変わらない。' },
            { speaker: '主人公', text: '……どこから手をつける？' },
        ],
        endStory: [
            { speaker: 'ナレーション', text: '主人公は理解する。' },
            { speaker: '主人公（心の声）', text: 'これは怠慢ではない。文化だ。' },
            { speaker: 'ナレーション', text: '理解することで、世界が少し広がった。' },
        ],
    },

    // ━━━━━━━━━━━━ STAGE 5 ━━━━━━━━━━━━
    {
        stageId: 5,
        title: '突然の消失',
        isBossStage: false,
        startStory: [
            { speaker: 'ナレーション', text: '席が空いている。' },
            { speaker: '主人公', text: '彼は？' },
            { speaker: '同僚', text: 'Nag resign na。' },
            { speaker: '主人公', text: '昨日までいたのに？' },
            { speaker: 'ナレーション', text: '同僚は笑う。まるで当然のことのように。' },
        ],
        endStory: [
            { speaker: 'ナレーション', text: '主人公は気づく。' },
            { speaker: '主人公（心の声）', text: 'ここでは、すべてが流動的だ。' },
            { speaker: '主人公', text: '……覚悟しなければ。' },
        ],
    },

    // ━━━━━━━━━━━━ STAGE 6（ボスあり）━━━━━━━━━━━━
    {
        stageId: 6,
        title: '信頼の重さ',
        isBossStage: true,
        startStory: [
            { speaker: 'ナレーション', text: 'オフィスの蛍光灯が、かすかに点滅している。' },
            { speaker: 'マーク', text: 'Kuya, tulungan mo ako.（手伝ってほしい。）' },
            { speaker: '主人公（心の声）', text: '数週間前には音でしかなかった言葉。今は意味を持っている。' },
            { speaker: '主人公', text: '何をすればいい？' },
            { speaker: 'マーク', text: 'Madali lang.（簡単だよ。）' },
            { speaker: '主人公（心の声）', text: '本当に信じていいのか……？' },
        ],
        endStory: [
            { speaker: 'ナレーション', text: '翌日。マークの席は空だった。' },
            { speaker: '主人公', text: '……マークは？' },
            { speaker: '同僚', text: 'Nag resign na.（もう辞めたよ。）' },
            { speaker: '主人公', text: '……昨日、話したばかりだ。' },
            { speaker: '同僚', text: 'Normal lang.（普通のことだよ。）' },
            { speaker: '主人公（心の声）', text: '言葉を理解するほど、世界の残酷さも理解してしまう。' },
        ],
        bossStartStory: [
            { speaker: 'ナレーション', text: '暗闇。マークが立っている。しかし、顔が見えない。' },
            { speaker: '影：「信頼の亡霊」', text: 'Nagtiwala ka.（お前は信じた。）' },
            { speaker: '影', text: 'Kasalanan mo iyon.（それはお前の責任だ。）' },
            { speaker: '主人公', text: '違う。' },
            { speaker: '影', text: 'Hindi ka bagay dito.（お前はここにふさわしくない。）' },
            { speaker: '主人公', text: 'それでも、理解することをやめない。' },
        ],
        bossEndStory: [
            { speaker: 'ナレーション', text: '影が揺らぐ。' },
            { speaker: '主人公（心の声）', text: '信じることは弱さではない。' },
            { speaker: 'ナレーション', text: '暗闇が晴れる。次へ進む道が現れた。' },
        ],
    },

    // ━━━━━━━━━━━━ STAGE 7 ━━━━━━━━━━━━
    {
        stageId: 7,
        title: '夜のマニラ',
        isBossStage: false,
        startStory: [
            { speaker: 'ナレーション', text: 'ネオンが濡れた道路に反射している。カジノの入り口。' },
            { speaker: 'ナレーション', text: '笑う人間。泣く人間。すべてが混ざっている。' },
            { speaker: '同僚', text: 'Relax ka lang, Kuya!（リラックスして。）' },
            { speaker: 'ナレーション', text: '数週間前には理解できなかった言葉。今は自然に理解できる。' },
            { speaker: '主人公（心の声）', text: 'ここは別の世界だ。' },
        ],
        endStory: [
            { speaker: 'ナレーション', text: '主人公は見た。勝つ人間。負ける人間。' },
            { speaker: 'ナレーション', text: 'すべてが言葉で動いている。' },
            { speaker: '主人公（心の声）', text: '言葉は武器だ。そして盾だ。' },
            { speaker: '主人公', text: '……強くなる。' },
        ],
    },

    // ━━━━━━━━━━━━ STAGE 8 ━━━━━━━━━━━━
    {
        stageId: 8,
        title: '貧困',
        isBossStage: false,
        startStory: [
            { speaker: 'ナレーション', text: '帰り道。子供が近づいてくる。裸足。痩せている。' },
            { speaker: '子供', text: 'Kuya, gutom ako...（お腹が空いた。）' },
            { speaker: 'ナレーション', text: '完全に理解できる。逃げることはできない。' },
            { speaker: '主人公（心の声）', text: '世界は、美しくない。だが、理解することはできる。' },
        ],
        endStory: [
            { speaker: 'ナレーション', text: '主人公は何もできなかった。ただ、言葉を理解しただけ。' },
            { speaker: 'ナレーション', text: 'それでも、子供は笑った。' },
            { speaker: '子供', text: 'Salamat.' },
            { speaker: '主人公（心の声）', text: '理解は、無意味ではない。' },
        ],
    },

    // ━━━━━━━━━━━━ STAGE 9（ボスあり）━━━━━━━━━━━━
    {
        stageId: 9,
        title: '帰国の誘惑',
        isBossStage: true,
        startStory: [
            { speaker: 'ナレーション', text: 'メール。件名：「日本への帰任について」' },
            { speaker: '主人公（心の声）', text: '安全。清潔。理解できる世界。' },
            { speaker: '同僚', text: 'Kaya mo yan, Kuya.（君ならできる。）' },
            { speaker: '主人公（心の声）', text: '残るか、帰るか。' },
            { speaker: 'ナレーション', text: '主人公は空を見上げた。' },
        ],
        endStory: [
            { speaker: 'ナレーション', text: '主人公はメールを閉じた。返信しない。' },
            { speaker: '主人公', text: '……残る。' },
            { speaker: '主人公（心の声）', text: '恐怖はあるが、まだやることがある。逃げない。' },
        ],
        bossStartStory: [
            { speaker: '影：「恐怖の本体」', text: 'Uuwi ka rin.（どうせ帰る。）' },
            { speaker: '影', text: 'Hindi ka matibay.（お前は弱い。）' },
            { speaker: '主人公', text: '私は、ここにいる。' },
            { speaker: 'ナレーション', text: '影が崩れ始める。' },
        ],
        bossEndStory: [
            { speaker: 'ナレーション', text: '恐怖が消える。' },
            { speaker: '主人公（心の声）', text: '恐怖は本体ではなかった。' },
            { speaker: '主人公', text: '逃げずに、前に進む。' },
        ],
    },

    // ━━━━━━━━━━━━ STAGE 10 ━━━━━━━━━━━━
    {
        stageId: 10,
        title: '日常',
        isBossStage: false,
        startStory: [
            { speaker: 'ナレーション', text: '朝、騒々しいクラクションとコーヒー。同僚との会話。' },
            { speaker: '同僚', text: 'Traffic nanaman.' },
            { speaker: '主人公', text: 'Oo nga.' },
            { speaker: 'ナレーション', text: '自然に答える。恐怖はない。' },
            { speaker: '主人公（心の声）', text: 'いつの間にか、ここが日常になっていた。' },
        ],
        endStory: [
            { speaker: 'ナレーション', text: 'もう、異邦人ではない。' },
            { speaker: '主人公（心の声）', text: 'この街が、自分の一部になっている。' },
            { speaker: 'ナレーション', text: '言葉と共に、世界が変わった。' },
        ],
    },

    // ━━━━━━━━━━━━ STAGE 11 ━━━━━━━━━━━━
    {
        stageId: 11,
        title: '新しい影',
        isBossStage: false,
        startStory: [
            { speaker: 'ナレーション', text: '朝のオフィス。すべてが、もう異物ではない。' },
            { speaker: '新人', text: 'Kuya...' },
            { speaker: 'ナレーション', text: '振り返ると、新人が立っていた。若い。緊張している。' },
            { speaker: '新人', text: 'Pwede po magtanong...?（質問してもいいですか？）' },
            { speaker: '主人公', text: 'Oo. Ano yun?' },
            { speaker: 'ナレーション', text: '主人公は、かつての自分の姿を見た。' },
        ],
        endStory: [
            { speaker: 'ナレーション', text: '仕事が終わる。新人が近づく。' },
            { speaker: '新人', text: 'Salamat po, Kuya.' },
            { speaker: '主人公', text: 'Walang anuman.' },
            { speaker: '主人公（心の声）', text: '自然だった。努力ではない。反射だった。' },
            { speaker: 'ナレーション', text: '言葉は、もう壁ではない。' },
        ],
    },

    // ━━━━━━━━━━━━ STAGE 12（ボスあり）━━━━━━━━━━━━
    {
        stageId: 12,
        title: '嘘と真実',
        isBossStage: true,
        startStory: [
            { speaker: 'ナレーション', text: '会議室。プロジェクトの進行が遅れている。' },
            { speaker: 'マネージャー', text: 'Malapit na matapos.（もうすぐ終わる。）' },
            { speaker: '主人公（心の声）', text: 'それは嘘だと分かっている。' },
            { speaker: 'ナレーション', text: '同僚が目を逸らす。沈黙。' },
            { speaker: '主人公（心の声）', text: 'ここでは、真実よりも調和が優先される。これは、生存方法だ。' },
        ],
        endStory: [
            { speaker: 'ナレーション', text: '露店。笑う人々。ストリートチルドレンが走る。' },
            { speaker: '子供', text: 'Kuya!' },
            { speaker: '主人公', text: 'Kamusta.' },
            { speaker: 'ナレーション', text: '完全な理解。完全な受容。' },
            { speaker: '主人公（心の声）', text: 'もう外部の人間ではない。' },
        ],
        bossStartStory: [
            { speaker: 'ナレーション', text: 'かつての自分が立っている。スーツ。不安な目。' },
            { speaker: '過去の主人公', text: 'Why are you here?' },
            { speaker: '過去の主人公', text: 'You don\'t belong here.' },
            { speaker: '過去の主人公', text: 'You\'re pretending.' },
            { speaker: '主人公', text: '自分で選んだ道だ。' },
        ],
        bossEndStory: [
            { speaker: 'ナレーション', text: '過去の自分が崩れる。恐怖が消える。' },
            { speaker: '主人公（心の声）', text: '過去の自分を超えた。' },
            { speaker: 'ナレーション', text: '前に進む光が見える。' },
        ],
    },

    // ━━━━━━━━━━━━ STAGE 13 ━━━━━━━━━━━━
    {
        stageId: 13,
        title: '完全な会話',
        isBossStage: false,
        startStory: [
            { speaker: 'ナレーション', text: '昼休み。同僚たちが冗談を言っている。' },
            { speaker: '同僚A', text: 'Sana all mayaman.' },
            { speaker: 'ナレーション', text: '笑いが起きる。主人公も笑う。' },
            { speaker: '主人公（心の声）', text: 'ニュアンス。皮肉。空気。すべてが分かる。' },
            { speaker: '同僚B', text: 'Kuya, sama ka?' },
            { speaker: '主人公', text: 'Sige.' },
        ],
        endStory: [
            { speaker: 'ナレーション', text: '翻訳していない。理解している。直接。' },
            { speaker: '主人公（心の声）', text: '言葉は、もう異物ではない。自分の一部だ。' },
        ],
    },

    // ━━━━━━━━━━━━ STAGE 14 ━━━━━━━━━━━━
    {
        stageId: 14,
        title: '選択の意味',
        isBossStage: false,
        startStory: [
            { speaker: 'ナレーション', text: '夜、コンドミニアムのプールサイド。静寂。' },
            { speaker: 'ナレーション', text: '新しいメール。「帰任の機会について」高待遇。保証された未来。' },
            { speaker: '主人公（心の声）', text: '混沌。現実。ここに自分がいる。' },
            { speaker: 'ナレーション', text: '主人公は長く画面を見る。' },
            { speaker: '主人公（心の声）', text: '言葉だけではない。この世界を、理解している。' },
        ],
        endStory: [
            { speaker: 'ナレーション', text: '主人公は外に出る。夜の生ぬるい空気。湿気。' },
            { speaker: '主人公（心の声）', text: 'すべてが現実だ。すべてが理解できる。' },
            { speaker: 'ナレーション', text: '主人公は歩き出す。迷いはない。' },
        ],
    },

    // ━━━━━━━━━━━━ STAGE 15（ボスあり）━━━━━━━━━━━━
    {
        stageId: 15,
        title: '最後の問い',
        isBossStage: true,
        startStory: [
            { speaker: 'ナレーション', text: '影が現れる。' },
            { speaker: '影', text: 'Sino ka?（お前は誰だ？）' },
            { speaker: '主人公', text: 'Ako.（私だ。）' },
            { speaker: '影', text: 'Hindi sapat.（それでは足りない。）' },
            { speaker: '主人公', text: 'Pinili ko ito.（私が選んだ。）' },
        ],
        endStory: [
            { speaker: 'ナレーション', text: 'マニラ。太陽が昇る。街が動き始める。' },
            { speaker: '主人公（心の声）', text: '不安もない。あるのは、理解だけ。' },
            { speaker: '主人公（心の声）', text: 'これは終わりではない。始まりだ。' },
        ],
        bossStartStory: [
            { speaker: 'ナレーション', text: '完全な暗闇。声が響く。' },
            { speaker: '声：「無知の本体」', text: 'You still don\'t understand.' },
            { speaker: '声', text: 'You were weak. You were afraid.' },
            { speaker: '主人公', text: 'そうだ。' },
            { speaker: '主人公', text: 'だが、学んだ。理解した。' },
            { speaker: 'ナレーション', text: '光が現れる。' },
        ],
        bossEndStory: [
            { speaker: '同僚', text: 'Kuya!' },
            { speaker: '主人公', text: 'Oo.' },
            { speaker: 'ナレーション', text: '笑い声。街。主人公は歩き続ける。理解とともに。' },
            { speaker: 'ナレーション', text: 'Sana All——みんながそうであればいい。' },
            { speaker: '主人公（心の声）', text: '言葉は、世界への扉だった。' },
        ],
    },
];

export const getStoryByStage = (stageId: number): StageStoryData | undefined => {
    return stageStories.find(s => s.stageId === stageId);
};
