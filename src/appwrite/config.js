// src/appwrite/config.js

// This service acts as a wrapper around Appwrite's SDK.
// It handles Database operations (CRUD for blog posts)
// and Storage operations (uploading, viewing, deleting files).
// This keeps the logic clean and reusable across the app.

import conf from '../conf/conf';
import {
  Client,
  ID,
  Databases,
  Storage,
  Query,
  Permission,
  Role,
} from 'appwrite';

export class Service {
  client = new Client();   // Appwrite client instance
  databases;               // Database service instance
  bucket;                  // Storage (bucket) service instance

  constructor() {
    // Initialize client with endpoint and projectId from config
    // NOTE: conf.appwriteUrl must include /v1 at the end
    this.client
      .setEndpoint(conf.appwriteUrl)
      .setProject(conf.appwriteProjectId);

    // Initialize database and storage services
    this.databases = new Databases(this.client);
    this.bucket = new Storage(this.client);
  }

  // ------------------------
  // POSTS (Database CRUD)
  // ------------------------

  // Create a new blog post document in the database
  // Fields: title, content, featuredImage (fileId), status, userId
  // slug = documentId (unique identifier for the post)
  async createPost({ title, slug, content, featuredImage, status, userId }) {
    try {
      return await this.databases.createDocument(
        conf.appwriteDatabaseId,    // database ID
        conf.appwriteCollectionId,  // collection ID
        slug,                       // document ID (slug)
        { title, content, featuredImage, status, userId } // data object
      );
    } catch (error) {
      console.log('Appwrite service :: createPost :: error', error);
      return false;
    }
  }

  // Update an existing blog post by slug (documentId)
  // Only the provided fields will be updated
  async updatePost(slug, { title, content, featuredImage, status }) {
    try {
      return await this.databases.updateDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        slug,  // document ID
        { title, content, featuredImage, status } // updated fields
      );
    } catch (error) {
      console.log('Appwrite service :: updatePost :: error', error);
      return false;
    }
  }

  // Delete a post completely by its slug (documentId)
  async deletePost(slug) {
    try {
      await this.databases.deleteDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        slug // document ID
      );
      return true;
    } catch (error) {
      console.log('Appwrite service :: deletePost :: error', error);
      return false;
    }
  }

  // Get a single post by its slug (documentId)
  async getPost(slug) {
    try {
      return await this.databases.getDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        slug
      );
    } catch (error) {
      console.log('Appwrite service :: getPost :: error', error);
      return false;
    }
  }

  // Get all posts with optional query filters
  // By default: only fetch posts where status = "active"
  async getPosts(queries = [Query.equal('status', 'active')]) {
    try {
      return await this.databases.listDocuments(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        queries // filters
      );
    } catch (error) {
      console.log('Appwrite service :: getPosts :: error', error);
      return false;
    }
  }

  // ------------------------
  // FILES (Storage CRUD)
  // ------------------------

  // Upload a file to Appwrite storage bucket
  // Public read permission is added so the file can be viewed via <img>
  async uploadFile(file) {
    try {
      return await this.bucket.createFile(
        conf.appwriteBucketId,      // bucket ID
        ID.unique(),                // unique file ID
        file,                       // actual file (from input)
        [Permission.read(Role.any())] // anyone can read (public access)
      );
    } catch (error) {
      console.log('Appwrite service :: uploadFile :: error', error);
      return false;
    }
  }

  // Delete a file from Appwrite storage by fileId
  async deleteFile(fileId) {
    try {
      await this.bucket.deleteFile(conf.appwriteBucketId, fileId);
      return true;
    } catch (error) {
      console.log('Appwrite service :: deleteFile :: error', error);
      return false;
    }
  }

  // Generate a direct view URL for a file
  // This URL can be used inside <img src="..."> to display the file
  getFileView(fileId) {
    const url = this.bucket.getFileView(conf.appwriteBucketId, fileId);
    // Appwrite may return a string or an object, handle both cases
    return typeof url === 'string' ? url : url?.href;
  }

  // Backward compatibility: if somewhere code calls getFilePreview,
  // it will still work (internally just calls getFileView)
  getFilePreview(fileId) {
    return this.getFileView(fileId);
  }
}

// Export a single instance of the Service class
// This instance will be imported and reused across the app
const service = new Service();
export default service;
