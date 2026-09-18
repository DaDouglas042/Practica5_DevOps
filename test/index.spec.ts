import {
	env,
	createExecutionContext,
	waitOnExecutionContext,
	SELF,
} from "cloudflare:test";
import { describe, it, expect } from "vitest";
import worker from "../src/index";

const IncomingRequest = Request<unknown, IncomingRequestCfProperties>;

describe("Cloudflare Worker - Practica 5", () => {
	it("responds with HTML dashboard (unit style)", async () => {
		const request = new IncomingRequest("http://example.com/");
		const ctx = createExecutionContext();
		const response = await worker.fetch(request, env, ctx);
		await waitOnExecutionContext(ctx);

		expect(response.status).toBe(200);
		expect(response.headers.get("Content-Type")).toContain("text/html");
		const text = await response.text();
		expect(text).toContain("Práctica 5 - Integración de Cloudflare");
		expect(text).toContain("Francisco de Jesús Delgado Carrasco");
	});

	it("responds with HTML dashboard (integration style)", async () => {
		const response = await SELF.fetch("https://example.com/");
		expect(response.status).toBe(200);
		const text = await response.text();
		expect(text).toContain("crimson-grass-4362");
		expect(text).toContain("Modificación con IA completada");
	});

	it("responds with JSON on /api/status", async () => {
		const response = await SELF.fetch("https://example.com/api/status");
		expect(response.status).toBe(200);
		expect(response.headers.get("Content-Type")).toContain("application/json");
		const data = await response.json() as { status: string; student: string; modifiedByAI: boolean };
		expect(data.status).toBe("ok");
		expect(data.student).toBe("Francisco de Jesús Delgado Carrasco");
		expect(data.modifiedByAI).toBe(true);
	});
});
