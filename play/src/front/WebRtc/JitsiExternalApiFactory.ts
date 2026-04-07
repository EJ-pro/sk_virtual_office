class JitsiExternalApiFactory {
    private loadingPromise: Promise<void> | undefined;

    public getJitsiApiUrl(domain: string): string {
        if (!domain.startsWith("https://") && !domain.startsWith("http://")) {
            domain = "https://" + domain;
        }
        return domain + "/external_api.js";
    }

    public loadJitsiScript(domain: string): Promise<void> {
        return Promise.reject(new Error("Jitsi integration is disabled."));
    }
}

export const jitsiExternalApiFactory = new JitsiExternalApiFactory();
