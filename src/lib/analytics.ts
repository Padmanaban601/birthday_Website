import posthog from "posthog-js";

/**
 * Sends a milestone notification.
 * You can connect this to a service like Formspree, Discord Webhook, or LogSnag.
 */
export const trackMilestone = async (name: string, properties: Record<string, any> = {}) => {
  // 1. PostHog Event (For session recording & analytics)
  if (typeof window !== "undefined") {
    posthog.capture(name, properties);
  }

  // 2. Milestone Notification (Placeholder for Webhook)
  // Replace the URL with your Formspree or Discord Webhook URL to get real-time pings!
  const webhookUrl = process.env.NEXT_PUBLIC_MILESTONE_WEBHOOK || "";
  
  if (webhookUrl) {
    try {
      await fetch(webhookUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          milestone: name,
          timestamp: new Date().toISOString(),
          details: properties,
          url: typeof window !== "undefined" ? window.location.href : "unknown"
        }),
      });
    } catch (error) {
      console.warn("Milestone ping failed:", error);
    }
  }

  console.log(`[Milestone Recorded]: ${name}`, properties);
};
