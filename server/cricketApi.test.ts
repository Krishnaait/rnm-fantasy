import { describe, expect, it } from "vitest";

/**
 * Test to validate the CRIC_API_KEY environment variable
 * This test calls the CricAPI to verify the key is valid
 */
describe("CricAPI Integration", () => {
  it("should have CRIC_API_KEY environment variable set", () => {
    const apiKey = process.env.CRIC_API_KEY;
    expect(apiKey).toBeDefined();
    expect(apiKey).not.toBe("");
    expect(apiKey?.length).toBeGreaterThan(10);
  });

  it("should successfully fetch data from CricAPI", async () => {
    const apiKey = process.env.CRIC_API_KEY;
    
    if (!apiKey) {
      console.warn("CRIC_API_KEY not set, skipping API test");
      return;
    }

    // Call the CricAPI cricScore endpoint to validate the key
    const response = await fetch(
      `https://api.cricapi.com/v1/cricScore?apikey=${apiKey}`
    );

    expect(response.ok).toBe(true);
    
    const data = await response.json();
    
    // Check that the response has the expected structure
    expect(data).toHaveProperty("status");
    
    // If status is success, the API key is valid
    if (data.status === "success") {
      expect(data).toHaveProperty("data");
      console.log(`CricAPI validation successful. Found ${data.data?.length || 0} matches.`);
    } else {
      // API might return failure if no matches are available, but key is still valid
      // Check if it's an auth error
      if (data.status === "failure" && data.reason?.includes("Invalid API Key")) {
        throw new Error("Invalid CRIC_API_KEY - please provide a valid API key");
      }
      // Otherwise, the key is valid but no data available
      console.log("CricAPI key is valid, but no match data currently available");
    }
  });
});
