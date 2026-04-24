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

  // 2. Milestone Notification (Webhook or Formspree)
  const webhookUrl = process.env.NEXT_PUBLIC_MILESTONE_WEBHOOK || "";
  const formspreeId = process.env.NEXT_PUBLIC_FORMSPREE_ID || "";
  
  if (webhookUrl || formspreeId) {
    try {
      const endpoint = formspreeId 
        ? `https://formspree.io/f/${formspreeId}`
        : webhookUrl;

      await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: `New Birthday Response: ${name}`,
          ...properties,
          _subject: `Birthday Site: ${name}`, // For Formspree
          timestamp: new Date().toISOString(),
          url: typeof window !== "undefined" ? window.location.href : "unknown"
        }),
      });
    } catch (error) {
      console.warn("Milestone delivery failed:", error);
    }
  }


  console.log(`[Milestone Recorded]: ${name}`, properties);
};
