import type { Translation } from "../i18n-types";

export default {
    welcome: {
        title: "{worldName} (AI 캠프 27기 아지트)에 오신 걸 환영합니다! 🚀",
        description:
            "동기들과 소통하고, 실시간으로 협업하며 함께 성장하는 가상 캠프장에 도착하셨습니다. 열공 모드로 들어가기 전, 간단한 튜토리얼을 시작해 볼까요?",
        start: "캠프 투어 시작!",
        skip: "이미 숙련자입니다 (건너뛰기)",
    },
    movement: {
        title: "아지트 탐색하기",
        descriptionDesktop:
            "키보드 방향키 또는 WASD로 캐릭터를 움직여 보세요. 마우스 오른쪽 클릭으로도 원하는 위치로 이동할 수 있습니다. 지금 한 걸음 내디뎌 보세요!",
        descriptionMobile: "조이스틱이나 지도를 터치해서 캐릭터를 이동시킵니다. 지금 바로 움직여 보세요!",
        next: "다음 단계로",
    },
    communication: {
        title: "옹기종기 대화 버블",
        description:
            "다른 동기에게 가까이 다가가면 자동으로 대화 버블(Communication Bubble)이 생성됩니다. 버블 안의 동기들과 음성/화상으로 자유롭게 수다를 떨어보세요!",
        video: "./static/Videos/Meet.mp4",
        next: "오케이, 이해 완료!",
    },
    lockBubble: {
        title: "프라이빗 집중 모드 (잠금)",
        description: "잠금 버튼을 누르면 우리끼리만 대화할 수 있어요. 팀 프로젝트나 비밀 스터디 시에 아주 유용하답니다!",
        video: "./static/Videos/LockBubble.mp4",
        hint: "강조된 자물쇠 아이콘을 눌러서 보안을 강화해 보세요!",
        next: "다음 단계로",
    },
    screenSharing: {
        title: "코드/화면 공유하기",
        description: "내 화면을 동기들에게 실시간으로 보여줄 수 있어요. 페어 프로그래밍이나 코드 리뷰할 때 최고의 도구죠!",
        video: "./static/images/screensharing.mp4",
        hint: "강조된 화면 공유 아이콘을 눌러서 내 모니터를 중계해 보세요!",
        next: "다음 단계로",
    },
    pictureInPicture: {
        title: "PIP (강의 보며 이동하기)",
        description:
            "PIP 모드를 켜면 맵을 돌아다니면서도 동기의 얼굴이나 공유 화면을 구석에 띄워둘 수 있어요. 멀티태스킹의 필수템!",
        video: "./static/Videos/PictureInPicture.mp4",
        hint: "강조된 PiP 아이콘을 눌러서 활성화해 보세요!",
        next: "다음 단계로",
    },
    complete: {
        title: "출격 준비 완료! 🎉",
        description:
            "{worldName}에서의 생존 수칙을 모두 익히셨습니다! 이제 자유롭게 탐험하며 새로운 인연을 만나고, 즐거운 캠프 생활을 만끽하세요. 도움이 필요하면 언제든 메뉴의 가이드를 찾아주세요.",
        finish: "정글 속으로 (탐험 시작!)",
    },
} satisfies Translation["onboarding"];
