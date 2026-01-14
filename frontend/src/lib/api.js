const API_BASE_URL = "http://localhost:8000";

class ApiService {
  // ================= TOKEN =================
  getToken() {
    return localStorage.getItem("token");
  }

  setToken(token) {
    localStorage.setItem("token", token);
  }

  clearToken() {
    localStorage.removeItem("token");
  }

  // ================= HEADERS =================
  getHeaders(isFormData = false) {
    const headers = {};
    const token = this.getToken();

    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
    }

    if (!isFormData) {
      headers["Content-Type"] = "application/json";
    }

    return headers;
  }

  // ================= AUTH =================
  async register(email, password) {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/register`, {
        method: "POST",
        headers: this.getHeaders(),
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.detail || "Registration failed");
      }

      return { success: true };
    } catch (error) {
      return {
        success: false,
        message: error.message || "Registration failed",
      };
    }
  }

  async login(email, password) {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/login`, {
        method: "POST",
        headers: this.getHeaders(),
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.detail || "Login failed");
      }

      const data = await response.json();
      this.setToken(data.access_token);

      return {
        success: true,
        token: data.access_token,
      };
    } catch (error) {
      return {
        success: false,
        message: error.message || "Login failed",
      };
    }
  }

  // ================= MEDIA =================
  async encodeText(coverImage, message) {
    try {
      const formData = new FormData();
      formData.append("cover_image", coverImage);
      formData.append("message", message);

      const response = await fetch(`${API_BASE_URL}/media/encode/text`, {
        method: "POST",
        headers: this.getHeaders(true),
        body: formData,
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.detail || "Encoding failed");
      }

      const data = await response.json();
      return {
        success: true,
        downloadUrl: `${API_BASE_URL}${data.download_url}`,
      };
    } catch (error) {
      return {
        success: false,
        message: error.message || "Encoding failed",
      };
    }
  }

  async encodeImage(coverImage, hiddenImage) {
    try {
      const formData = new FormData();
      formData.append("cover_image", coverImage);
      formData.append("hidden_image", hiddenImage);

      const response = await fetch(`${API_BASE_URL}/media/encode/image`, {
        method: "POST",
        headers: this.getHeaders(true),
        body: formData,
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.detail || "Encoding failed");
      }

      const data = await response.json();
      return {
        success: true,
        downloadUrl: `${API_BASE_URL}${data.download_url}`,
      };
    } catch (error) {
      return {
        success: false,
        message: error.message || "Encoding failed",
      };
    }
  }

  async encodeAudio(coverImage, audioFile) {
    try {
      const formData = new FormData();
      formData.append("cover_image", coverImage);
      formData.append("audio_file", audioFile);

      const response = await fetch(`${API_BASE_URL}/media/encode/audio`, {
        method: "POST",
        headers: this.getHeaders(true),
        body: formData,
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.detail || "Encoding failed");
      }

      const data = await response.json();
      return {
        success: true,
        downloadUrl: `${API_BASE_URL}${data.download_url}`,
      };
    } catch (error) {
      return {
        success: false,
        message: error.message || "Encoding failed",
      };
    }
  }

  async decode(encodedImage) {
    try {
      const formData = new FormData();
      formData.append("encoded_image", encodedImage);

      const response = await fetch(`${API_BASE_URL}/media/decode`, {
        method: "POST",
        headers: this.getHeaders(true),
        body: formData,
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.detail || "Decoding failed");
      }

      const data = await response.json();

      if (data.type === "TEXT") {
        return {
          success: true,
          type: "TEXT",
          content: data.message,
        };
      }

      return {
        success: true,
        type: data.type,
        downloadUrl: `${API_BASE_URL}${data.download_url}`,
      };
    } catch (error) {
      return {
        success: false,
        message: error.message || "Decoding failed",
      };
    }
  }

  // ================= HEALTH =================
  async healthCheck() {
    try {
      const response = await fetch(`${API_BASE_URL}/health`);
      return response.ok;
    } catch {
      return false;
    }
  }
}

export const api = new ApiService();
