import type { DeepPartial } from "../DeepPartial";
import type { Translation } from "../i18n-types";

const login: DeepPartial<Translation["login"]> = {
    input: {
        id: {
            placeholder: "아이디 (27기_이름)",
        },
        password: {
            placeholder: "비밀번호",
        },
        name: {
            placeholder: "캠프에서 활동할 멋진 닉네임을 입력하세요",
            empty: "오잉? 닉네임이 비어 있습니다!",
            tooLongError: "닉네임이 너무 길어요! (데이터셋 초과?)",
            notValidError: "사용할 수 없는 형식의 닉네임입니다.",
        },
    },
    error: {
        invalid: "아이디 또는 비밀번호가 올바르지 않습니다. 😓",
    },
    genericError: "치명적 시스템 에러가 발생했습니다 😱",
    terms: "등교를 계속하면 {links}에 동의하는 것으로 간주합니다.",
    termsOfUse: "캠프 이용 수칙",
    privacyPolicy: "개인정보 처리방침",
    cookiePolicy: "데이터 처리 방침",
    continue: "아지트로 입장하기 🚀",
};

export default login;
