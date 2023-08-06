import request from "supertest";
import logger from "./logger.helper.js";
// import moduleName from 'module';

// ts-node-esm ./test/helpers/api.helper.ts
// console.log(`Supertest: ${typeof request}`);
// console.log(`Supertest: ${request.length}`);
// console.log(`Supertest: ${ request.toString()}`);

let payload = {
	email: "eve.holt@reqres.in",
	password: "pistol",
};

async function GET(testId: string, baseURL: string, endpoint: string, authToken: string, queryParam: object, acceptHeader: object) {
	if (!baseURL || endpoint) {
		throw Error(`Given Base URL: ${baseURL}, Endpoint: ${endpoint} is not valid`);
	}
	baseURL = baseURL.trim();
	endpoint = endpoint.trim();
	logger.info(testId, "info", `Making a GET call to ${endpoint}`);
	try {
		return await request(baseURL.trim())
			.get(endpoint.trim())
			.query(queryParam)
			.auth(authToken, { type: "bearer" })
			.set("Accept", acceptHeader ? `${acceptHeader}` : `application/json`);
	} catch (error) {
		error.message = `Error while making a GET call to ${endpoint}, ${error}`;
		throw error;
	}
}

async function POST(testId: string, baseURL: string, endpoint: string, authToken: string, payload: object) {
	// const urlRegex = /^(http|https):\/\/[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/i;
	if (!baseURL || !endpoint) {
		throw Error(`Given Base URL: ${baseURL}, Endpoint: ${endpoint} is not a valid URL`);
	}
	baseURL = baseURL.trim();
	endpoint = endpoint.trim();
	if (!payload || typeof payload !== "object") {
		throw Error(`Invalid payload: ${payload}`);
	}
	// if (!authToken) {
	// 	throw Error(`Auth token is missing`);
	// }
	logger.info(testId, "info", `Making a POST call to ${endpoint}`);
	try {
		let resObj = await request(baseURL)
			.post(endpoint)
			.auth(authToken, { type: "bearer" })
			.set("Accept", `application/json`)
			.send(payload);
		logger.info(`${this.testId}: Response - ${JSON.stringify(resObj.body)}`);
	} catch (error) {
		error.message = `Error while making a POST call to ${endpoint}, ${error}`;
		logger.error(testId, `Error while making a POST call to ${endpoint}`, error);
		throw error;
	}
};

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
