type AnalyticsWindow = Window & {
  gtag?: (...args: unknown[]) => void;
  dataLayer?: Record<string, unknown>[];
};

export function trackEvent(
  name: string,
  params?: Record<string, string>
): void {
  if (typeof window === "undefined") return;
  const w = window as AnalyticsWindow;
  if (typeof w.gtag === "function") {
    w.gtag("event", name, params);
  }
  if (Array.isArray(w.dataLayer)) {
    w.dataLayer.push({ event: name, ...params });
  }
}
