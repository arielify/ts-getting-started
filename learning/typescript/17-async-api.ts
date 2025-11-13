
interface User {
    id: number;
    name: string;
    email: string;
}

interface Post {
    id: number;
    title: string;
    content: string;
    userId: number;
}

class ApiService {
    private baseUrl = 'https://api.example.com';

    async getUser(id: number): Promise<User> {
        try {
            const response = await fetch(`${this.baseUrl}/users/${id}`);

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            return await response.json();
        } catch (error) {
            console.error('Failed to fetch user:', error);
            throw error;
        }
    }

    async getUserPosts(userId: number): Promise<Post[]> {
        const response = await fetch(`${this.baseUrl}/users/${userId}/posts`);
        return await response.json();
    }

    async getUserWithPosts(userId: number): Promise<{ user: User; posts: Post[] }> {
        // Sequential execution
        const user = await this.getUser(userId);
        const posts = await this.getUserPosts(userId);

        return { user, posts };
    }

    async getUserWithPostsParallel(userId: number): Promise<{ user: User; posts: Post[] }> {
        // Parallel execution - faster!
        const [user, posts] = await Promise.all([
            this.getUser(userId),
            this.getUserPosts(userId)
        ]);

        return { user, posts };
    }
}
