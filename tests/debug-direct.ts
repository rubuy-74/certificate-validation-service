import fs from "node:fs";
import { PubSub } from "@google-cloud/pubsub";
import dotenv from "dotenv";

dotenv.config();

const PROJECT_ID = process.env.PROJECT_ID || "test-project";
const PUBSUB_PROJECT_ID = process.env.PUBSUB_PROJECT_ID || PROJECT_ID;

const REQUEST_TOPIC = process.env.REQUEST_TOPIC || "CertificatesRequestTopic";
const RESPONSE_TOPIC =
	process.env.RESPONSE_TOPIC || "CertificatesResponseTopic";
const RESPONSE_SUBSCRIPTION =
	process.env.RESPONSE_SUBSCRIPTION || "CertificatesResponseSubscription";

const pubSubClient = new PubSub({ projectId: PUBSUB_PROJECT_ID });

async function testDirectUpload() {
	console.log("🧪 Testing direct certificate verification...");

	// Test the certificate verification function directly
	const { CertificatesService } = await import(
		"./services/certificates.service.ts"
	);
	const certificatesService = new CertificatesService();

	const file = fs.readFileSync("test_to_send/spiderweb.pdf");
	const productId = "test-product-789";
	const certificateId = "ISCC-CORSIA-Cert-US201-2440920252";

	console.log(`📋 Testing certificate verification for: ${certificateId}`);

	try {
		const result = await certificatesService.uploadCertificate(
			productId,
			file,
			certificateId,
		);
		console.log(`✅ Upload result: ${result}`);
	} catch (error) {
		console.error(`❌ Upload error:`, error);
	}
}

testDirectUpload().catch(console.error);
