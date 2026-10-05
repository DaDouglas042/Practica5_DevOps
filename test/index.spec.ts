import {
    env,
    createExecutionContext,
    waitOnExecutionContext,
    SELF,
} from "cloudflare:test";
import { describe, it, expect } from "vitest";
import worker from "../src/index";

describe("Cloudflare Worker Tests", () => {
    it("responds with HTML dashboard (unit style)", async () => {
        const request = new Request("http://example.com/");
        const ctx = createExecutionContext();
        const response = await worker.fetch(request, env, ctx);
        await waitOnExecutionContext(ctx);

        expect(response.status).toBe(200);
        expect(response.headers.get("Content-Type")).toContain("text/html");
        const text = await response.text();
        expect(text).toContain("Francisco de Jesús Delgado Carrasco");
    });

    it("responds with HTML dashboard (integration style)", async () => {
        const response = await SELF.fetch("https://example.com/");
        expect(response.status).toBe(200);
        const text = await response.text();
        expect(text).toContain("Francisco de Jesús Delgado Carrasco");
    });

    it("responds with JSON on /api/status", async () => {
        const response = await SELF.fetch("https://example.com/api/status");
        expect(response.status).toBe(200);
        expect(response.headers.get("Content-Type")).toContain("application/json");
        const data = await response.json();
        expect(data).toBeDefined();
    });
});