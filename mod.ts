import { cat } from "./utils.ts";

/**Version 1.0.2 */
class Dena {
  key: string;
  id: string;
  name: string;
  constructor(key: string, id: string, name: string) {
    this.key = key;
    this.id = id;
    this.name = name;
  }

  private generateRequest = (
    path: string,
    options: { method: string; body?: any },
  ) => {
    let fetchOpts: any = {
      method: options.method,
      headers: {
        "X-API-Key": this.key,
        "Content-Type": "application/json",
      },
    };
    if (options.body) fetchOpts["body"] = JSON.stringify(options.body);

    return fetch(
      `https://database.deta.sh/v1/${this.id}/${this.name}${path}`,
      fetchOpts,
    );
  };

  put = (items: object[]) => {
    return new Promise((resolve, reject) => {
      const request = this.generateRequest(
        "/items",
        { method: "PUT", body: { items } },
      );
      request.then(async (data) => {
        const callback = cat({}, async ()=>{await data.json()});
        if (callback.errors) {
          reject(await data.text());
        } else {
          resolve(callback);
        }
      }).catch((err) => {
        reject(err);
      });
    });
  };
  get = (key: string) => {
    return new Promise((resolve, reject) => {
      const request = this.generateRequest(`/items/${key}`, { method: "GET" });
      request.then(async (data) => {
        const callback = await data.json();
        if (callback.errors) {
          reject(callback);
        } else {
          resolve(callback);
        }
      }).catch((err) => {
        reject(err);
      });
    });
  };

  delete = (key: string) => {
    return new Promise((resolve, reject) => {
      const request = this.generateRequest(
        `/items/${key}`,
        { method: "DELETE" },
      );
      request.then(async (data) => {
        const callback = await data.json();
        if (callback.errors) {
          reject(callback);
        } else {
          resolve(callback);
        }
      }).catch((err) => {
        reject(err);
      });
    });
  };

  insert = (item: object) => {
    return new Promise((resolve, reject) => {
      const request = this.generateRequest(
        "/items",
        { method: "POST", body: { item } },
      );
      request.then(async (data) => {
        const callback = await data.json();
        if (callback.errors) {
          reject(callback);
        } else {
          resolve(callback);
        }
      }).catch((err) => {
        reject(err);
      });
    });
  };

  update = (
    key: string,
    query: {
      set?: object;
      increment?: object;
      append?: object;
      prepend?: object;
      delete?: object[];
    },
  ) => {
    return new Promise((resolve, reject) => {
      const request = this.generateRequest(
        `/items/${key}`,
        { method: "PATCH", body: query },
      );
      request.then(async (data) => {
        const callback = await data.json();
        if (callback.errors) {
          reject(callback);
        } else {
          resolve(callback);
        }
      }).catch((err) => {
        reject(err);
      });
    });
  };

  query = (
    query: object[],
    options: { limit?: number; last?: string } = {},
  ) => {
    return new Promise((resolve, reject) => {
      const request = this.generateRequest(
        "/query",
        { method: "POST", body: { query, ...options } },
      );
      request.then(async (data) => {
        const callback = await data.json();
        if (callback.errors) {
          reject(callback);
        } else {
          resolve(callback);
        }
      }).catch((err) => {
        reject(err);
      });
    });
  };
}

export default Dena;
