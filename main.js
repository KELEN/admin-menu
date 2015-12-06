require.config({
    baseUrl: './js',
    paths: {
        jquery: "jquery.min",
        highlight: "highlight.pack"
    }
});

require(['menu-generate', 'highlight'], function(gen) {

    var arr = [
        { uid:1, title: "体育新闻", fatherId: 0 },
        { uid:2, title: "热点新闻", fatherId: 0 },
        { uid:3, title: "足球新闻", fatherId: 1 },
        { uid:4, title: "篮球新闻", fatherId: 1 },
        { uid:5, title: "娱乐新闻", fatherId: 2 },
        { uid:6, title: "火爆新闻", fatherId: 2 },
        { uid:7, title: "搞笑新闻", fatherId: 2 },
        { uid:8, title: "三级新闻", fatherId: 3 },
    ]

    gen.config({
        keys: {
            id: "uid",
            title: "title",
            fatherId: "fatherId"
        }
    })
    gen.init($("#kmenu"), arr);

    $("pre code").each(function(i, block) {
        hljs.highlightBlock(block);
    });
});