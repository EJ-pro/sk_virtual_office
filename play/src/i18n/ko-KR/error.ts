import type { DeepPartial } from "../DeepPartial";
import type { Translation } from "../i18n-types";

const error: DeepPartial<Translation["error"]> = {
    accessLink: {
        title: "길을 잃은 코딩 미아 (잘못된 주소)",
        subTitle: "아지트를 찾을 수 없습니다. 링크 주소가 올바른지 다시 한번 체크해 보세요!",
        details: "도움이 필요하면 캠프 매니저님께 SOS를 치거나 hello@workadventu.re로 연락해 보세요.",
    },
    connectionRejected: {
        title: "입구 컷! (연결 거부)",
        subTitle: "아지트에 입장할 수 없습니다. 나중에 다시 시도해 주세요 {error}.",
        details: "매니저님께 문의하거나 서버 상태를 확인해 보세요.",
    },
    connectionRetry: {
        unableConnect: "서버와 연결이 툭 끊겼습니다. 동기들의 대화가 들리지 않아요! 😱",
    },
    errorDialog: {
        title: "🚨 멘탈 소생 시급 (에러 발생!)",
        hasReportIssuesUrl: "상세 정보가 필요하면 매니저님께 문의하거나 다음 경로로 제보해 주세요:",
        noReportIssuesUrl: "문제가 지속되면 캠프 운영진에게 긴급 SOS를 요청하세요.",
        messageFAQ: "자주 묻는 질문(FAQ)도 정주행해 보세요:",
        reload: "F5(새로고침)로 심폐소생",
        close: "창 닫기",
    },
};

export default error;
