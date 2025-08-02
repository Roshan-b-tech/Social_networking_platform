const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

interface ApiResponse<T = any> {
  data?: T;
  error?: string;
}

class ApiClient {
  private baseURL: string;
  private token: string | null = null;

  constructor(baseURL: string) {
    this.baseURL = baseURL;
    this.token = localStorage.getItem('token');
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    const url = `${this.baseURL}${endpoint}`;
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      ...(options.headers as Record<string, string>),
    };

    if (this.token) {
      headers.Authorization = `Bearer ${this.token}`;
    }

    try {
      const response = await fetch(url, {
        ...options,
        headers,
      });

      const data = await response.json();

      if (!response.ok) {
        return { error: data.error || 'An error occurred' };
      }

      return { data };
    } catch (error) {
      return { error: 'Network error. Please try again.' };
    }
  }

  setToken(token: string | null) {
    this.token = token;
    if (token) {
      localStorage.setItem('token', token);
    } else {
      localStorage.removeItem('token');
    }
  }

  // Auth endpoints
  async register(email: string, password: string, fullName: string) {
    return this.request('/auth/register', {
      method: 'POST',
      body: JSON.stringify({ email, password, fullName }),
    });
  }

  async login(email: string, password: string) {
    return this.request('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
  }

  async getCurrentUser() {
    return this.request('/auth/me');
  }

  // User endpoints
  async getUser(userId: string) {
    return this.request(`/users/${userId}`);
  }

  async updateProfile(fullName: string, bio: string, profileImage?: string, bannerImage?: string) {
    return this.request('/users/profile', {
      method: 'PUT',
      body: JSON.stringify({ fullName, bio, profileImage, bannerImage }),
    });
  }

  // Post endpoints
  async getPosts() {
    return this.request('/posts');
  }

  async getUserPosts(userId: string) {
    return this.request(`/posts/user/${userId}`);
  }

  async createPost(content: string, mediaData?: string, mediaType?: string) {
    return this.request('/posts', {
      method: 'POST',
      body: JSON.stringify({ content, mediaData, mediaType }),
    });
  }

  async updatePost(postId: string, content: string) {
    return this.request(`/posts/${postId}`, {
      method: 'PUT',
      body: JSON.stringify({ content }),
    });
  }

  async deletePost(postId: string) {
    return this.request(`/posts/${postId}`, {
      method: 'DELETE',
    });
  }

  async likePost(postId: string) {
    return this.request(`/posts/${postId}/like`, {
      method: 'POST',
    });
  }

  async addComment(postId: string, content: string) {
    return this.request(`/posts/${postId}/comments`, {
      method: 'POST',
      body: JSON.stringify({ content }),
    });
  }

  async getComments(postId: string) {
    return this.request(`/posts/${postId}/comments`);
  }
}

export const apiClient = new ApiClient(API_BASE_URL);