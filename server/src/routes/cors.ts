// @ts-ignore-nextline
import corsAnywhere from "cors-anywhere";
import { Router } from "express";

const router = Router();

let proxy = corsAnywhere.createServer({
	originWhitelist: [], // Allow all origins
	requireHeaders: [], // Do not require any headers.
	removeHeaders: [], // Do not remove any headers.
});

/* Attach our cors proxy to the existing API on the /proxy endpoint. */
router.get("/proxy/:proxyUrl*", (req, res) => {
	req.url = req.url.replace("/proxy/", "/"); // Strip '/proxy' from the front of the URL, else the proxy won't work.
	proxy.emit("request", req, res);
});

export default router;
