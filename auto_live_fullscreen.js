// ==UserScript==
// @name         直播平台自动网页全屏
// @namespace    http://tampermonkey.net/
// @homeurl      https://github.com/xiandanin/LardMonkeyScripts
// @homeurl      https://greasyfork.org/zh-CN/scripts/377547
// @version      1.0
// @description  直播平台进入直播间后自动网页全屏; 熊猫TV需要切换成H5播放器
// @author       xiandanin
// @match        https://www.douyu.com/*
// @match        https://www.panda.tv/*
// @match        https://www.huya.com/*
// @match        https://cc.163.com/*
// @grant        none
// ==/UserScript==

(function () {
    var intervalTime = 500;
    var fullscreenComplete = false;
    var executeTime = 0;
    var interval;

    let url = window.location.host
    if (url.indexOf("douyu.com") !== -1) {
        //斗鱼延迟执行才有效
        setTimeout(function () {
            clickLivePlatform(true, "showdanmu-42b0ac", "wfs-2a8e83")
        }, 5000)
    } else if (url.indexOf("cc.163.com") !== -1) {
        //CC延迟执行才有效
        setTimeout(function () {
            clickLivePlatform(true, "video-player-control-item video-player-comment on", "video-player-control-item video-player-theater-control")
            // 打开影响观看的设置
            document.querySelector('.ban-effect-list').children[1].click()
            document.querySelector('.ban-effect-list').children[3].click()
        }, 3000)
    } else {
        interval = setInterval(applyLivePlatform, intervalTime);
    }

    function clickLivePlatform (isClassName, danmu, fullscreen) {
        console.log("已经执行" + executeTime + "ms，网页全屏：" + fullscreenComplete + "，任务已清除")
        if (isClassName) {
            if (document.getElementsByClassName(danmu).length > 0) {
                document.getElementsByClassName(danmu)[0].click();
            }
            if (document.getElementsByClassName(fullscreen).length > 0) {
                document.getElementsByClassName(fullscreen)[0].click();
                console.log("已经执行点击网页全屏")
                fullscreenComplete = true
            }
        } else {
            if (document.getElementById(danmu) != null) {
                document.getElementById(danmu).click();
            }
            if (document.getElementById(fullscreen) != null) {
                document.getElementById(fullscreen).click();
                console.log("已经执行点击网页全屏")
                fullscreenComplete = true
            }
        }
    }

    function applyLivePlatform () {
        executeTime += 500;
        if (executeTime >= 6000 || fullscreenComplete) {
            clearInterval(interval);
            console.log("已经执行" + executeTime + "ms，网页全屏：" + fullscreenComplete + "，任务已清除")
            return
        } else {
            console.log("已经执行" + executeTime + "ms，网页全屏：" + fullscreenComplete + "，任务已清除")
        }

        if (url.indexOf("huya.com") != -1 && document.getElementById("player-video") != null) {
            document.styleSheets[document.styleSheets.length - 1].insertRule('.chat-room__list .name { max-width: 100%; }')
            document.styleSheets[document.styleSheets.length - 1].insertRule('.week-rank__bd .week-rank-name { max-width: 100%; }')
            clickLivePlatform(false, "player-danmu-btn", "player-fullpage-btn")
        } else if (url.indexOf("panda.tv") != -1 && document.getElementsByClassName("h5player-player-core-container").length > 0) {
            clickLivePlatform(true, "h5player-control-circlebar-btn h5player-control-circlebar-danmu  open-switch", "h5player-control-bar-btn h5player-control-bar-fullscreen")
        } else {
            fullscreenComplete = true
            console.log("没有匹配到合适的执行条件")
        }
    }

})();
