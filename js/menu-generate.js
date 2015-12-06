define(['jquery'], function($) {

    var menuGenerate = {};

    /**
     *  默认配置项
     * @type {{keys: {id: string, title: string, fatherId: string}}}
     */
    menuGenerate.option = {
        keys: {
            id: "id",
            title: "title",
            fatherId: "fatherId"
        }
    }

    /**
     *  配置对应的键
     *  @param config
     */
    menuGenerate.config = function(config) {
        var keys = menuGenerate.option.keys;
        var configKeys = config.keys;
        for (var key in configKeys) {
            if (key == "id") {
                keys.id = configKeys[key];
            } else if (key == "title") {
                keys.title = configKeys[key];
            } else if (key == "fatherId") {
                keys.fatherId = configKeys[key];
            }
        }
    }

    // 菜单生成
    menuGenerate.generateMenu = function (arr) {
        var index = 0;
        var len = arr.length;
        var $ul = $("<ul></ul>");
        var keys = menuGenerate.option.keys;
        while (index < len) {
            var id = arr[index][keys.id];
            var fatherId = arr[index][keys.fatherId];
            var $fatherEle = this.findFatherMenuById($ul, fatherId);
            var $li = "<li data-id=" + id + " data-father=" + fatherId + "><span>" + arr[index].title + "</span></li>";
            if ($fatherEle.length) {
                // 父菜单存在
                var $childUl = $fatherEle.find("ul");
                if ($childUl.length) {
                    // 子菜单已经有ul
                    $childUl.append($li);
                } else {
                    $fatherEle.append("<ul>" + $li + "</ui>")
                }
                $fatherEle.find("ul").css("display", "none");
            } else {
                $ul.append($li);
            }
            index++;
        }
        return $ul;
    }

    /**
     *  查询父菜单元素
     * @param ele
     * @param fatherId
     */
    menuGenerate.findFatherMenuById = function (ele, fatherId) {
        return ele.find("li[data-id=" + fatherId + "]");
    };

    /**
     *  附加到元素
     * @param eleStr
     */
    menuGenerate.appendMenuToEle = function(selector, ele) {
        $(selector).append(ele);
    };

    /**
     *  初始化点击事件
     */
    menuGenerate.initEvent = function(ul) {
        if (ul.length && ul[0].tagName != 'UL') {
            throw new Error("ele must be ul");
        }
        ul.children("li").children("span").bind("click", function(e) {
            var closestUl = $(this).next();  // 最近的ul
            if (closestUl.length) {
                closestUl.stop().slideToggle();
            }
            menuGenerate.initEvent($(this).next("ul"));
        })
    }

    /**
     *  调用init方法生成菜单
     * @param selector
     * @param arr
     */
    menuGenerate.init = function(selector, arr) {
        var menu = this.generateMenu(arr);
        this.appendMenuToEle(selector, menu);
        this.initEvent(selector.children("ul"));
    }
    return menuGenerate;
});