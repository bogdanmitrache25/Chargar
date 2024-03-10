export class Api {
  static baseUrl = "https://bogdan.v2.proyectosdwa.es/public/api";

  static async post<T>(url: string, data: any): Promise<any> {
    const token = localStorage.getItem("token") || null;
    const response = await fetch(`${Api.baseUrl}${url}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify(data),
    });

    const dataResponse = await response.json();

    return {
      statusCode: response.status,
      data: dataResponse,
    };
  }

  static async get<T>(url: string): Promise<any> {
    const token = localStorage.getItem("token") || null;
    const response = await fetch(`${Api.baseUrl}${url}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    });

    const dataResponse = await response.json();

    return {
      statusCode: response.status,
      data: dataResponse,
    };
  }

  static async put<T>(url: string, data: T): Promise<any> {
    const token = localStorage.getItem("token") || null;
    const response = await fetch(`${Api.baseUrl}${url}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify(data),
    });

    const dataResponse = await response.json();

    return {
      statusCode: response.status,
      data: dataResponse,
    };
  }

  static async delete(url: string): Promise<any> {
    const token = localStorage.getItem("token") || null;
    const response = await fetch(`${Api.baseUrl}${url}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    });

    return {
      statusCode: response.status,
      data: await response.json(),
    };
  }
}
