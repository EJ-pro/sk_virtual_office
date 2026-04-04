/**
 * 관리자 페이지에서 설정한 최신 수강생 명단을 백엔드에서 가져옵니다.
 */
export async function fetchCredentials(): Promise<Record<string, string>> {
    try {
        const response = await fetch("/admin-api/admin/users");
        if (!response.ok) throw new Error("Failed to fetch credentials");
        return await response.json();
    } catch (e) {
        console.error("Error fetching credentials from backend:", e);
        // 백엔드 연결 실패 시 기본 정적 데이터 반환 (Fallback)
        return {
            "27기_관리자_비상용": "1234"
        };
    }
}
