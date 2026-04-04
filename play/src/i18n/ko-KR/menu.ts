import type { DeepPartial } from "../DeepPartial";
import type { Translation } from "../i18n-types";

const menu: DeepPartial<Translation["menu"]> = {
    title: "캠프 커맨드 센터",
    icon: {
        open: {
            menu: "센터 메뉴 펼치기",
            invite: "동기 초대하기",
            register: "캠프 등록",
            chat: "대화창 열기",
            userlist: "수강생 현황",
            openEmoji: "리액션 이모지 팝업!",
            closeEmoji: "이모지 메뉴 닫기",
            mobile: "모바일 센터 메뉴",
            calendar: "우리 팀 달력",
            todoList: "오늘의 할 일 (To-Do)",
        },
    },
    visitCard: {
        close: "닫기",
        sendMessage: "DM 보내기",
    },
    profile: {
        login: "오늘도 갓생! 로그인",
        logout: "캠프 하산 (로그아웃)",
        helpAndTips: "캠프 생존 가이드",
    },
    settings: {
        videoBandwidth: {
            title: "내 얼굴 화질 (고퀄리티 필말?)",
            low: "데이터 절약형",
            recommended: "권장 사항",
            high: "HD 뿜뿜 (고품질)",
        },
        shareScreenBandwidth: {
            title: "화면 공유 품질 (코드 가독성용)",
            low: "흐릿함 주의",
            recommended: "권장 사항",
            high: "칼화질(HD)",
        },
        bandwidthConstrainedPreference: {
            title: "네트워크가 비실비실할 때",
            maintainFramerateTitle: "부드러운 움직임 우선",
            maintainFramerateDescription:
                "해상도보다 프레임레이트를 우선합니다. 게임이나 영상 시청 시 부드러움을 위해 추천!",
            maintainResolutionTitle: "코드 가독성 우선",
            maintainResolutionDescription:
                "프레임보다 해상도를 우선합니다. 페어 프로그래밍이나 프레젠테이션 시 텍스트를 위해 추천!",
            balancedTitle: "AI가 알아서 균형 맞춤",
            balancedDescription: "품질과 속도를 적절하게 조절합니다.",
        },
        language: {
            title: "언어 설정 (모국어 최고!)",
        },
        privacySettings: {
            title: "집중 모드 (자리 비움)",
            explanation: '브라우저 탭을 떠나면 자동으로 "열공 중 모드"로 전환됩니다',
            cameraToggle: '"열공 중 모드"에서도 카메라 켜두기',
            microphoneToggle: '"열공 중 모드"에서도 마이크 켜두기',
        },
        save: "세팅 저장!",
        otherSettings: "캠프 환경 전체 설정",
        fullscreen: "전체 화면으로 몰입!",
        notifications: "중요 알림",
        enablePictureInPicture: "PIP 모드 (강의 보며 작업하기)",
        chatSounds: "채팅 띠링 소리",
        cowebsiteTrigger: "웹사이트/Jitsi 열기 전 확인창 띄우기",
        ignoreFollowRequest: "다른 동기의 따라오기 요청 무시",
        proximityDiscussionVolume: "주변 동기 대화 볼륨",
        blockAudio: "ASMR/주변 소리 차단 (고도의 집중력!)",
        disableAnimations: "지도 애니메이션 끄기 (저사양 모드)",
        bubbleSound: "말풍선 알림음",
        bubbleSoundOptions: {
            ding: "기본 띵~",
            wobble: "우블우블~",
        },
        displayVideoQualityStats: "네트워크 상태(핑) 실시간 확인",
    },
    invite: {
        description: "우리 캠프 링크 복사해서 공유하기!",
        copy: "주소 복사",
        copied: "복사 완료!",
        share: "널리 알리기",
        walkAutomaticallyToPosition: "이 위치로 자동 호출",
        selectEntryPoint: "입장 게이트 변경",
        selectEntryPointSelect: "동기들이 들어올 입구를 골라주세요",
    },
    globalMessage: {
        text: "공지 텍스트",
        audio: "공지 오디오",
        warning: "캠프 전체에 방송하기 (확성기!)",
        enter: "전달할 메시지를 입력해 주세요...",
        send: "전송!",
    },
    globalAudio: {
        uploadInfo: "오디오 업로드",
        error: "파일을 안 올리셨어요! 전송 전에 업로드가 필요합니다.",
        errorUpload: "업로드 에러 발생... 용량이나 형식을 확인해 보세요. 안 되면 주동이(관리자)에게 SOS!",
        dragAndDrop: "오디오 파일을 여기로 툭~ 던져주세요 🎧",
    },
    contact: {
        gettingStarted: {
            title: "첫 캠프 시작하기",
            description:
                "WorkAdventure에서는 우리만의 스터디 룸이나 오피스를 꾸밀 수 있어요. 이미 준비된 멋진 지도 중에서 골라보세요!",
        },
        createMap: {
            title: "맞춤형 아지트 제작",
            description: "가이드를 따라 나만의 힙한 공간을 직접 구축할 수 있습니다.",
        },
    },
    about: {
        mapInfo: "아지트 정보",
        mapLink: "이 아지트 주소",
        copyrights: {
            map: {
                title: "지도 저작권",
                empty: "이 지도에 명시된 저작권 정보가 없네요.",
            },
            tileset: {
                title: "타일셋 저작권",
                empty: "타일셋 저작권 정보가 없습니다. (무단 도용은 안돼요!)",
            },
            audio: {
                title: "오디오 소스 저작권",
                empty: "사운드 저작권 정보가 없습니다.",
            },
        },
    },
    chat: {
        matrixIDLabel: "매트릭스 ID",
        settings: "채팅 세팅",
        resetKeyStorageUpButtonLabel: "인증키 초기화 (비상!)",
        resetKeyStorageConfirmationModal: {
            title: "보안키 저장소 리셋 확인",
            content: "정말 저장소를 초기화하시겠어요? 책임지셔야 합니다!",
            warning:
                "리셋하면 현재 세션과 신뢰 관계가 모두 날아갑니다. 이전 메시지를 못 보게 될 수도 있어요. 신중하게 고민하고 결정하세요!",
            cancel: "멈춰! (취소)",
            continue: "난 앞만 보고 간다 (계속)",
        },
    },
    sub: {
        profile: "내 신분 정보",
        settings: "장비 세팅",
        credit: "만든 사람들",
        globalMessages: "전체 확성기 공지",
        contact: "SOS 문의",
        report: "버그 제보 (현상금 없음)",
        chat: "함께 대화",
        help: "생존 가이드/배움터",
        contextualActions: "지금 가능한 작업",
        shortcuts: "단축키 마스터",
    },
    shortcuts: {
        title: "키보드 숏컷 (작업 속도 2배!)",
        keys: "단축키",
        actions: "동작",
        moveUp: "위로 전진",
        moveDown: "아래로 후진",
        moveLeft: "좌클릭 이동",
        moveRight: "우클릭 이동",
        speedUp: "부스터 활성화 (달리기!)",
        interact: "상호작용 (아이템 클릭)",
        follow: "동기 따라가기",
        openChat: "채팅창 팝업",
        openUserList: "출석부 확인",
        toggleMapEditor: "맵 에디터 온/오프",
        rotatePlayer: "플레이어 방향 전환",
        emote1: "리액션 1",
        emote2: "리액션 2",
        emote3: "리액션 3",
        emote4: "리액션 4",
        emote5: "리액션 5",
        emote6: "리액션 6",
        openSayPopup: "한마디 던지기 (팝업)",
        openThinkPopup: "조용히 생각하기 (팝업)",
        walkMyDesk: "내 내정선(책상)으로 고속 이동",
    },
};

export default menu;
