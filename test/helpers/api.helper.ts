import request from 'supertest';
// import moduleName from 'module';

// ts-node-esm ./test/helpers/api.helper.ts
// console.log(`Supertest: ${typeof request}`);
// console.log(`Supertest: ${request.length}`);
// console.log(`Supertest: ${ request.toString()}`);

async function GET(testId: string, baseURL: string, endpoint: string, authToken: string, queryParam: object, acceptHeader: object) {
    if(!baseURL || endpoint ) {
        throw Error(`Given Base URL: ${baseURL}, Endpoint: ${endpoint} is not valid`)
    }

    try {
        return await request(baseURL.trim())
        .get(endpoint.trim())
        .query(queryParam)
        .auth(authToken, {type: 'bearer'})
        .set('Accept', acceptHeader ?  `${acceptHeader}` : `application/json`)
    } catch (error) {
        
    }
}



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