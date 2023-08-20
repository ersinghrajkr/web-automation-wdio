import request, { SuperTest, Test } from "supertest";
import { Response } from "supertest";
import * as logNetworkTime from'superagent-node-http-timings';
import logger from "./logger.helper.js";

// ts-node-esm ./test/helpers/api.helper.ts
// console.log(`Supertest: ${typeof supertest}`);
// console.log(`Supertest: ${supertest.length}`);
// console.log(`Supertest: ${ supertest.toString()}`);



// Define your default base URL
const defaultbaseURL = "http://localhost:3000";
type RequestOptions = {
	testId: string;
	baseURL?: string;
	endpoint: string;
	queryParam?: string;
	authToken?: string;
	payload?: object;
	header?: object;
}

async function GET(options: RequestOptions) {
	if (!options.baseURL || !options.endpoint) {
		throw Error(`Given Base URL: ${options.baseURL}, Endpoint: ${options.endpoint} is not valid`);
	}
	logger.info(options.testId, "info", `Making a GET call to ${options.endpoint}`);
	try {
		const requestReadyToCall =  request(options.baseURL.trim())
			.get(options.endpoint.trim())
			.query(options.queryParam)
			.auth(options.authToken, { type: "bearer" })
			.set("Accept", options.header ? `${options.header}` : `application/json`);
		const response =  await requestReadyToCall;
		return response;
	} catch (error) {
		error.message = `Error while making a GET call to ${options.endpoint}, ${error}`;
		throw error;
	}
}

async function POST(options: RequestOptions) {
	if (!options.baseURL || !options.endpoint) {
		throw Error(`Given Base URL: ${options.baseURL}, Endpoint: ${options.endpoint} is not a valid URL`);
	}
	if (!options.payload || typeof options.payload !== "object") {
		throw Error(`Invalid payload: ${options.payload}`);
	}
	logger.info(options.testId, "info", `Making a POST call to ${options.endpoint}`);
	try {
		const postResponse = await request(options.baseURL.trim()).post(options.endpoint.trim()).auth(options.authToken, { type: "bearer" }).set("Accept", `application/json`).send(options.payload);
		return { 
			status: postResponse.status,
			header: postResponse.header,
			bodyTxt: JSON.parse((postResponse as any).text),
			body: postResponse.body,
		};
	} catch (error) {
		error.message = `Error while making a POST call to ${options.endpoint}, ${error}`;
		logger.error(options.testId, `Error while making a POST call to ${options.endpoint}`, error);
		throw error;
	}
}

export default { GET, POST };
/**
 * function(app, options = {}) {
  const obj = {};

  if (typeof app === 'function') {
    if (options.http2) {
      if (!http2) {
        throw new Error(
          'supertest: this version of Node.js does not support http2'
        );
      }
      app = http2.createServer(app); // eslint-disable-line no-param-reassign
    } else {
      app = http.createServer(app); // eslint-disable-line no-param-reassign
    }
  }

  methods.forEach(function(method) {
    obj[method] = function(url) {
      var test = new Test(app, method, url);
      if (options.http2) {
        test.http2();
      }
      return test;
    };
  });

  // Support previous use of del
  obj.del = obj.delete;

  return obj;
}
 */
