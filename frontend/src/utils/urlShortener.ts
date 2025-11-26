export const shortenUrlWithTinyUrl = async (
  longUrl: string
): Promise<string> => {
  const apiToken = import.meta.env.VITE_TINYURL_TOKEN;

  if (!apiToken) {
    console.warn("TinyURL API token not found, returning original URL");
    return longUrl;
  }

  try {
    const response = await fetch("https://api.tinyurl.com/create", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        url: longUrl,
        domain: "tinyurl.com",
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      console.error("TinyURL error:", error);
      throw new Error("Failed to shorten URL");
    }

    const data = await response.json();
    return data.data.tiny_url;
  } catch (error) {
    console.error("URL shortening failed:", error);
    return longUrl;
  }
};
