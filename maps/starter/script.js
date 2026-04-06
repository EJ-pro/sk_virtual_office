/// <reference path="../node_modules/@workadventure/iframe-api-typings/iframe_api.d.ts" />

let currentPopup = undefined;
const today = new Date();
const time = today.getHours() + ":" + today.getMinutes();

WA.room.onEnterZone('clock', () => {
    currentPopup =  WA.ui.openPopup("clockPopup","It's " + time,[]);
})

WA.room.onLeaveZone('clock', closePopUp)

function closePopUp(){
    if (currentPopup !== undefined) {
        currentPopup.close();
        currentPopup = undefined;
    }
}

// 익명 우체통 메뉴 등록
WA.ui.registerMenu('📮 익명 우체통', () => {
    // IframeListener.ts에서 추가한 openMailbox 이벤트를 트리거합니다.
    window.parent.postMessage({type: 'openMailbox'}, '*');
});
