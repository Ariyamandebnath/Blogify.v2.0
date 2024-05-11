import Blog, { BlogModel } from '../models/Blog.moodle';
import { Types } from 'mongoose';
import User from '../models/User.model';


const Author_Detail = ' name profilePicUrl';

async function create(blog: Blog): Promise<Blog>{
    const now = new Date();
    blog.createdAt = now;
    blog.updatedAt = now;
    const createdBlog = await BlogModel.create(blog);
    return createdBlog.toObject();
}


async function update(blog: Blog): Promise<Blog | null> {
    blog.updatedAt = new Date();
    return BlogModel.findByIdAndUpdate(blog._id, blog, { new: true })
        .lean()
        .exec();
    
}

async function findInfoById(id: Types.ObjectId): Promise<Blog | null>{
    return BlogModel.findOne({ _id: id, status: true })
        .populate('author', Author_Detail)
        .lean()
        .exec();
    
}

async function findInfoForPublishedById(
    id: Types.ObjectId,
): Promise<Blog | null>{
    return BlogModel.findOne({
        _id: id, isPublished: true, status: true
    })
        .select('_text')
        .populate('author', Author_Detail)
        .lean()
        .exec();
}


async function findBlogAllDataById(id: Types.ObjectId): Promise<Blog | null>{
    return BlogModel.findOne({ _id: id, status: true })
        .select(' +text +draftText +isSubmitted +isDraft +isPublised +status +createdBy +updatedBy')
        .populate('author', Author_Detail)
        .lean()
        .exec();
    
}


async function findPublishedByUrl(blogUrl: string): Promise<Blog | null>{
    return BlogModel.findOne({
        blogUrl: blogUrl,
        isPublished: true,
        status: true,
    })
        .select('+text')
        .populate('author', Author_Detail)
        .lean()
        .exec();
}


async function findUrlIfExists(blogUrl: string): Promise<Blog | null> {
    return BlogModel.findOne({ blogUrl: blogUrl }).lean().exec();



}

async function findByTagAndPaginated(
    tag: string,
    pageNumber: number,
    limit: number,
): Promise<Blog[]>{
    return BlogModel.find({
        tag: tag,
        status: true,
        isPublished: true
    })
        .skip(limit * (pageNumber - 1))
        .limit(limit)
        .populate('author', Author_Detail)
        .sort({ updatedAt: -1 })
        .lean()
        .exec();
    
}

async function findAllPublishedForAuthor(user: User): Promise<Blog[]>{
    return BlogModel.find({ author: user, status: true, isPublished: true })
        .populate('author', Author_Detail)
        .sort({ updatedAt: -1 })
        .lean()
        .exec();
    
}

async function findDetailedBlogs(query: Record<string, unknown>): Promise<Blog[]> {
    return BlogModel.find(query)
        .select('+isSubmitted +isDraft +isPublised +createdBy +updatedBy')
        .populate('author', Author_Detail)
        .populate('createdBy', Author_Detail)
        .populate('updatedBy', Author_Detail)
        .sort({ updatedAt: -1 })
        .lean()
        .exec();
}


async function findAllDrafts(): Promise<Blog[]>{
    return findDetailedBlogs({ isDraft: true, status: true });
}

async function findAllSubmissions(): Promise<Blog[]>{
    return findDetailedBlogs({ isSubmitted: true, status: true });
}

async function findAllPublished(): Promise<Blog[]> {
    return findDetailedBlogs({ isPublished: true, status: true });
}

async function findAllSubmissionsForWriter(user: User): Promise<Blog[]>{
    return findDetailedBlogs({ author: user, status: true, isSubmitted: true });
}

async function findAllPublishedForWriter(user: User): Promise<Blog[]>{
    return findDetailedBlogs({ author: user, status: true, isPublished: true });
}

async function findAllDraftsForWriter(user: User): Promise<Blog[]>{
    return findDetailedBlogs({ author: user, status: true, isDraft: true });
}

async function findLatestBlogs(pageNumber: number,
    limit: number,
): Promise<Blog[]>{
    return BlogModel.find({
        status: true, isPublised: true
    })
        .skip(limit * (pageNumber - 1))
        .limit(limit)
        .populate('author', Author_Detail)
        .sort({ publishedAt: -1 })
        .lean()
        .exec();
}


async function searchSimilarBlogs(blogs: Blog, limit: number): Promise<Blog[]>{
    return BlogModel.find({
        $text: { $search: blogs.title, $caseSensitive: false },
        status: true,
        isPublished: true,
        _id: { $ne: blogs._id },
    },
        {
            similarity: { $meta: 'textScore' },
        })
        .populate('author', Author_Detail)
        .sort({ updatedAt: -1 })
        .limit(limit)
        .sort({ similarity: { $meta: 'textScore' } })
        .lean()
        .exec();
    
}

async function search(query: string, limit: number):
    Promise<Blog[]>{
    return BlogModel.find({
        $text: { $search: query, $caseSensitive: false },
        status: true,
        isPublished: true,
    },
        {
            similarity: { $meta: 'textScore' },
        })
        .select('-status -description')
        .limit(limit)
        .sort({ similarity: { $meta: 'textScore' } })
        .lean()
        .exec();
}

async function searchLike(query: string, limit: number): Promise<Blog[]>{
    return BlogModel.find({
        title: { $regex: `.*${query}.*`, $options: 'i' },
        status: true,
        isPublished: true,
    })
        .select(' -status -description')
        .limit(limit)
        .sort({ score: -1 })
        .lean()
        .exec();
    
}


export default {
    create,
    update,
    findInfoById,
    findInfoForPublishedById,
    findBlogAllDataById,
    findPublishedByUrl,
    findUrlIfExists,
    findByTagAndPaginated,
    findAllPublishedForAuthor,
    findAllDrafts,
    findAllSubmissions,
    findAllPublished,
    findAllSubmissionsForWriter,findAllPublishedForWriter,
    findAllDraftsForWriter,
    findLatestBlogs,
    searchSimilarBlogs,
    search,
    searchLike,
};
