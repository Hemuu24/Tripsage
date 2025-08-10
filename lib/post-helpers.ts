import { supabase } from './supabaseClient'
import { Database } from './database.types'

type Post = Database['public']['Tables']['posts']['Row']
type PostInsert = Database['public']['Tables']['posts']['Insert']
type PostUpdate = Database['public']['Tables']['posts']['Update']
type PostLike = Database['public']['Tables']['post_likes']['Row']
type Comment = Database['public']['Tables']['comments']['Row']

// Enhanced post type with profile data
export interface PostWithProfile extends Post {
  profiles: {
    username: string | null
    full_name: string | null
    avatar_url: string | null
  }
  is_liked?: boolean
}

// Post types for different sections
export type PostType = 'journal' | 'forum'

export interface CreatePostData {
  title: string
  content: string
  type: PostType
  images?: File[]
  location?: string
  tags?: string[]
  trip_dates?: {
    start_date: string | null
    end_date: string | null
  }
  looking_for_companions?: boolean
  max_companions?: number
}

// Get all posts with pagination
export async function getPosts(page = 0, limit = 10): Promise<PostWithProfile[]> {
  const { data, error } = await supabase
    .from('posts')
    .select(`
      *,
      profiles!user_id (
        id,
        username,
        full_name,
        avatar_url,
        location
      )
    `)
    .order('created_at', { ascending: false })
    .range(page * limit, (page + 1) * limit - 1)

  if (error) {
    console.error('Error fetching posts:', error)
    return []
  }

  return data as PostWithProfile[]
}

// Get posts by type (journal or forum)
export async function getPostsByType(type: PostType, page = 0, limit = 10): Promise<PostWithProfile[]> {
  // First try to get posts with the specific type tag
  const { data, error } = await supabase
    .from('posts')
    .select(`
      *,
      profiles!user_id (
        id,
        username,
        full_name,
        avatar_url,
        location
      )
    `)
    .contains('tags', [type])
    .order('created_at', { ascending: false })
    .range(page * limit, (page + 1) * limit - 1)

  if (error) {
    console.error('Error fetching posts by type:', error)
    console.error('Trying fallback query...')
  }
  
  // If we found posts with the specific type, return them
  if (data && data.length > 0) {
    return data as PostWithProfile[]
  }
  
  // Fallback: get all posts and filter on client side
  console.log('No posts found with type tag, trying fallback...')
  const { data: allData, error: allError } = await supabase
    .from('posts')
    .select(`
      *,
      profiles!user_id (
        id,
        username,
        full_name,
        avatar_url,
        location
      )
    `)
    .order('created_at', { ascending: false })
    .range(page * limit, (page + 1) * limit - 1)
  
  if (allError) {
    console.error('Fallback query also failed:', allError)
    return []
  }
  
  // Filter on client side by checking if tags contain the type
  const filtered = (allData || []).filter(post => 
    post.tags && Array.isArray(post.tags) && post.tags.includes(type)
  )
  
  console.log(`Found ${filtered.length} posts of type ${type} after filtering`)
  return filtered as PostWithProfile[]
}

// Debug function to see all posts
export async function getAllPostsDebug(): Promise<any[]> {
  const { data, error } = await supabase
    .from('posts')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Error fetching all posts for debug:', error)
    return []
  }

  console.log('All posts in database:', data)
  return data || []
}

// Get journal posts (travel experiences and stories)
export async function getJournalPosts(page = 0, limit = 10): Promise<PostWithProfile[]> {
  return getPostsByType('journal', page, limit)
}

// Get forum posts (discussions and questions)
export async function getForumPosts(page = 0, limit = 10): Promise<PostWithProfile[]> {
  return getPostsByType('forum', page, limit)
}

// Get posts by user
export async function getUserPosts(userId: string): Promise<PostWithProfile[]> {
  const { data, error } = await supabase
    .from('posts')
    .select(`
      *,
      profiles!user_id (
        username,
        full_name,
        avatar_url
      )
    `)
    .eq('user_id', userId)
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Error fetching user posts:', error)
    return []
  }

  return data as PostWithProfile[]
}

// Get single post
export async function getPost(postId: string): Promise<PostWithProfile | null> {
  const { data, error } = await supabase
    .from('posts')
    .select(`
      *,
      profiles!user_id (
        username,
        full_name,
        avatar_url
      )
    `)
    .eq('id', postId)
    .single()

  if (error) {
    console.error('Error fetching post:', error)
    return null
  }

  return data as PostWithProfile
}

// Create new post
export async function createPost(post: PostInsert): Promise<Post | null> {
  // Clean the data to match database schema
  const cleanPost = {
    user_id: post.user_id,
    title: post.title,
    content: post.content,
    location: post.location || null,
    tags: post.tags || [],
    images: post.images || [],
    trip_dates: post.trip_dates || null,
    looking_for_companions: post.looking_for_companions || false,
    max_companions: post.max_companions || null
  }

  const { data, error } = await supabase
    .from('posts')
    .insert(cleanPost)
    .select()
    .single()

  if (error) {
    console.error('Error creating post:', error)
    return null
  }

  return data
}

// Update post
export async function updatePost(postId: string, updates: PostUpdate): Promise<Post | null> {
  const { data, error } = await supabase
    .from('posts')
    .update(updates)
    .eq('id', postId)
    .select()
    .single()

  if (error) {
    console.error('Error updating post:', error)
    return null
  }

  return data
}

// Delete post
export async function deletePost(postId: string): Promise<boolean> {
  const { error } = await supabase
    .from('posts')
    .delete()
    .eq('id', postId)

  if (error) {
    console.error('Error deleting post:', error)
    return false
  }

  return true
}

// Upload post images
export async function uploadPostImages(userId: string, files: File[]): Promise<string[]> {
  const uploadedUrls: string[] = []

  for (let i = 0; i < files.length; i++) {
    const file = files[i]
    const fileExt = file.name.split('.').pop()
    const fileName = `${userId}/${Date.now()}-${i}.${fileExt}`

    const { error: uploadError } = await supabase.storage
      .from('post-images')
      .upload(fileName, file)

    if (uploadError) {
      console.error('Error uploading image:', uploadError)
      continue
    }

    const { data } = supabase.storage
      .from('post-images')
      .getPublicUrl(fileName)

    uploadedUrls.push(data.publicUrl)
  }

  return uploadedUrls
}

// Like/unlike post
export async function togglePostLike(postId: string, userId: string): Promise<boolean> {
  // Check if already liked
  const { data: existingLike } = await supabase
    .from('post_likes')
    .select('id')
    .eq('post_id', postId)
    .eq('user_id', userId)
    .single()

  if (existingLike) {
    // Unlike
    const { error } = await supabase
      .from('post_likes')
      .delete()
      .eq('post_id', postId)
      .eq('user_id', userId)

    return !error
  } else {
    // Like
    const { error } = await supabase
      .from('post_likes')
      .insert({ post_id: postId, user_id: userId })

    return !error
  }
}

// Check if user liked post
export async function checkPostLiked(postId: string, userId: string): Promise<boolean> {
  const { data } = await supabase
    .from('post_likes')
    .select('id')
    .eq('post_id', postId)
    .eq('user_id', userId)
    .single()

  return !!data
}

// Get post comments
export async function getPostComments(postId: string): Promise<Comment[]> {
  const { data, error } = await supabase
    .from('comments')
    .select(`
      *,
      profiles!user_id (
        username,
        full_name,
        avatar_url
      )
    `)
    .eq('post_id', postId)
    .order('created_at', { ascending: true })

  if (error) {
    console.error('Error fetching comments:', error)
    return []
  }

  return data as any[]
}

// Add comment to post
export async function addComment(postId: string, userId: string, content: string, parentId?: string): Promise<Comment | null> {
  const { data, error } = await supabase
    .from('comments')
    .insert({
      post_id: postId,
      user_id: userId,
      content,
      parent_id: parentId || null
    })
    .select()
    .single()

  if (error) {
    console.error('Error adding comment:', error)
    return null
  }

  return data
}

// Search posts
export async function searchPosts(query: string): Promise<PostWithProfile[]> {
  const { data, error } = await supabase
    .from('posts')
    .select(`
      *,
      profiles!user_id (
        username,
        full_name,
        avatar_url
      )
    `)
    .or(`title.ilike.%${query}%,content.ilike.%${query}%,location.ilike.%${query}%`)
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Error searching posts:', error)
    return []
  }

  return data as PostWithProfile[]
}
